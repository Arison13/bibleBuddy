import "./App.css";
import axios from "axios";
import OpenAI from "openai";
import { useEffect, useState } from "react";
import Navbar from "./components/navigation/navbar";
import Sidebar from "./components/navigation/sidebar";
import Messages from "./components/conversation/messages";
// import LoadingDots from "./components/helpers/loadingDots";
import styled, { keyframes } from "styled-components";
import { WelcomeModal } from "./components/welcomeModal/welcomeModal";

const loadingAnimation = keyframes`
  0% {
    background-color: #ff5000;
  }
  50%, 100% {
    background-color: rgba(152, 128, 255, 0.2);
  }
`;

const StyledLoadingDots = styled.div`
  /* -----                                                     ----- */
  /* ----- Controls the center circle & all circles animations ----- */
  /* -----                                                     ----- */

  position: relative;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #ff5000;
  color: #ff5000;
  animation: ${loadingAnimation} 1s infinite linear alternate;
  animation-delay: 0.5s;

  // NOTE: Aligns the loading dots perfectly within it's parent with class absolute.
  left: 15px;

  /* -----                                           ----- */
  /* ----- Controls the furthest left & right circle ----- */
  /* -----                                           ----- */
  &:before,
  &:after {
    content: "";
    display: inline-block;
    position: absolute;
    top: 0;
  }

  /* -----                                   ----- */
  /* ----- Controls the furthest left circle ----- */
  /* -----                                   ----- */
  &:before {
    left: -15px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #ff5000;
    color: #ff5000;
    animation: ${loadingAnimation} 1s infinite alternate;
    animation-delay: 0s;
  }

  /* -----                                    ----- */
  /* ----- Controls the furthest right circle ----- */
  /* -----                                    ----- */
  &:after {
    left: 15px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #ff5000;
    color: #ff5000;
    animation: ${loadingAnimation} 1s infinite alternate;
    animation-delay: 1s;
  }
`;

export const LoadingDots = ({ className }) => (
  <div className={`relative w-[40px] h-[10px] ${className}`}>
    <div className="absolute w-[40px]">
      <StyledLoadingDots />
    </div>
  </div>
);

function App() {
  const authToken = import.meta.env.VITE_OPENAI_API_KEY;
  // const assistant_id = "asst_QtKt618WqgeJ4FkmF9KnpqPa";

  const [threadId, setThreadId] = useState("");
  const [messages, setMessages] = useState([]);
  const [runRefetch, setRunRefetch] = useState(false);
  const [isMobile] = useState(window.innerWidth <= 768);

  const getMessagesByThread = async (thread) => {
    console.log("here is thread", thread);
    const res = await axios.get(
      `https://api.openai.com/v1/threads/${thread}/messages`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
          "OpenAI-Beta": "assistants=v1",
        },
      }
    );
    console.log(res.data.data, res.data.data.length);
    setMessages(res.data.data.reverse());
    setRunRefetch(false);
  };

  if (runRefetch) {
    setTimeout(() => {
      getMessagesByThread(threadId);
    }, 4000);
  }

  return (
    <div className="w-full h-screen ">
      <WelcomeModal
        setThreadId={setThreadId}
        thread_id={threadId}
        getMessagesByThread={getMessagesByThread}
      />
      <Navbar />
      {/* <div className="border border-[red] flex justify-between w-full">
        <Sidebar handleCreateNewThread={handleCreateNewThread} /> */}
      {messages && (
        <Messages
          isMobile={isMobile}
          messages={messages}
          thread_id={threadId}
          setRunRefetch={setRunRefetch}
          getMessagesByThread={getMessagesByThread}
        />
      )}
      {/* </div> */}
      {runRefetch && <LoadingDots />}
    </div>
  );
}

export default App;

/* 
  TO DO for MVP: 
    1. Create the separate components to handle the logic and keep the code clean - DONE
    2. Change icon for assitant and User messages - done
    3. fix width and styles for messages - done
    4. Add/Check logic used to send request to assistant - DONE
    5. Add in refresh (Refresh works but if the message is long it wont update on time) -DONE
    5. Make new thread everytime - DONE
    7. Add welcome modal:https://github.com/reactjs/react-modal and gpt -DONE
    8. Add "loading" state when message is sending - 1/2
    9. Fix Loading Dots for when receiving the message. 1/2

  TO DO after MVP:
    1. Figure out a way to keep the past threads saved 
    2. Create auth flow for log in and out 
    3. Improve responses from AI 
    4. Improve UI/UX expirence 
    5. Allow user to make and customaize their own assistant 
    6. Allow user to switch between different assistants 
*/
