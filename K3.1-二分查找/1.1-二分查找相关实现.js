// 实现1.1- 二分查找: 递归实现
function binarySearch1(arr, target) {
  return innerSearch(arr, target, 0, arr.length - 1);
}

function innerSearch(arr, target, l, r) {
  if (l > r) return -1;
  let mid = l + ((r - l) >> 1);
  const cur = arr[mid];
  if (cur === target) return mid;
  if (cur < target) {
    return innerSearch(arr, target, mid + 1, r);
  } else {
    return innerSearch(arr, target, l, mid - 1);
  }
}

// 实现1.2- 二分查找: 非递归实现
function binarySearch2(arr, target) {
  let l = 0, r = arr.length - 1;
  // 易错点1: 递归实现会经过处理，让l不会===r; 这里之前没有处理逻辑，所以需要处理l===r的情况
  while (l <= r) {
    const mid = l + ((r - l) >> 1);
    const cur = arr[mid];
    if (cur === target) return mid;
    if (cur < target) {
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }
  return -1;
}


// 相关问题1: 在有序数组中查找 >=target的 最小值索引，如果没有>=target的 就返回-1
function upper(arr, target) {
  let l = 0, r = arr.length;
  // 易错点1: 这里r取arr.length && l < r, 
  // 是因为
  //  l取-1, 当arr值都 >target，就有可能让 l<r恒成立 导致死循环
  //  r取arr.length-1，当arr值都 <=target，就有可能让 l===r 死循环
  while (l < r) {
    let mid = l + ((r - l) >> 1);
    // 确保[l, r]都是 >= target的: l是增长的 + r是缩小的
    if (arr[mid] < target) {
      l = mid + 1;
    } else {
      r = mid;
    }
  }
  // l>= arr.length时，说明此时所有成员都<target，所以返回特殊处理下返回-1
  return l >= arr.length ? -1 : l;
}



// 相关问题2: 在有序数组中查找 <target的 最大值索引，如果没有<target的 就返回-1
function lower(arr, target) {
  // 重点1: l取-1，是为了当 arr所有成员值都 >=target时，l方便返回默认的 -1
  let l = -1, r = arr.length - 1;
  while (l < r) {
    // 易错点1: 为了避免l和r相邻时，r-l向下取整时 mid还是等于l，从而导致死循环
    // 这里使用了(r - l + 1) >> 1 向上取整的技巧
    // 可以用例子 arr = [..., 1, 2], tatget = 3 来理解这一步
    let mid = l + ((r - l + 1) >> 1);

    // 确保 (l, r]都是 >= target的: l是增长的 + r是缩小的
    if (arr[mid] < target) {
      l = mid;
    } else {
      // 易错点2: 此时cur>=x，因为要找<target的最大idx，所以砍掉所有 >=target的部分
      r = mid - 1;
    }
  }

  // 易错点3: 这里返回的是l 而不是r, 是因为r是内缩 + l是扩增的，即最后(l, r]都是>=target的
  return l
}



const temp = [1, 2, 3, 4, 4, 6];
let res = lower(temp, 7);
console.log("resaa", res);
