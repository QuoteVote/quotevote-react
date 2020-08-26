describe("Login", () => {
  it("has username and password field", () => {
    cy.visit("http://localhost:3000/auth/login-page");
    cy.get("input[id=username]");
    cy.get("input[id=password]");
  });

  it("can login with default account", () => {
    cy.visit("http://localhost:3000/auth/login-page");
    cy.get("#username").type("hhsb");
    cy.get("#password").type("hhsb");
    cy.get("button[id=login-button]").click();
  });

  it("should display error message if wrong credentials", () => {
    cy.visit("http://localhost:3000/auth/login-page");
    cy.get("#username").type("test");
    cy.get("#password").type("test");
    cy.get("button[id=login-button]").click();
    cy.get("#password-text").should("contain", "Invalid username or password");
  });
});

describe("Trending Content", () => {
  before("setting pre-tests...", () => {
    cy.clearLocalStorage();
    cy.clearCookies();
    // cy.visit("http://localhost:3000/auth/login-page");
    // cy.get("#username").type("hhsb");
    // cy.get("#password").type("hhsb");
    // cy.get("button[id=login-button]").click();
  });

  it("is inside trending content", () => {
    const title = "A new title test";
    const text = "Lorem Ipsum...";

    cy.visit("http://localhost:3000/auth/login-page");
    cy.get("#username").click();
    cy.get("#username").type("hhsb");
    cy.get("#password").click();
    cy.get("#password").type("hhsb");
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
});
