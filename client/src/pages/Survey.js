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
          <label>How would you rate the accuracy of face expression detection?</label>
          <div>
            <label>
              <input
                type="radio"
                name="question1"
                value="Very Good"
                checked={answers["question1"] === "Very Good"}
                onChange={() => handleOptionChange("question1", "Very Good")}
              />
                Very Good
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="question1"
                value="Good"
                checked={answers["question1"] === "Good"}
                onChange={() => handleOptionChange("question1", "Good")}
              />
                Good
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="question1"
                value="Neutral"
                checked={answers["question1"] === "Neutral"}
                onChange={() => handleOptionChange("question1", "Neutral")}
              />
                Neutral
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="question1"
                value="Bad"
                checked={answers["question1"] === "Bad"}
                onChange={() => handleOptionChange("question1", "Bad")}
              />
                Bad
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="question1"
                value="Very Bad"
                checked={answers["question1"] === "Very Bad"}
                onChange={() => handleOptionChange("question1", "Very Bad")}
              />
                Very Bad
            </label>
          </div>
        </div>

        <div>
          <label>How would you rate the relevancy of the content generation?</label>
          <div>
            <label>
              <input
                type="radio"
                name="question2"
                value="Very Good"
                checked={answers["question1"] === "Very Good"}
                onChange={() => handleOptionChange("question1", "Very Good")}
              />
                Very Good
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="question2"
                value="Good"
                checked={answers["question1"] === "Good"}
                onChange={() => handleOptionChange("question1", "Good")}
              />
                Good
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="question2"
                value="Neutral"
                checked={answers["question1"] === "Neutral"}
                onChange={() => handleOptionChange("question1", "Neutral")}
              />
                Neutral
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="question2"
                value="Bad"
                checked={answers["question1"] === "Bad"}
                onChange={() => handleOptionChange("question1", "Bad")}
              />
                Bad
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="question2"
                value="Very Bad"
                checked={answers["question1"] === "Very Bad"}
                onChange={() => handleOptionChange("question1", "Very Bad")}
              />
                Very Bad
            </label>
          </div>
        </div>

        <div>
          <label>How would you rate the level of entertainment/engagement that you experienced?</label>
          <div>
            <label>
              <input
                type="radio"
                name="question3"
                value="Very Good"
                checked={answers["question1"] === "Very Good"}
                onChange={() => handleOptionChange("question1", "Very Good")}
              />
                Very Good
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="question3"
                value="Good"
                checked={answers["question1"] === "Good"}
                onChange={() => handleOptionChange("question1", "Good")}
              />
                Good
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="question3"
                value="Neutral"
                checked={answers["question1"] === "Neutral"}
                onChange={() => handleOptionChange("question1", "Neutral")}
              />
                Neutral
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="question3"
                value="Bad"
                checked={answers["question1"] === "Bad"}
                onChange={() => handleOptionChange("question1", "Bad")}
              />
                Bad
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="question3"
                value="Very Bad"
                checked={answers["question1"] === "Very Bad"}
                onChange={() => handleOptionChange("question1", "Very Bad")}
              />
                Very Bad
            </label>
          </div>
        </div>

        <div>
          <label>How was your overall satisfaction from using the app?</label>
          <div>
            <label>
              <input
                type="radio"
                name="question4"
                value="Very Good"
                checked={answers["question1"] === "Very Good"}
                onChange={() => handleOptionChange("question1", "Very Good")}
              />
                Very Good
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="question4"
                value="Good"
                checked={answers["question1"] === "Good"}
                onChange={() => handleOptionChange("question1", "Good")}
              />
                Good
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="question4"
                value="Neutral"
                checked={answers["question1"] === "Neutral"}
                onChange={() => handleOptionChange("question1", "Neutral")}
              />
                Neutral
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="question4"
                value="Bad"
                checked={answers["question1"] === "Bad"}
                onChange={() => handleOptionChange("question1", "Bad")}
              />
                Bad
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="question4"
                value="Very Bad"
                checked={answers["question1"] === "Very Bad"}
                onChange={() => handleOptionChange("question1", "Very Bad")}
              />
                Very Bad
            </label>
          </div>
        </div>

        <div>
          <label>How likely is it that you share this app with others?</label>
          <div>
            <label>
              <input
                type="radio"
                name="question5"
                value="Very Good"
                checked={answers["question1"] === "Very Good"}
                onChange={() => handleOptionChange("question1", "Very Good")}
              />
                Very Good
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="question5"
                value="Good"
                checked={answers["question1"] === "Good"}
                onChange={() => handleOptionChange("question1", "Good")}
              />
                Good
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="question5"
                value="Neutral"
                checked={answers["question1"] === "Neutral"}
                onChange={() => handleOptionChange("question1", "Neutral")}
              />
                Neutral
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="question5"
                value="Bad"
                checked={answers["question1"] === "Bad"}
                onChange={() => handleOptionChange("question1", "Bad")}
              />
                Bad
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="question5"
                value="Very Bad"
                checked={answers["question1"] === "Very Bad"}
                onChange={() => handleOptionChange("question1", "Very Bad")}
              />
                Very Bad
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
