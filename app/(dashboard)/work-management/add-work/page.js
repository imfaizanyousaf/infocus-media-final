"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import WorkModal from "@/components/(dashboard)/WorkModal";
import Notification from "@/components/Notification";
import Loader from "@/components/Loader";

const AddWorkPage = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [notification, setNotification] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (workData) => {
    try {
      setIsSubmitting(true);
      const response = await fetch('/api/work/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(workData),
      });

      const result = await response.json();

      if (response.ok) {
        setNotification({
          message: "Work created successfully!",
          type: "success"
        });
        
        setTimeout(() => {
          router.push('/work-management');
        }, 1500);
      } else {
        setNotification({
          message: result.error || "Failed to create work",
          type: "error"
        });
      }
    } catch (error) {
      console.error('Error creating work:', error);
      setNotification({
        message: "Failed to create work",
        type: "error"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
    router.push('/work-management');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {isSubmitting && <Loader />}
      <WorkModal
        isOpen={isModalOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        initialData={null}
        setNotification={setNotification}
      />

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default AddWorkPage;