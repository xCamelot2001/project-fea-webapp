import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import { ContentLogProvider } from "./features/ContentGeneration/components/ContentLogContext"; // Ensure you are exporting ContentLogProvider
import { EmotionProvider } from "./features/ContentGeneration/components/EmotionContext"; // Ensure you are exporting EmotionProvider
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import "./assets/styles/App.css"; // Make sure the path to styles is correct

// App component
const App = () => {
  return (
    <ContentLogProvider>
      <EmotionProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Router>
      </EmotionProvider>
    </ContentLogProvider>
  );
};

export default App;
