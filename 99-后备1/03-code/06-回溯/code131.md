# LeetCode131- 分割回文串

1 思维关键词: 
  - 方法1: 回溯法
  - 方法2: dp + 剪枝: todo

2 参考文档

[01-参考实现](https://github.com/liuyubobobo/Play-Leetcode/blob/master/0001-0500/0131-Palindrome-Partitioning/cpp-0131/main.cpp)

[02-回溯总结](https://leetcode.cn/problems/palindrome-partitioning/solutions/54233/hui-su-you-hua-jia-liao-dong-tai-gui-hua-by-liweiw/)



## 代码实现

1 方法1: 回溯法 时间复杂度: O(n * 2^n);  空间复杂度: O(n^2)

```ts
function partition(s: string): string[][] {
  let deepRes = []; let res = []
  dfs(s, 0, deepRes, res)
  return res
};

function dfs(str, deepIdx, deepRes, res) {
  if (deepIdx === str.length) {
    res.push([...deepRes])
    return
  }
  // 从[deepIdx, loopEnd=>len-1] 对str进行遍历处理, 即
  // [0 ~ 0/1/2/3...len-1]==> [1 ~ 1/2/3...len-1]==> [2 ~ 2/3...len-1]
  for (let loopEnd = deepIdx; loopEnd < str.length; loopEnd++) {
    // 当[deepIdx, loopEnd]是回文子串时
    if(isPalindrome(str, deepIdx, loopEnd)){
      // 把当前str[deepIdx,loopEnd]存入到 curDeepRes
      deepRes.push(str.slice(deepIdx, loopEnd + 1))
      // 以当前已处理字符的下一个/未处理字符的第一个，递归执行dfs==> 由横向执行变成纵向执行
      dfs(str, loopEnd+1, deepRes, res)
      // 执行到这一步说明: 本层循环都已经处理完成+要回到上一层 继续执行横向循环
      // 所以需要弹出本层的 "脏数据"
      deepRes.pop()
    }
  }
}

function isPalindrome(str, left, right) {
  while(left <= right) {
    if (str[left] !== str[right]) return false;
    left++
    right--
  }
  return true
}

//                                      aab
//  d0          a                   aa            aab=>X      /
//  d1        a   ab=>X           b   /            
//  d2      b                    /==>存入res 
//  d3     /==>存入res
```

