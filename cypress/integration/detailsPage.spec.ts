describe('details page', () => {

  it('should have an image', () => {
    cy.visit('http://localhost:3000/pokemon/bulbasaur');
    cy.get('img').should('exist');
  })

  it('should have types, moves and abilities', () => {
    cy.visit('http://localhost:3000/pokemon/bulbasaur');
    cy.get('h2').contains('Types').should('be.visible');
    cy.get('h2').contains('Moves').should('be.visible');
    cy.get('h2').contains('Abilities').should('be.visible');
  })

  it('should have catch button', () => {
    cy.visit('http://localhost:3000/pokemon/bulbasaur');
    cy.get('button').contains('Catch').should('be.visible');
  })

  it('should open modal on click catch', () => {
    cy.visit('http://localhost:3000/pokemon/bulbasaur');
    cy.get('button').contains('Catch').click();
    cy.get('h3').contains('Nice you caught it!').should('be.visible');
  })

  it('should be unable to add if empty nickname', () => {
    cy.visit('http://localhost:3000/pokemon/bulbasaur');
    cy.get('button').contains('Catch').click();
    cy.get('button').contains('Add').should('be.disabled');
  })

  it('should render release if pokemon already caught', () => {
    cy.visit('http://localhost:3000/pokemon/bulbasaur');
    cy.get('button').contains('Catch').click();
    cy.get('input').type('test');
    cy.get('button').contains('Add').click();
    cy.get('button').contains('Release').should('be.visible');
  })

})

export {}