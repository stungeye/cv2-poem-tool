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
        {missingWords().length > 0 && (
          <Fragment>
            <strong>Missing: </strong>
            {missingWords().join(", ")}
            <br className="breaker" />
          </Fragment>
        )}
        {includedWords().length > 0 && includedWords().length !== 10 && (
          <Fragment>
            <strong>Present: </strong>
            {includedWords().join(", ")}
          </Fragment>
        )}

        {includedWords().length === 10 && (
          <Fragment>
            <span role="img" aria-label="checkmark">
              ✅
            </span>{" "}
            Your poem includes all the required words. Well done!
            <br className="breaker" />
            <em>Be sure to look over the other requirements below.</em>
          </Fragment>
        )}
      </p>

      <textarea onChange={inputChanged} value={text} />

      {missingWords().length > 0 ? (
        <p>
          {numberToWord(missingWords().length)} word
          {missingWords().length !== 1 && "s"} to go.{" "}
          {missingWords().length < 4 && <em>You're almost there!</em>}
        </p>
      ) : (
        <Fragment>
          <p>
            <strong>Don't forget that:</strong>
          </p>
          <ul>
            <li>
              Each word must be used at least once in the body of the final
              entry.
            </li>
            <li>
              Words may be used in the title, but must also appear in the body
              of the poem.
            </li>
            <li>
              Each word must be spelled <em>exactly</em> as provided. Tense
              changes, suffixes, plurals, etc. are not permitted, although caps
              and lowercase uses are both permitted.
            </li>
            <li>The words may not be used as proper nouns.</li>
            <li>
              Each word must be used in proper context to qualify. If you are
              unsure what a word means, look the word up in{" "}
              <a
                href="https://www.merriam-webster.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                a dictionary
              </a>
              . If a word has multiple meanings you may decide which meaning to
              use. If you use the word more than once in the poem, the meaning
              of the word does not necessarily have to be the same.
            </li>
            <li>
              Submitted poems may not exceed 48 lines of text not including the
              title. Stanza breaks DO NOT count as lines, nor do subheadings or
              the title.
            </li>
            <li>Only one poem may be entered per participant.</li>
            <li>
              Racist, homophobic or defamatory writing will be disqualified.
            </li>
          </ul>
        </Fragment>
      )}
    </Fragment>
  );
}
