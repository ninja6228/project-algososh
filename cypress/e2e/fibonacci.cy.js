import { base } from '../constants/stateCircle';
import { arrfibonacci } from '../constants/testConst';

describe('Тестирование страницы "Фибоначчи"', () => {
  beforeEach(() => {
    cy.visit("#/fibonacci");
    cy.contains("Последовательность Фибоначчи");
    cy.get('button[type=submit]').as(`button`);
  });

  it('Состояние кнопки при пустом инпуте', () => {
    cy.get('input').should('have.value', '');
    cy.get('@button').should('be.disabled');
  });

  it('Состояние кнопки если ввели число больше допустимого', () => {
    cy.get('input').type('151');
    cy.get('@button').should('be.disabled');
  });

  it('Состояние кнопки при корректно заполненном инпуте', () => {
    cy.get('input').type('5');
    cy.get('@button').should('not.be.disabled');
  });

  it('Проверка корректности выполненной операции и стилей', () => {
    cy.get('input').type('4');
    cy.get('@button').click();
    cy.get("[class*='circle_circle']").as('circles');

    cy.get('@circles').should(($circle) => {
      expect($circle).to.have.length(5);
      for (let i = 0; i < $circle.length; i++) {
        expect($circle.eq(i)).to.contain(arrfibonacci[i]).to.have.css('border', base);
        expect($circle.eq(i).next('p')).to.contain(i);
      };
    });
  });
});