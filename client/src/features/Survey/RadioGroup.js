import React from 'react';

const RadioGroup = ({ questionKey, questionLabel, options, value, onChange }) => (
  <div className="survey-question">
    <p>{questionLabel}</p>
    <div className="radio-group">
      {options.map(option => (
        <label key={option} className="radio-option">
          <input
            type="radio"
            name={questionKey}
            value={option}
            checked={value === option}
            onChange={() => onChange(questionKey, option)}
          />
          {option}
        </label>
      ))}
    </div>
  </div>
);

export default RadioGroup;
