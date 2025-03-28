import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import "tailwindcss/tailwind.css";

const socket = io("http://localhost:5000"); // Cấu hình đúng server

const AdminChat = () => {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [userName, setUserName] = useState("Admin");
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/chat/messages"
        );
        setChats(response.data);
        const uniqueUsers = [
          ...new Set(response.data.map((chat) => chat.userName)),
        ];
        setUsers(uniqueUsers);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChats();

    socket.on("message", (data) => {
      setChats((prevChats) => [...prevChats, data]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() && selectedUser) {
      const data = { userName, message, to: selectedUser };
      try {
        await axios.post("http://localhost:5000/api/chat/messages", data);
        setMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  // Gửi thông tin khách hàng
  const sendCustomerInfo = async () => {
    console.log("Gửi thông tin khách hàng ", selectedUser);

    if (!selectedUser) return;
    try {
      await axios.post("http://localhost:5000/api/chat/sendCustomerInfo", {
        to: selectedUser,
      });
    } catch (error) {
      console.error("Error sending customer info:", error);
    }
  };

  const filteredChats = selectedUser
    ? chats.filter(
        (chat) =>
          (chat.userName === selectedUser && chat.to === userName) ||
          (chat.userName === userName && chat.to === selectedUser)
      )
    : [];

  return (
    <div className="flex flex-col w-full h-screen bg-gray-100">
      <div className="overflow-y-auto p-4 mb-4 max-w-6xl mx-auto w-full">
        <div className="flex">
          <div className="w-1/4 p-4 bg-white shadow rounded">
            <h2 className="text-lg font-bold mb-4">Users</h2>
            <ul>
              {users
                .filter((user) => user !== "Admin")
                .map((user, index) => (
                  <li
                    key={index}
                    className="cursor-pointer p-2 mb-2 border rounded hover:bg-gray-200"
                    onClick={() => setSelectedUser(user)}
                  >
                    {user}
                  </li>
                ))}
            </ul>
          </div>
          <div className="w-3/4 p-4 bg-white shadow rounded mb-4 ml-4">
            <h2 className="text-lg font-bold mb-4">Chat với {selectedUser}</h2>
            {filteredChats.map((chat, index) => (
              <div
                key={index}
                className={`my-2 ${
                  chat.userName === userName ? "text-right" : "text-left"
                }`}
              >
                <div className="font-bold mb-1">{chat.userName}</div>
                <div style={{ whiteSpace: "pre-line" , textAlign: "left" }}
                  className={`inline-block p-4 rounded shadow ${
                    chat.userName === userName ? "bg-green-100" : "bg-white"
                  }`}
                >
                  {chat.message}
                </div>
              </div>
            ))}
            {/* Nút gửi thông tin khách hàng */}
            {selectedUser && (
              <button
                onClick={sendCustomerInfo}
                className="bg-gray-500 text-white p-2 rounded mt-2"
              >
                Gửi thông tin khách hàng
              </button>
            )}
          </div>
        </div>
      </div>
      <form
        onSubmit={sendMessage}
        className="flex p-4 bg-white shadow max-w-4xl mx-auto w-full"
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

export default AdminChat;
