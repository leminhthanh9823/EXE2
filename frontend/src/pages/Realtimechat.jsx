import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import "tailwindcss/tailwind.css";

const socket = io("http://localhost:5000");

const Realtimechat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [userName, setUserName] = useState("");
  const [selectedUser, setSelectedUser] = useState("Admin");
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/chat/messages"
      );
      setMessages(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching messages:", error);
      setMessages([]);
    }
  };

  const fetchChatBotMessages = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/chatbot/all-chats",
        {
          params: { userId: user._id },
        }
      );
      setMessages(Array.isArray(response.data.chats) ? response.data.chats : []);
    } catch (error) {
      console.error("Error fetching chatbot messages:", error);
      setMessages([]);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/me");
        setUserName(response.data.name);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

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
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      if (selectedUser === "chatbot") {
        // Nếu chọn chatbot, gọi API chatbot
        try {
          const response = await axios.post(
            "http://localhost:5000/api/chatbot/new",
            {
              userId: user._id,
              message: message,
            }
          );
          const botReply = {
            userName: "Chatbot",
            message: response.data.reply,
          };
          setMessages((prevMessages) => [
            ...prevMessages,
            { userName, message },
            botReply,
          ]);
        } catch (error) {
          console.error("Lỗi khi gửi tin nhắn đến chatbot:", error);
        }
      } else {
        const data = { userName, message, to: selectedUser };
        try {
          const response = await axios.post(
            "http://localhost:5000/api/chat/messages",
            data
          );
          socket.emit("message", response.data);
          setMessage("");
        } catch (error) {
          console.error("Lỗi khi gửi tin nhắn:", error);
        }
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/4 p-4 bg-white shadow-lg">
        <h2 className="text-lg font-bold mb-4">Mục trò chuyện</h2>
        <ul>
          <li
            className="cursor-pointer p-2 mb-2 border rounded hover:bg-gray-200"
            onClick={() => {
              setSelectedUser("Admin");
              setMessages([]);
              fetchMessages();
            }}
          >
            Chuyên gia hỗ trợ thực đơn
          </li>
          <li
            className="cursor-pointer p-2 mb-2 border rounded hover:bg-gray-200"
            onClick={() => {
              setSelectedUser("chatbot");
              setMessages([]);
              fetchChatBotMessages();
              console.log("Chatbot selected", messages);
            }}
          >
            Trò chuyện với chatbot
          </li>
        </ul>
      </div>
      <div className="w-3/4 h-3/4 p-4 bg-white shadow-lg flex flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          {selectedUser === "Admin" &&
            messages.map((msg, index) => (
              <div
                key={index}
                className={`my-2 ${
                  msg.userName === userName ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`font-bold mb-1 `}
                >
                  {msg.userName}
                </div>
                <div
                  className={`inline-block p-3 rounded shadow ${
                    msg.userName === userName
                      ? "bg-green-100"
                      : msg.userName === "Chatbot"
                      ? "bg-blue-200"
                      : "bg-gray-200"
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            ))}

          {selectedUser === "chatbot" &&
            messages.map((msg, index) => (
              <div key={index} className={`my-2 ${
                  msg.role === 'user' ? "text-right" : "text-left"
                }`}>
                <div className={`font-bold mb-1 `}>{msg.role === "assistant" ? "Chatbot": user.name}</div>
                <div className={`inline-block p-3 rounded shadow `}>{msg.content}</div>
              </div>
            ))}
        </div>

        <form onSubmit={sendMessage} className="flex p-4 bg-gray-50">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Nhập tin nhắn..."
            className="flex-1 p-2 border rounded mr-2"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Gửi
          </button>
        </form>
      </div>
    </div>
  );
};

export default Realtimechat;
