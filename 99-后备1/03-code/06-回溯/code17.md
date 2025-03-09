# LeetCode17- 电话号码的字母组合

1 思维关键词: 
  - 方法1: 递归 + 回溯

2 参考文档

[01-参考实现](https://github.com/liuyubobobo/Play-Leetcode/blob/master/0001-0500/0017-Letter-Combinations-of-a-Phone-Number/java-0017/src/Solution.java)


## 代码实现

1 方法1: 递归 + 回溯  时间复杂度: O(3^m * 4^n);  空间复杂度: O(m+n)

```ts
let numToStr = []
let res = []
function letterCombinations(digits: string): string[] {
  res = []
  numToStr = ['','', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz']
  if (!digits) return res;
  findCombinations(digits, 0, '')
  return res 
};

function findCombinations(digits, index, letter) {
  // 易错点1: index如果等于digits.length-1,就会少push一轮字母
  if (index === digits.length) {
    res.push(letter)
    return 
  }
  let curNum = digits.charAt(index)
  let curStrs = numToStr[curNum]
  for (let str of curStrs) {
    // 易错点2: 如果传入的是letter+=str，就需要手动回溯letter的值，否则letter回溯的值就不正确
    findCombinations(digits, index+1, letter + str)
  }
}
```

