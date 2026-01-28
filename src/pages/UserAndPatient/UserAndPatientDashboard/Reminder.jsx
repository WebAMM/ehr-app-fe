import React from 'react';

const Reminder = ({ text, sub }) => (
  <div className="p-3 bg-secondary/10 border border-secondary/20 rounded-xl">
    <p className="text-sm font-medium text-text">{text}</p>
    <p className="text-xs text-text opacity-70">{sub}</p>
  </div>
);

export default Reminder;