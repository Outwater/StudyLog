class Node {
  constructor(value){
    this.value = value;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor(){
    this.head = null;
    this.tail = null;
  }

  find(value){
    let currNode = this.head;
    while(currNode.value !== value){
      currNode = currNode.next;
    }
    return currNode
  }
// 끝부분 추가
  append(newValue){
    const newNode = new Node(newValue);
    if(this.head === null){
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  insert(node, newValue){
    const newNode = new Node(newValue);
    newNode.next = node.next;
    node.next = newNode;
  }

  // 값을 찾은 후 삭제하도록 구현 (O(N) + O(1))
  remove(value){
    let prevNode = this.head;
    while(prevNode.next.value !== value){
      prevNode = prevNode.next;
    }
    if(prevNode.next !== null){
      prevNode.next = prevNode.next.next
    }
  }
  size(){
    let currNode = this.head;
    let size = 0;
    while(currNode !== null){
      size = size + 1;
      currNode = currNode.next;
    }
    return size;
  }

  display(){
    let currNode = this.head;
    let displayString = "[";

    while(currNode !== null){
      displayString += `${currNode.value}, `;
      currNode = currNode.next;
    }

    displayString = displayString.slice(0, displayString.length-2);
    displayString += "]";
    console.log(displayString)
  }
}

const linkedList = new SinglyLinkedList();
linkedList.append(1);
linkedList.append(2);
linkedList.append(3);
linkedList.append(5);
linkedList.display();
console.log(linkedList.find(3));
linkedList.remove(3);
console.log(linkedList.size())
linkedList.display();
linkedList.insert(linkedList.find(2), 10)
linkedList.display();
console.log(linkedList.size())