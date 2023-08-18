import {locators as l} from './locators'; 

describe('constructor page', () => {
    beforeEach(() => {
        cy.visit('/');
    });
    it('should open (without auth)', () => {
        cy.url().should('eq', Cypress.config().baseUrl + '/');
        cy.get(l.INGREDIENTS_COL).should('be.visible');
        cy.get(l.CONSTRUCTOR_COL).should('be.visible');

    });
    it('should add ingridients to constructor (without auth)', () => {
        // bun
        cy.get(l.BUNS_DIV)
            .should('be.visible')
            .find(l.INGREDIENT_CARD).eq(0)
            .should('be.visible')
            .trigger('dragstart');
        cy.get(l.CONSTRUCTOR_COL)
            .should('be.visible')
            .trigger('drop');
        cy.get(l.CONSTRUCTOR_COL)
            .find(l.CONSTRUCTOR_ITEM)
            .should('be.visible')
            .and('have.length', 2);

        // sauce
        cy.get(l.SAUCES_DIV)
            .should('be.visible')
            .find(l.INGREDIENT_CARD).eq(0)
            .should('be.visible')
            .trigger('dragstart');
        cy.get(l.CONSTRUCTOR_COL)
            .should('be.visible')
            .trigger('drop');
        cy.get(l.CONSTRUCTOR_COL)
            .find(l.CONSTRUCTOR_ITEM)
            .should('be.visible')
            .and('have.length', 3);
                    
        // main
        cy.get(l.MAINS_DIV)
            .should('be.visible')
            .find(l.INGREDIENT_CARD).eq(0)
            .should('be.visible')
            .trigger('dragstart');
        cy.get(l.CONSTRUCTOR_COL)
            .should('be.visible')
            .trigger('drop');
        cy.get(l.CONSTRUCTOR_COL)
            .find(l.CONSTRUCTOR_ITEM)
            .should('be.visible')
            .and('have.length', 4);
    });
    it('should create an order (with auth)', () => {
        cy.login();

        // bun
        cy.get(l.BUNS_DIV).find(l.INGREDIENT_CARD).eq(0).trigger('dragstart');
        cy.get(l.CONSTRUCTOR_COL).trigger('drop');
        // sauce
        cy.get(l.SAUCES_DIV).find(l.INGREDIENT_CARD).eq(0).trigger('dragstart');
        cy.get(l.CONSTRUCTOR_COL).trigger('drop');       
        // main
        cy.get(l.MAINS_DIV).find(l.INGREDIENT_CARD).eq(0).trigger('dragstart');
        cy.get(l.CONSTRUCTOR_COL).trigger('drop');

        cy.get(l.CONSTRUCTOR_COL)
            .find(l.CONSTRUCTOR_ITEM)
            .should('be.visible')
            .and('have.length', 4);
        cy.contains(l.BUTTON, 'Оформить заказ').should('be.visible').click();

        cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', (req) => {
            cy.get(l.MODAL_CARD)
                .should('be.visible')
                .find(l.ORDER_NUMBER)
                .should('have.text', req.body.order?.number);
        });


    })
})