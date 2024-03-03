describe('end-to-end tests', () => {
  it('opens< the front page', () => {
    expect.assertions(0);
    cy.visit('/');
  });
});
