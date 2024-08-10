class VueLoaderPlugin {
  apply(compiler) {
    const rules = compiler.options.module.rules;
    const pitcherRule = {
      loader: require.resolve("./pitcher.js"),
      resourceQuery: (query) => {
        if (!query) return false;
        let parsed = new URLSearchParams(query.slice(1));
        return parsed.get("vue") !== null;
      },
    };
    compiler.options.module.rules = [pitcherRule, ...rules];
  }
}

module.exports = VueLoaderPlugin;
