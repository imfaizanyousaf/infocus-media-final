import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { User } from "./models/User";
import { connectDB } from "./mongoose";

export const authenticateToken = async (request) => {
  try {
    await connectDB();

    // Get token from Authorization header
    const authHeader = request.headers.get('authorization');
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    // If no token, check for token in request body (for some specific endpoints)
    let tokenToVerify = token;
    if (!tokenToVerify) {
      try {
        const body = await request.json();
        tokenToVerify = body.token;
        // Need to create a new request with the same body for the handler
        request.json = () => Promise.resolve(body);
      } catch (e) {
        // Body already consumed or not JSON, continue without token
      }
    }

    if (!tokenToVerify) {
      return {
        error: NextResponse.json({ error: "Access token required" }, { status: 401 }),
        user: null
      };
    }

    // Verify token
    const decoded = jwt.verify(tokenToVerify, process.env.JWT_SECRET);
    
    // Get user from database
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return {
        error: NextResponse.json({ error: "User not found" }, { status: 404 }),
        user: null
      };
    }

    return {
      error: null,
      user: { id: user._id, email: user.email, name: user.name }
    };
  } catch (error) {
    console.error("Authentication error:", error);
    return {
      error: NextResponse.json({ error: "Invalid token" }, { status: 401 }),
      user: null
    };
  }
};

// Higher-order function to wrap API handlers with authentication
export const withAuth = (handler) => {
  return async (request, context) => {
    const { error, user } = await authenticateToken(request);
    
    if (error) {
      return error;
    }

    // Add user to request context
    request.user = user;
    
    // Call the original handler
    return handler(request, context);
  };
}; 