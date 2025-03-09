//code 125- 验证回文串

function isPalindrome(s) {
  // 易错点：排除非数字和字符的其他字符 + 统一大小写
  s = s.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  if (s.length <= 0) return true;

  let l = 0, r = s.length - 1;
  while (l <= r) {
    if (s[l++] !== s[r--]) return false;
  }
  return true;
}
