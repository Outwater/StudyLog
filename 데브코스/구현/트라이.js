// 각 노드는 모든 자식 요소를 연결리스트 키-값으로 가지고 있는다. (Map)
class Node {
  constructor(value = "") {
    this.value = value;
    this.children = new Map(); // key-value (char-node)
  }
}

class Trie {
  constructor() {
    this.root = new Node();
  }
  // 해당 string이 분해되어 노드형식으로 저장이 된다.
  // 루트부터 시작하여, 타고 내려간다.
  insert(string) {
    let currentNode = this.root;

    for (const char of string) {
      if (currentNode.children.has(char)) {
        currentNode = currentNode.children.get(char);
      } else {
        currentNode.children.set(char, new Node(currentNode.value + char));
        currentNode = currentNode.children.get(char);
      }
    }
  }

  // 현재 트라이가 해당 string을 가지고 있는지 판별한다.
  has(string) {
    let currentNode = this.root;

    for (const char of string) {
      if (!currentNode.children.has(char)) {
        return false;
      }
      currentNode = currentNode.children.get(char);
    }

    return true;
  }
}

const trie = new Trie();
trie.insert("cat");
trie.insert("can");
console.log(trie.has("cat"));
console.log(trie.has("can"));
console.log(trie.has("cap"));
