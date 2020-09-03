describe("Post Page", () => {
  const title = "A new title test";
  const text = "Lorem Ipsum...";
  const username = Cypress.env("test_username");
  const password = Cypress.env("test_password");
  const baseUrl = Cypress.env("root_url");

  before("setting pre-tests...", () => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it("is able to submit a content or post", () => {
    cy.visit(baseUrl);
    cy.get("#username").click();
    cy.get("#username").type(username);
    cy.get("#password").click();
    cy.get("#password").type(password);
    cy.get("#login-button > .MuiButton-label").click();
    cy.get("#submit-post-button path").click();
    cy.get("#title-input").click();
    cy.get("#title-input").type(title);
    cy.get("#post").click();
    cy.get("#post").type(text);
    cy.get("div > .MuiFormControl-root").click();
    cy.get("body").click();
    cy.get(".MuiButtonBase-root:nth-child(11)").click();
    cy.get(".MuiButton-label").click();
    cy.get("form").submit();
    cy.get(".btn").click();
  });

  it("is able to highlight word", () => {
    cy.visit(baseUrl);
    cy.get("#username").click();
    cy.get("#username").type(username);
    cy.get("#password").click();
    cy.get("#password").type(password);
    cy.get("#login-button > .MuiButton-label").click();
    cy.get("#submit-post-button path").click();
    cy.get("#title-input").click();
    cy.get("#title-input").type(title);
    cy.get("#post").click();
    cy.get("#post").type(text);
    cy.get("div > .MuiFormControl-root").click();
    cy.get("body").click();
    cy.get(".MuiButtonBase-root:nth-child(11)").click();
    cy.get(".MuiButton-label").click();
    cy.get("form").submit();
    cy.get(".btn").click();
    cy.get(".MuiContainer-root").click();
    cy.get(".MuiButtonBase-root:nth-child(3) .MuiSvgIcon-root").click();
    cy.get(".MuiInputBase-input").click();
    cy.get(".MuiInputBase-input").type("teset");
    cy.get(".jss441 > .MuiButton-label").click();
  });
});
