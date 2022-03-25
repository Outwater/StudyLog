function solution(genres, plays) {
  /*
  Todo 1. data 파싱하기
  Todo 2. 장르별 합을 구해 우선순위 구하기
  Todo 3. 장르내에서 2개씩 뽑기
  */
  let album = [];
  let data = {};

  // 1-1) 장르별 노래횟수 넣기
  genres.forEach((g, idx) => {
    if (!data[g]) {
      data[g] = [];
    }
    data[g].push([idx, plays[idx]]);
  });

  // 1-2)data 형식 배열로 바꾸기
  // 1-3) 노래길이 순으로 내림차순 정렬
  data = Object.entries(data);
  data.forEach(([key, playList]) => playList.sort((a, b) => b[1] - a[1]));

  // 2. 장르별 합을 기준으로 내림차순 정렬
  data.sort((a, b) => {
    return (
      b[1].reduce((acc, cur) => acc + cur[1], 0) -
      a[1].reduce((acc, cur) => acc + cur[1], 0)
    );
  });
  // 3. 파싱된 data에서 2개의 곡(1개일 경우 1개의 곡) 뽑아 album에 넣기
  data.forEach((g, idx) => {
    if (g[1].length === 1) {
      album.push(g[1][0][0]);
    } else {
      album.push(g[1][0][0]);
      album.push(g[1][1][0]);
    }
  });
  return album;
}

function solution2(genres, plays) {
  const genreMap = new Map();

  genres
    .map((genre, idx) => [genre, plays[idx]])
    .forEach(([genre, play], index) => {
      const data = genreMap.get(genre) || { total: 0, pList: [] };
      genreMap.set(genre, {
        total: data.total + play, //
        pList: [...data.pList, { play, index }]
          .sort((a, b) => b.play - a.play)
          .slice(0, 2),
      });
    });

  return [...genreMap.entries()]
    .sort((a, b) => b[1].total - a[1].total)
    .flatMap((v) => v[1].pList)
    .map((song) => song.index);
}

console.log(
  solution2(
    ["classic", "pop", "classic", "classic", "pop"],
    [500, 600, 150, 800, 2500]
  )
); // [4,1,3,0];
