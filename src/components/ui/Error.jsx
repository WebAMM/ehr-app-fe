import React from "react";

const Error = ({ error, refetch, message }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-red-800 mb-2">
          Error while Loading
        </h3>
        <p className="text-red-600 mb-4">{message || error?.message}</p>
        <button
          onClick={() => refetch()}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default Error;
