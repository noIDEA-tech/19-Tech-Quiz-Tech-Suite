describe('Tech Quiz Application', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:3001');
  });

  it('should display the start quiz button', () => {
    cy.get('button').contains('Start Quiz').should('be.visible');
  });

  it('should start the quiz when the start button is clicked', () => {
    cy.get('button').contains('Start Quiz').click();
    
    // Wait for questions to load and verify a question is displayed
    // Instead of checking for the spinner, check directly for the question
    cy.get('h2').should('be.visible');
    cy.get('.alert').should('have.length.at.least', 1);
  });

  it('should proceed through all quiz questions until completion', () => {
    cy.get('button').contains('Start Quiz').click();
    
    // Answer 10 questions (based on the app's requirements)
    // We'll just click the first answer option for each question
    for (let i = 0; i < 10; i++) {
      // Verify that a question is displayed
      cy.get('h2').should('be.visible');
      
      // Click the first answer button for each question
      cy.get('button.btn-primary').first().click();
    }
    
    // After answering all questions, verify quiz completion
    cy.get('h2').contains('Quiz Completed').should('be.visible');
    cy.get('.alert-success').contains('Your score:').should('be.visible');
  });

  it('should display the final score after completing the quiz', () => {
    cy.get('button').contains('Start Quiz').click();
    
    // Answer all questions
    for (let i = 0; i < 10; i++) {
      cy.get('button.btn-primary').first().click();
    }
    
    // Verify score display
    cy.get('.alert-success').contains('Your score:').should('be.visible');
    // The score should be formatted as X/10 (where X is the number of correct answers)
    cy.get('.alert-success').should('contain', '/10');
  });

  it('should allow starting a new quiz after completion', () => {
    cy.get('button').contains('Start Quiz').click();
    
    // Answer all questions
    for (let i = 0; i < 10; i++) {
      cy.get('button.btn-primary').first().click();
    }
    
    // Start a new quiz
    cy.get('button').contains('Take New Quiz').click();
    
    // Verify that a new quiz has started
    cy.get('h2').should('be.visible');
    cy.get('h2').should('not.contain', 'Quiz Completed');
    cy.get('.alert').should('have.length.at.least', 1);
  });
});