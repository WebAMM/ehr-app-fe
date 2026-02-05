import React from "react";
import { FiSearch } from "react-icons/fi";

const ConversationList = ({ conversations, activeChat, onSelect }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="space-y-3 pb-4 border-b border-border">
        <div className="relative">
          <FiSearch className="absolute left-3 top-2.5 text-text opacity-50 text-sm" />
          <input
            placeholder="Search conversations..."
            className="w-full pl-10 pr-3 py-2 text-sm rounded-lg border border-border bg-bg focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-1 py-2">
        {conversations.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelect(chat)}
            className={`w-full text-left px-3 py-3 cursor-pointer transition border-l-4 pl-2 ${
              activeChat?.id === chat?.id
                ? "border-l-secondary bg-secondary/10 hover:bg-secondary/20"
                : "border-l-transparent hover:bg-secondary/5"
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="font-semibold text-sm text-text">{chat.name}</p>
                  {chat.online && (
                    <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                  )}
                </div>
                <p className="text-xs text-text opacity-60 mt-0.5">
                  {chat.role}
                </p>
                <p className="text-xs text-text opacity-70 truncate mt-1 line-clamp-1">
                  {chat.lastMessage}
                </p>
              </div>

              <div className="flex flex-col items-end gap-1 shrink-0">
                {chat.timestamp && (
                  <span className="text-xs text-text opacity-60">
                    {chat.timestamp}
                  </span>
                )}
                {chat.unread > 0 && (
                  <span className="bg-linear-to-r from-secondary to-primary/60 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-medium">
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ConversationList;
