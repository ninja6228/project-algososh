import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';
import { base, changing } from '../constants/stateCircle';
import { arrText } from '../constants/testConst';
import { HEAD, TAIL } from '../../src/constants/element-captions';

describe('Тестирование страницы "Очередь"', () => {
  beforeEach(() => {
    cy.visit('#/queue');
    cy.contains("Очередь");
    cy.get('button[type=submit]').as('buttonAdd');
    cy.get('button[type=reset]').as('buttonReset');
    cy.contains('Удалить').as('buttonDelete');
  })

  it('Состояние кнопки "Добавить" при пустом инпуте', () => {
    cy.get('input').should('have.value', '');
    cy.get(`@buttonAdd`).should('be.disabled');
  });

  it('Состояние кнопки "Добавить" при корректно заполненном инпуте', () => {
    cy.get('input').type("test");
    cy.get(`@buttonAdd`).should('not.be.disabled');
  });

  it('Пошаговая проверка корректности выполненной операции и стилей при добавлении элемента', () => {
    cy.get('input').type(arrText[0]);
    cy.get('@buttonAdd').click();
    cy.get("[class*='circle_circle']").as('circles');

    cy.get("@circles").should(($circle) => {
      expect($circle).to.have.length(7);
      expect($circle.eq(0)).to.contain(arrText[0]).to.have.css('border', changing);
      expect($circle.eq(0).prev('div')).to.contain(HEAD);
      expect($circle.eq(0).next('p')).to.contain(0);
      expect($circle.eq(0).next('p').next('div')).to.contain(TAIL);
    });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("@circles").should(($circle) => {
      expect($circle).to.have.length(7);
      expect($circle.eq(0)).to.contain(arrText[0]).to.have.css('border', base);
      expect($circle.eq(0).prev('div')).to.contain(HEAD);
      expect($circle.eq(0).next('p')).to.contain(0);
      expect($circle.eq(0).next('p').next('div')).to.contain(TAIL);
    });

    cy.get('input').type(arrText[1]);
    cy.get('@buttonAdd').click();

    cy.get("@circles").should(($circle) => {
      expect($circle).to.have.length(7);
      expect($circle.eq(0)).to.contain(arrText[0]).to.have.css('border', base);
      expect($circle.eq(0).prev('div')).to.contain(HEAD);
      expect($circle.eq(0).next('p')).to.contain(0);
      expect($circle.eq(1)).to.contain(arrText[1]).to.have.css('border', changing);
      expect($circle.eq(1).next('p')).to.contain(1);
      expect($circle.eq(1).next('p').next('div')).to.contain(TAIL);
    });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("@circles").should(($circle) => {
      expect($circle).to.have.length(7);
      expect($circle.eq(0)).to.contain(arrText[0]).to.have.css('border', base);
      expect($circle.eq(0).prev('div')).to.contain(HEAD);
      expect($circle.eq(0).next('p')).to.contain(0);
      expect($circle.eq(1)).to.contain(arrText[1]).to.have.css('border', base);
      expect($circle.eq(1).next('p')).to.contain(1);
      expect($circle.eq(1).next('p').next('div')).to.contain(TAIL);
    });
  });

  it('Пошаговая проверка корректности выполненной операции и стилей при удалении элемента', () => {
    arrText.forEach((text) => {
      cy.get('input').type(text);
      cy.get('@buttonAdd').click();
      cy.wait(SHORT_DELAY_IN_MS);
    })
    cy.get("[class*='circle_circle']").as('circles');
    cy.get('@buttonDelete').click();

    cy.get("@circles").should(($circle) => {
      expect($circle).to.have.length(7)
      expect($circle.eq(0)).to.contain(arrText[0]).to.have.css('border', changing);
      expect($circle.eq(0).prev('div')).to.contain(HEAD);
      expect($circle.eq(0).next('p')).to.contain(0);
      expect($circle.eq(1)).to.contain(arrText[1]).to.have.css('border', base);
      expect($circle.eq(1).next('p')).to.contain(1);
      expect($circle.eq(1).next('p').next('div')).to.contain(TAIL);
    });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("@circles").should(($circle) => {
      expect($circle).to.have.length(7);
      expect($circle.eq(0)).to.contain('').to.have.css('border', base);
      expect($circle.eq(0).prev('div')).to.contain('');
      expect($circle.eq(0).next('p')).to.contain(0);
      expect($circle.eq(1)).to.contain(arrText[1]).to.have.css('border', base);
      expect($circle.eq(1).next('p')).to.contain(1);
      expect($circle.eq(1).prev('div')).to.contain(HEAD);
      expect($circle.eq(1).next('p').next('div')).to.contain(TAIL);
    });

    cy.get('@buttonDelete').click();

    cy.get("@circles").should(($circle) => {
      expect($circle).to.have.length(7);
      expect($circle.eq(1)).to.contain(arrText[1]).to.have.css('border', changing);
      expect($circle.eq(1).next('p')).to.contain(1);
      expect($circle.eq(1).prev('div')).to.contain(HEAD);
      expect($circle.eq(1).next('p').next('div')).to.contain(TAIL);
    });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("@circles").should(($circle) => {
      expect($circle).to.have.length(7);
      expect($circle.eq(1)).to.contain('').to.have.css('border', base);
      expect($circle.eq(1).next('p')).to.contain(1);
      expect($circle.eq(1).prev('div')).to.contain('');
      expect($circle.eq(1).next('p').next('div')).to.contain('');
      expect($circle.eq(2).prev('div')).to.contain(HEAD);
    });
  });

  it('Пошаговая проверка корректности выполненной операции и стилей при нажатие кнопки "Очистить"', () => {
    arrText.forEach((text) => {
      cy.get('input').type(text);
      cy.get('@buttonAdd').click();
      cy.wait(SHORT_DELAY_IN_MS);
    });
    cy.get("[class*='circle_circle']").as('circles');

    cy.get('@buttonReset').click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("@circles").should(($circle) => {
      expect($circle).to.have.length(7)
      for (let i = 0; i < $circle.length; i++) {
        expect($circle.eq(i)).to.contain('').to.have.css('border', base)
        expect($circle.eq(i).prev('div')).to.contain('')
        expect($circle.eq(i).next('p')).to.contain(i)
        expect($circle.eq(i).next('p').next('div')).to.contain('')
      };
    });
  });
});