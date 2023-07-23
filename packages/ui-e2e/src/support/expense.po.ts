export const getNameControl = () =>
  cy.get(':nth-child(1) > label.block > .border');

export const getAmountControl = () =>
  cy.get(':nth-child(2) > label.block > .border');

export const getExpenseAddButton = () => cy.get('.input');

export const getExpenseRow = (row: number) =>
  cy.get(`.table-row:nth-child(${row + 1})`);

export const getSettleButton = () => cy.get(':nth-child(3) > .border');

export const getPayoutModal = () => cy.get('[data-test-id="payout-modal"]');
