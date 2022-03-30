class MaxHeap {
  constructor() {
    this.heap = [null]; // 0번 idx 관리 쉽게 비어준다.
  }
  // 제일 뒤에 들어오고, 부모랑 비교&교체 반복
  push(value) {
    this.heap.push(value);
    let currentIndex = this.heap.length - 1; // 추가된 요소의 idx
    let parentIndex = Math.floor(currentIndex / 2);

    // 부모값이 작으면 교체, 정점(parentIndex = 0)까지 반복
    while (parentIndex !== 0 && this.heap[parentIndex] < value) {
      const temp = this.heap[parentIndex];
      this.heap[parentIndex] = value;
      this.heap[currentIndex] = temp;

      currentIndex = parentIndex; // 요소 교체 후 현재 위치도 변경;
      parentIndex = Math.floor(currentIndex / 2); // 부모위치도 바뀐 현재위치에 따라 변경
    }
  }

  // 부모요소 제거 후, 마지막 정점 부모로 이동
  // 정점이 각 자식과 비교하여, 현재노드가 자식노드 보다 작을 경우 교체 반복
  pop() {
    const returnValue = this.heap[1];
    this.heap[1] = this.heap.pop();
    console.log(returnValue, this.heap);

    let currentIdx = 1;
    let leftIdx = 2; //Math.floor(currentIndex / 2);
    let rightIdx = 3; // leftIdx + 1;

    while (
      this.heap[currentIdx] < this.heap[leftIdx] ||
      this.heap[currentIdx] < this.heap[rightIdx]
    ) {
      // 왼쪽자식 오른쪽 자식과의 비교 (현재요소는 둘 중 하나보다 무조건 작음이 판정)
      if (this.heap[leftIdx] < this.heap[rightIdx]) {
        const temp = this.heap[currentIdx];
        this.heap[currentIdx] = this.heap[rightIdx];
        this.heap[rightIdx] = temp;

        currentIdx = rightIdx;
      } else {
        const temp = this.heap[currentIdx];
        this.heap[currentIdx] = this.heap[leftIdx];
        this.heap[leftIdx] = temp;
        currentIdx = leftIdx;
      }
      leftIdx = currentIdx * 2;
      rightIdx = currentIdx * 2 + 1;
    }
    console.log(this.heap);
    return returnValue;
  }
}

// pop 테스트
const heap = new MaxHeap();
heap.push(63);
heap.push(54);
heap.push(45);
heap.push(27);
heap.push(36);
console.log(heap);

const array = [];
array.push(heap.pop());
array.push(heap.pop());
array.push(heap.pop());
array.push(heap.pop());
array.push(heap.pop());

console.log(heap);
console.log("array: ", array);
