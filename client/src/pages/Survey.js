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
                value="Satisfied"
                checked={answers["question1"] === "Satisfied"}
                onChange={() => handleOptionChange("question1", "Satisfied")}
              />
                Satisfied
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="question1"
                value="Not satisfied"
                checked={answers["question1"] === "Not satisfied"}
                onChange={() => handleOptionChange("question1", "Not satisfied")}
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
                value="Yes"
                checked={answers["question2"] === "Yes"}
                onChange={() => handleOptionChange("question2", "Yes")}
              />
                Yes
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="question2"
                value="No"
                checked={answers["question2"] === "No"}
                onChange={() => handleOptionChange("question2", "No")}
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
