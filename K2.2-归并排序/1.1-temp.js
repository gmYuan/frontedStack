var buf = "";
process.stdin.on("readable", function () {
  var chunk = process.stdin.read();
  if (chunk) buf += chunk.toString();
});
let getInputArgs = (line) => {
  return line
    .split(" ")
    .filter((s) => s !== "")
    .map((x) => parseInt(x));
};
process.stdin.on("end", function () {
  buf.split("\n").forEach(function (line, lineIdx) {
    if (lineIdx === 1) {
      let arr = getInputArgs(line);
      mergeSort(arr, 0, arr.length - 1);
      console.log(arr.join(" "));
    }
  });
});

function mergeSort(arr, l, r) {
  if (l >= r) return;
  let mid = l + ((r - l) >> 1);
  mergeSort(arr, l, mid);
  mergeSort(arr, mid + 1, r);
  // 优化: 如果arr[mid] <= arr[mid+1]，则arr[l, r]已经有序
  if (arr[mid] > arr[mid + 1]) {
    mergePair(arr, l, mid, r);
  }
}

function mergePair(arr, l, mid, r) {
  // 临时数组，用于存储合并后的 [l, r]范围的排序结果，注意其下标是从0开始的
  let temp = new Array(r - l + 1);
  // 正确排序 + 把结果存入临时数组
  let i = 0, p1 = l, p2 = mid + 1;
  while (p1 <= mid && p2 <= r) {
    temp[i++] = arr[p1] <= arr[p2] ? arr[p1++] : arr[p2++];
  }
  while (p1 <= mid) temp[i++] = arr[p1++];
  while (p2 <= r) temp[i++] = arr[p2++];
  // 将排序结果从临时数组拷贝回原数组
  for (let i = 0; i < temp.length; i++) {
    arr[l + i] = temp[i];
  }
}
