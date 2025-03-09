// 传送带上的包裹必须在 days 天内从一个港口运送到另一个港口。

// 传送带上的第 i 个包裹的重量为 weights[i]。
// 每一天，我们都会按给出重量（weights）的顺序往传送带上装载包裹。
// 我们装载的重量不会超过船的最大运载重量。

// 返回能在 days 天内将传送带上的所有包裹送达的船的最低运载能力。

function shipWithinDays(weights, days) {
  // r = 30000000是 根据题目限制得出的： 500 * 50000 = 25000000
  let l = Math.max(...weights), r = 30000000;
  while (l < r) {
    const mid = l + ((r - l) >> 1);
    const needDays = calDays(weights, mid);
    // 期望求的是 <= days的最大值
    // 如果needDays <= days，说明运载能力还可以再小一点
    if (needDays <= days) {
      r = mid;
    } else {
      l = mid + 1;
    }
  }
  return r;
}

function calDays(weights, cap) {
  let days = 1, curLoad = 0;
  for (let weight of weights) {
    if (curLoad + weight <= cap) {
      curLoad += weight;
    } else {
      days++;
      curLoad = weight;
    }
  }
  return days;
}

let res = shipWithinDays([1,2,3,1,1], 4)
console.log(res)