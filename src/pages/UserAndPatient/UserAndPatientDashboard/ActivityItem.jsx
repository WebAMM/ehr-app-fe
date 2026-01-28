import React from 'react';

const ActivityItem = ({ text, time }) => (
  <div className="text-sm">
    <p className="text-text">{text}</p>
    <p className="text-xs text-text opacity-70">{time}</p>
  </div>
);

export default ActivityItem;