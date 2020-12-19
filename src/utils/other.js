import React from 'react';

export const hasRight = (user, group, right) => user?.[group] & right;

const re = /([A-Z][a-z]+)/g;
export const cleanRuleName = s => {
  return s.match(re).join(" ");
};

export const iconText = (Icon, text) => [<Icon key="0" />, text];