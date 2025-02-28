import React from 'react';
import Quiz from '../../client/src/components/Quiz';

describe('Quiz Component', () => {
  // Mock the API response
  const mockQuestions = [
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

  beforeEach(() => {
    // Stub the API call to return mock data
    cy.intercept('GET', '/api/questions/random', {
      statusCode: 200,
      body: mockQuestions
    }).as('getQuestions');
  });

  it('should display start quiz button initially', () => {
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').should('be.visible');
  });

  it('should start the quiz when start button is clicked', () => {
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();
    cy.wait('@getQuestions');
    cy.get('h2').contains('What is the output of print(2 ** 3)?').should('be.visible');
  });

  it('should display answer options for the current question', () => {
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();
    cy.wait('@getQuestions');
    
    // Check that all answer options are visible
    cy.get('.alert').should('have.length', 4);
    cy.get('.alert').contains('6');
    cy.get('.alert').contains('8');
    cy.get('.alert').contains('9');
    cy.get('.alert').contains('12');
  });

  it('should move to the next question when an answer is selected', () => {
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();
    cy.wait('@getQuestions');
    
    // Answer the first question
    cy.get('button').first().click();
    
    // Check that we're now on the second question
    cy.get('h2').contains('Which of the following is a mutable data type in Python?').should('be.visible');
  });

  it('should display the final score when all questions are answered', () => {
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();
    cy.wait('@getQuestions');
    
    // Answer all questions
    cy.get('button').first().click(); // Answer first question
    cy.get('button').first().click(); // Answer second question
    
    // Check that the quiz is completed and score is displayed
    cy.get('h2').contains('Quiz Completed').should('be.visible');
    cy.get('.alert-success').contains('Your score:').should('be.visible');
    cy.get('button').contains('Take New Quiz').should('be.visible');
  });

  it('should be able to start a new quiz after completion', () => {
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();
    cy.wait('@getQuestions');
    
    // Answer all questions
    cy.get('button').first().click(); // Answer first question
    cy.get('button').first().click(); // Answer second question
    
    // Start a new quiz
    cy.get('button').contains('Take New Quiz').click();
    cy.wait('@getQuestions');
    
    // Verify we're back to the first question
    cy.get('h2').contains('What is the output of print(2 ** 3)?').should('be.visible');
  });
});