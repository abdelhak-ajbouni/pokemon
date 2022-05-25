
describe('captured page', () => {

  it('should remove from list after release', () => {
    cy.visit('http://localhost:3000/pokemon/bulbasaur');
    cy.get('button').contains('Catch').click();
    cy.get('input').type('test');
    cy.get('button').contains('Add').click();
    cy.visit('http://localhost:3000/pokemon/captured');
    cy.get('button').contains('Release').click();
    cy.get('#bulbasaur').should('not.exist')
  })

}) 

export {}