
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { toast } from "sonner";

const BROWSER_URL = process.env.NEXT_PUBLIC_BROWSER_URL;
const WEBSOCKET_URL = process.env.NEXT_PUBLIC_WEBSOCKET_URL;

export const useBrowserSession = () => {
  const [isLoading, setIsLoading]   = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [sessionId, setSessionId]   = useState(null);
  const [imageBitmap, setImageBitmap] = useState(null);
  const [error, setError]           = useState(null);

  const wsRef = useRef(null);
  const prevBitmapRef = useRef(null);

  // cleanup both socket & bitmap
  const cleanUp = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    if (prevBitmapRef.current) {
      prevBitmapRef.current.close();
      prevBitmapRef.current = null;
    }
    setIsConnected(false);
    setImageBitmap(null);
  }, []);

  // start session + ws connect
  const startSession = useCallback(async (url) => {
    setIsLoading(true);
    setError(null);
    cleanUp();

    try {
      const res = await fetch(`${BROWSER_URL}/session/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url || "https://www.amazon.in" }),
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const { session_id } = await res.json();
      setSessionId(session_id);
      connectWs(session_id);
    } catch (err) {
      console.error(err);
      setError(err.message);
      toast.error("Failed to start session");
    } finally {
      setIsLoading(false);
    }
  }, [cleanUp]);

  // open websocket and decode each frame
  const connectWs = (session_id) => {
    const ws = new WebSocket(`${WEBSOCKET_URL}/session/${session_id}/stream?mode=interactive`);
    ws.binaryType = "blob";
    wsRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
      toast.success("Connected!");
    };
    ws.onmessage = async (evt) => {
      if (!(evt.data instanceof Blob)) return;
      // release old bitmap
      if (prevBitmapRef.current) {
        prevBitmapRef.current.close();
      }
      // decode new frame
      const bmp = await createImageBitmap(evt.data);
      prevBitmapRef.current = bmp;
      setImageBitmap(bmp);
    };
    ws.onerror = () => {
      setError("WebSocket error");
      toast.error("WS error");
    };
    ws.onclose = () => {
      setIsConnected(false);
    };
  };

  const sendMouseClick = (x, y) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: "mouse", x, y }));
    }
  };
  const sendKeyboardEvent = (key) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: "keyboard", key }));
    }
  };
  const sendWheel = (deltaX, deltaY) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: "scroll", deltaX, deltaY }));
    }
  };

  const stopSession = useCallback(async () => {
    if (!sessionId) return;
    setIsLoading(true);
    cleanUp();
    try {
      const res = await fetch(`${BROWSER_URL}/session/${sessionId}/stop`, { method: "DELETE" });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      toast.success("Session closed");
    } catch (err) {
      console.error(err);
      setError("Failed to stop session");
      toast.error("Stop error");
    } finally {
      setSessionId(null);
      setIsLoading(false);
    }
  }, [sessionId, cleanUp]);

  // full cleanup on unmount
  useEffect(() => cleanUp, [cleanUp]);

  return {
    isLoading,
    isConnected,
    imageBitmap,
    error,
    startSession,
    stopSession,
    sendMouseClick,
    sendKeyboardEvent,
    sendWheel,
  };
};

export default useBrowserSession;