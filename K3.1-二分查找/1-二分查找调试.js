
// >target的最小值
function upper(arr, target) {
  let l = 0, r = arr.length
  // l取-1, 当arr值都 >target，就有可能让 l<r恒成立 导致死循环
  // r取arr.length-1，当arr值都 <=target，就有可能让 l===r 死循环
  while (l < r) {
    let mid = l + (r - l) >> 1
    if (arr[mid] <= target) {
      l = mid + 1
    } else {
      r = mid
    }
  }
  return l >= arr.length ? -1 : l;
}


// 相关问题2: 在有序数组中查找 <target的 最大值索引
// 如果没有<target的 就返回-1
function lower(arr, target) {
  let l = -1, r = arr.length - 1
  // l取0 + r取 arr.length-1时，如果arr都<target，l就有可能一直是l+0导致死循环
  // 所以需要 r - l + 1 >> 1 向上取整一位，保证l不会死循环
  while (l < r) {
    const mid = l + ((r - l + 1) >> 1)
    if (arr[mid] < target) {
      l = mid
    } else {
      r = mid - 1
    }
  }
  return l
}