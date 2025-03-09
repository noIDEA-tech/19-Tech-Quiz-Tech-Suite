// Helper functions for Cypress tests

/**
 * Checks if an element is visible and contains specific text
 * @param selector CSS selector for the element
 * @param text Text to check for
 */
export const shouldBeVisibleWithText = (selector: string, text: string) => {
    cy.get(selector).should('be.visible').and('contain', text);
  };
  
  /**
   * Simulates answering all questions in the quiz
   * @param numberOfQuestions Number of questions to answer
   * @param selectCorrectAnswers Whether to try to select correct answers
   */
  export const answerAllQuestions = (numberOfQuestions: number, selectCorrectAnswers = false) => {
    for (let i = 0; i < numberOfQuestions; i++) {
      // If selecting correct answers, look for the correct one
      if (selectCorrectAnswers) {
        // This would require knowledge of the data structure
        // For demo purposes, we're just clicking the first answer
        cy.get('button.btn-primary').first().click();
      } else {
        // Just click the first answer button for each question
        cy.get('button.btn-primary').first().click();
      }
    }
  };
  
  /**
   * Waits for questions to load and verifies the quiz UI is ready
   */
  export const waitForQuizToLoad = () => {
    // Wait for loading spinner to disappear
    cy.get('.spinner-border').should('not.exist', { timeout: 10000 });
    
    // Verify question is displayed
    cy.get('h2').should('be.visible');
    
    // Verify answer options are displayed
    cy.get('.alert').should('have.length.at.least', 1);
  };