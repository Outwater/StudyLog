import ListPage from "./pages/post/ListPage.js";
import EditPage from "./pages/post/EditPage.js";
import { request } from "./utils/request.js";
import { $ } from "./utils/dom.js";

export default function App({ $target }) {
  this.state = { posts: [], page: "edit" };
  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    console.log("state변경: ", this.state);
    this.render();
  };

  this.init = () => {
    const fetchPosts = async () => {
      const posts = await request("/posts");
      this.setState({ posts });
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
    const { page, posts } = this.state;

    if (page === "list") {
      new ListPage({
        $target: $(".page"),
        posts: posts,
      });
    } else if (page === "edit") {
      new EditPage({
        $target: $(".page"),
        moveToList: () => this.setState({ page: "list" }),
      });
    }
  };

  this.init();
  this.render();
}
