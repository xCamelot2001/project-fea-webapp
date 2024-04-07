import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import ContentLogProvider from "./features/ContentGeneration/components/ContentLogContext"; // import the provider
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import "./assests/styles/App.css";

// App component
const App = () => {
  return (
    <ContentLogProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </ContentLogProvider>
  );
};

export default App;
