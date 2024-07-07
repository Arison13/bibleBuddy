import OpenAI from "openai";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";

//eslint-disable-next-line
export const InputBar = ({ thread_id, setRunRefetch, getMessagesByThread }) => {
  const authToken = "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";
  const openai = new OpenAI({
    apiKey: authToken,
    dangerouslyAllowBrowser: true,
  });
  const [messageInput, setMessageInput] = useState("");

  const runAI = async () => {
    const run = await openai.beta.threads.runs.create(thread_id, {
      assistant_id: "asst_XBERweQgC8KvDGvop8DQ2QtB",
    });

    console.log(run);
    getMessagesByThread(thread_id);
    setRunRefetch(true);

    // setTimeout(() => {
    // }, 2000);
  };

  async function makeMessage() {
    const threadMessages = await openai.beta.threads.messages.create(
      thread_id,
      { role: "user", content: messageInput }
    );

    console.log(threadMessages);
    setMessageInput("");
    runAI();
  }

  return (
    <div className="flex items-center justify-center mt-2 gap-x-2 w-full ">
      <div className="flex w-[99%] py-3 fixed bottom-0 mb-1 mx-1 mr-1 left-0 right-0 rounded bg-white border border-gray-400 shadow-sm p-2">
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onSubmit={() => makeMessage()}
          placeholder="Ask or Talk to your bible buddy"
          className="w-full text-black bg-white outline-none"
        />
        <button
          onClick={() => makeMessage()}
          className="bg-white text-black hover:border hover:border-blue-700">
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};
