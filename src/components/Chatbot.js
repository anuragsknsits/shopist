import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessageRequest } from "../redux/actions/chatBotActions";

const Chatbot = () => {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const dispatch = useDispatch();
    const messages = useSelector((state) => state.chatbot.messages);

    const sendMessage = () => {
        if (input.trim() === "") return;
        dispatch(sendMessageRequest(input));
        setInput("");
    };

    // Handle Enter Key Press
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            sendMessage();
        }
    };

    return (
        <div className="fixed bottom-4 right-4">
            <button onClick={() => setOpen(!open)} className="bg-blue-600 text-white p-3 rounded-full shadow-lg">
                💬 Chat
            </button>

            {open && (
                <div className="bg-white w-80 p-4 rounded-lg shadow-lg border">
                    <div className="flex justify-between items-center border-b pb-2">
                        <h3 className="text-lg font-bold">Chat Support</h3>
                        <button onClick={() => setOpen(false)} className="text-red-500">✖</button>
                    </div>

                    <div className="h-60 overflow-y-auto mt-2 space-y-2">
                        {messages.map((msg, index) => (
                            <div key={index} className={`p-2 rounded-lg ${msg.sender === "bot" ? "bg-gray-200 text-left" : "bg-blue-500 text-white text-right"}`}>
                                {msg.text}
                            </div>
                        ))}
                    </div>

                    <div className="flex mt-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}  // Press Enter to send message
                            className="border p-2 flex-1 rounded-l-lg"
                            placeholder="Type a message..."
                        />
                        <button onClick={sendMessage} className="bg-blue-600 text-white px-4 rounded-r-lg">➤</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
