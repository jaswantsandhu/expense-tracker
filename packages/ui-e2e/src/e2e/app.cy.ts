import { getGreeting } from '../support/app.po';

describe('Basic UI elements are present.', () => {
  beforeEach(() => cy.visit('http://localhost:4200/'));

  it('should display welcome message', () => {
    // Custom command example, see `../support/commands.ts` file
    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains('Expense Tracker');
  });
});
