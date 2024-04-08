import React, { useState, useEffect } from "react";
import Greeting from "./components/Greeting";
import VideoWithEmotionDetection from "./components/VideoWithEmotionDetection";
import { useEmotion } from "./components/EmotionContext";
import {
  fetchContentSuggestions,
  fetchCategoryContent,
} from "../../services/apiService";
import Message from "./components/Message";

const IntegratedComponent = () => {
  const { emotion } = useEmotion();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch categories based on emotion
  useEffect(() => {
    if (emotion) {
      setIsLoading(true);
      fetchContentSuggestions(emotion)
        .then((response) => {
          setCategories(response.data.categories);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
          setIsLoading(false);
        });
    }
  }, [emotion]);

  // Fetch content for a selected category
  useEffect(() => {
    if (selectedCategory && emotion) {
      setIsLoading(true);
      fetchCategoryContent(emotion, selectedCategory)
        .then((response) => {
          setContent(response.data.content);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching content:", error);
          setIsLoading(false);
        });
    }
  }, [selectedCategory, emotion]);

  return (
    <div>
      <Greeting />
      <VideoWithEmotionDetection />
      {isLoading && <div>Loading...</div>}
      <div>
        {categories.map((category, index) => (
          <button key={index} onClick={() => setSelectedCategory(category)}>
            {category}
          </button>
        ))}
      </div>
      <div className="chatbox-container">
        <div className="messages">
          {content.map((item, index) => (
            <Message key={index} message={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntegratedComponent;
