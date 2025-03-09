
# LeetCode328- 奇偶链表

1 思维关键词: 

S1 迭代法: curOdd + curEven + originEven; 循环中止条件

S2 递归法: oddTail + sortOddAndEven(odd, even)


2 参考文档

[01 方法1参考](https://leetcode.cn/problems/odd-even-linked-list/solution/shou-hua-tu-jie-328qi-ou-lian-biao-odd-even-linked/)

[02 其他一种递归实现](https://leetcode.cn/problems/odd-even-linked-list/solution/qi-ou-lian-biao-java-di-gui-jie-fa-by-cthitting/)


## 代码实现

1 方法1: 迭代法: curOdd + curEven;  时间复杂度: O(n);  空间复杂度(1)

```ts
function oddEvenList(head: ListNode | null): ListNode | null {
	if (!head || !head.next) return head
	let curOdd = head
	let curEven = head.next
	const originEven = head.next
	// 后续循环更新下一个节点指向，依赖于curEven.next(即保证更新后的curOdd不为null即可)
	while (curEven && curEven.next) {
		// 更新当前奇数位置的节点下一个指向后， 移动当前奇数节点指针
		curOdd.next = curEven.next
		curOdd = curOdd.next
		// 更新当前偶数位置节点下一个节点指向后，移动偶数节点
		curEven.next = curOdd.next
		curEven = curEven.next
	}
	// 拼接奇数位置尾节点 + 初始的偶数头节点
	curOdd.next = originEven
	// 返回最开始的头节点
	return head
};
```


2 方法2: 递归实现  时间复杂度: O(n);  空间复杂度(n)

```ts
let oddTail = null
function oddEvenList(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head
  // S1 子问题
	let [, evenHead] = sortOddAndEven(head, head.next)
  // S2 本轮操作：让奇数尾节点指向分类好的偶数头节点
	oddTail.next = evenHead
  // S3 返回分类连接的头节点
	return head
};

// odd-->odd; even-->even; 返回分类好的 [oddHead, evevHead]
function sortOddAndEven(odd, even)  {
	if (!odd.next || !even.next) {
    // 易错点：防止odd后还有一个偶数位置指向
    odd.next = null
    oddTail = odd
		return [odd, even]
	}
	let [newOddHead, newEvenHead] = sortOddAndEven(odd.next.next, even.next.next)
	odd.next = newOddHead
	even.next = newEvenHead
	return [odd, even]
}
```