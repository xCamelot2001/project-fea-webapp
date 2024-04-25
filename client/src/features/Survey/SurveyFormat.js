import React, { useState } from "react";
import RadioGroup from "./RadioGroup";
import { submitSurvey } from "../../services/apiService";
import "../../assests/styles/Survey.css";

const susQuestions = [
  {
    key: "sus1",
    label: "I think that I would like to use this system frequently.",
    options: [
      "Strongly agree",
      "Agree",
      "Neutral",
      "Disagree",
      "Strongly disagree",
    ],
  },
  {
    key: "sus2",
    label: "I found the system unnecessarily complex.",
    options: [
      "Strongly agree",
      "Agree",
      "Neutral",
      "Disagree",
      "Strongly disagree",
    ],
  },
  {
    key: "sus3",
    label: "I thought the system was easy to use.",
    options: [
      "Strongly agree",
      "Agree",
      "Neutral",
      "Disagree",
      "Strongly disagree",
    ],
  },
  {
    key: "sus4",
    label:
      "I think that I would need the support of a technical person to be able to use this system.",
    options: [
      "Strongly agree",
      "Agree",
      "Neutral",
      "Disagree",
      "Strongly disagree",
    ],
  },
  {
    key: "sus5",
    label: "I found the various functions in this system were well integrated.",
    options: [
      "Strongly agree",
      "Agree",
      "Neutral",
      "Disagree",
      "Strongly disagree",
    ],
  },
  {
    key: "sus6",
    label: "I thought there was too much inconsistency in this system.",
    options: [
      "Strongly agree",
      "Agree",
      "Neutral",
      "Disagree",
      "Strongly disagree",
    ],
  },
  {
    key: "sus7",
    label:
      "I would imagine that most people would learn to use this system very quickly.",
    options: [
      "Strongly agree",
      "Agree",
      "Neutral",
      "Disagree",
      "Strongly disagree",
    ],
  },
  {
    key: "sus8",
    label: "I found the system very cumbersome to use.",
    options: [
      "Strongly agree",
      "Agree",
      "Neutral",
      "Disagree",
      "Strongly disagree",
    ],
  },
  {
    key: "sus9",
    label: "I felt very confident using the system.",
    options: [
      "Strongly agree",
      "Agree",
      "Neutral",
      "Disagree",
      "Strongly disagree",
    ],
  },
  {
    key: "sus10",
    label:
      "I needed to learn a lot of things before I could get going with this system.",
    options: [
      "Strongly agree",
      "Agree",
      "Neutral",
      "Disagree",
      "Strongly disagree",
    ],
  },
];

const qualitativeQuestions = [
  {
    key: "qualitative1",
    label: "What did you like most about using our website?",
    type: "text",
  },
  {
    key: "qualitative2",
    label: "What improvements would you suggest?",
    type: "text",
  },
];

function SurveyFormat() {
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleOptionChange = (question, option) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [question]: option }));
  };

  const handleInputChange = (question, text) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [question]: text }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    // Map SUS responses to numerical values
    const mappedAnswers = Object.keys(answers).reduce((acc, key) => {
      if (key.includes("sus")) {
        const valueMap = {
          "Strongly agree": 5,
          Agree: 4,
          Neutral: 3,
          Disagree: 2,
          "Strongly disagree": 1,
        };
        acc[key] = valueMap[answers[key]];
      } else {
        acc[key] = answers[key];
      }
      return acc;
    }, {});
    try {
      await submitSurvey(mappedAnswers);
      setAnswers({});
      setSubmitting(false);
      alert("Survey submitted successfully!");
    } catch (error) {
      alert("Failed to submit survey.");
      setSubmitting(false);
    }
  };

  return (
    <div className="survey-container">
      <h1 className="survey-header">Survey Form</h1>
      <p className="survey-intro">
        Your feedback is crucial to us. The survey will take a few minutes and
        your answers will remain confidential.
      </p>
      <form onSubmit={handleSubmit} className="survey-form">
        {susQuestions.map((question) => (
          <div key={question.key} className="survey-question">
            <RadioGroup
              questionKey={question.key}
              questionLabel={question.label}
              options={question.options}
              value={answers[question.key]}
              onChange={handleOptionChange}
            />
          </div>
        ))}
        {qualitativeQuestions.map((question) => (
          <div
            key={question.key}
            className="survey-question survey-question-text"
          >
            <label htmlFor={question.key}>{question.label}</label>
            <textarea
              id={question.key}
              value={answers[question.key] || ""}
              onChange={(e) => handleInputChange(question.key, e.target.value)}
              className="feedback-textarea"
            />
          </div>
        ))}
        <button type="submit" className="submit-button" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default SurveyFormat;
