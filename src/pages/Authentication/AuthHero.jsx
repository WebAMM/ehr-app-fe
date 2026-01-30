import React from "react";
import { IMAGES } from "@/assets/images";

const AuthHero = ({ image = IMAGES.BG_AUTH_MAIN }) => {
  return (
    <div className="relative hidden lg:flex items-end justify-center bg-[#00c580] min-h-full">
      <img
        src={image}
        alt="Healthcare professionals"
        className="absolute inset-0 w-full h-full object-cover image-center"
      />
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#0ebe7f]/30 to-black" />

      <div className="relative flex flex-col items-center text-center px-10 pb-16 w-full">
        <h1 className="text-3xl font-bold leading-tight text-white mb-4">
          Schedule <span className="text-[#00c964]">Appointments</span> with
          <br />
          Expert <span className="text-[#00c964]">Doctors</span>
        </h1>
        <p className="text-white/85 text-sm leading-relaxed max-w-md">
          Find experienced specialist doctors with expert ratings and reviews
          and book your appointments hassle-free.
        </p>
        <div className="flex items-center space-x-2 mt-6">
          <span className="w-2 h-2 bg-white/50 rounded-full" />
          <span className="w-8 h-2 bg-[#b4ffd9] rounded-full" />
          <span className="w-2 h-2 bg-white/50 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default AuthHero;
