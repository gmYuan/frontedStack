const qs = require('querystring');
const query = `?vue&type=script`

/* let parsed = qs.parse(query.slice(1));
console.log(parsed); */

let parsed = new URLSearchParams(query.slice(1));
console.log(parsed, "@" + parsed.get('vue') + "@");
return parsed.get('vue') !== null; 