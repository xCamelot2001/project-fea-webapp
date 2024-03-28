import React from 'react';

const CategorySelector = ({ onSelectCategory, categories }) => {
  return (
    <div className="category-selection">
      {categories.map((category) => (
        <button key={category} onClick={() => onSelectCategory(category)}>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;