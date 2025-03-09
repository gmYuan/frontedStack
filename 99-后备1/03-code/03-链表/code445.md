
# LeetCode445- 两数相加 II

1 思维关键词: 

S1 迭代法: 栈 + carry + 高位指向低位

S2 递归法: 待实现，总体看比迭代法麻烦一些

2 参考文档

[01 官方实现](https://leetcode.cn/problems/add-two-numbers-ii/solution/liang-shu-xiang-jia-ii-by-leetcode-solution/)

[02 递归实现参考-待阅读](https://leetcode.cn/problems/add-two-numbers-ii/solution/java-2ms-ji-bai-100-by-she-hui-zhu-yi-jie-ban-ren-/)


## 代码实现

1 方法1: 栈+carry+高位指向低位  时间复杂度: O(max(m, n)); 空间复杂度：O(m+n)

```ts
function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  let stack1 = [], stack2 = []
  while (l1) {
    stack1.push(l1.val)
    l1 = l1.next
  }
  while (l2) {
    stack2.push(l2.val)
    l2 = l2.next
  }
  let carry = 0
  let res = null
  while (stack1.length || stack2.length || carry) {
    let v1 = stack1.pop() || 0, v2 = stack2.pop() || 0
    let curNode = new ListNode()
    curNode.val = (v1 + v2 + carry) % 10
    carry = Math.floor((v1 + v2 + carry) / 10)
    // 让当前高位节点，指向之前的低位节点
    curNode.next = res
    res = curNode
  }
  return res
};
```

