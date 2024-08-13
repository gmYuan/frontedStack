const ruleResource = (queryMap, resource) => `${resource}.${queryMap.get('lang')}`
class VueLoaderPlugin {
  apply(compiler) {
    const rules = compiler.options.module.rules;
    // pitcherRule
    const pitcherRule = {
      loader: require.resolve("./pitcher"),
      resourceQuery: (query) => {
        if (!query) return false;
        let parsed = new URLSearchParams(query.slice(1));
        return parsed.get("vue") !== null;
      },
    };
    // templateRule
    const templateRule = {
      loader: require.resolve("./templateLoader"),
      resourceQuery: (query) => {
        if (!query) return false;
        let parsed = new URLSearchParams(query.slice(1));
        return parsed.get("vue") !== null && parsed.get("type") === "template";
      },
    };

    // 通过cloneRules，来直接解析template/script/style对应的类型js/ts/css等类型
    const vueRule = rules.find(rule => 'foo.vue'.match(rule.test))
    const clonedRules = rules.filter(rule => rule !== vueRule).map(cloneRule)
    compiler.options.module.rules = [pitcherRule, ...clonedRules, templateRule, ...rules];
  }
}

function cloneRule(rule) {
  let currentResource
  const newRule = Object.assign(Object.assign({}, rule), {
    resource: resource => {
      currentResource = resource;
      return true;
    },
    resourceQuery: query => {
      if (!query) return false;
      // parseMap = { type:'style',lang: 'css' }
      const parseMap = new URLSearchParams(query.slice(1))
      if (parseMap.get('vue') == null) {
        return false
      }
      // 在resource后面，拼接上queryMap中的lang属性，从而使其可以匹配到 lang属性值对应的处理loaders
      const fakeResourcePath = ruleResource(parseMap, currentResource)
      return fakeResourcePath.match(rule.test)
    }
  })
  delete newRule.test
  return newRule
}

module.exports = VueLoaderPlugin;
