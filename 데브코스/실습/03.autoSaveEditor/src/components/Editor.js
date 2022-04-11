export default function Editor({ $target, post }) {
  this.template = () => {
    return `
    <input value=${post.title} />
    <textarea>${post.content}</textarea>`;
  };

  this.render = () => {
    $target.innerHTML = this.template();
  };

  this.render();
}
