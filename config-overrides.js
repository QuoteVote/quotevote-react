module.exports = function override(config, env) {
  // More comprehensive approach to disable SVGR
  const rules = config.module.rules;
  
  // Find the rule that contains oneOf (this is where CRA defines its loaders)
  const oneOfRule = rules.find(rule => rule.oneOf);
  
  if (oneOfRule && oneOfRule.oneOf) {
    // Filter out any existing SVG-related rules that use SVGR
    oneOfRule.oneOf = oneOfRule.oneOf.filter(rule => {
      // Remove rules that process SVG with SVGR
      if (rule.test && rule.test.toString().includes('svg')) {
        const hasUse = rule.use || rule.loader;
        if (hasUse && JSON.stringify(hasUse).includes('@svgr/webpack')) {
          return false; // Remove this rule
        }
      }
      return true;
    });

    // Also modify any rules that might include SVG in their test pattern
    oneOfRule.oneOf.forEach(rule => {
      if (rule.test && rule.test.toString().includes('svg')) {
        // If it's an image rule that includes SVG, remove SVG from it
        if (rule.test.toString().includes('png') || rule.test.toString().includes('jpg')) {
          rule.test = /\.(png|jpg|jpeg|gif|webp|bmp|ico)$/;
        }
      }
    });

    // Add our custom SVG rule at the beginning (highest priority)
    oneOfRule.oneOf.unshift({
      test: /\.svg$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: 'static/media/[name].[hash:8].[ext]',
          },
        },
      ],
    });
  }

  return config;
}; 