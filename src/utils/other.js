import React from 'react';

export const cleanRuleName = s => {
  const re = /([A-Z][a-z]+)/g;
  return s.match(re).join(" ");
};

export const iconText = (Icon, text) => [<Icon key="0" />, text];