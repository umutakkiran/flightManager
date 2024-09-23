// DateConverter.js
import React from 'react';
import { TextTitle } from '../shared/Texts/Texts';

export default function DateConverter (dateString ) {
  const date = new Date(dateString);
  const options = {month:'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  const formattedDate = date.toLocaleString('en-EN', options);

  return `${formattedDate}`;
};

