/** 

56. 合并区间

以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi]
请你合并所有重叠的区间，并返回 一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间 。


示例 1：
输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
输出：[[1,6],[8,10],[15,18]]
解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
示例 2：

输入：intervals = [[1,4],[4,5]]
输出：[[1,5]]
解释：区间 [1,4] 和 [4,5] 可被视为重叠区间。
*/

// 总结出这道题涉及的思维技巧，我怎么做到在长时间不做这一道题后，还能再想起来怎么做

/**



*/

function merge(intervals) {
  if(intervals.length <= 1) return intervals;

  // 按开始位置排序区间，从而保证重叠区间是相邻的
  intervals.sort((a, b) => a[0] - b[0]);
  let res = [intervals[0]];
  // 多执行一次intervals[0]也不要紧
  for (const [start, end] of intervals) {
    const [preStart, preEnd] = res[res.length - 1];
    // 无重叠，直接加入到结果内
    if (start > preEnd) {
      res.push([start, end]);
    } else {
      // 有重叠（比较 cur区间的起始位置 和 pre区间的结束位置）==> 获取左右边界值
      res.pop();
      res.push([Math.min(start, preStart), Math.max(end, preEnd)]);
    }
  }
  return res;
}