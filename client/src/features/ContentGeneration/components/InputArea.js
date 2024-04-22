import React from "react";

const InputArea = ({ userInput, setUserInput, sendMessage }) => {
  return (
    <div className="input-area">
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
    </div>
  );
};

export default InputArea;