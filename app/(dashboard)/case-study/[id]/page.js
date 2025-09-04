"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Loader from "@/components/Loader";
import Notification from "@/components/Notification";
import {
  FaBold,
  FaItalic,
  FaListUl,
  FaQuoteRight,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaLink,
  FaImage,
  FaArrowLeft,
} from "react-icons/fa";


// Toolbar button component
const ToolbarButton = ({ onClick, isActive, icon: Icon, label }) => (
  <button
    type="button"
    onClick={onClick}
    className={`p-2 rounded ${isActive ? "bg-black text-white" : "bg-white text-black"} hover:bg-gray-200 transition`}
    title={label}
  >
    <Icon size={16} />
  </button>
);

const Page = () => {
  const { id } = useParams();
  const router = useRouter();

  const [data, setData] = useState({
    title: "",
    description: "",
    content: "",
    image: "",
  });

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };

  // Initialize TipTap editor
  const editor = useEditor({
    extensions: [StarterKit, Link, TextAlign.configure({ types: ["heading", "paragraph"] })],
    content: "",
    onUpdate: ({ editor }) => {
      setData((prev) => ({ ...prev, content: editor.getHTML() }));
    },
  });

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/${id}`);
        const caseStudy = res.data.caseStudy;
        setData(caseStudy);

        // Set editor content after data is loaded
        if (editor && caseStudy.content) {
          editor.commands.setContent(caseStudy.content);
        }
      } catch {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, editor]);

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { secure_url } = response.data;
      setData((prev) => ({ ...prev, image: secure_url }));
      showNotification("Image uploaded successfully");
    } catch (error) {
      console.error("Upload error:", error);
      setError("Image upload failed");
      showNotification("Image upload failed", "error");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.patch(`/api/update-case`, { ...data, id });
      showNotification("Case study updated successfully");
      router.push("/portal");
    } catch {
      setError("Failed to update case study");
      showNotification("Failed to update case study", "error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {notification.message && (
        <Notification message={notification.message} type={notification.type} />
      )}

      <div
        className="flex items-center gap-2 mb-6 cursor-pointer text-black hover:text-gray-700"
        onClick={() => window.history.back()}
      >
        <FaArrowLeft size={20} />
        <span className="font-medium">Back</span>
      </div>

      <h2 className="text-3xl font-bold mb-6">Update Case Study</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block mb-2 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={handleInputChange}
            className="w-full p-3 border rounded focus:ring-2 focus:ring-black"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 font-medium">Description</label>
          <textarea
            name="description"
            value={data.description}
            onChange={handleInputChange}
            className="w-full p-3 border rounded focus:ring-2 focus:ring-black"
            rows={3}
          />
        </div>

        {/* Content */}
        <div>
          <label className="block mb-2 font-medium">Content</label>
          {editor ? (
            <>
              <div className="flex gap-2 mb-3 flex-wrap">
                <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive("bold")} icon={FaBold} label="Bold" />
                <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive("italic")} icon={FaItalic} label="Italic" />
                <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive("bulletList")} icon={FaListUl} label="Bulleted List" />
                <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive("blockquote")} icon={FaQuoteRight} label="Quote" />
                <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("left").run()} isActive={editor.isActive({ textAlign: "left" })} icon={FaAlignLeft} label="Align Left" />
                <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("center").run()} isActive={editor.isActive({ textAlign: "center" })} icon={FaAlignCenter} label="Align Center" />
                <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("right").run()} isActive={editor.isActive({ textAlign: "right" })} icon={FaAlignRight} label="Align Right" />
                <ToolbarButton
                  onClick={() => {
                    const url = prompt("Enter URL");
                    if (url) editor.chain().focus().toggleLink({ href: url }).run();
                  }}
                  isActive={editor.isActive("link")}
                  icon={FaLink}
                  label="Insert Link"
                />
              </div>
              <div className="border rounded bg-white p-3 min-h-[200px]">
                <EditorContent editor={editor} />
              </div>
            </>
          ) : (
            <p>Loading editor...</p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-2 font-medium">Upload Image</label>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer bg-gray-100 px-3 py-2 rounded hover:bg-gray-200 transition">
              <FaImage />
              <span>Choose Image</span>
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </label>
            {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
          </div>
          {data.image && (
            <div className="mt-3">
              <img src={data.image} alt="Uploaded" className="h-32 rounded shadow" />
            </div>
          )}
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Page;
