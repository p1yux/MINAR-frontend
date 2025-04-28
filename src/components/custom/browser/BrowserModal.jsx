// "use client";

// import React, { useRef, useEffect } from "react";
// import useBrowserSession from "@/hooks/browser/useBrowserSession";

// const BrowserModal = ({ isOpen, onClose, initialUrl }) => {
//   const browserStreamRef = useRef(null);
//   const {
//     isLoading,
//     isConnected,
//     streamImage,
//     error,
//     startSession,
//     stopSession,
//     sendMouseClick,
//     sendKeyboardEvent
//   } = useBrowserSession();

//   // Start session when modal opens
//   useEffect(() => {
//     if (isOpen && !isConnected) {
//       startSession(initialUrl);
//     }
    
//     // Clean up when component unmounts or modal closes
//     return () => {
//       if (isConnected) {
//         stopSession();
//       }
//     };
//   }, [isOpen, initialUrl]);

//   // Handle mouse click on the browser stream
//   const handleStreamClick = (e) => {
//     if (!isConnected) return;

//     const rect = e.target.getBoundingClientRect();
//     const clickX = e.clientX - rect.left;
//     const clickY = e.clientY - rect.top;
    
//     // Calculate scaled coordinates
//     const scaleX = e.target.naturalWidth / rect.width;
//     const scaleY = e.target.naturalHeight / rect.height;
    
//     const x = clickX * scaleX;
//     const y = clickY * scaleY;
    
//     // Send click event to the WebSocket
//     sendMouseClick(Math.round(x), Math.round(y));
//   };

//   // Handle keyboard events on the browser stream
//   const handleKeyDown = (e) => {
//     if (!isConnected) return;
//     sendKeyboardEvent(e.key);
//     e.preventDefault();
//   };

//   // Close the modal and stop the session
//   const handleClose = async () => {
//     await stopSession();
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
//       <div className="relative bg-white rounded-lg w-[90%] max-w-5xl max-h-[90vh] flex flex-col">
//         <div className="flex items-center justify-between p-4 border-b">
//           <h3 className="text-xl font-semibold text-gray-900">
//             Interactive Browser
//           </h3>
//           <button
//             type="button"
//             className="text-gray-600 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 ml-auto inline-flex items-center"
//             onClick={handleClose}
//             aria-label="Close browser"
//           >
//             <svg
//               className="w-5 h-5"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </button>
//         </div>

//         <div className="flex-1 overflow-hidden p-4">
//           {isLoading && !streamImage && (
//             <div className="flex items-center justify-center h-full">
//               <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full"></div>
//               <span className="ml-2 text-gray-600">Loading browser session...</span>
//             </div>
//           )}

//           {error && (
//             <div className="flex items-center justify-center h-full">
//               <div className="text-red-500 text-center">
//                 <p className="mb-2">Error: {error}</p>
//                 <button
//                   className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
//                   onClick={() => startSession(initialUrl)}
//                 >
//                   Retry
//                 </button>
//               </div>
//             </div>
//           )}

//           {streamImage && (
//             <div className="h-full flex items-center justify-center">
//               <img
//                 ref={browserStreamRef}
//                 src={streamImage}
//                 alt="Browser stream"
//                 className="max-w-full max-h-full object-contain border rounded-md shadow-lg"
//                 onClick={handleStreamClick}
//                 onKeyDown={handleKeyDown}
//                 tabIndex={0}
//                 style={{ cursor: "pointer" }}
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BrowserModal; 


// "use client";

// import React, { useRef, useEffect } from "react";
// import useBrowserSession from "@/hooks/browser/useBrowserSession";

// const BrowserModal = ({ isOpen, onClose, initialUrl }) => {
//   const browserStreamRef = useRef(null);
//   const sessionStartedRef = useRef(false);
//   const {
//     isLoading,
//     isConnected,
//     streamImage,
//     error,
//     startSession,
//     stopSession,
//     sendMouseClick,
//     sendKeyboardEvent
//   } = useBrowserSession();

//   // Start session when modal opens - using ref to prevent multiple calls
//   useEffect(() => {
//     if (isOpen && !isConnected && !sessionStartedRef.current) {
//       sessionStartedRef.current = true;
//       startSession(initialUrl).catch(err => {
//         console.error("Failed to start browser session:", err);
//         sessionStartedRef.current = false; // Reset in case we need to retry
//       });
//     }
    
//     // Clean up when component unmounts or modal closes
//     return () => {
//       if (isConnected) {
//         stopSession().catch(err => {
//           console.error("Failed to stop browser session:", err);
//         });
//       }
//       // Don't reset sessionStartedRef here as it would cause a new session on re-render
//     };
//   }, [isOpen, initialUrl, isConnected]);

//   // Focus the image element when stream is ready
//   useEffect(() => {
//     if (streamImage && browserStreamRef.current) {
//       browserStreamRef.current.focus();
//     }
//   }, [streamImage]);

//   // Handle mouse click on the browser stream
//   const handleStreamClick = (e) => {
//     if (!isConnected) return;

//     const rect = e.target.getBoundingClientRect();
//     const clickX = e.clientX - rect.left;
//     const clickY = e.clientY - rect.top;
    
//     // Calculate scaled coordinates
//     const scaleX = e.target.naturalWidth / rect.width;
//     const scaleY = e.target.naturalHeight / rect.height;
    
//     const x = clickX * scaleX;
//     const y = clickY * scaleY;
    
//     // Send click event to the WebSocket
//     sendMouseClick(Math.round(x), Math.round(y));
    
//     // Focus the element after click for keyboard events
//     e.target.focus();
//   };

