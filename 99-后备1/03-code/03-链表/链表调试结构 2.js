class ListNode {
  constructor(val, next = null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function listToLink(arr) {
  let dummy = new ListNode(-1);
  let cur = dummy;
  for (let val of arr) {
    cur.next = new ListNode(val);
    cur = cur.next;
  }
  return dummy.next;
}

function printedLink(head) {
  let cur = head;
  let res = "";
  while (cur) {
    res += `${cur.val}-> `;
    cur = cur.next;
  }
  res += "Null";
  console.log(res);
  return res;
}

// 功能代码
function reverseList(head) {
  if (!head || !head.next) return head;
  // 函数功能语义: 反转了以head为头节点的链表，并返回了反转后的新头节点newHead
  const newHead = reverseList(head.next)
  // 注意此时head.next，还指向着 反转后的尾节点， 即 curHead--> newTail <--yyy <-- newHead
  // 所以想要反转包含curHead的整个链表，通过newTail(即 head.next)就很简单了
  head.next.next = head
  // 让curHead的next断开指向newTail，从而避免循环链表
  head.next = null
  // 返回整个链表的 新的头结点即可
  return newHead
};

// 输出打印
const l1 = listToLink([1, 2, 3, 4]);
const res = reverseList(l1);
printedLink(res);
