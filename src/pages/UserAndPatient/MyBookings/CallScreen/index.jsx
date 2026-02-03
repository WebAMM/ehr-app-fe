import React, { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaVideo,
  FaMicrophone,
  FaPhoneSlash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CallScreenPage = () => {
  const [seconds, setSeconds] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = () => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs} mins`;
  };

  return (
    <div className="relative h-[calc(100vh-110px)] w-full bg-black overflow-hidden ">
      <img
        src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5"
        alt="Call background"
        className="absolute inset-0 w-full h-full object-cover opacity-90"
      />
      <div className="absolute inset-0 bg-black/30 " />
      <div
        className="absolute top-4 left-4 z-10 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <button className="text-white opacity-80 hover:opacity-100">
          <FaArrowLeft size={20} />
        </button>
      </div>

      <div className="absolute bottom-24 right-6 z-10">
        <div className="w-32 h-40 rounded-xl overflow-hidden border border-white/30 shadow-lg">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Doctor"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="absolute bottom-36 left-1/2 -translate-x-1/2 z-10 text-center text-white">
        <p className="text-sm font-medium opacity-90">{formatTime()}</p>
        <p className="text-xs opacity-70 mt-1">Audio Recording is Active...</p>
      </div>
      {/* Bottom Controls */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-6">
        {/* Camera */}
        <button className="w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition">
          <FaVideo size={18} />
        </button>

        {/* End Call */}
        <button className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition">
          <FaPhoneSlash size={20} />
        </button>

        {/* Mic */}
        <button className="w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition">
          <FaMicrophone size={18} />
        </button>
      </div>
    </div>
  );
};

export default CallScreenPage;
