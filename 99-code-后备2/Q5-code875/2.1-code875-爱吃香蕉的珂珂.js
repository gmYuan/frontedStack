
// 示例 1：
// 输入：piles = [3,6,7,11], h = 8
// 输出：4

function minEatingSpeed(piles, h) {
  let l = 1, r = Math.max(...piles);
  while (l < r) {
    const mid = l + (r - l >> 1)
    const needTime = calTime(piles, mid)
    // 获取的是 <=h的 最大值
    // 如果需要的时间 <=h，说明吃的速度已经够快了，需要减慢速度
    if (needTime <= h) {
      r = mid
    } else {
      // 反之 如果需要的时间 >h，说明吃的速度慢了，需要加快速度
      l = mid + 1
    }
  }
  return r
}

function calTime(piles, speed) {
  return piles.reduce((acc, cur) => acc + Math.ceil(cur / speed), 0)
}