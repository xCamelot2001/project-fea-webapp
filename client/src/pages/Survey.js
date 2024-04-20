import React, { useState } from "react";
import { submitSurvey } from "../services/apiService";

function Survey() {
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState("");

  const handleOptionChange = (question, option) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [question]: option,
    }));
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        await submitSurvey({ question1: answers.question1, question2: answers.question2, feedback });
        // Reset the form and give user feedback
        setAnswers({});
        setFeedback("");
        alert('Survey submitted successfully!');
      } catch (error) {
        alert('Failed to submit survey.');
      }
  };

  return (
    <div>
      <h1>Survey Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>How satisfied Are you with the responses?</label>
          <div>
            <label>
              <input
                type="radio"
                name="question1"
                value="option1"
                checked={answers["question1"] === "option1"}
                onChange={() => handleOptionChange("question1", "option1")}
              />
                Satisfied
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="question1"
                value="option2"
                checked={answers["question1"] === "option2"}
                onChange={() => handleOptionChange("question1", "option2")}
              />
                Not satisfied
            </label>
          </div>
        </div>

        <div>
          <label>Would you recommend the website to your friends and family?</label>
          <div>
            <label>
              <input
                type="radio"
                name="question2"
                value="option1"
                checked={answers["question2"] === "option1"}
                onChange={() => handleOptionChange("question2", "option1")}
              />
                Yes
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="question2"
                value="option2"
                checked={answers["question2"] === "option2"}
                onChange={() => handleOptionChange("question2", "option2")}
              />
                No
            </label>
          </div>
        </div>

        <div>
          <label>Any other feedback would be much appreciated</label>
          <textarea value={feedback} onChange={handleFeedbackChange} />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Survey;
