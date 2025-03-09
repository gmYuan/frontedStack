function findKthLargest(nums: number[], k: number): number {
  let len = nums.length;
  // 第k大，对应的下标为 len - k:
  // 比如第1大，对应的下标为 len-1; 第2大，对应的下标为 len-2 ...
  return quickFind(nums, 0, len - 1, len - k);  
};


// 利用 快速排序的partition 思想，确定每个元素的位置
function quickFind(nums, l, r, tdx) {
  if (l >= r) return nums[l];
  let p = partition(nums, l, r);
  if (p === tdx) return nums[p];
  // 易错点1: 这里二分是必须的
  if (p > tdx) {
    return quickFind(nums, l, p - 1, tdx);
  } else {
    return quickFind(nums, p + 1, r, tdx);
  }
}

function partition(nums, l, r) {
  // S1 获取基准比较值x
  // [0, 1) ==> [0, r-l+1) ==> [l, r+1)
  let rdx = Math.floor(Math.random() * (r - l + 1)) + l;
  swap(nums, l, rdx);
  const x = nums[l];

  // S2 构建区间: [l+1, lt) <=x; (gt, r] >=x
  // 判断 开闭区间的技巧: 初始化时满足是 空区间 + 执行到不满足区间条件时的指针位置是否 符合定义含义
  let lt = l + 1, gt = r;
  // 易错点1: 由于lt和gt都是开区间，所以需要处理指针相等时的最后一个成员
  while (lt <= gt) {
    while (nums[lt] < x) lt++;
    while (nums[gt] > x) gt--;
    // 易错点2: 外部循环里lt < gt成立时，由于内部还会先更新 lt/gt值
    // 所以运行到这里时，不能再保证 lt还<= gt了
    // 如果在这一步 lt === gt了，说明已经处理完所有元素了，不需要再进行后续处理
    // 如果还进行后续交换和更新指针的处理，反而会让 lt/gt 的位置 和定义时的不一致，导致结果出错
    if (lt >= gt) break;
    swap(nums, lt++, gt--);
  }

  // S3 把基准值x放到正确的位置，并最后返回其 位置下标
  // 执行到此处时, [l+1, lt) <=x; (gt, r] >=x; 且lt和gt的关系必然为 lt=gt / lt=gt+1
  // 也就是说 [l+1, lt-1/gt]必然 <=x; [gt+1/lt, r] >=x
  // 所以交换了 l和gt后，就必然会使得 [l, gt-1] <=x; [gt, r] >=x
  swap(nums, l, gt);
  return gt;
}

function swap(nums, i, j) {
  [nums[i], nums[j]] = [nums[j], nums[i]];
}