module.exports = {
  stories: ['../src/ui/**/*.stories.js', '../src/ui/**/**/*.stories.(js|mdx)'],
  // stories: ["../src/**/*.stories.js", "../src/**/**/*.stories.(js|mdx)"],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-backgrounds/register',
    '@storybook/addon-actions',
    '@storybook/addon-knobs',
    '@storybook/addon-links',
    '@storybook/addon-storysource',
    '@storybook/addon-a11y/register',
    {
      name: '@storybook/addon-docs',
      options: { configureJSX: true },
    },
  ],
}
