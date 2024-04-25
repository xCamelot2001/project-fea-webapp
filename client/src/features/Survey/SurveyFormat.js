import React, { useState } from 'react';
import RadioGroup from './RadioGroup';
import { submitSurvey } from '../../services/apiService';
import '../../assests/styles/Survey.css';

const susQuestions = [
  {
    key: 'sus1',
    label: 'I think that I would like to use this system frequently.',
    options: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree']
  },
  {
    key: 'sus2',
    label: 'I found the system unnecessarily complex.',
    options: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree']
  },
  {
    key: 'sus3',
    label: 'I thought the system was easy to use.',
    options: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree']
  },
  {
    key: 'sus4',
    label: 'I think that I would need the support of a technical person to be able to use this system.',
    options: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree']
  },
  {
    key: 'sus5',
    label: 'I found the various functions in this system were well integrated.',
    options: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree']
  },
  {
    key: 'sus6',
    label: 'I thought there was too much inconsistency in this system.',
    options: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree']
  },
  {
    key: 'sus7',
    label: 'I would imagine that most people would learn to use this system very quickly.',
    options: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree']
  },
  {
    key: 'sus8',
    label: 'I found the system very cumbersome to use.',
    options: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree']
  },
  {
    key: 'sus9',
    label: 'I felt very confident using the system.',
    options: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree']
  },
  {
    key: 'sus10',
    label: 'I needed to learn a lot of things before I could get going with this system.',
    options: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree']
  },
];

const qualitativeQuestions = [
  {
    key: 'qualitative1',
    label: 'What did you like most about using our website?',
    type: 'text',
  },
  {
    key: 'qualitative2',
    label: 'What improvements would you suggest?',
    type: 'text',
  },
];

function SurveyFormat() {
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleOptionChange = (question, option) => {
    setAnswers(prevAnswers => ({ ...prevAnswers, [question]: option }));
  };

  const handleInputChange = (question, text) => {
    setAnswers(prevAnswers => ({ ...prevAnswers, [question]: text }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      await submitSurvey(answers);
      setAnswers({});
      setSubmitting(false);
      alert('Survey submitted successfully!');
    } catch (error) {
      alert('Failed to submit survey.');
      setSubmitting(false);
    }
  };

  return (
    <div className="survey-container">
      <h1 className="survey-header">Survey Form</h1>
      <p className="survey-intro">Your feedback is crucial to us. The survey will take a few minutes and your answers will remain confidential.</p>
      <form onSubmit={handleSubmit} className="survey-form">
        {susQuestions.map((question) => (
          <RadioGroup
            key={question.key}
            questionKey={question.key}
            questionLabel={question.label}
            options={question.options}
            value={answers[question.key]}
            onChange={handleOptionChange}
          />
        ))}
        {qualitativeQuestions.map((question) => (
          <div key={question.key} className="survey-question-text">
            <label htmlFor={question.key}>{question.label}</label>
            <textarea
              id={question.key}
              value={answers[question.key] || ''}
              onChange={(e) => handleInputChange(question.key, e.target.value)}
              className="feedback-textarea"
            />
          </div>
        ))}
        <button type="submit" className="submit-button" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

export default SurveyFormat;
