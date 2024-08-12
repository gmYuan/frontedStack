class VueLoaderPlugin {
  apply(compiler) {
    const rules = compiler.options.module.rules;
    const pitcherRule = {
      loader: require.resolve("./pitcher"),
      resourceQuery: (query) => {
        if (!query) return false;
        let parsed = new URLSearchParams(query.slice(1));
        return parsed.get("vue") !== null;
      },
    };
    const templateRule = {
      loader: require.resolve("./templateLoader"),
      resourceQuery: (query) => {
        if (!query) return false;
        let parsed = new URLSearchParams(query.slice(1));
        return parsed.get("vue") !== null && parsed.get("type") === "template";
      },
    };

    compiler.options.module.rules = [pitcherRule, templateRule, ...rules];
  }
}

module.exports = VueLoaderPlugin;
