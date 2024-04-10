import React from 'react';

const ContentTypeSelector = ({ onSelectContentType, contentOptions }) => {

  return (
    <div className="content-type-selection">
      {Object.entries(contentOptions).map(([type, prompt]) => (
        <button key={type} onClick={() => onSelectContentType(prompt)}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default ContentTypeSelector;