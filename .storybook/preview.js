import React from "react";
import { addDecorator, addParameters } from "@storybook/react";
import { withTests } from "@storybook/addon-jest";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "../src/config/apollo";
import { withConsole } from "@storybook/addon-console";

import "@storybook/addon-console";
import StylesDecorator from './styles-decorator'
import ReduxDecorator from './redux-decorator'
import ReactRouterDomDecorator from './react-router-dom-decorator'

// import results from ".storybook/.jest-test-results.json";
const results = require("./.jest-test-results.json");

// It's a special token that doesn't expired
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Impkb2VAZW1haWwuY29tIiwiX2lkIjoiNTliMDAzNzUwZTM3NjYwNDE0NDAxNzFmIiwiYWRtaW4iOnRydWUsImlhdCI6MTU5NDQ1MDQ0OH0.c7wwO3HmINqoER5zK8LcUL_Cz8lI5YCaMinrIVNa8cM";
localStorage.setItem("token", token);

addDecorator((storyFn, context) => withConsole()(storyFn)(context));

addParameters({
  backgrounds: [
    { name: "twitter", value: "#00aced" },
    { name: "facebook", value: "#3b5998" },
    { name: "voxpox primary", value: "#00cf6e", default: true },
    { name: "voxpox secondary", value: "#fafafa" },
  ],
});

// Enable use of graphql in stories
addDecorator((storyFn) => (
  <ApolloProvider client={client}> {storyFn()} </ApolloProvider>
));

addDecorator(
  withTests({
    results,
  })
);

// For Material-UI style decorator
addDecorator(StylesDecorator)

// For RTK decorator
addDecorator(ReduxDecorator)

//For react-router-dom decorator
addDecorator(ReactRouterDomDecorator)
