
describe('home page', () => {

  it('should render h1', () => {
    cy.visit('http://localhost:3000/');
    cy.get('h1').contains('Gotta Catch \'Em All!')
  });

  it('should have a link to the captured pokemon page', () => {
    cy.visit('http://localhost:3000/');
    cy.get('button').contains('Your Pokemon List (0)').click();
    cy.url().should('include', '/pokemon/captured');
    cy.get('svg').click();
    cy.url().should('equal', 'http://localhost:3000/');
  })

  it('should have a link to the pokemon details page', () => {
    cy.visit('http://localhost:3000/');
    cy.get('#bulbasaur > button').contains('Details').click();
    cy.url().should('include', '/pokemon/bulbasaur');
  })

}) 

export {}