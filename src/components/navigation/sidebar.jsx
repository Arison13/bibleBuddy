import React from "react";

const Sidebar = ({ handleCreateNewThread }) => {
  {
    /* add icons for different options */
  }

  return (
    <div className="w-[60%] border border-[yellow] flex flex-col items-center">
      <div className="w-full h-full flex flex-col gap-y-4">
        <button
          className="flex shadow-md  w-full border border-gray-300"
          onClick={() => {
            handleCreateNewThread();
          }}>
          New thread
        </button>
        <button className="flex shadow-md w-full border border-gray-300">
          Change Convo 1
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
