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
        document.body.style.overflow = "hidden"; // Prevent scroll
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
      lg: "max-w-lg",
    };

    return createPortal(
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        onClick={handleBackdropClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div
          className={`bg-bg border border-border rounded-lg shadow-lg p-6 w-full mx-4 ${sizeClasses[size]} ${className}`}
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
                  className="px-4 py-2 bg-primary text-text-light rounded hover:bg-primary-dark"
                >
                  {primaryButton.text}
                </button>
              )}
            </div>
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-text hover:text-primary"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>
      </div>,
      document.body,
    );
  },
);

Modal.displayName = "Modal";

export default Modal;
