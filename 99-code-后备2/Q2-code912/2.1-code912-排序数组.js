function sortArray(nums) {
  quickSort(nums, 0, nums.length - 1);
  return nums;
}

// 快排 递归函数宏观语义: 排序arr里 [l, r]范围内的元素
function quickSort(arr, l, r) {
  // 递归中止条件: 表示只有<=1个成员的数组，已经是有序的直接返回即可
  if (l >= r) return;
  let p = partition(arr, l, r);
  quickSort(arr, l, p - 1);
  quickSort(arr, p + 1, r);
}

// 函数宏观语义: 排序arr里的某个元素X, 返回X在arr内的 排序后的正确下标p
// p满足 arr[l, p-1]<=x; arr[p+1, r]>=x
function partition(arr, l, r) {
  // 重点1: 随机选取元素X,作为基准元素，而不是 固定的取最左侧元素
  // 随机索引rdx: [0, 1) ==> [0, r-l+1)小数 ==> 向下取整==> [l, r+1)整数
  let rdx = Math.floor(Math.random() * (r - l + 1)) + l;
  swap(arr, l, rdx);
  let x = arr[l];
  // 重点2- 前后碰撞指针 + 循环不变量性质: arr[l+1, lt)都<=x; arr(gt,r]都>=x
  let lt = l + 1, gt = r;

  //                                                       x  lt&gt
  // 易错点1: 要包含处理lt===gt的情况，假设置换后位置的 arr = [2, 5,   6,  1]
  // 因为在符合调换条件 后，lt和gt会继续缩进，就有可能出现在下一轮循环出现 lt=== gt的情况
  // 此时只要 lt/gt对应位置的元素大于或者小于x, 就会遗漏更新lt/gt的值，导致lt或者gt的位置不正确 
  // 而(lt) gt的值不正确时，后续划分左右子数组 分组就会不正确，导致排序结果错误
  while (lt <= gt) {
    // 重点3: 不包含等于x，从而保证等于x的也会被互换到不同子分组，避免分组过分倾斜
    while (arr[lt] < x) lt++;
    while (arr[gt] > x) gt--;
    // 易错点2: 
    // 由于在while循环内部 还会有while循环更新lt/gt的值，所以运行到此处时
    // lt是有可能超出gt/r的(如x取到了最大值)，此时就不能再错误更新lt/gt的值了
    // 所以当lt遇到gt时, 直接退出外层循环
    if (lt >= gt) break;
    swap(arr, lt++, gt--);
  }
  // 运行到此处时，x的正确位置就是 lt-1/gt, 返回任意一个指针即可 
  swap(arr, l, gt);
  return gt;
}

function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}