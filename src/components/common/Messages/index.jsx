import React, { useState } from "react";
import Card from "@/components/ui/Card";
import ConversationList from "./ConversationList";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

const conversations = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    role: "Cardiologist",
    online: true,
    unread: 2,
    timestamp: "10:30 AM",
    lastMessage: "Your test results look good. Pl...",
    messages: [
      {
        from: "doctor",
        text: "Hello! I reviewed your recent test results.",
        time: "10:25 AM",
        attachments: [],
      },
      {
        from: "user",
        text: "Thank you, doctor. Is everything okay?",
        time: "10:27 AM",
        attachments: [],
      },
      {
        from: "doctor",
        text: "Yes, your test results look good. Please continue with your current medication and schedule a follow-up in 2 weeks.",
        time: "10:30 AM",
        attachments: [],
      },
    ],
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    role: "Pediatrician",
    online: false,
    unread: 0,
    timestamp: "Yesterday",
    lastMessage: "Thank you for the update.",
    messages: [
      {
        from: "doctor",
        text: "Thank you for the update.",
        time: "Yesterday",
        attachments: [],
      },
    ],
  },
  {
    id: 3,
    name: "MediLab Support",
    role: "Customer Service",
    online: true,
    unread: 1,
    timestamp: "2 days ago",
    lastMessage: "Your lab results are ready for d...",
    messages: [
      {
        from: "doctor",
        text: "Your lab results are ready for download.",
        time: "2 days ago",
        attachments: [],
      },
    ],
  },
  {
    id: 4,
    name: "Dr. Amina Diop",
    role: "Dermatologist",
    online: false,
    unread: 0,
    timestamp: "3 days ago",
    lastMessage: "Please apply the cream twice daily",
    messages: [
      {
        from: "doctor",
        text: "Please apply the cream twice daily",
        time: "3 days ago",
        attachments: [],
      },
    ],
  },
];

const CommonMessages = () => {
  const [activeChat, setActiveChat] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState("");
  const [showChatOnMobile, setShowChatOnMobile] = useState(false);
  const [attachments, setAttachments] = useState([]);

  const handleSelectChat = (chat) => {
    setActiveChat(chat);
    setShowChatOnMobile(true);
  };

  const handleBackToList = () => {
    setShowChatOnMobile(false);
  };

  const handleAttach = (file) => {
    setAttachments((prev) => [...prev, file]);
  };

  const handleSend = () => {
    if (!newMessage.trim() && attachments.length === 0) return;

    setActiveChat((prev) => ({
      ...prev,
      messages: [
        ...prev.messages,
        {
          from: "user",
          text: newMessage,
          time: new Date().toLocaleTimeString(),
          attachments: attachments,
        },
      ],
    }));

    setNewMessage("");
    setAttachments([]);
  };

  return (
    <div className="bg-pageBackground p-5">
      <div className="hidden md:block">
        <h2 className="text-xl font-bold text-text">Messages</h2>
        <p className="text-sm text-text opacity-60 mt-2 mb-5">
          Chat with your healthcare providers
        </p>
      </div>
      <div className="h-[calc(100vh-80px)] grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
        <div
          className={`h-full w-full transition-all duration-300 ${
            showChatOnMobile ? "hidden md:block" : "col-span-1"
          } md:col-span-1`}
        >
          <Card padding="sm" parentClass="h-full">
            <ConversationList
              conversations={conversations}
              activeChat={activeChat}
              onSelect={handleSelectChat}
            />
          </Card>
        </div>
        <div
          className={`h-full flex flex-col w-full transition-all duration-300 ${
            !showChatOnMobile ? "hidden md:flex" : "col-span-1"
          } md:col-span-3`}
        >
          {activeChat && (
            <Card padding="none" parentClass="h-full flex flex-col">
              <ChatHeader
                chat={activeChat}
                onBack={handleBackToList}
                showBackButton={true}
              />
              <ChatMessages messages={activeChat.messages} />
              <ChatInput
                value={newMessage}
                onChange={setNewMessage}
                onSend={handleSend}
                onAttach={handleAttach}
              />
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommonMessages;
