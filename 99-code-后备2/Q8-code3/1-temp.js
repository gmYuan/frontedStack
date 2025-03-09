// 无重复字符的最长子串
// 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度

// 示例 1:
// 输入: s = "abcabcbb"
// 输出: 3
// 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

// 示例 2:
// 输入: s = "pwwkew"
// 输出: 3
// 解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
// 请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串

function lengthOfLongestSubstring(s) {
  let res = 0, l = 0;
  let seen = new Set();
  for (let r = 0; r < s.length; r++) {
    const char = s[r]
    while (seen.has(char)) {
      seen.delete(s[l++])
    }
    seen.add(char)
    res = Math.max(res, r - l + 1)
  }
  return res
  
}
