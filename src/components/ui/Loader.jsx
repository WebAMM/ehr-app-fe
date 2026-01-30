import React from "react";
import { PuffLoader } from "react-spinners";

export function LoaderCenter({ size = 50 }) {
  const override = {
    display: "block",
    margin: "0 auto",
  };
  return (
    <div className="text-align-center">
      <PuffLoader loading={true} cssOverride={override} size={size} />
    </div>
  );
}

export function LoaderRight() {
  const override = {
    display: "block",
    marginLeft: "auto",
  };
  return <PuffLoader loading={true} cssOverride={override} size={50} />;
}

export function LoaderLeft() {
  const override = {
    display: "block",
    marginRight: "auto",
  };
  return <PuffLoader loading={true} cssOverride={override} size={50} />;
}

export function LoaderTable() {
  const override = {
    display: "block",
    margin: "0 auto",
  };
  return (
    <div>
      <PuffLoader loading={true} cssOverride={override} size={40} />
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
      <PuffLoader loading={true} cssOverride={override} size={50} />
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
        <PuffLoader loading={true} size={size} />
      </div>
    </div>
  );
}
