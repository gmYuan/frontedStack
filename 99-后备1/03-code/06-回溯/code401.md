# LeetCode401- 二进制手表

1 思维关键词: 
  - 方法1: 二进制暴力法
  - 方法2: 回溯法

2 参考文档

[01-方法1参考实现](https://github.com/liuyubobobo/Play-Leetcode/blob/master/0001-0500/0401-Binary-Watch/cpp-0401/main.cpp)

[02-方法2参考实现](https://github.com/liuyubobobo/Play-Leetcode/blob/master/0001-0500/0401-Binary-Watch/cpp-0401/main2.cpp)


## 代码实现

1 方法1: 二进制暴力法  时间复杂度: O(2^10);  空间复杂度: O(1)

```ts
function readBinaryWatch(turnedOn: number): string[] {
  const res = [];
  // 4位小时位 + 6位分秒位，所以可以表示的数字一共有[0, 2^10-1]
  for (let i = 0; i < 1 << 10; i++) {
    // turnedOn灯亮的数量，即10位二进制数里对应值为1的个数
    if (getBit1Num(i) === turnedOn) {
      // 通过位运算，分别获取6位的分秒值 和 4位的小时值
      let minutes = i & 0b111111, hour = i >> 6;
      // 易错点: 本题里12:00不是一个合法值，所以hour需要小于12
      if (hour < 12 && minutes < 60) {
        let time = `${hour}:`;
        time += minutes < 10 ? `0${minutes}` : `${minutes}`;
        res.push(time);
      }
    }
  }
  return res;
}

// 获取10进制数num，对应的二进制里每一位值为1的数量
function getBit1Num(num) {
  let res = 0;
  while (num) {
    res += num % 2;
    // 易错点: JS里 num/2会保留小数部分，所以直接用位操作法更高效
    num >>= 1;
  }
  return res;
}
```


2 方法2: 回溯法   时间复杂度: O(2^10);  空间复杂度: O(1)

```ts
function readBinaryWatch(turnedOn: number): string[] {
  const res = [], bits = new Array(10).fill(false);
  backTrack(bits, 0, turnedOn, res);
  return res;
};

function backTrack(bits, index, turnedNum, res) {
  // index为10时，说明进入了完全二叉树的最后一层第9层(层数从0开始)的下一层，从而进行结果搜集
  if (index === 10) {
    let hour = 0;
    for (let i = 0; i < 4; i++) {
      hour = hour * 2 + bits[i];
    }

    let minutes = 0;
    for (let i = 4; i < 10; i++) {
      minutes = minutes * 2 + bits[i];
    }

    if (hour < 12 && minutes < 60) {
      let time = `${hour}:`;
      time += minutes < 10 ? `0${minutes}` : `${minutes}`;
      res.push(time);
    }
    return;
  }
  // 剪枝点1: 总共10层，如果10-index的剩余层数还能大于剩余亮灯数，就能一直往下层
  // 否则就不能直接关灯，再往下了，不然灯亮数就会不够
  if (10 - index > turnedNum) backTrack(bits, index + 1, turnedNum, res);
  // 剪枝点2: 只有 还有剩余可亮灯数，才会继续向下层去查找亮灯的组合
  // 注意，执行到这一步，说明只要还有亮灯数，该层的灯就必须亮起，否则灯亮数就会不够
  if (turnedNum) {
    bits[index] = true;
    backTrack(bits, index + 1, turnedNum - 1, res);
    bits[index] = false;
  }
}


/**
对应的搜索树是一个拥有十层的二叉树。
这个程序中，每一层对应一个LED灯，每个灯具有两个状态：开和关。
所以，每个节点都有两个子节点，这就形成了一个完全二叉树。

在这个二叉树中：
从根节点（顶部）到叶子节点（底部）的路径表示一种可能的灯的开关状态。
路径上的节点如果在左子树中，表示该LED灯为关；如果在右子树中，表示该LED灯为开。
所有路径中，只有那些恰好有'turnedNum'个灯亮着的路径才会被记录并加入结果集。

需要注意的是，虽然这颗树理论上是有2^10个叶子节点的完全二叉树，
但是在这个问题中，代码中通过剪枝操作，让搜索空间大大减小。
具体来说，
当目前LED灯的状态已经无法满足条件（例如
小时数大于11，分钟数大于59，或者剩余的灯 不足以 令总共亮起的灯的数量 等于num）时，
就会立即返回，不再继续向下搜索。

另外，对于两种状态（即开灯和关灯）都会搜索一遍，也就是对二叉树的左右子树都会进行搜索。
这就使得搜索过程形成一颗二叉树，树的深度为10，每一层对应一个LED灯的开关状态。

------------------------------------------------------------------
light = 3; num = 1
                  a位                         b位           c位
            0               1          ||     01   ||       01
          0    1         0     1
         0 1  0  1     0  1   0  1
idx=3 
*/
```