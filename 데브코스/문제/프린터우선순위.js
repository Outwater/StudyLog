/*
* 문제이해

- location에 해당하는 문서가 몇번째로 인쇄되는지 구하는 문제
- 처음 로케이션이 2였다는 것을 어떻게 나중에 보장할 것인가 처리가 핵심
    - idx와 중요도를 묶어서 자료형을 바꿔줌
    properties: [2,1,3,2] => [[0,2],[1,1],[2,3],[3,2]]
- 현재 인쇄된 문서수(`order`)로 관리

* 풀이방법

- (pre) priorities를 `[ [중요도, idx], [1,1], [3,2], [2,3] ]` 로 파싱
- 맨 앞 문서 추출 `[2,0]`
- 나머지와 중요도 비교  `2 vs 1, 3, 2` , `isMostImportant()`
- 1) 제일 중요하다면 문서 인쇄하고, 인쇄순서(order) 1증가
    - **재귀탈출**
    만약 현재 인쇄순서(`order`)가 target위치(`location`)가 일치한다면 order리턴!
- 2) 제일 중요하지 않다면 제일 뒤로 이동  `[ [1,1], [3,2], [2,3], [2,0] ]`
- 재귀를 통한 반복 실행
*/

function solution(priorities, location) {
let order = 0;
priorities = priorities.map((p,i)=>[p,i])

function isMostImportant(p, pList){
    pList = pList.map(p => p[0])
    return p >= Math.max(...pList);
}
// 재귀로 풀기
function print(pList){
    let [p, l] = pList.shift()
    if(isMostImportant(p, pList)){
        order++
        if(l === location) return order
    } else {
        pList.push([p,l])
    }
    return print(pList)
}
return print(priorities)
}

function solution2(priorities, location){

    class Node{
        constructor(value){
            this.value = value;
            this.next = null
        }
    }
    class Queue {
        constructor(){
            this.head = null;
            this.tail = null;
        }

        enqueue(newValue){
            const newNode = new Node(newValue);
            if(this.head === null){
                this.head = newNode;
                this.tail = newNode;
            }
            this.tail.next = newNode;
            this.tail = newNode;
        }

        dequeue(){
            const deValue = this.head.value;
            this.head = this.head.next;
            return deValue;
        }

        peak(){
            return this.head.value;
        }
    }

    const queue = new Queue();
    for(let i = 0; i < priorities.length; i++){
        queue.enqueue([priorities[i],i]);
    }
    priorities.sort((a,b) => b-a); // 내림차순 정렬
    let count = 0; // 인쇄된 문서 수
    while(true){
        const currValue = queue.peak(); // [2,0]
        if(currValue[0] < priorities[count]){
            queue.enqueue(queue.dequeue());
        } else {
            const value = queue.dequeue();
            count += 1;
            if(location === value[1]){
                return count;
            }
        }
    }
}

console.log(solution2([2,1,3,2],2)) // 1
console.log(solution2([1,1,9,1,1,1],0)) // 5
