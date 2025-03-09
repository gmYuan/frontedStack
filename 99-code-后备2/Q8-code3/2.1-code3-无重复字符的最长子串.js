function lengthOfLongestSubstring(s: string): number {
  let res = 0, l = 0;
  // 显式维护一个 无重复元素的滑动窗口
  let seen = new Set();
  // 显式更新l和r位置
  for (let r = 0; r < s.length; r++) {
    const char = s[r];
    // 易错点1: 这里用while而不是if，是因为当前char可能在 滑动窗口[l,r]的中间位置
    // 所以 需要一直删除，直到把窗口里的 最后1个char 移到最靠前位置，然后移出窗口
    while (seen.has(char)) {
      seen.delete(s[l++]);
    }
    seen.add(char);
    res = Math.max(res, r - l + 1);
  }
  
  return res;
};