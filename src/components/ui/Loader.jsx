import React from "react";

const puffStyles = `
@keyframes puff {
  0%, 80%, 100% {
    opacity: 0.5;
    transform: scale(0.5);
  }
  40% {
    opacity: 1;
    transform: scale(1);
  }
}
`;

function CustomPuffLoader({ size = 50, color = "#000", style = {} }) {
  const puffSize = size * 0.25;
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: puffStyles }} />
      <div
        style={{ position: "relative", width: size, height: size, ...style }}
      >
        <div
          style={{
            position: "absolute",
            width: puffSize,
            height: puffSize,
            background: color,
            borderRadius: "50%",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            animation: "puff 1.5s ease-in-out infinite",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            width: puffSize,
            height: puffSize,
            background: color,
            borderRadius: "50%",
            top: "50%",
            right: 0,
            transform: "translateY(-50%)",
            animation: "puff 1.5s ease-in-out infinite 0.3s",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            width: puffSize,
            height: puffSize,
            background: color,
            borderRadius: "50%",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            animation: "puff 1.5s ease-in-out infinite 0.6s",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            width: puffSize,
            height: puffSize,
            background: color,
            borderRadius: "50%",
            top: "50%",
            left: 0,
            transform: "translateY(-50%)",
            animation: "puff 1.5s ease-in-out infinite 0.9s",
          }}
        ></div>
      </div>
    </>
  );
}

export function LoaderCenter({ size = 50 }) {
  const override = {
    display: "block",
    margin: "0 auto",
  };
  return (
    <div className="text-align-center">
      <CustomPuffLoader size={size} style={override} />
    </div>
  );
}

export function LoaderRight() {
  const override = {
    display: "block",
    marginLeft: "auto",
  };
  return <CustomPuffLoader size={50} style={override} />;
}

export function LoaderLeft() {
  const override = {
    display: "block",
    marginRight: "auto",
  };
  return <CustomPuffLoader size={50} style={override} />;
}

export function LoaderTable() {
  const override = {
    display: "block",
    margin: "0 auto",
  };
  return (
    <div>
      <CustomPuffLoader size={40} style={override} />
    </div>
  );
}

export function Loader1() {
  const override = {
    display: "block",
    margin: "0 auto",
    color: "#fff",
  };
  return (
    <div className="text-align-center loader_white">
      <CustomPuffLoader size={50} color="#fff" style={override} />
    </div>
  );
}

export function LoaderPageWithoutBG() {
  return (
    <div className="loader-body-without-Bg">
      <div className="fond">
        <div className="contener_general">
          <div className="contener_mixte">
            <div className="ballcolor ball_1">&nbsp;</div>
          </div>
          <div className="contener_mixte">
            <div className="ballcolor ball_2">&nbsp;</div>
          </div>
          <div className="contener_mixte">
            <div className="ballcolor ball_3">&nbsp;</div>
          </div>
          <div className="contener_mixte">
            <div className="ballcolor ball_4">&nbsp;</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LoaderFullPage({ size = 60, background = "white" }) {
  const style = { backgroundColor: background };
  return (
    <div
      style={style}
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-live="polite"
    >
      <div className="text-center">
        <CustomPuffLoader size={size} />
      </div>
    </div>
  );
}

export const FaqSkeleton = () => (
  <div className="animate-pulse space-y-4">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex items-center gap-3">
        <div className="h-4 w-16 bg-border rounded" />
        <div className="h-4 flex-1 bg-border rounded" />
      </div>
    ))}
  </div>
);
