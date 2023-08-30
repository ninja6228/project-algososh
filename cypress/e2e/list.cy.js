import { base, changing, modified } from '../constants/stateCircle';
import { initialArray, arrText } from '../constants/testConst';
import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';
import { HEAD, TAIL } from '../../src/constants/element-captions';

describe('Тестирование страницы "Список"', () => {
  beforeEach(() => {
    cy.visit("#/list");
    cy.contains("Связный список");
    cy.contains('Удалить из head').as('buttonDelHead');
    cy.contains('Удалить из tail').as('buttonDelTail');
    cy.contains('Удалить по индексу').as('buttonDelIndex');
    cy.contains('Добавить в head').as('buttonAddHead');
    cy.contains('Добавить в tail').as('buttonAddTail');
    cy.contains('Добавить по индексу').as('buttonAddIndex');
    cy.get('input[type="text"]').as('inputText');
    cy.get('input[type="number"]').as('inputIndex');
  });

  it('Состояние кнопки "Добавить в head" и "Добавить в tail" при пустом инпуте "Введите значение"', () => {
    cy.get('@inputText').should('have.value', '');
    cy.get(`@buttonAddHead`).should('be.disabled');
    cy.get(`@buttonAddTail`).should('be.disabled');
  });

  it('Состояние кнопки "Добавить в head" и "Добавить в tail" при заполненном инпуте "Введите значение"', () => {
    cy.get('@inputText').type("test");
    cy.get(`@buttonAddHead`).should('not.be.disabled');
    cy.get(`@buttonAddTail`).should('not.be.disabled');
  });

  it('Состояние кнопки "Добавить по индексу" и "Удалить по индексу" при пустых инпутах', () => {
    cy.get('@inputText').should('have.value', '');
    cy.get('@inputIndex').should('have.value', '');
    cy.get(`@buttonDelIndex`).should('be.disabled');
    cy.get(`@buttonAddIndex`).should('be.disabled');
  });

  it('Состояние кнопки "Добавить по индексу" и "Удалить по индексу" если заполнен только инпут "Введите значение"', () => {
    cy.get('@inputText').type("test");
    cy.get('@inputIndex').should('have.value', '');
    cy.get(`@buttonDelIndex`).should('be.disabled');
    cy.get(`@buttonAddIndex`).should('be.disabled');
  });

  it('Состояние кнопки "Добавить по индексу" и "Удалить по индексу" если заполнен только инпут "Введите индекс"', () => {
    cy.get('@inputText').should('have.value', '');
    cy.get('@inputIndex').type(2);
    cy.get(`@buttonDelIndex`).should('not.be.disabled');
    cy.get(`@buttonAddIndex`).should('be.disabled');
  });

  it('Состояние кнопки "Добавить по индексу" и "Удалить по индексу" если заполнен все инпуты', () => {
    cy.get('@inputText').type('test');
    cy.get('@inputIndex').type(2);
    cy.get(`@buttonDelIndex`).should('not.be.disabled');
    cy.get(`@buttonAddIndex`).should('not.be.disabled');
  });

  it("Корректная отрисовка дефолтного списка", () => {
    cy.get("[data-test-id='circle']").as('circle');

    cy.get("@circle").should(($circle) => {
      expect($circle).to.have.length(initialArray.length);
      for (let i = 0; i < initialArray.length - 1; i++) {
        expect($circle.eq(i)).to.contain(initialArray[i]).to.have.css('border', base);
        expect($circle.eq(i).next('p')).to.contain(i);
      };
      expect($circle.eq(0).prev('div')).to.contain(HEAD);
      expect($circle.eq(3).next('p').next('div')).to.contain(TAIL);
    });
  });

  it('Пошаговая проверка корректности выполненной операции и стилей при добавлении элемента в head', () => {
    cy.get('@inputText').type(arrText[0]);
    cy.get('@buttonAddHead').click();
    cy.get('[data-test-id="circle"]').as('cirle');

    cy.get('@cirle').should(($circle) => {
      expect($circle).to.have.length(5);
      expect($circle.eq(0)).to.contain(arrText[0]).to.have.css('border', changing);
    });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@cirle').should(($circle) => {
      expect($circle).to.have.length(5);
      expect($circle.eq(0)).to.contain(arrText[0]).to.have.css('border', modified);
      expect($circle.eq(0).prev('div')).to.contain(HEAD);
      expect($circle.eq(0).next('p')).to.contain(0);
    });;
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@cirle').should(($circle) => {
      expect($circle).to.have.length(5);
      expect($circle.eq(0)).to.contain(arrText[0]).to.have.css('border', base);
      expect($circle.eq(0).prev('div')).to.contain(HEAD);
      expect($circle.eq(0).next('p')).to.contain(0);
    });

    cy.get('@inputText').type(arrText[1]);
    cy.get('@buttonAddHead').click();

    cy.get('@cirle').should(($circle) => {
      expect($circle).to.have.length(6);
      expect($circle.eq(0)).to.contain(arrText[1]).to.have.css('border', changing);
    });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@cirle').should(($circle) => {
      expect($circle).to.have.length(6);
      expect($circle.eq(0)).to.contain(arrText[1]).to.have.css('border', modified);
      expect($circle.eq(0).prev('div')).to.contain(HEAD);
      expect($circle.eq(0).next('p')).to.contain(0);
    });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@cirle').should(($circle) => {
      expect($circle).to.have.length(6);
      expect($circle.eq(0)).to.contain(arrText[1]).to.have.css('border', base);
      expect($circle.eq(0).prev('div')).to.contain(HEAD);
      expect($circle.eq(0).next('p')).to.contain(0);
    });
  });

  it('Пошаговая проверка корректности выполненной операции и стилей при добавлении элемента в tail', () => {
    cy.get('@inputText').type(arrText[0]);
    cy.get('@buttonAddTail').click();
    cy.get('[data-test-id="circle"]').as('cirle');

    cy.get('@cirle').should(($circle) => {
      expect($circle).to.have.length(5);
      expect($circle.eq(3)).to.contain(arrText[0]).to.have.css('border', changing);
    });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@cirle').should(($circle) => {
      expect($circle).to.have.length(5);
      expect($circle.eq(4)).to.contain(arrText[0]).to.have.css('border', modified);
      expect($circle.eq(4).next('p').next('div')).to.contain(TAIL);
      expect($circle.eq(4).next('p')).to.contain(4);
    });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@cirle').should(($circle) => {
      expect($circle).to.have.length(5);
      expect($circle.eq(4)).to.contain(arrText[0]).to.have.css('border', base);
      expect($circle.eq(4).next('p').next('div')).to.contain(TAIL);
      expect($circle.eq(4).next('p')).to.contain(4);
    });

    cy.get('@inputText').type(arrText[1]);
    cy.get('@buttonAddTail').click();

    cy.get('@cirle').should(($circle) => {
      expect($circle).to.have.length(6);
      expect($circle.eq(initialArray.length)).to.contain(arrText[1]).to.have.css('border', changing);
    });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@cirle').should(($circle) => {
      expect($circle).to.have.length(6);
      expect($circle.eq(5)).to.contain(arrText[1]).to.have.css('border', modified);
      expect($circle.eq(5).next('p').next('div')).to.contain(TAIL);
      expect($circle.eq(5).next('p')).to.contain(5);
    });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@cirle').should(($circle) => {
      expect($circle).to.have.length(6);
      expect($circle.eq(5)).to.contain(arrText[1]).to.have.css('border', base);
      expect($circle.eq(5).next('p').next('div')).to.contain(TAIL);
      expect($circle.eq(5).next('p')).to.contain(5);
    });
  });

  it('Пошаговая проверка корректности выполненной операции и стилей при удалении элемента в head', () => {
    cy.get('@buttonDelHead').click();
    cy.get('[data-test-id="circle"]').as('cirle');

    cy.get('@cirle').should(($circle) => {
      expect($circle).to.have.length(5);
      expect($circle.eq(0)).to.contain('').to.have.css('border', base);
      expect($circle.eq(1)).to.contain(initialArray[0]).to.have.css('border', changing);
      expect($circle.eq(0).prev('div')).to.contain(HEAD);
    });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@cirle').should(($circle) => {
      expect($circle).to.have.length(3);
      expect($circle.eq(0)).to.contain(initialArray[1]).to.have.css('border', base);
      expect($circle.eq(0).next('p')).to.contain(0);
      expect($circle.eq(0).prev('div')).to.contain(HEAD);
    });

    cy.get('@buttonDelHead').click();

    cy.get('@cirle').should(($circle) => {
      expect($circle).to.have.length(4);
      expect($circle.eq(0)).to.contain('').to.have.css('border', base);
      expect($circle.eq(0).prev('div')).to.contain(HEAD);
      expect($circle.eq(1)).to.contain(initialArray[1]).to.have.css('border', changing);
    });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@cirle').should(($circle) => {
      expect($circle).to.have.length(2);
      expect($circle.eq(0)).to.contain(initialArray[2]).to.have.css('border', base);
      expect($circle.eq(0).next('p')).to.contain(0);
      expect($circle.eq(0).prev('div')).to.contain(HEAD);
    });
  });

  it('Пошаговая проверка корректности выполненной операции и стилей при удалении элемента в tail', () => {
    cy.get('@buttonDelTail').click();
    cy.get('[data-test-id="circle"]').as('cirle');

    cy.get('@cirle').should(($circle) => {
      expect($circle).to.have.length(5);
      expect($circle.eq(4)).to.contain(initialArray[3]).to.have.css('border', changing);
      expect($circle.eq(3).next('p')).to.contain(3);
      expect($circle.eq(3)).to.contain('').to.have.css('border', base);
    });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@cirle').should(($circle) => {
      expect($circle).to.have.length(3);
      expect($circle.eq(2)).to.contain(initialArray[2]).to.have.css('border', base);
      expect($circle.eq(2).next('p')).to.contain(2);
      expect($circle.eq(2).next('p').next('div')).to.contain(TAIL);
    });

    cy.get('@buttonDelTail').click();

    cy.get('@cirle').should(($circle) => {
      expect($circle).to.have.length(4);
      expect($circle.eq(3)).to.contain(initialArray[2]).to.have.css('border', changing);
      expect($circle.eq(2)).to.contain('').to.have.css('border', base);
    });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@cirle').should(($circle) => {
      expect($circle).to.have.length(2);
      expect($circle.eq(1)).to.contain(initialArray[1]).to.have.css('border', base);
      expect($circle.eq(1).next('p')).to.contain(1);
      expect($circle.eq(1).next('p').next('div')).to.contain(TAIL);
    });
  });

  it('Пошаговая проверка корректности выполненной операции и стилей при добавлении элемента по индексу', () => {
    cy.get('@inputText').type(arrText[0]);
    cy.get('@inputIndex').type(1);
    cy.get('@buttonAddIndex').click();
    cy.get('[data-test-id="circle"]').as('cirle');

    cy.get('@cirle').should(($circle) => {
      expect($circle).to.have.length(5);
      expect($circle.eq(0)).to.contain(arrText[0]).to.have.css('border', changing);
      expect($circle.eq(1)).to.contain(initialArray[0]).to.have.css('border', changing);
      expect($circle.eq(1).next('p')).to.contain(0);
    });
    cy.wait(SHORT_DELAY_IN_MS)

    cy.get('@cirle').should(($circle) => {
      expect($circle).to.have.length(5);
      expect($circle.eq(0).prev('div')).to.contain(HEAD);
      expect($circle.eq(1)).to.contain(arrText[0]).to.have.css('border', changing);
      expect($circle.eq(2)).to.contain(initialArray[1]).to.have.css('border', changing);
      expect($circle.eq(2).next('p')).to.contain(1);
    });
    cy.wait(SHORT_DELAY_IN_MS)

    cy.get('@cirle').should(($circle) => {
      expect($circle).to.have.length(5);
      expect($circle.eq(0).prev('div')).to.contain(HEAD);
      expect($circle.eq(0)).to.contain(initialArray[0]).to.have.css('border', base);
      expect($circle.eq(0).next('p')).to.contain(0);
      expect($circle.eq(1)).to.contain(arrText[0]).to.have.css('border', modified);
      expect($circle.eq(1).next('p')).to.contain(1);
      expect($circle.eq(2)).to.contain(initialArray[1]).to.have.css('border', base);
      expect($circle.eq(2).next('p')).to.contain(2);
    });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@cirle').should(($circle) => {
      expect($circle).to.have.length(5);
      expect($circle.eq(0).prev('div')).to.contain(HEAD);
      expect($circle.eq(0)).to.contain(initialArray[0]).to.have.css('border', base);
      expect($circle.eq(0).next('p')).to.contain(0);
      expect($circle.eq(1)).to.contain(arrText[0]).to.have.css('border', base);
      expect($circle.eq(1).next('p')).to.contain(1);
      expect($circle.eq(2)).to.contain(initialArray[1]).to.have.css('border', base);
      expect($circle.eq(2).next('p')).to.contain(2);
    });
  });

  it('Пошаговая проверка корректности выполненной операции и стилей при удалении элемента по индексу', () => {
    cy.get('@inputIndex').type(2);
    cy.get('@buttonDelIndex').click();
    cy.get('[data-test-id="circle"]').as('cirle');

    cy.get('@cirle').should(($circle) => {
      expect($circle).to.have.length(4);
      expect($circle.eq(0).prev('div')).to.contain(HEAD);
      expect($circle.eq(0)).to.contain(initialArray[0]).to.have.css('border', changing);
      expect($circle.eq(0).next('p')).to.contain(0);
    })
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@cirle').should(($circle) => {
      expect($circle).to.have.length(4);
      expect($circle.eq(1)).to.contain(initialArray[1]).to.have.css('border', changing);
      expect($circle.eq(1).next('p')).to.contain(1);
    });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@cirle').should(($circle) => {
      expect($circle).to.have.length(4);
      expect($circle.eq(2)).to.contain(initialArray[2]).to.have.css('border', changing);
      expect($circle.eq(2).next('p')).to.contain(2);
    });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@cirle').should(($circle) => {
      expect($circle).to.have.length(5);
      expect($circle.eq(0).prev('div')).to.contain(HEAD);
      expect($circle.eq(0)).to.contain(initialArray[0]).to.have.css('border', base);
      expect($circle.eq(0).next('p')).to.contain(0);
      expect($circle.eq(1)).to.contain(initialArray[1]).to.have.css('border', base);
      expect($circle.eq(1).next('p')).to.contain(1);
      expect($circle.eq(2)).to.contain('').to.have.css('border', base);
      expect($circle.eq(2).next('p')).to.contain(2);
      expect($circle.eq(3)).to.contain(initialArray[2]).to.have.css('border', changing);
      expect($circle.eq(4)).to.contain(initialArray[3]).to.have.css('border', base);
      expect($circle.eq(4).next('p')).to.contain(3);
      expect($circle.eq(4).next('p').next('div')).to.contain(TAIL);
    });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@cirle').should(($circle) => {
      expect($circle).to.have.length(3);
      expect($circle.eq(0).prev('div')).to.contain(HEAD);
      expect($circle.eq(0)).to.contain(initialArray[0]).to.have.css('border', base);
      expect($circle.eq(0).next('p')).to.contain(0);
      expect($circle.eq(1)).to.contain(initialArray[1]).to.have.css('border', base);
      expect($circle.eq(1).next('p')).to.contain(1);
      expect($circle.eq(2)).to.contain(initialArray[3]).to.have.css('border', base);
      expect($circle.eq(2).next('p')).to.contain(2);
      expect($circle.eq(2).next('p').next('div')).to.contain(TAIL);
    });
  });
});
