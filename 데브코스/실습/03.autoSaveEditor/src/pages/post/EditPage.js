import Editor from "../../components/Editor.js";
import { $ } from "../../utils/dom.js";
export default function EditPage({ $target, moveToList }) {
  this.state = {
    postId: "new",
    post: {
      title: "post init title",
      content: "post init content",
    },
  };

  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    console.log("EditPage State변경: ", this.state);
    this.render();
  };

  this.template = () => {
    return `
    <h1>Edit 페이지</h1>
    <button id="moveListBtn">목록으로</button>
    <div id="editor"></div>
    `;
  };
  this.render = () => {
    $target.innerHTML = this.template();
    this.mounted();
  };

  this.mounted = () => {
    new Editor({ $target: $("#editor"), post: this.state.post });
  };

  this.setEvent = () => {
    $("#moveListBtn").addEventListener("click", moveToList);
  };

  this.render();
  this.setEvent();
}
