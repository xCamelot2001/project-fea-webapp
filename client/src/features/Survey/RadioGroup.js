import React from 'react';

const RadioGroup = ({ questionKey, questionLabel, options, value, onChange }) => (
  <div className="survey-question">
    <p>{questionLabel}</p>
    <div className="radio-group">
      {options.map((option, index) => (
        <label key={index} className="radio-option"> {/* index is used for a unique key */}
          <input
            type="radio"
            name={questionKey}
            value={option}
            checked={value === option}
            onChange={(e) => onChange(questionKey, e.target.value)} // Correctly pass the event to the handler
          />
          {option}
        </label>
      ))}
    </div>
  </div>
);

export default RadioGroup;
