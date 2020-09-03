describe("Login", () => {
  const username = Cypress.env("test_username");
  const password = Cypress.env("test_password");
  const baseUrl = Cypress.env("root_url");

  it("has username and password field", () => {
    cy.visit(baseUrl);
    cy.get("input[id=username]");
    cy.get("input[id=password]");
  });

  it("can login with default account", () => {
    cy.visit(baseUrl);
    cy.get("#username").type(username);
    cy.get("#password").type(password);
    cy.get("button[id=login-button]").click();
  });

  it("should display error message if wrong credentials", () => {
    cy.visit(baseUrl);
    cy.get("#username").type("test");
    cy.get("#password").type("test");
    cy.get("button[id=login-button]").click();
    cy.get("#password-text").should("contain", "Invalid username or password");
  });
});
