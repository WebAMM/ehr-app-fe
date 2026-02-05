import React from "react";
import { FiPhone, FiVideo, FiMoreVertical, FiArrowLeft } from "react-icons/fi";

const ChatHeader = ({ chat, onBack, showBackButton }) => {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-1">
        {showBackButton && (
          <button
            onClick={onBack}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition mr-2"
            aria-label="Back to conversations"
          >
            <FiArrowLeft className="lg:text-lg  text-text" />
          </button>
        )}
        <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
          {chat.name.charAt(0)}
        </div>
        <div className="ml-1">
          <h3 className="font-semibold text-text max-sm:text-sm">
            {chat.name}
          </h3>
          <p
            className={`text-sm ${
              chat.online
                ? "text-green-500 font-medium"
                : "text-text opacity-60"
            }`}
          >
            {chat.online ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      <div className="flex items-center lg:gap-5 gap-1 text-text opacity-70">
        <button className="p-2 hover:bg-gray-100 rounded-lg transition">
          <FiPhone className="cursor-pointer lg:text-lg text-sm" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition ">
          <FiVideo className="cursor-pointer lg:text-lg text-sm" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition">
          <FiMoreVertical className="cursor-pointer lg:text-lg text-sm" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
