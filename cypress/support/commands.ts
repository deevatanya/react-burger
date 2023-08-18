/* eslint-disable @typescript-eslint/no-unused-vars */
/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject = any> {
        login(): Chainable<any>;
      }
};

Cypress.Commands.add('login', () => {
    cy.visit('/login');

    cy.get('input[name="email"]').type('cat@cat.com');
    cy.get('input[name="password"]').type('testpass');
    cy.contains('button', 'Вход').click();
 });
