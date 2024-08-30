import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  useChatInteract,
  useChatMessages,
  IStep,
} from "@chainlit/react-client";
import { useState } from "react";
import DeployContract from "@/pwr/DeployContract";

export function Playground() {
  const [inputValue, setInputValue] = useState("");
  const [inputDisabled, setInputDisabled] = useState<boolean>(false);
  const { sendMessage } = useChatInteract();
  const { messages } = useChatMessages();


  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit on Enter key press
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault() // Prevent new line in textarea
      handleSendMessage()
    }
  }

  const handleSendMessage = () => {
    setInputDisabled(true)
    const content = inputValue.trim();
    if (content) {
      const message = {
        name: "user",
        type: "user_message" as const,
        output: content,
      };
      sendMessage(message, []);
      setInputValue("");
      setInputDisabled(false)
    }
  };

  const renderMessage = (message: IStep) => {
    const dateOptions: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
    };
    const date = new Date(message.createdAt).toLocaleTimeString(
      undefined,
      dateOptions
    );
    return (
      <div key={message.id} className="flex items-start space-x-2">
        <div className="w-20 text-sm text-green-500">{message.name}</div>
        <div className="flex-1 bg-zinc-800 text-white rounded-lg p-2 break-words">
          {/* //TODO: Ye set thk se laga lena kahi, make it conditional if not user then only render this*/}
          <div className="float-right">
            <DeployContract />
          </div>
          <p>{message.output}</p>
          <small className="text-xs">{date}</small>
        </div>

      </div>
    );
  };

  return (
    <div className="bg-[#2d2d30] w-screen h-screen flex flex-col mb-12">
      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-4">
          {messages.map((message) => renderMessage(message))}
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0">
        <div className="max-w-screen-lg m-auto w-full p-4 flex space-x-4 justify-center items-center" >
          <textarea
            rows={2}
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={inputDisabled}
            placeholder="Type a message..."
            className="flex-1 py-2 px-3 rounded-lg border-none focus:outline-none focus:outline-none focus:border-[#3e3e42] bg-[#3e3e42] text-white resize-none"
            style={{
              opacity: inputDisabled ? 0.5 : 1,
              cursor: inputDisabled ? 'not-allowed' : 'auto'
            }}
          ></textarea>
          <button
            onClick={handleSendMessage}
            className="ml-2 bg-[#3e3e42] text-white py-2 px-4 rounded-full"
            style={{
              opacity: inputDisabled ? 0.5 : 1,
              cursor: inputDisabled ? 'not-allowed' : 'auto'
            }}
          >
            Send
          </button>

        </div>
      </div>
    </div>
  );
}
