import React from "react";

const ChatMessages = ({ messages }) => {
  return (
    <div className="flex-1 min-h-[calc(100vh-220px)] flex flex-col bg-white">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center flex-1 text-center">
          <div>
            <p className="text-text opacity-50 text-sm">No messages yet</p>
            <p className="text-text opacity-40 text-xs mt-1">
              Start a conversation
            </p>
          </div>
        </div>
      ) : (
        <div className="flex-1 min-h-[calc(100vh-220px)] p-6 space-y-4 overflow-y-auto">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.from === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div className={`max-w-[60%]`}>
                <div
                  className={`px-4 py-2.5 rounded-2xl text-sm whitespace-pre-wrap wrap-break-word ${
                    msg.from === "user"
                      ? "bg-linear-to-t from-secondary to-tertiary  text-white rounded-br-none"
                      : "bg-secondary/10 text-text rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
                <p
                  className={`text-xs text-text opacity-50 mt-1.5 px-1 ${
                    msg.from === "user" ? "text-right" : "text-left"
                  }`}
                >
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatMessages;