//   // Handle keyboard events on the browser stream
//   const handleKeyDown = (e) => {
//     if (!isConnected) return;
//     sendKeyboardEvent(e.key);
//     e.preventDefault();
//   };

//   // Close the modal and stop the session
//   const handleClose = async () => {
//     try {
//       await stopSession();
//     } catch (err) {
//       console.error("Error stopping session:", err);
//     } finally {
//       sessionStartedRef.current = false; // Reset for next open
//       onClose();
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
//       <div className="relative bg-white rounded-lg w-[90%] max-w-5xl max-h-[90vh] flex flex-col">
//         <div className="flex items-center justify-between p-4 border-b">
//           <h3 className="text-xl font-semibold text-gray-900">
//             Interactive Browser
//           </h3>
//           <button
//             type="button"
//             className="text-gray-600 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 ml-auto inline-flex items-center"
//             onClick={handleClose}
//             aria-label="Close browser"
//           >
//             <svg
//               className="w-5 h-5"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </button>
//         </div>

//         <div className="flex-1 overflow-hidden p-4">
//           {isLoading && !streamImage && (
//             <div className="flex items-center justify-center h-full">
//               <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full"></div>
//               <span className="ml-2 text-gray-600">Loading browser session...</span>
//             </div>
//           )}

//           {error && (
//             <div className="flex items-center justify-center h-full">
//               <div className="text-red-500 text-center">
//                 <p className="mb-2">Error: {error}</p>
//                 <button
//                   className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
//                   onClick={() => {
//                     sessionStartedRef.current = false; // Reset flag before retry
//                     startSession(initialUrl);
//                   }}
//                 >
//                   Retry
//                 </button>
//               </div>
//             </div>
//           )}

//           {streamImage && (
//             <div className="h-full flex items-center justify-center">
//               <img
//                 ref={browserStreamRef}
//                 src={streamImage}
//                 alt="Browser stream"
//                 className="max-w-full max-h-full object-contain border rounded-md shadow-lg"
//                 onClick={handleStreamClick}
//                 onKeyDown={handleKeyDown}
//                 tabIndex={0}
//                 style={{ cursor: "pointer" }}
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BrowserModal;


"use client";

import React, { useRef, useEffect } from "react";
import useBrowserSession from "@/hooks/browser/useBrowserSession";

const BrowserModal = ({ isOpen, onClose, initialUrl }) => {
  const browserStreamRef = useRef(null);
  const sessionStartedRef = useRef(false);
  const {
    isLoading,
    isConnected,
    streamImage,
    error,
    startSession,
    stopSession,
    sendMouseClick,
    sendKeyboardEvent
  } = useBrowserSession();

  // Start session when modal opens - only run once
  useEffect(() => {
    // Only start a session when the modal first opens
    if (isOpen && !sessionStartedRef.current) {
      sessionStartedRef.current = true;
      startSession(initialUrl).catch(err => {
        console.error("Failed to start browser session:", err);
        sessionStartedRef.current = false; // Reset in case we need to retry
      });
    }
    
    // Only clean up when the modal actually closes, not on every render
    return () => {
      if (!isOpen && sessionStartedRef.current) {
        stopSession().catch(err => {
          console.error("Failed to stop browser session:", err);
        });
        sessionStartedRef.current = false;
      }
    };
  }, [isOpen, initialUrl]);

  // Focus the image element when stream is ready
  useEffect(() => {
    if (streamImage && browserStreamRef.current) {
      browserStreamRef.current.focus();
    }
  }, [streamImage]);

  // Handle mouse click on the browser stream
  const handleStreamClick = (e) => {
    // if (!isConnected) return;

    const rect = e.target.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    
    // Calculate scaled coordinates
    const scaleX = e.target.naturalWidth / rect.width;
    const scaleY = e.target.naturalHeight / rect.height;
    
    const x = clickX * scaleX;
    const y = clickY * scaleY;
    
    // Send click event to the WebSocket
    sendMouseClick(Math.round(x), Math.round(y));
    
    // Focus the element after click for keyboard events
    e.target.focus();
  };

  // Handle keyboard events on the browser stream
  const handleKeyDown = (e) => {
    // if (!isConnected) return;
    sendKeyboardEvent(e.key);
    e.preventDefault();
  };

  // Close the modal and stop the session
  const handleClose = async () => {
    try {
      await stopSession();
    } catch (err) {
      console.error("Error stopping session:", err);
    } finally {
      sessionStartedRef.current = false; // Reset for next open
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="relative bg-white rounded-lg w-[90%] max-w-5xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-xl font-semibold text-gray-900">
            Interactive Browser {isConnected ? "(Connected)" : ""}
          </h3>
          <button
            type="button"
            className="text-gray-600 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 ml-auto inline-flex items-center"
            onClick={handleClose}
            aria-label="Close browser"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
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

        <div className="flex-1 overflow-hidden p-4">
          {isLoading && !streamImage && (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full"></div>
              <span className="ml-2 text-gray-600">Loading browser session...</span>
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center h-full">
              <div className="text-red-500 text-center">
                <p className="mb-2">Error: {error}</p>
                <button
                  className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
                  onClick={() => {
                    sessionStartedRef.current = false; // Reset flag before retry
                    startSession(initialUrl);
                  }}
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {streamImage && (
            <div className="h-full flex items-center justify-center">
              <img
                ref={browserStreamRef}
                src={streamImage}
                alt="Browser stream"
                className="max-w-full max-h-full object-contain border rounded-md shadow-lg"
                onClick={handleStreamClick}
                onKeyDown={handleKeyDown}
                tabIndex={0}
                style={{ cursor: "pointer" }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowserModal;