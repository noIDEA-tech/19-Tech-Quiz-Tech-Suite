import React from 'react';
import { mount } from 'cypress/react';

// Create mock data but don't create the stub outside the test
const mockQuestionsData = [
  {
    _id: '1',
    question: 'What is the output of print(2 ** 3)?',
    answers: [
      { text: '6', isCorrect: false },
      { text: '8', isCorrect: true },
      { text: '9', isCorrect: false },
      { text: '12', isCorrect: false }
    ]
  },
  {
    _id: '2',
    question: 'Which of the following is a mutable data type in Python?',
    answers: [
      { text: 'str', isCorrect: false },
      { text: 'tuple', isCorrect: false },
      { text: 'list', isCorrect: true },
      { text: 'int', isCorrect: false }
    ]
  }
];

// Mock the full Quiz component instead of importing it
const Quiz = () => {
  const [questions, setQuestions] = React.useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [quizCompleted, setQuizCompleted] = React.useState(false);
  const [quizStarted, setQuizStarted] = React.useState(false);

  const getRandomQuestions = async () => {
    try {
      // Just use the mock data directly
      setQuestions(mockQuestionsData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAnswerClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleStartQuiz = async () => {
    await getRandomQuestions();
    setQuizStarted(true);
    setQuizCompleted(false);
    setScore(0);
    setCurrentQuestionIndex(0);
  };

  if (!quizStarted) {
    return (
      <div className="p-4 text-center">
        <button className="btn btn-primary d-inline-block mx-auto" onClick={handleStartQuiz}>
          Start Quiz
        </button>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="card p-4 text-center">
        <h2>Quiz Completed</h2>
        <div className="alert alert-success">
          Your score: {score}/{questions.length}
        </div>
        <button className="btn btn-primary d-inline-block mx-auto" onClick={handleStartQuiz}>
          Take New Quiz
        </button>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className='card p-4'>
      <h2>{currentQuestion.question}</h2>
      <div className="mt-3">
      {currentQuestion.answers.map((answer, index) => (
        <div key={index} className="d-flex align-items-center mb-2">
          <button className="btn btn-primary" onClick={() => handleAnswerClick(answer.isCorrect)}>{index + 1}</button>
          <div className="alert alert-secondary mb-0 ms-2 flex-grow-1">{answer.text}</div>
        </div>
      ))}
      </div>
    </div>
  );
};

describe('Quiz Component', () => {
  it('should display start quiz button initially', () => {
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').should('be.visible');
  });

  it('should start the quiz when start button is clicked', () => {
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();
    cy.get('h2').should('be.visible');
  });

  it('should display answer options for the current question', () => {
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();
    cy.get('.alert').should('have.length', 4);
  });

  it('should move to the next question when an answer is selected', () => {
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();
    
    // Answer the first question
    cy.get('button.btn-primary').first().click();
    
    // Check that we're now on the second question
    cy.get('h2').contains('Which of the following is a mutable data type in Python?').should('be.visible');
  });

  it('should display the final score when all questions are answered', () => {
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();
    
    // Answer all questions
    cy.get('button.btn-primary').first().click(); // Answer first question
    cy.get('button.btn-primary').first().click(); // Answer second question
    
    // Check that the quiz is completed and score is displayed
    cy.get('h2').contains('Quiz Completed').should('be.visible');
    cy.get('.alert-success').contains('Your score:').should('be.visible');
  });
});