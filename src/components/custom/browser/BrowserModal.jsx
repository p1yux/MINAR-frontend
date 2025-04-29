
"use client";

import React, { useRef, useEffect } from "react";
import useBrowserSession from "@/hooks/browser/useBrowserSession";

const BrowserModal = ({ isOpen, onClose, initialUrl }) => {
  const canvasRef = useRef(null);
  const sessionStartedRef = useRef(false);

  const {
    isLoading,
    isConnected,
    imageBitmap,
    error,
    startSession,
    stopSession,
    sendMouseClick,
    sendKeyboardEvent,
    sendWheel,
  } = useBrowserSession();

  // open/close session
  useEffect(() => {
    if (isOpen && !sessionStartedRef.current) {
      sessionStartedRef.current = true;
      startSession(initialUrl).catch(() => {
        sessionStartedRef.current = false;
      });
    }
    if (!isOpen && sessionStartedRef.current) {
      stopSession().finally(() => {
        sessionStartedRef.current = false;
      });
    }
  }, [isOpen, initialUrl, startSession, stopSession]);

  // draw each new frame
  useEffect(() => {
    if (!imageBitmap || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // resize canvas to match stream
    canvas.width = imageBitmap.width;
    canvas.height = imageBitmap.height;

    // draw
    ctx.drawImage(imageBitmap, 0, 0);
    canvas.focus();
  }, [imageBitmap]);

  const handleClick = (e) => {
    if (!canvasRef.current || !isConnected) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * canvasRef.current.width;
    const y = ((e.clientY - rect.top) / rect.height) * canvasRef.current.height;
    sendMouseClick(Math.round(x), Math.round(y));
    canvasRef.current.focus();
  };

  const handleKeyDown = (e) => {
    if (!isConnected) return;
    sendKeyboardEvent(e.key);
    e.preventDefault();
  };

  const handleWheel = (e) => {
    if (!canvasRef.current || !isConnected) return;
    e.preventDefault();
    // send scroll deltas
    sendWheel(e.deltaX, e.deltaY);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="relative bg-white rounded-sm w-[90%] max-w-5xl max-h-[90vh] flex flex-col">
        {/* header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-xl font-semibold text-gray-900">
            Interactive Browser {isConnected && "(Connected)"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-600 p-1.5 hover:bg-gray-200 rounded-lg"
            aria-label="Close browser"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* body */}
        <div className="relative flex-1 overflow-hidden p-4">
          {isLoading && !imageBitmap && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full" />
              <span className="ml-2 text-gray-600">Loading...</span>
            </div>
          )}
          {error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-red-500">
              <p className="mb-2">Error: {error}</p>
              <button
                className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
                onClick={() => startSession(initialUrl)}
              >
                Retry
              </button>
            </div>
          )}
          {/* canvas for super-fast rendering */}
          <canvas
            ref={canvasRef}
            className="max-w-full max-h-full object-contain border rounded-md shadow-lg cursor-pointer"
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            onWheel={handleWheel}
            tabIndex={0}
          />
        </div>
      </div>
    </div>
  );
};

export default BrowserModal;