//* Tree를 배열로 구현하기

//* 왼쪽 자식: 2*idx
//* 오른쪽 자식: 2*idx + 1
const tree = [];
tree[0] = undefined; // 0번 노드 사용 x

const tree_method = {
  addValue: (tree, value) => tree.push(value),
  left: (tree, idx, value) => {
    tree[2 * idx] = value;
    return tree;
  },
  right: (tree, idx, value) => {
    tree[2 * idx + 1] = value;
    return tree;
  },
  getParentValue: (tree, idx) => {
    return tree[Math.floor(idx / 2)];
  },
};

// console.log(tree);
// tree_method.addValue(tree, 9);
// tree_method.left(tree, 1, 3);
// tree_method.right(tree, 1, 8);
// console.log(tree);
// console.log(tree_method.getParentValue(tree, 3));
// console.log(tree_method.getParentValue(tree, 2));

//* LinkedList로 이진트리 구현하기

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(node) {
    this.root = node;
    this.children = [];
  }
  display() {
    const q = [];
    q.push(this.root);
    while (q.length > 0) {
      const currentNode = q.shift();
      console.log(currentNode.value);
      if (currentNode.left) q.push(currentNode.left);
      if (currentNode.right) q.push(currentNode.right);
    }
  }
}

const tree2 = new Tree(new Node(9));
tree2.root.left = new Node(3);
tree2.root.right = new Node(8);
tree2.root.left.left = new Node(2);
tree2.root.left.right = new Node(5);
tree2.display();
