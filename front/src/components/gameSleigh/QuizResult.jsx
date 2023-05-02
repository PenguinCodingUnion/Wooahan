import React, { useEffect, useRef, useState } from "react";

const QuizResult = (props) => {
  const result = props.result;

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 1000);
  }, []);

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        props.setQuizCount((count) => count + 1);
        props.setQuizStatus("nextQuiz");
      }, 2000);
    }
  }, [visible]);

  return (
    <div style={{ position: "absolute", top: 0 }}>
      {result.answer === true ? (
        <div style={{ position: "absolute", fontSize: "50px", color: "blue" }}>
          O
        </div>
      ) : (
        <div style={{ position: "absolute", fontSize: "50px", color: "red" }}>
          X
        </div>
      )}
      {visible && (
        <div style={{ position: "absolute" }}>
          <img src={result.url} />
          <p>{result.word}</p>
        </div>
      )}
    </div>
  );
};

export default QuizResult;
