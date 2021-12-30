$Breadcrumb.addEventListener("click", handleCrumbClick);

let currentPathArr = [];
let currentPath = 0; // or id (0,1,2,3,4,)
let currentDirs; // [{id,name,type,filePath,parent},{ }, ... ]
init();

function init() {
  console.log("init실행");

  // BreadCrumb 초기화
  $Breadcrumb.innerHTML = "";
  currentPathArr.push(["root"]);
  currentPathArr.map((pathName) => {
    const crumb = document.createElement("div");
    crumb.textContent = pathName;
    $Breadcrumb.appendChild(crumb);
  });

  // rootData -> rootDir 렌더링
  // rootData
  fetch("https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev")
    .then((res) => res.json())
    .then((data) => {
      currentDirs = data;
      console.log("root Data are Accepted! currentDirs: ", currentDirs);
      renderDirs(data);
    })
    .catch((e) => console.log(e));
}

function handleCrumbClick() {
  console.log("handleCrumbClicked");
  // 현재path이동
  // fetch(현재path)
  // renderDirs(현재id)
}

function handleNodeClick() {
  console.log("handleNodeClicked");
  // 클릭 전 노드 정보 필요(부모)

  // type = DIRECTORY

  // type = FILE

  // type = null (뒤로가기)
}
async function renderCrumb(id) {}
function renderDirs(data) {
  $Nodes.innerHTML = "";
  data.map((node) => {
    const $Node = document.createElement("div");
    $Node.classList.add("Node");

    const $img = document.createElement("img");
    $img.src =
      node.type === "DIRECTORY"
        ? "./assets/directory.png"
        : "./assets/file.png";
    const $name = document.createElement("div");
    $name.textContent = node.name;

    $Node.append($img);
    $Node.append($name);
    $Nodes.appendChild($Node);
  });
}

function fetchDir(id) {
  fetch(
    `https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev/${nodeId}`
  )
    .then((res) => res.json())
    .then((data) => {
      currentDirs = data;
      console.log("fetchDirs are Accepted! currentDirs: ", currentDirs);
      renderCrumb(id);
      renderDirs(data);
    })
    .catch((e) => console.log(e));
}
