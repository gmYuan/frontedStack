let copy = [];

function reversePairs(record) {
  // 易错点1: 这里不能用copy = [...record]，因为后续每轮递归比较时，都应该是排好序的arr1和arr2
  // 而不是初始时的 从未排序的原始列表情况
  let len = record.length
  copy = new Array(len)
  return mergeSort(record, 0, len - 1);
};


function mergeSort(arr, l, r) {
  if (l >= r) return 0;
  // 递归实现
  let mid = (l + r) >> 1;
  let r1 = mergeSort(arr, l, mid);
  let r2 = mergeSort(arr, mid + 1, r);
  // 优化点1: 说明必然是有序(升序)情况，本轮无需再进行 左右区间归并
  if (arr[mid] <= arr[mid + 1]) {
    return r1 + r2;
  }
  // 归并arr[l, mid]和arr[mid+1, r]的数组成员
  let r3 = mergePair(arr, l, mid, r);
  return r1 + r2 + r3;
}

function mergePair(arr, l, mid, r) {
 // 易错点2.1: 这里不能使用copy = arr.slice(l, r+1)，因为这样会形成索引位置偏移
  // 即 recode[5~9]会偏移为copy[0,4]，导致后续从copy[l/mid]取值比较时，会形成空值比较
  // 导致 record数组内容错误 && res值计算错误

  // 易错点2.2: 这里不能使用copy = [...arr], 因为存在用例会导致超时
  for (let i = l; i <= r; i++) {
    copy[i] = arr[i]
  }

 // 开始比较和合并
  let p1 = l, p2 = mid + 1, p3 = l;
  let res = 0;

  while (p1 <= mid && p2 <= r) {
    if (copy[p1] <= copy[p2]) {
      arr[p3++] = copy[p1++];
    } else {
      arr[p3++] = copy[p2++];

      // 易错点3.1: 这里应该是 res += mid - p1 + 1; 而不是 res+= 1
      // 因为 在这种情况下，copy[p1~mid]必然 都会大于 copy[p2]
      // 且索引是从0开始，所以其对应数量就是 mid - i + 1, 而不仅仅是当前p1这一个

      // 易错点3.2: 之所以是+=，是因为该次比较完成后，会继续进入下一次符合的 while循环
      // 所以需要累计 逆序对数量
      res += mid - p1 + 1;
    }
  }
  while (p1 <= mid) arr[p3++] = copy[p1++];
  while (p2 <= mid) arr[p3++] = copy[p2++];
  return res;
}