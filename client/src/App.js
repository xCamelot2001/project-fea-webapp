import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import ContentLogProvider from "./features/ContentGeneration/components/ContentLogContext"; // import the provider
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Survey from "./pages/Survey";
import "./assests/styles/App.css";

// App component
const App = () => {
  const [emotion, setEmotion] = useState("neutral");

  return (
    <ContentLogProvider>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <Home emotion={emotion} onEmotionDetected={setEmotion} />
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/survey" element={<Survey />} />
          </Routes>
        </div>
      </Router>
    </ContentLogProvider>
  );
};

export default App;
