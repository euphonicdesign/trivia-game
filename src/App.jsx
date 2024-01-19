import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function TriviaQuestion() {
  let triviaQuestions = [
    {
      question: "An elephant is bigger than an ant.",
      answer: "True",
    },
    {
      question: "Winter is warmer than summer.",
      answer: "False",
    },
    {
      question: "Dolphins swim in the sea",
      answer: "True",
    },
  ];

  const [count, setCount] = useState(0);
  const [question, setQuestion] = useState(triviaQuestions[0]);
  const [answerType, setAnswerType] = useState("");

  useEffect(() => {
    async function fetchQuestionsData() {
      const questionsData = await fetch(
        "https://opentdb.com/api.php?amount=100&category=18&type=boolean"
      );
      const questions = await questionsData.json();
      if (!questions.results) return;

      const newQuestions = questions.results.map((question) => {
        return {
          question: question.question,
          answer: question.correct_answer,
        };
      });
      // console.log(newQuestions);
      triviaQuestions = newQuestions;
    }
    fetchQuestionsData();
  }, []);

  const changeQuestion = (answerSelected) => {
    if (!triviaQuestions) return;

    if (answerSelected === question.answer) {
      setAnswerType("Correct");
    } else {
      setAnswerType("Incorrect");
    }

    if (count < triviaQuestions.length - 2) {
      setCount((prev) => prev + 1);
    }
    console.log(count, triviaQuestions[count]);
    setQuestion(triviaQuestions[count + 1]);
  };
  return (
    <>
      <h2>
        {count + 1}. {question.question}
      </h2>
      <div>
        <button onClick={() => changeQuestion("True")}>True</button>
        <button onClick={() => changeQuestion("False")}>False</button>
      </div>
      <p>{answerType}</p>
    </>
  );
}

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <h1>Trivia Game</h1>
      <TriviaQuestion />
    </>
  );
}

export default App;
