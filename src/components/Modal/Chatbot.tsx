import axios from "axios";
import React, { useState } from "react";

interface ChatMessage {
  type: "user" | "bot";
  message: string;
}

const Chatbot = ({ open, onClose, vectorStoreId }: {
  open: boolean,
  onClose: () => void,
  vectorStoreId: string
}) => {
  const [query, setQuery] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [chatHistories, setChatHistories] = useState<ChatMessage[]>([]);

  const getChatbotResponse = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/google-calendar/chatbot/`, {
        query: query,
        vectorStoreId: vectorStoreId
      });

      if (response.status === 200) {
        setChatHistories(prevChatHistories => [
          ...prevChatHistories,
          { type: "bot", message: response.data.response }
        ]);
      }
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      getChatbotResponse();
      setChatHistories([
        ...chatHistories,
        { "type": "user", message: query }
      ]);
      setQuery("");
    }
  };

  return (
    open && (
      <div
        className="fixed left-0 top-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5 cursor-pointer"
        onClick={onClose}
      >
        <div
          className="w-full max-w-142.5 h-[600px] rounded-lg bg-white px-8 py-12 text-center dark:bg-boxdark md:px-5 md:py-10 flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <span className="pb-2 text-xl font-bold text-black dark:text-white sm:text-2xl">Chat with AI</span>
          </div>
          <div className="grow flex flex-col">
            <div className="grow overflow-auto mt-4 flex flex-col gap-2">
              {chatHistories?.map((history, index) => (
                history.type === 'user' ? (
                  <div
                    key={index}
                    className="max-w-[90%] flex px-2 py-2 bg-stroke dark:bg-form-strokedark w-fit justify-start items-center self-start text-left"
                  >
                    <span>{history.message}</span>
                  </div>
                ) : (
                  <div
                    key={index}
                    className="max-w-[90%] flex px-2 py-2 bg-stroke dark:bg-form-strokedark w-fit justify-end items-center self-end text-left"
                  >
                    <span>{history.message}</span>
                  </div>
                )
              ))}
            </div>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Enter your message"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => { setIsFocused(true) }}
                onBlur={() => setIsFocused(false)}
                className={`w-full h-12 rounded-l-lg border-[1.5px] bg-transparent px-5 text-black outline-none transition ${isFocused ? 'border-primary dark:border-primary' : 'border-stroke dark:border-form-strokedark'
                  }  disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                onKeyDown={handleKeyDown}
              />
              <button
                type="button"
                className={`h-12 border-t-[1.5px] border-b-[1.5px] border-r-[1.5px] ${isFocused ? 'border-primary dark:border-primary' : 'border-stroke dark:border-form-strokedark'
                  } text-white rounded-r-lg p-3 flex items-center justify-center`}
                onClick={() => {
                  getChatbotResponse();
                  setChatHistories([
                    ...chatHistories,
                    { type: 'user', message: query },
                  ]);
                  setQuery('');
                }}
              >
                <svg
                  fill="#64748B"
                  viewBox="0 0 495.003 495.003"
                  width="18"
                  height="18"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <g id="XMLID_51_"> <path id="XMLID_53_" d="M164.711,456.687c0,2.966,1.647,5.686,4.266,7.072c2.617,1.385,5.799,1.207,8.245-0.468l55.09-37.616 l-67.6-32.22V456.687z"></path> <path id="XMLID_52_" d="M492.431,32.443c-1.513-1.395-3.466-2.125-5.44-2.125c-1.19,0-2.377,0.264-3.5,0.816L7.905,264.422 c-4.861,2.389-7.937,7.353-7.904,12.783c0.033,5.423,3.161,10.353,8.057,12.689l125.342,59.724l250.62-205.99L164.455,364.414 l156.145,74.4c1.918,0.919,4.012,1.376,6.084,1.376c1.768,0,3.519-0.322,5.186-0.977c3.637-1.438,6.527-4.318,7.97-7.956 L494.436,41.257C495.66,38.188,494.862,34.679,492.431,32.443z"></path>
                    </g>
                  </g>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default Chatbot;