import React from "react";

function TextInput({ updater, navigation }) {
  return (
    <input
      className="text-input"
      type="text"
      autoComplete="off"
      onChange={updater}
      onKeyDown={navigation}
    />
  );
}
//https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=rainb
export default TextInput;
