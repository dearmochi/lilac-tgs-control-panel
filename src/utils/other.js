import { message } from 'antd';
import React from 'react';

export const hasRight = (instanceUser, group, right) => instanceUser?.[group] & right;

const re = /([A-Z][a-z]+)/g;
export const cleanRuleName = s => {
  return s.match(re).join(" ");
};

export const iconText = (Icon, text) => [<Icon key="0" />, text];

export const messageTgsError = (error, action = "perform action") => {
  message.error("Failed to " + action + ". (" + error?.response?.status + ": " + error?.response?.data?.message + ")", 5);
}