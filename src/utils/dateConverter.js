// DateConverter.js
import React from 'react';
import { TextTitle } from '../shared/Texts/Texts';

const DateConverter = ({ dateString }) => {
  const date = new Date(dateString);
  const options = {month:'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  const formattedDate = date.toLocaleString('en-EN', options);

  return <TextTitle>{formattedDate}</TextTitle>;
};

export default DateConverter;
