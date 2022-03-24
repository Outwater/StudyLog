
/*
풀이방법
* 오픈브라켓을 스택에 쌓는다 → `count를 +1` 해준다.
* 클로즈브라켓일 경우 스택에서 제거한다 → `count -1` 을 해준다
* `count가 마이너스`가 된다면, 없는 스택을 빼려고 한 것이므로 false를 리턴해준다.
*/

function solution(s){
  let open_braket_cnt = 0;
  
  for(let i = 0; i < s.length; i++){
      if(open_braket_cnt < 0) return false;
      
      if(s[i] === '('){
          open_braket_cnt += 1;
      } else {
          open_braket_cnt -= 1;
      }
  }
  return (open_braket_cnt === 0) ? true : false;
}