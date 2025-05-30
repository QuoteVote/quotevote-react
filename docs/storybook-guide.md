# Storybook Guide

This project uses [Storybook](https://storybook.js.org/) so developers can view UI components in isolation.

## Running Storybook

1. Install dependencies if you haven't already:
   ```bash
   npm install --legacy-peer-deps
   ```
2. Start Storybook:
   ```bash
   npm run storybook
   ```
   This command is defined in `package.json` and launches Storybook on <http://localhost:9009>.
3. To create a static Storybook build, run:
   ```bash
   npm run build-storybook
   ```

## Where stories live

The configuration in `.storybook/main.js` loads any file matching `src/**/*.stories.js` or `src/**/**/*.stories.(js|mdx)`:
```js
module.exports = {
  stories: ["../src/**/*.stories.js", "../src/**/**/*.stories.(js|mdx)"],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-backgrounds/register',
    '@storybook/addon-actions',
    '@storybook/addon-knobs',
    '@storybook/addon-links',
    '@storybook/addon-storysource',
    '@storybook/addon-a11y/register',
    { name: '@storybook/addon-docs', options: { configureJSX: true } },
  ],
}
```
Place your `*.stories.js` files next to their components inside `src/`.

## Decorators and providers

`preview.js` sets up several decorators so stories render with the same providers as the app:
```js
// Apollo client provider
addDecorator((storyFn) => (
  <ApolloProvider client={client}> {storyFn()} </ApolloProvider>
))

// Material‑UI theme
addDecorator(StylesDecorator)

// Redux Toolkit test store
addDecorator(ReduxDecorator)

// React Router context
addDecorator(ReactRouterDomDecorator)
```
These wrappers give stories access to GraphQL, the Material‑UI theme, Redux state, and routing.

`withConsole` from `@storybook/addon-console` is also applied so that `console.log` output from your components appears in Storybook's **Actions** panel.

A dark UI theme for Storybook itself is configured in `manager.js`:
```js
import { addons } from "@storybook/addons";
import { themes } from "@storybook/theming";

addons.setConfig({
  theme: themes.dark,
});
```

## Generating components with stories

Run the plop generator to scaffold new components:
```bash
npm run generate
```
Follow the prompts to optionally include Jest tests and a Storybook file. Generated stories use the template in `internals/generators/component/stories.js.hbs`.

## Viewing Jest test results

Run the following command to generate a JSON report consumed by the `@storybook/addon-jest` addon:

```bash
npm run test:generate-output
```

This writes `.storybook/.jest-test-results.json`. With the addon enabled, each story shows the pass/fail status of its related unit tests.

## Best practices

- Add or update a story whenever you contribute a new UI component. The pull request template reminds you to “Include in Storybook.”
- When stories rely on Redux state, use the `testStore` exported from `src/store/store.js`.
- `preview.js` stores a dummy JWT token in `localStorage` so GraphQL operations succeed locally. Avoid committing real credentials.

## Publishing with Chromatic

Visual regression tests can be run with [Chromatic](https://www.chromatic.com/).
Use the script defined in `package.json`:

```bash
npm run chromatic
```

This command uploads your Storybook to Chromatic using the project token
defined in the script. A GitHub Actions workflow named `chromatic.yml_disable`
is provided—rename the file to `chromatic.yml` to enable automated publishing on
push.

For more advanced Storybook features such as controls or Chromatic visual tests,
consult the [official Storybook documentation](https://storybook.js.org/docs/react/get-started/introduction).

