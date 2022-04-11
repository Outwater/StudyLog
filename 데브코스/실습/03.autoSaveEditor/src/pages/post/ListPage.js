import PostList from "../../components/PostList.js";
import { $ } from "../../utils/dom.js";

export default function PostPage({ $target, posts }) {
  this.template = () => {
    return `
    <h1>Post 페이지</h1>
    <button>post 생성하기</button>
    <div id="postList"></div>
    `;
  };
  this.render = () => {
    $target.innerHTML = this.template();
    this.mounted();
  };

  this.mounted = () => {
    new PostList({ $target: $("#postList"), posts });
  };

  this.render();
}
