import React, { useEffect, useCallback, memo } from "react";
import { createPortal } from "react-dom";

const Modal = memo(
  ({
    isOpen,
    onClose,
    title,
    children,
    size = "md",
    className = "",
    showButtons = false,
    primaryButton = { text: "OK", onClick: onClose },
    secondaryButton = { text: "Cancel", onClick: onClose },
  }) => {
    const handleEscape = useCallback(
      (e) => {
        if (e.key === "Escape") onClose();
      },
      [onClose],
    );

    useEffect(() => {
      if (isOpen) {
        document.addEventListener("keydown", handleEscape);
        document.body.style.overflow = "hidden";
      }
      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.body.style.overflow = "unset";
      };
    }, [isOpen, handleEscape]);

    const handleBackdropClick = useCallback(
      (e) => {
        if (e.target === e.currentTarget) onClose();
      },
      [onClose],
    );

    if (!isOpen) return null;

    const sizeClasses = {
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-2xl",
      xl: "max-w-4xl",
    };

    return createPortal(
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 "
        onClick={handleBackdropClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div
          className={`bg-bg border border-border rounded-lg py-5 shadow-lg p-6 w-full mx-4 relative ${sizeClasses[size]} ${className} max-h-[80vh] overflow-y-auto`}
        >
          {title && (
            <h2
              id="modal-title"
              className="text-lg font-semibold text-text mb-4"
            >
              {title}
            </h2>
          )}
          <div className="text-text mb-6">{children}</div>
          {showButtons && (
            <div className="flex justify-end gap-3">
              {secondaryButton && (
                <button
                  onClick={secondaryButton.onClick}
                  className="px-4 py-2 text-text border border-border rounded hover:bg-border"
                >
                  {secondaryButton.text}
                </button>
              )}
              {primaryButton && (
                <button
                  onClick={primaryButton.onClick}
                  className="px-4 py-2 bg-secondary text-text-light rounded hover:bg-secondary-dark"
                >
                  {primaryButton.text}
                </button>
              )}
            </div>
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Close modal"
            title="Close modal"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>,
      document.body,
    );
  },
);

Modal.displayName = "Modal";

export default Modal;
