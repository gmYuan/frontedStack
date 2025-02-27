(function (global) {
  var x = 1;

  function api() {
    xxx;
  }

  function setX(v) {
    x = v;
  }

  function getX() {
    return x;
  }

  global.__Module = {
    x,
    setX,
    getX,
    api,
  };
})(global);

const m = global.__Module;
console.log(m.x);

// 这里改的是函数作用域内变量的值
m.setX(10);
console.log(m.getX()); // 10

// 这里改的是对象属性的值,不是修改的模块内部的data
m.x = 2;
console.log(m.getX()); // 10
