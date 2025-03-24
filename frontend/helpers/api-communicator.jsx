import axios from "axios";

export const sendChatRequest = async (message) => {
  const res = await axios.post("http://localhost:5000/api/chatbot/new", {
    message,
  });
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await res.data;
  return data;
};

export const getUserChats = async () => {
  const res = await axios.get("http://localhost:5000/api/chatbot/all-chats");
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await res.data;
  return data;
};
