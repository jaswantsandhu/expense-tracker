import { PayoutsResponse } from '@expense-tracker/data-model';
import {
  getAmountControl,
  getNameControl,
  getExpenseAddButton,
  getExpenseRow,
  getSettleButton,
  getPayoutModal,
} from '../support/expense.po';

describe('Basic UI elements are present.', () => {
  beforeEach(() => cy.visit('http://localhost:4200/'));

  it('should have controls for Name and Amount', () => {
    getExpenseAddButton().should('not.be.enabled');
    getNameControl();
    getAmountControl();
  });

  it('should fill Name and Amount in controls', () => {
    getNameControl().type('abc');
    getAmountControl().clear().type('1234');
    getExpenseAddButton().should('be.enabled');
    getSettleButton().should('not.be.enabled');
  });

  it('should add new expense.', () => {
    getNameControl().type('abc');
    getAmountControl().clear().type('1234');
    getExpenseAddButton().should('be.enabled').click();
    const newExpenseRow = getExpenseRow(1);
    newExpenseRow.contains('abc');
  });

  it('should delete the expense record.', () => {
    getNameControl().type('abc');
    getAmountControl().clear().type('1234');
    getExpenseAddButton().should('be.enabled').click();
    cy.get('.fas').click();
    cy.get(':nth-child(2) > .p-2').contains('No records available');
  });

  it('should show error if no name is added', () => {
    getNameControl().type('abc').clear();
    cy.get('.text-red-500').contains('Name is required.');
  });

  it('should show error if incorrect amount is added', () => {
    getNameControl().type('abc');
    getAmountControl().clear().type('abc');
    cy.get('.text-red-500').contains('Expense is required.');
  });

  it('should show error if negative amount is added', () => {
    getNameControl().type('abc');
    getAmountControl().clear().type('-1');
    cy.get('.text-red-500').contains('Expense must be a positive amount.');
  });

  it('should show payout modal on settle', () => {
    const response: PayoutsResponse = {
      total: 150,
      equalShare: 75,
      payouts: [{ amount: 25, owed: 'abc', owes: 'def' }],
    };

    cy.intercept('POST', '/payouts', { body: response });

    getNameControl().type('abc');
    getAmountControl().clear().type('100');

    getExpenseAddButton().should('be.enabled').click();

    getNameControl().type('def');
    getAmountControl().clear().type('50');

    getExpenseAddButton().should('be.enabled').click();
    getSettleButton().should('be.enabled').click();

    const payoutModal = getPayoutModal();

    payoutModal.get('td').contains('def');
    payoutModal.get('td').contains('£25.00');
  });

  it('should show payout modal with no payouts returned from the `API', () => {
    const response: PayoutsResponse = {
      total: 0,
      equalShare: 0,
      payouts: [],
    };

    cy.intercept('POST', '/payouts', { body: response });

    getNameControl().type('abc');
    getAmountControl().clear().type('100');

    getExpenseAddButton().should('be.enabled').click();

    getNameControl().type('def');
    getAmountControl().clear().type('50');

    getExpenseAddButton().should('be.enabled').click();
    getSettleButton().should('be.enabled').click();

    const payoutModal = getPayoutModal();

    payoutModal.contains('No payouts available.');
  });

  it('should show error message if API fails', () => {
    cy.intercept('POST', '/payouts', { body: [], statusCode: 400 });

    getNameControl().type('abc');
    getAmountControl().clear().type('100');

    getExpenseAddButton().should('be.enabled').click();

    getNameControl().type('def');
    getAmountControl().clear().type('50');

    getExpenseAddButton().should('be.enabled').click();
    getSettleButton().should('be.enabled').click();

    cy.get('.text-red-700').contains('Error occured while fetching payouts.');
  });
});
