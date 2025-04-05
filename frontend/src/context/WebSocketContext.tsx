"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

interface WebSocketContextType {
  isConnected: boolean;
  messages: any[];
  startGame: () => Promise<void>;
  nextRound: () => Promise<void>;
  getGameState: () => Promise<void>;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

const WS_URL = 'ws://54.252.233.89:8000/ws';
const API_URL = 'http://54.252.233.89:8000';

export function WebSocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const MAX_RECONNECT_ATTEMPTS = 5;
  const RECONNECT_DELAY = 5000;

  const connect = () => {
    if (socket?.readyState === WebSocket.OPEN) return;

    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      console.log("✅ Connected to WebSocket");
      setIsConnected(true);
      setReconnectAttempts(0);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Received message:", data);
        setMessages(prev => [...prev, data]);
      } catch (e) {
        console.log("📩 Raw message:", event.data);
      }
    };

    ws.onclose = () => {
      console.log("🔌 Disconnected from WebSocket");
      setIsConnected(false);
      setSocket(null);

      if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
        setTimeout(() => {
          setReconnectAttempts(prev => prev + 1);
          connect();
        }, RECONNECT_DELAY);
      }
    };

    ws.onerror = (error) => {
      console.error("⚠️ WebSocket error:", error);
      setIsConnected(false);
    };

    setSocket(ws);
  };

  useEffect(() => {
    connect();
    return () => {
      socket?.close();
    };
  }, []);

  const startGame = async () => {
    try {
      const response = await fetch(`${API_URL}/game/start`, {
        method: "POST",
      });
      const data = await response.json();
      console.log("📤 Start game result:", data);
    } catch (error) {
      console.error("❌ Error starting game:", error);
    }
  };

  const nextRound = async () => {
    try {
      const response = await fetch(`${API_URL}/game/next-round`, {
        method: "POST",
      });
      const data = await response.json();
      console.log("📤 Next round result:", data);
    } catch (error) {
      console.error("❌ Error triggering next round:", error);
    }
  };

  const getGameState = async () => {
    try {
      const response = await fetch(`${API_URL}/game/state`);
      const data = await response.json();
      console.log("📊 Game state:", data);
    } catch (error) {
      console.error("❌ Error fetching game state:", error);
    }
  };

  return (
    <WebSocketContext.Provider value={{
      isConnected,
      messages,
      startGame,
      nextRound,
      getGameState,
    }}>
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocket() {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
} 