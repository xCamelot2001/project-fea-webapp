import React, { useState } from 'react';
import RadioGroup from './RadioGroup';
import { submitSurvey } from '../../services/apiService';

const questionConfig = [
  {
    key: 'question1',
    label: 'How would you rate the accuracy of face expression detection?',
    options: ['Very Good', 'Good', 'Neutral', 'Bad', 'Very Bad']
  },
  {
    key: 'question2',
    label: 'How would you rate the relevancy of the content generation?',
    options: ['Very Good', 'Good', 'Neutral', 'Bad', 'Very Bad']
  },
  {
    key: 'question3',
    label: 'How would you rate the level of entertainment/engagement that you experienced?',
    options: ['Very Good', 'Good', 'Neutral', 'Bad', 'Very Bad']
  },
  {
    key: 'question4',
    label: 'How was your overall satisfaction from using the app?',
    options: ['Very Good', 'Good', 'Neutral', 'Bad', 'Very Bad']
  },
  {
    key: 'question5',
    label: 'How likely is it that you will share this app with others?',
    options: ['Very Good', 'Good', 'Neutral', 'Bad', 'Very Bad']
  },
];

function SurveyFormat() {
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState("");

  const handleOptionChange = (question, option) => {
    setAnswers(prevAnswers => ({ ...prevAnswers, [question]: option }));
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await submitSurvey({ ...answers, feedback });
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
        {questionConfig.map((question) => (
          <RadioGroup
            key={question.key}
            questionKey={question.key}
            questionLabel={question.label}
            options={question.options}
            value={answers[question.key]}
            onChange={handleOptionChange}
          />
        ))}
        <div>
          <label>Any other feedback would be much appreciated</label>
          <textarea value={feedback} onChange={handleFeedbackChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SurveyFormat;
