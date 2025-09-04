import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ApplyingModal = ({ id, title, onClose, onApplySuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    portfolioLink: '',
    message: '',
    file: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB');
        return;
      }
      
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Only PDF, DOC, and DOCX files are allowed');
        return;
      }

      setFormData(prev => ({
        ...prev,
        file: file,
        portfolioLink: file.name
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.fullName.trim()) {
      toast.error('Please enter your full name');
      return;
    }
    
    if (!formData.email.trim()) {
      toast.error('Please enter your email address');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare form data for submission
      const submitData = new FormData();
      submitData.append('fullName', formData.fullName.trim());
      submitData.append('email', formData.email.trim());
      submitData.append('phone', formData.phone.trim());
      submitData.append('portfolioLink', formData.portfolioLink.trim());
      submitData.append('message', formData.message.trim());
      submitData.append('jobTitle', title);
      
      if (formData.file) {
        submitData.append('file', formData.file);
      }

      const response = await fetch('/api/career-application', {
        method: 'POST',
        body: submitData,
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message || 'Application submitted successfully!');
        if (onApplySuccess) onApplySuccess();
        onClose();
      } else {
        toast.error(result.error || 'Failed to submit application');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blur Background */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal Box */}
      <div className="relative bg-white shadow-lg p-6 w-full max-w-md z-10">
        <h2 className="text-[22px] font-bold mb-4 text-left uppercase"> {title}</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name *"
            value={formData.fullName}
            onChange={handleInputChange}
            className="w-full border-b border-gray-300 px-4 py-2 focus:outline-none focus:border-black"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email *"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full border-b border-gray-300 px-4 py-2 focus:outline-none focus:border-black"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number, +971.."
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full border-b border-gray-300 px-4 py-2 focus:outline-none focus:border-black"
          />
          <div className="flex items-center border-b border-gray-300">
            <input
              type="text"
              placeholder="Portfolio link / CV"
              value={formData.portfolioLink}
              className="flex-1 px-4 py-2 border-none outline-none bg-transparent"
              readOnly
            />
            <label className="bg-gray-200 font-bold text-black px-4 py-2 rounded cursor-pointer hover:bg-gray-300 transition">
              <span>Upload File</span>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
          <textarea
            name="message"
            placeholder="Message (optional)"
            value={formData.message}
            onChange={handleInputChange}
            className="w-full border-b border-gray-300 px-4 py-2 resize-none focus:outline-none focus:border-black"
            rows={3}
          />
          <div className='flex items-center gap-4'>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`cursor-pointer mt-4 px-6 py-3 rounded-md transition ${
                isSubmitting 
                  ? 'bg-gray-400 text-white cursor-not-allowed' 
                  : 'bg-black text-white hover:opacity-90'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Apply'}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="cursor-pointer mt-4 bg-gray-300 text-black px-6 py-3 rounded-md hover:opacity-90 transition disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyingModal;