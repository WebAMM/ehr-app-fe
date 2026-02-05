import React, { useRef } from "react";
import { FiSend, FiPaperclip, FiImage, FiFile } from "react-icons/fi";

const ChatInput = ({ value, onChange, onSend, onAttach }) => {
  const fileInputRef = useRef();
  const imageInputRef = useRef();
  const documentInputRef = useRef();
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="sticky bottom-0  z-10 px-6 py-7 border-t border-gray-200 bg-white flex items-end gap-3">
      <div className="flex gap-2 text-text opacity-60">
        <button
          onClick={() => fileInputRef.current.click()}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <FiPaperclip className="text-lg cursor-pointer" />
        </button>
        <button
          onClick={() => imageInputRef.current.click()}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <FiImage className="text-lg cursor-pointer" />
        </button>
        <button
          onClick={() => documentInputRef.current.click()}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <FiFile className="text-lg cursor-pointer" />
        </button>
      </div>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type your message..."
        className="flex-1 px-4 py-2.5 text-sm rounded-full border border-gray-200 bg-gray-50 focus:outline-none focus:border-secondary focus:bg-white transition"
      />

      <button
        onClick={onSend}
        className="bg-secondary  text-white p-2.5 rounded-full transition flex items-center justify-center"
      >
        <FiSend className="text-lg" />
      </button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={(e) => {
          if (e.target.files[0]) {
            onAttach(e.target.files[0]);
            e.target.value = "";
          }
        }}
      />
      <input
        type="file"
        ref={imageInputRef}
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => {
          if (e.target.files[0]) {
            onAttach(e.target.files[0]);
            e.target.value = "";
          }
        }}
      />
      <input
        type="file"
        ref={documentInputRef}
        accept=".pdf,.doc,.docx,.txt"
        style={{ display: "none" }}
        onChange={(e) => {
          if (e.target.files[0]) {
            onAttach(e.target.files[0]);
            e.target.value = "";
          }
        }}
      />
    </div>
  );
};

export default ChatInput;
