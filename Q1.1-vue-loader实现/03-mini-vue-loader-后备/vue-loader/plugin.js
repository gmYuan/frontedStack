const ruleResource = (query, resource) => `${resource}.${query.get('lang')}`
class VueLoaderPlugin {
  apply(compiler) {
    const rules = compiler.options.module.rules;
    //在所有的模块解析规则的最前面加一个pitcher的规则，也就是添加一个rule
    const pitcher = {
      loader: require.resolve('./pitcher'),
      resourceQuery: (query) => {
        if (!query) return false;
        let parsed = new URLSearchParams(query.slice(1));
        return parsed.get('vue') !== null;
      }
    }
    const templateCompilerRule = {
      loader: require.resolve('./templateLoader'),
      resourceQuery: (query) => {
        if (!query) return false;
        let parsed = new URLSearchParams(query.slice(1));
        return parsed.get('vue') !== null && parsed.get('type') === 'template';
      }
    }
    const vueRule = rules.find(rule => 'foo.vue'.match(rule.test));
    const cloneRules = rules.filter(rule => rule !== vueRule).map(cloneRule);
    compiler.options.module.rules = [pitcher, ...cloneRules, templateCompilerRule, ...rules];
  }
}
function cloneRule(rule) {
  let currentResource;
  const result = Object.assign(Object.assign({}, rule), {
    resource: resource => {
      //C:\aproject\vueloader20220828\src\App.vue
      currentResource = resource;
      return true;
    },
    resourceQuery: query => {
      if (!query) return false;
      const parsed = new URLSearchParams(query.slice(1));
      if (parsed.get('vue') === null) {
        return false;
      }
      //parsed={type:'style',lang:}
      //C:\aproject\vueloader20220828\src\App.vue.css
      const fakeResourcePath = ruleResource(parsed, currentResource);
      if (!fakeResourcePath.match(rule.test)) {
        return false;
      }
      return true;
    }
  });
  delete result.test;
  return result;
}
module.exports = VueLoaderPlugin;