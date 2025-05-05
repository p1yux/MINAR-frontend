"use client";

import { useState, useCallback } from "react";
import axios from "axios";
import { toast } from "sonner";

const ASSISTANT_URL = process.env.NEXT_PUBLIC_ASSISTANT_URL;

export const useClassifyRepeatTask = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [classificationData, setClassificationData] = useState(null);
  const [executionData, setExecutionData] = useState(null);
  const [error, setError] = useState(null);

  const classifyTask = useCallback(async (lastSearch, userId, subTask) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(`${ASSISTANT_URL}/classify-repeat-task`, {
        last_search: lastSearch,
        user_id: String(userId),
        task: {
          sub_task: subTask,
          classification_done: false
        }
      });

      if (response.data && response.data.status === "success") {
        setClassificationData(response.data.data);
        return response.data.data;
      } else {
        throw new Error("Failed to classify task");
      }
    } catch (err) {
      console.error("Classification error:", err);
      setError(err.message || "An error occurred during classification");
      toast.error("Failed to classify task");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const executeTask = useCallback(async (currentUrl, userId, taskData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(`${ASSISTANT_URL}/execute-repeat-task`, {
        current_url: currentUrl,
        user_id: String(userId),
        task: taskData
      });

      if (response.data && response.data.status === "success") {
        setExecutionData(response.data.data);
        return response.data;
      } else {
        throw new Error("Failed to execute task");
      }
    } catch (err) {
      console.error("Execution error:", err);
      setError(err.message || "An error occurred during execution");
      toast.error("Failed to execute task");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    classificationData,
    executionData,
    error,
    classifyTask,
    executeTask
  };
};

export default useClassifyRepeatTask;
