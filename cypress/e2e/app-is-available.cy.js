describe('Приложение работает', () => {
  it('Подключение к главной странице', () => {
    cy.visit('/');
    cy.contains('МБОУ АЛГОСОШ')
  });
}); 