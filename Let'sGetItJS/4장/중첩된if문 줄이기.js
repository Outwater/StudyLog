실무에서 자주 나오는 케이스
if문의 중첩 줄이기

상황: 2개의 if문 중첩이 있는 Case

const onClickNumber = (e) => {
    if(operator){
        if(!Numtwo){
            $result.value = '';
        }
        Numtwo += e.target.textContent;
    } else {
        Numone += e.target.textContent;
    }
    $result.value += e.target.textContent
}

제거방법
1. if문 다음에 나오는 공통된 절차를 각 분기점 내부에 넣는다.

    const onClickNumber = (e) => {
        if(operator){
            if(!Numtwo){
                $result.value = '';
            }
            Numtwo += e.target.textContent;
            $result.value += e.target.textContent // 내부이동
        } else {
            Numone += e.target.textContent;
            $result.value += e.target.textContent //내부이동
        }
        //공통절차 $result.value += e.target.textContent
    }
2. 분기점에서 짧은 절차부터 실행하도록 if문 작성
    // else인 !operator 상황이 더 짧다.
    const onClickNumber = (e) => {
        if(!operator){ 
            Numone += e.target.textContent;
            $result.value += e.target.textContent
        } else {
            if(!Numtwo){
                $result.value = '';
            }
            Numtwo += e.target.textContent;
            $result.value += e.target.textContent 
        }   
    }

3. 짧은 절차가 종료되면 return(함수내부의 경우) or break(for문내부의 경우)로 중단한다.
4. else 부분 제거 (=> 하나의 if문이 제거된다)
    const onClickNumber = (e) => {
        if(!operator){ 
            Numone += e.target.textContent;
            $result.value += e.target.textContent
            return
        }
        // else문 없이도, operator가 있을 때만 실행된다.
        if(!Numtwo){
            $result.value = '';
        }
        Numtwo += e.target.textContent;
        $result.value += e.target.textContent   
    }

5. 다음 중첩된 분기점에서 1~4 과정 반복


// 다른 예제
function test(){
    let result = '';
    if(!a){
        result = 'a';
        result += 'b';
        return result;
    }
    if(!b){
        result = 'c';
    }
    result += 'b';
    return result 
}