import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';
import { base, changing, modified } from '../constants/stateCircle';
import { strEven, strNotEven, strOneLetter } from '../constants/testConst';

describe('Тестирование страницы "Строка"', () => {
  beforeEach(() => {
    cy.visit("#/recursion");
    cy.contains("Строка");
    cy.get('button[type=submit]').as(`button`);
  })

  it('Состояние кнопки при пустом инпуте', () => {
    cy.get('input').should('have.value', '');
    cy.get('@button').should('be.disabled')
  })

  it('Состояние кнопки при заполненном инпуте', () => {
    cy.get('input').type('state');
    cy.get('@button').should('not.be.disabled')
  })

  it('Пошаговая проверка корректности выполненной операции и стилей с чётным количеством символов', () => {
    cy.get('input').type(strEven)
    cy.get('@button').click();
    cy.get("[class*='circle_circle']").as('circles')

    cy.get('@circles').should(($circle) => {
      expect($circle).to.have.length(strEven.length)
      expect($circle.eq(0)).to.contain(strEven[0]).to.have.css('border', changing)
      expect($circle.eq(1)).to.contain(strEven[1]).to.have.css('border', base)
      expect($circle.eq(2)).to.contain(strEven[2]).to.have.css('border', base)
      expect($circle.eq(3)).to.contain(strEven[3]).to.have.css('border', changing)
    })
    cy.wait(SHORT_DELAY_IN_MS)

    cy.get('@circles').should(($circle) => {
      expect($circle).to.have.length(strEven.length)
      expect($circle.eq(0)).to.contain(strEven[3]).to.have.css('border', modified)
      expect($circle.eq(1)).to.contain(strEven[1]).to.have.css('border', changing)
      expect($circle.eq(2)).to.contain(strEven[2]).to.have.css('border', changing)
      expect($circle.eq(3)).to.contain(strEven[0]).to.have.css('border', modified)
    })
    cy.wait(SHORT_DELAY_IN_MS)

    cy.get('@circles').should(($circle) => {
      expect($circle).to.have.length(strEven.length)
      expect($circle.eq(0)).to.contain(strEven[3]).to.have.css('border', modified)
      expect($circle.eq(1)).to.contain(strEven[2]).to.have.css('border', modified)
      expect($circle.eq(2)).to.contain(strEven[1]).to.have.css('border', modified)
      expect($circle.eq(3)).to.contain(strEven[0]).to.have.css('border', modified)
    })
  })

  it('Пошаговая проверка корректности выполненной операции и стилей с нечётным количеством символов', () => {
    cy.get('input').type(strNotEven)
    cy.get('button[type=submit]').click();
    cy.get("[class*='circle_circle']").as('circles')

    cy.get('@circles').should(($circle) => {
      expect($circle).to.have.length(strNotEven.length)
      expect($circle.eq(0)).to.contain(strNotEven[0]).to.have.css('border', changing)
      expect($circle.eq(1)).to.contain(strNotEven[1]).to.have.css('border', base)
      expect($circle.eq(2)).to.contain(strNotEven[2]).to.have.css('border', changing)
    })
    cy.wait(SHORT_DELAY_IN_MS)

    cy.get('@circles').should(($circle) => {
      expect($circle).to.have.length(strNotEven.length)
      expect($circle.eq(0)).to.contain(strNotEven[2]).to.have.css('border', modified)
      expect($circle.eq(1)).to.contain(strNotEven[1]).to.have.css('border', changing)
      expect($circle.eq(2)).to.contain(strNotEven[0]).to.have.css('border', modified)
    })
    cy.wait(SHORT_DELAY_IN_MS)

    cy.get('@circles').should(($circle) => {
      expect($circle).to.have.length(strNotEven.length)
      expect($circle.eq(0)).to.contain(strNotEven[2]).to.have.css('border', modified)
      expect($circle.eq(1)).to.contain(strNotEven[1]).to.have.css('border', modified)
      expect($circle.eq(2)).to.contain(strNotEven[0]).to.have.css('border', modified)
    })
  })

  it('Пошаговая проверка корректности выполненной операции и стилей с одним символом', () => {
    cy.get('input').type(strOneLetter)
    cy.get('button[type=submit]').click();
    cy.get("[class*='circle_circle']").as('circles')

    cy.get('@circles').should(($circle) => {
      expect($circle).to.have.length(strOneLetter.length)
      expect($circle.eq(0)).to.contain(strOneLetter[0]).to.have.css('border', changing)
    })
    cy.wait(SHORT_DELAY_IN_MS)

    cy.get('@circles').should(($circle) => {
      expect($circle).to.have.length(strOneLetter.length)
      expect($circle.eq(0)).to.contain(strOneLetter[0]).to.have.css('border', modified)
    })
  })
})