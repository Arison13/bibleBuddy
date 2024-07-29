import axios from "axios";
import { useState } from "react";
import Modal from "react-modal";
import OpenAI from "openai";
import { useEffect } from "react";

export const WelcomeModal = ({
  setThreadId,
  thread_id,
  getMessagesByThread,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const authToken = import.meta.env.VITE_OPENAI_API_KEY;

  const openai = new OpenAI({
    apiKey: authToken,
    dangerouslyAllowBrowser: true,
  });

  function closeModal() {
    setModalIsOpen(false);
  }

  // https://platform.openai.com/docs/assistants/how-it-works/managing-threads-and-messages
  const getThreads = async () => {
    const res = await axios.get(
      `https://api.openai.com/v1/threads/${thread_id}
    `,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
          "OpenAI-Beta": "assistants=v1",
        },
      }
    );
  };
  //old thread: thread_TtZtVgtm7e4uMmcQnFX1F3ji

  //NEW THREAD PATH
  /*
    TODO:
      1.Handle creation of new thread and store it (could maybe save thread name too). -DONE
      2. Welcome Message Injected - ADD DEFAULT MESSAGE AFTER CREATING THREAD - could be hard coded into state
      3. Fetch new messages - refresh convo
      4. Close Out Modal
      5. ADD DEFAULT MESSAGE AFTER CREATING THREAD

  */
  const createThread = async () => {
    //needs to clear out the state and have a form to change instructions of the assistant or create new assistant if needed
    localStorage.removeItem("last_thread");
    setThreadId("");

    //creating new thread
    const newThread = await openai.beta.threads.create();

    localStorage.setItem("last_thread", newThread.id);

    setThreadId(newThread.id);
    //ADD DEFAULT MESSAGE AFTER CREATING THREAD
    // if(localStorage.getItem("last_thread") !== '' || localStorage.getItem("last_thread") !== null) {
    //   //handle more than 1 thread?
    // }

    closeModal();
  };

  //CONTINUE CONVO PATH
  /* 
    1. Get old Threads from API and give user options 
    2. Get messages for thread 
  */
  const resumeThread = async () => {
    const savedThread = localStorage.getItem("last_thread");
    if (savedThread) {
      setThreadId(savedThread);
      getMessagesByThread(savedThread);
      closeModal();
    } else {
      alert("no thread found");
    }
  };

  const handleCreateNewThread = () => {};

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      // padding: "0 6px",
      width: "550px",
      height: "150px",
    },
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        contentLabel="Example Modal">
        <div className={"flex flex-col justify-center items-center "}>
          <div>
            <p>Welcome to Bible Buddy! </p>
          </div>
          <div className="flex gap-4 mt-2 ">
            {/* <input /> */}
            <button onClick={() => createThread()}>Start new Thread</button>
            <button onClick={() => resumeThread()}>Continue Last Thread</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
