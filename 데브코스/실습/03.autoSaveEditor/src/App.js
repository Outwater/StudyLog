import { request } from "./utils/request.js";
import PostPage from "./pages/PostPage.js";

export default function App({ $target }) {
  this.state = [];
  this.setState = (nextState) => {
    this.state = nextState;
    console.log("state변경: ", this.state);
    this.render();
  };

  this.init = () => {
    const fetchPosts = async () => {
      const posts = await request("/posts");
      this.setState(posts);
    };
    fetchPosts();
  };
  this.template = () => {
    return `<div class='page'></div>`;
  };
  this.render = () => {
    $target.innerHTML = this.template();
    this.mounted();
  };

  this.mounted = () => {
    new PostPage({
      $target: document.querySelector(".page"),
      posts: this.state,
    });
  };

  this.init();
  this.render();
}
