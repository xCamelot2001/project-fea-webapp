import React, { createContext, useState, useContext } from "react";

const EmotionContext = createContext({
  emotion: "",
  setEmotion: () => {},
});

export const useEmotion = () => useContext(EmotionContext);

export const EmotionProvider = ({ children }) => {
  const [emotion, setEmotion] = useState("");
  return (
    <EmotionContext.Provider value={{ emotion, setEmotion }}>
      {children}
    </EmotionContext.Provider>
  );
};
