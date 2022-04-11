import PostList from "../components/PostList.js";

export default function PostPage({ $target, posts }) {
  this.template = () => {
    return `
    <h1>Post 페이지</h1>
    <div id="postList"></div>
    <button>post추가하기</button>`;
  };
  this.render = () => {
    $target.innerHTML = this.template();
    this.mounted();
  };

  this.mounted = () => {
    const $postList = document.getElementById("postList");
    new PostList({ $target: $postList, posts });
  };

  this.render();
}
