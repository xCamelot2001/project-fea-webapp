import React, { createContext, useState, useContext } from "react";

const ContentLogContext = createContext();

export const ContentLogProvider = ({ children }) => {
  const [contentLog, setContentLog] = useState({
    text: new Set(),
    video: new Set(),
    link: new Set(),
    generated: new Set(),
  });

  const updateContentLog = (type, content) => {
    setContentLog((prev) => {
      const updatedLog = new Set([...prev[type], content]);
      return { ...prev, [type]: updatedLog };
    });
  };

  const isContentUnique = (type, content) => {
    return !contentLog[type].has(content);
  };

  return (
    <ContentLogContext.Provider
      value={{ contentLog, updateContentLog, isContentUnique }}
    >
      {children}
    </ContentLogContext.Provider>
  );
};

export const useContentLog = () => useContext(ContentLogContext);

export default ContentLogProvider;
