"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import axiosInstance from "@/lib/axios";

const BROWSER_URL = process.env.NEXT_PUBLIC_BROWSER_URL;
const WEBSOCKET_URL = process.env.NEXT_PUBLIC_WEBSOCKET_URL;


/**
 * Custom hook to manage browser session with WebSocket connection
 * @returns {Object} Browser session controls and state
 */
export const useBrowserSession = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [streamImage, setStreamImage] = useState(null);
  const [error, setError] = useState(null);
  
  const websocketRef = useRef(null);
  
  // Start a new browser session
  const startSession = async (url) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Close any existing connection
      if (websocketRef.current) {
        websocketRef.current.close();
        websocketRef.current = null;
      }
      
      // Make API request to start a new session using BROWSER_URL
      const response = await fetch(`${BROWSER_URL}/session/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url || "https://www.amazon.in" }),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to start browser session: ${response.status}`);
      }
      
      const data = await response.json();
      const { session_id, user_id, status } = data;
      
      if (status === "Session started" && session_id) {
        setSessionId(session_id);
        setUserId(user_id);
        
        // Connect to WebSocket with session_id
        connectWebSocket(session_id);
        return { session_id, user_id };
      } else {
        throw new Error("Failed to start browser session");
      }
    } catch (err) {
      console.error("Browser session error:", err);
      setError(err.message || "Failed to start browser session");
      toast.error("Failed to start browser session");
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Connect to WebSocket for interactive streaming
  const connectWebSocket = (session_id) => {
    if (!session_id) return;
    
    try {
      const socketUrl = `${WEBSOCKET_URL}/session/${session_id}/stream?mode=interactive`;
      websocketRef.current = new WebSocket(socketUrl);
      
      websocketRef.current.binaryType = 'blob';
      
      websocketRef.current.onopen = () => {
        setIsConnected(true);
        toast.success("Connected to browser session");
      };
      
      websocketRef.current.onclose = () => {
        setIsConnected(false);
      };
      
      websocketRef.current.onerror = (error) => {
        console.error("WebSocket error:", error);
        setError("WebSocket connection error");
        toast.error("WebSocket connection error");
        setIsConnected(false);
      };
      
      websocketRef.current.onmessage = (event) => {
        if (event.data instanceof Blob) {
          const url = URL.createObjectURL(event.data);
          setStreamImage(url);
        }
      };
    } catch (err) {
      console.error("WebSocket connection error:", err);
      setError("Failed to connect to browser session");
      toast.error("Failed to connect to browser session");
    }
  };
  
  // Send mouse click event to the browser
  const sendMouseClick = (x, y) => {
    if (!websocketRef.current || websocketRef.current.readyState !== WebSocket.OPEN) return;
    
    websocketRef.current.send(JSON.stringify({
      type: 'mouse',
      x: Math.round(x),
      y: Math.round(y)
    }));
  };
  
  // Send keyboard event to the browser
  const sendKeyboardEvent = (key) => {
    if (!websocketRef.current || websocketRef.current.readyState !== WebSocket.OPEN) return;
    
    websocketRef.current.send(JSON.stringify({
      type: 'keyboard',
      key: key
    }));
  };
  
  // Stop the browser session
  const stopSession = async () => {
    if (!sessionId) return;
    
    try {
      setIsLoading(true);
      
      // Close WebSocket connection
      if (websocketRef.current) {
        websocketRef.current.close();
        websocketRef.current = null;
      }
      
      // Make API request to stop the session using BROWSER_URL
      const response = await fetch(`${BROWSER_URL}/session/${sessionId}/stop`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`Failed to stop browser session: ${response.status}`);
      }
      
      // Reset state
      setIsConnected(false);
      setSessionId(null);
      setUserId(null);
      setStreamImage(null);
      
      toast.success("Browser session closed");
      return true;
    } catch (err) {
      console.error("Error stopping browser session:", err);
      setError("Failed to stop browser session");
      toast.error("Failed to stop browser session");
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (websocketRef.current) {
        websocketRef.current.close();
        websocketRef.current = null;
      }
      
      // Cleanup created object URLs
      if (streamImage) {
        URL.revokeObjectURL(streamImage);
      }
    };
  }, [streamImage]);
  
  return {
    isLoading,
    isConnected,
    sessionId,
    userId,
    streamImage,
    error,
    startSession,
    stopSession,
    sendMouseClick,
    sendKeyboardEvent
  };
};

export default useBrowserSession; 