# LeetCode93- 复原IP地址

1 思维关键词: 
  - 方法1: 双重回溯法  时间复杂度: O(2^n);  空间复杂度: O(n)

2 参考文档

[01-参考实现](https://github.com/liuyubobobo/Play-Leetcode/blob/master/0001-0500/0093-Restore-IP-Addresses/cpp-0093/main.cpp)


## 代码实现

1 方法1: 双重回溯法  时间复杂度: O(2^n);  空间复杂度: O(n)

```ts
function restoreIpAddresses(s: string): string[] {
  let res = [], ips = []
  dfs(s, 0, ips, res)
  return res    
};


function dfs(str, idx, ips, res) {
  //易错点1: 由于dfs时会多调用一次进行结果存储，所以是str.length 而非str.length-1
  if (idx === str.length) {
    if (ips.length === 4) {
      res.push(ips.join('.'))
    }
    // 易错点2: 无论当前ips值是否合法，到此都需要返回进行回溯
    return;
  }
  // 特殊处理第一个字符，初始化ips数组里的第1个成员的 第1个字符
  if (idx === 0) {
    ips.push(Number(str[0]))
    dfs(str, idx+1, ips, res)
  } else {
    const lastIdx = ips.length - 1
    const next = ips[lastIdx] * 10 + Number(str[idx])
    // 如果合法，就替换更新 ip里【最后1个成员】里的字符值: 之前字符+本轮字符
    if (next <= 255 && ips[lastIdx] !== 0) {
      ips[lastIdx] = next
      dfs(str, idx+1, ips, res)
      // 到此说明进入回溯阶段bc1: 弹出 ip里【最后1个成员】里的 最后1位字符==> 回溯1个字符
      ips[lastIdx] = Math.floor(ips[lastIdx] / 10)
    }
    // 用于新增ip 的下一段成员，直到ip成员为4个
    if (ips.length < 4) {
      // 到这里说明 需要填入下一个成员的第1个字符, 即入队新成员
      ips.push(Number(str[idx]))
      dfs(str, idx+1, ips, res)
      //到此说明进入回溯阶段bc2: 弹出ips入队时的 那1个成员的首个数字字符，即 回溯1个成员
      ips.pop()
    }
  }
}
```

