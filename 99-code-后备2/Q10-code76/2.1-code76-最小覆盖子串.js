function minWindow(s, t) {
  let resStart = 0, resLen = Number.MAX_VALUE;
  // S1
  let targetMap = new Map();
  for (let char of t) {
    targetMap.set(char, (targetMap.get(char) || 0) + 1);
  }
  // 易错点1: 使用size, 而不是 key()
  const total = targetMap.size;
  // S2
  let saveMap = new Map();
  let l = 0, count = 0;
  // S3.1
  for (let r = 0; r < s.length; r++) {
    const char = s[r];
    if (targetMap.has(char)) {
      let preVal = saveMap.get(char) || 0;
      saveMap.set(char, ++preVal);
      if (preVal === targetMap.get(char)) {
        count++;
      }
    }
    // S3.2
    // 易错点2: 使用while来缩小窗口，而不是if
    // while循环允许我们持续缩小窗口，直到窗口不再包含所有必需的字符。如果使用if，我们只能缩小窗口一次，这可能会错过更小的有效窗口。
    while (count === total) {
      // S3.3
      let newLen = r - l + 1;
      if (newLen < resLen) {
        resLen = newLen;
        resStart = l;
      }
      // S3.4
      let willOutChar = s[l];
      // 不用 if (saveMap.has(willOutChar) )，因为用 targetMap语义更一致
      if (targetMap.has(willOutChar)) {
        saveMap.set(willOutChar, saveMap.get(willOutChar) - 1);
        // 易错点5： 不能直接count--;
        // 只有当字符在 saveMap 中的数量小于 targetMap 中的数量时，我们才减少 count。
        // 这确保了我们只在真正不满足条件时才减少 count。
        if (saveMap.get(willOutChar) < targetMap.get(willOutChar)) {
          count--;
        }
      }
      // 易错点3: 使用l++, 而不是left++
      l++;
    }
  }
  // 易错点4:  不能直接使用slice, 因为有可能resLen为最大值，此时说明无匹配情况
  return resLen === Number.MAX_VALUE
    ? ""
    : s.slice(resStart, resStart + resLen);
}
