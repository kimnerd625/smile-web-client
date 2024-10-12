import React from "react";

export default function Modal({ children, onClose }: any) {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-sm w-full max-h-[90vh] overflow-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-[#FF8C4A] text-white rounded-[8px] p-2 text-[12px]"
        >
          닫기
        </button>
        {children}
      </div>
    </div>
  );
}
