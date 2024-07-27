import React from 'react';
import '../../style/common.css';

const Sidebar = ({ onCategoryChange }) => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Categories</h2>
      <ul className="sidebar-list">
        <li className="sidebar-item" onClick={() => onCategoryChange('trending')}>
          Trending Videos
        </li>
        <li className="sidebar-item" onClick={() => onCategoryChange('shorts')}>
          Shorts
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
