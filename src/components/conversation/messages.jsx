import React from "react";
import { InputBar } from "../input/inputbar";
import chatbotlogo from "../../.././chatbotLogo.png";
import { AiOutlineUser } from "react-icons/ai";

const Messages = ({
  messages,
  thread_id,
  setRunRefetch,
  getMessagesByThread,
  isMobile,
}) => {
  return (
    <div className="flex flex-col items-center bg-white overflow-scroll p-2 gap-y-4 relative">
      {messages.map((message) => {
        const isAssistant = message.role === "assistant";

        const messageClasses = `border text-ellipsis mt-2 p-2 rounded-md ${
          isAssistant
            ? `bg-[white] text-black flex border-gray-200	items-start gap-x-2 p-3 `
            : "bg-[#5378FC] flex items-start gap-x-2 p-3 "
        }`;

        const textContainerClasses = ` text-wrap w-full ${
          isAssistant ? "pl-1" : "pr-1 text-white"
        }`;

        return (
          <div
            key={message.id}
            className={messageClasses}
            style={{
              maxWidth: "70%",
              // maxWidth:{isMobile ? "90%" : "70%"},
              alignSelf: isAssistant ? "flex-start" : "flex-end",
            }}>
            {!isAssistant && (
              <AiOutlineUser className="mt-0.5 size-5 text-white" />
            )}
            {isAssistant && (
              <img src={chatbotlogo} className="object-contain ml-2" />
            )}
            <p
              className={textContainerClasses}
              dangerouslySetInnerHTML={{
                __html: message.content[0]?.text?.value,
              }}
            />
          </div>
        );
      })}
      <InputBar
        getMessagesByThread={getMessagesByThread}
        thread_id={thread_id}
        setRunRefetch={setRunRefetch}
      />
    </div>
  );
};

export default Messages;
