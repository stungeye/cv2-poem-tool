import React, { useState, Fragment } from "react";
import serializedStorage from "./serializedStorage.js";
import "./simple.css";
import "./styles.css";

export default function App() {
  const [text, setText] = useState(serializedStorage.fetch());

  const requiredWords = [
    "bog",
    "noctambulant",
    "slink",
    "peachy",
    "broadside",
    "spine",
    "wax",
    "mnemonic",
    "cross",
    "toast"
  ];

  function foundWord(needle, haystack) {
    let re = new RegExp(`\\b${needle}\\b`, "gi");
    return haystack.match(re) !== null;
  }

  function includedWords() {
    return requiredWords.filter((word) => foundWord(word, text));
  }

  function missingWords() {
    return requiredWords.filter((word) => !foundWord(word, text));
  }

  function inputChanged(event) {
    setText(event.target.value);
    serializedStorage.save(event.target.value);
  }

  function numberToWord(number) {
    const words = [
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten"
    ];
    return words[number - 1];
  }

  return (
    <Fragment>
      <p className="meta">
        <strong>Missing: </strong>
        {missingWords().join(", ")}
        <br />
        <strong>Included: </strong>
        {includedWords().join(", ")}
      </p>
      <textarea onChange={inputChanged} value={text} />

      {missingWords().length > 0 ? (
        <p>
          {numberToWord(missingWords().length)} word
          {missingWords().length !== 1 && "s"} to go.{" "}
          {missingWords().length < 4 && <em>You're almost there!</em>}
        </p>
      ) : (
        <p>
          Your poem includes all the required words. <em>Well done!</em>
        </p>
      )}
    </Fragment>
  );
}
