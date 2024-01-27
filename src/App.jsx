import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { triviaQuestionsRaw } from "./questions";

const triviaQuestions = triviaQuestionsRaw.map((question) => {
  return {
    question: question.question.replaceAll("&quot;", '"'),
    answer: question.correct_answer,
  };
});

function TriviaQuestion() {
  const [score, setScore] = useState(0);
  const [count, setCount] = useState(0);
  const [question, setQuestion] = useState(triviaQuestions[0]);
  const [answerType, setAnswerType] = useState("");

  // useEffect(() => {
  //   async function fetchQuestionsData() {
  //     const questionsData = await fetch(
  //       "https://opentdb.com/api.php?amount=100&category=18&type=boolean"
  //     );
  //     const questions = await questionsData.json();
  //     if (!questions.results) return;

  //     const newQuestions = questions.results.map((question) => {
  //       return {
  //         question: question.question,
  //         answer: question.correct_answer,
  //       };
  //     });
  //     // console.log(newQuestions);
  //     triviaQuestions = newQuestions;
  //   }
  //   fetchQuestionsData();
  // }, []);

  const changeQuestion = (answerSelected) => {
    if (!triviaQuestions) return;

    if (answerSelected === question.answer) {
      setAnswerType("Correct!");
      setScore((prev) => prev + 1);
    } else {
      setAnswerType("Incorrect!");
    }

    if (count < triviaQuestions.length - 2) {
      setCount((prev) => prev + 1);
    }
    // console.log(count, triviaQuestions[count]);
    setQuestion(triviaQuestions[count + 1]);
  };
  return (
    <>
      <h2>
        {count + 1}. {question.question}
      </h2>
      {count + 1 < 29 && (
        <div>
          <button className="answerBtn" onClick={() => changeQuestion("True")}>
            True
          </button>
          <button className="answerBtn" onClick={() => changeQuestion("False")}>
            False
          </button>
        </div>
      )}
      <p>{answerType}</p>
      <h3>
        Score: {score}/{triviaQuestions.length}
      </h3>
    </>
  );
}

function App() {
  return (
    <>
      <h1>Trivia Game</h1>
      <TriviaQuestion />
    </>
  );
}

export default App;
