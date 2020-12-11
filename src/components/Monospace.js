import React from "react";

const doSelect = e => {
  e.preventDefault();
  const range = document.createRange();
  const sel = document.getSelection();
  range.selectNodeContents(e.target);
  sel.removeAllRanges();
  sel.addRange(range);
};

const Monospace = props => (
  <div
    style={{ fontFamily: "monospace" }}
    onClick={doSelect}>
    {props.children}
  </div>
);

export default Monospace;