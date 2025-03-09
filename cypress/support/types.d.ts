import { mount } from 'cypress/react';

// Extend Cypress namespace
declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      dataCy(value: string): Chainable<JQuery<HTMLElement>>;
      
      /**
       * Custom command to mount a React component for component testing
       */
      mount: typeof mount;
    }
  }
}

// Define types for test data and mocks without importing from client
// Use interface instead of importing to avoid dependency issues
interface Answer {
  text: string;
  isCorrect: boolean;
}

interface Question {
  _id: string;
  question: string;
  answers: Answer[];
}

// Define QuizState interface
interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  quizCompleted: boolean;
  quizStarted: boolean;
}

// Export types for use in test files
export type { QuizState, Question, Answer };