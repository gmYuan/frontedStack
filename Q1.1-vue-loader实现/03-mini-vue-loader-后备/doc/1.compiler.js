const compiler = require('vue/compiler-sfc');
const vueSource = `
<script>
console.log('App');
</script>
`;
const { descriptor } = compiler.parse(vueSource);
console.log(descriptor);

/**
{
  template: null,
  script: {
    type: 'script',
    content: "\nconsole.log('App');\n",
  },
  styles: [],
 */