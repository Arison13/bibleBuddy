import OpenAI from "openai";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";

//eslint-disable-next-line
export const InputBar = ({ thread_id, setRunRefetch, getMessagesByThread }) => {
  const authToken = import.meta.env.VITE_OPENAI_API_KEY;
  const [messageInput, setMessageInput] = useState("");
  const [openai, setOpenAI] = useState(null);

  useEffect(() => {
    if (authToken) {
      setOpenAI(
        new OpenAI({
          apiKey: authToken,
          dangerouslyAllowBrowser: true,
        })
      );
    }
  }, [authToken]);

  const runAI = async () => {
    const run = await openai.beta.threads.runs.create(thread_id, {
      assistant_id: "asst_XBERweQgC8KvDGvop8DQ2QtB",
    });

    console.log(run);
    getMessagesByThread(thread_id);
    setRunRefetch(true);
  };

  async function makeMessage(e) {
    e.preventDefault();
    const threadMessages = await openai.beta.threads.messages.create(
      thread_id,
      { role: "user", content: messageInput }
    );
    setMessageInput("");
    runAI();
  }

  return (
    <div className="flex items-center justify-center mt-2 gap-x-2 w-full ">
      {/* <div className="flex w-[99%] py-3 fixed bottom-0 mb-1 mx-1 mr-1 left-0 right-0 rounded bg-white border border-gray-400 shadow-sm p-2"> */}
      <form
        onSubmit={(e) => makeMessage(e)}
        className="flex w-[99%] py-3 fixed bottom-0 mb-1 mx-1 mr-1 left-0 right-0 rounded bg-white border border-gray-400 shadow-sm p-2">
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onSubmit={(e) => makeMessage(e)}
          placeholder="Ask or Talk to your bible buddy"
          className="w-full text-black bg-white outline-none"
        />
        <button
          onClick={(e) => makeMessage(e)}
          className="bg-white text-black hover:border hover:border-blue-700">
          <FaArrowRight />
        </button>
      </form>
      {/* </div> */}
    </div>
  );
};
