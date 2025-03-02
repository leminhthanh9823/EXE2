import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import "tailwindcss/tailwind.css";
import Header from "../components/header/header";

const socket = io("http://localhost:5000"); // Ensure this matches your server URL

const Realtimechat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [userName, setUserName] = useState(""); // Add state for user name

  useEffect(() => {
    // Fetch the current user's information
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/me"); // Adjust the endpoint as needed
        setUserName(response.data.name);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    // Fetch chat messages from the server
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/chat/messages"
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchUser();
    fetchMessages();

    socket.on("message", (data) => {
      console.log("Received message:", data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && userName.trim()) {
      const data = { userName, message };
      console.log("Sending message:", data);
      socket.emit("message", data);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col w-full h-screen bg-gray-100">
      <div className="overflow-y-auto bg-white shadow rounded p-4 mb-4 max-w-4xl mx-auto w-full">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`my-2 ${
              msg.userName === userName ? "text-right" : "text-left"
            }`}
          >
            <div className="font-bold mb-1">{msg.userName}</div>
            <div
              className={`inline-block p-4 rounded shadow ${
                msg.userName === userName ? "bg-green-100" : "bg-white"
              }`}
            >
              {msg.message}
            </div>
          </div>
        ))}
      </div>
      <form
        onSubmit={sendMessage}
        className="flex p-4 bg-white shadow mb-4 max-w-4xl mx-auto w-full"
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Send
        </button>
      </form>
    </div>
  );
};

export default Realtimechat;
