import React from 'react';

const RadioGroup = ({ questionKey, questionLabel, options, value, onChange }) => (
  <div>
    <label>{questionLabel}</label>
    {options.map(option => (
      <div key={option}>
        <label>
          <input
            type="radio"
            name={questionKey}
            value={option}
            checked={value === option}
            onChange={() => onChange(questionKey, option)}
          />
          {option}
        </label>
      </div>
    ))}
  </div>
);

export default RadioGroup;
