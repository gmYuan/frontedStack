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
// [ 1->4->5, 1->3->4, 2->6 ]

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  if (!lists || !lists.length) return null
  // 自底向上分治合并：每2个为单位（步长）进行合并，每次合并都把后一个链表，合并到前一个链表中
  
  // 当前待合并处理的 链表个数，随着自底向上合并，needMergeLen会以每次logk 减小
  let needMergeLen = lists.length

  while (needMergeLen > 1) {
    // 每轮归并时，已经归并后的链表个数，它同时也是下一轮归并时，待处理的链表个数
    let mergedIndex = 0
    for (let i = 0; i < needMergeLen; i+=2) {
      // 每轮分治如果 最后剩余1个单独链表，作为单独的1组链表 返回即可
      if (i === needMergeLen - 1) {
        lists[mergedIndex] = lists[i]
        mergedIndex++
      } else {
        lists[mergedIndex] = mergeTwoLists(lists[i], lists[i+1])
        mergedIndex++
      }
    }
    needMergeLen = mergedIndex
  }
  // 最后归并的结果，都在第1个链表里
  return lists[0]
};







// 输出打印
const l1 = listToLink([0, 2, 1]);
const res = insertionSortList(l1);
printedLink(res);
