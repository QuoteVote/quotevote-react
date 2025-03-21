/* eslint-disable */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add(
  'setSelection',
  { prevSubject: true },
  (subject, query, endQuery) =>
    cy.wrap(subject).selection(($el) => {
      if (typeof query === 'string') {
        const anchorNode = getTextNode($el[0], query)
        const focusNode = endQuery ? getTextNode($el[0], endQuery) : anchorNode
        const anchorOffset = anchorNode.wholeText.indexOf(query)
        const focusOffset = endQuery
          ? focusNode.wholeText.indexOf(endQuery) + endQuery.length
          : anchorOffset + query.length
        setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset)
      } else if (typeof query === 'object') {
        const el = $el[0]
        const anchorNode = getTextNode(el.querySelector(query.anchorQuery))
        const anchorOffset = query.anchorOffset || 0
        const focusNode = query.focusQuery
          ? getTextNode(el.querySelector(query.focusQuery))
          : anchorNode
        const focusOffset = query.focusOffset || 0
        setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset)
      }
    }),
)
