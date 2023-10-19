"use client";
import React, {useEffect, useState} from "react";
import Swal from "sweetalert2";

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (input.trim() !== "") {
      setMessages([...messages, input]);
      setInput("");
    }
  };

  useEffect(() => {
    Swal.fire({
      title: "Chat App In Progress",
      showClass: {
        popup: "Because of the time limit i unable to complete !!!",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
  }, []);

  return (
      <div className="w-full max-w-md p-4 mx-auto">
        <div className="border rounded-lg overflow-hidden">
          <div className="border-b p-4">
            <h2 className="text-xl font-semibold">Chat App</h2>
          </div>
          <div className="p-4">
            <div className="border rounded-lg p-2 mb-4 h-48 overflow-y-auto">
              {messages.map((message, index) => (
                  <div key={index} className="mb-2">
                    {message}
                  </div>
              ))}
            </div>
            <div className="flex">
              <input
                  type="text"
                  className="w-full rounded-l-lg p-2"
                  placeholder="Type your message..."
                  value={input}
                  onChange={handleInputChange}
              />
              <button
                  className="bg-blue-500 text-white rounded-r-lg p-2"
                  onClick={handleSendMessage}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ChatApp;
