module.exports = {
  stories: [
    '../libs/ui/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],
  addons: ["@storybook/addon-links", '@storybook/addon-essentials', "storybook-addon-designs"],
  framework: '@storybook/angular',
  core: {
    builder: 'webpack5',
  },
};
