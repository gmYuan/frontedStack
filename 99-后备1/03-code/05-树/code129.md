# LeetCode129- 求根节点到叶节点数字之和

1 思维关键词: 
  - 方法1: DFS + 高低位求和性质
  - 方法2: BFS + 双队列 
  
  
2 参考文档

[01 官方参考实现](https://leetcode.cn/problems/sum-root-to-leaf-numbers/solutions/464666/qiu-gen-dao-xie-zi-jie-dian-shu-zi-zhi-he-by-leetc/)


## 代码实现

1 方法1: DFS + 高低位求和性质   时间复杂度: O(n);  空间复杂度: O(n)

```ts
function sumNumbers(root: TreeNode | null): number {
  return dfs(root, 0);
};

function dfs(node, pre) {
  if (!node) return 0
  // 求和性质：低位求和 = 高位求和值 * 10 + 当前位值
  const sum = pre * 10 + node.val
  if (!node.left && !node.right) {
    return sum
  } else {
    // 非叶子节点，则把当前位的和传入下一层，继续求和即可
    return dfs(node.left, sum) + dfs(node.right, sum)
  }
}
```

2 方法2: BFS + 双队列  时间复杂度: O(n);  空间复杂度: O(n)

```ts
function sumNumbers(root: TreeNode | null): number {
  if (!root) return 0 
  let res = 0
  let queueNode = [root], queueSum = [root.val]
  while (queueNode.length) {
    let total = queueSum.shift()
    let node = queueNode.shift()
    // 叶子节点，是用来更新不同路径的 总的res值的
    if (!node.left && !node.right) {
      res += total
    } else {
      if (node.left) {
        queueNode.push(node.left)
        // 由于total已经添加过当前node.val值了，所以此时需要相加的值是子节点值
        // 如果添加的是node.val，就会导致在叶子节点时，丢失掉叶子节点值
        queueSum.push(total * 10 + node.left.val)
      }
      if (node.right) {
        queueNode.push(node.right)
        queueSum.push(total * 10 + node.right.val)
      }
    }
  }
  return res
};
```