export default function PostList({ $target, posts, onPostClick }) {
  this.template = () => {
    return `<div>
    <ul>
    ${posts
      .map((post) => {
        return `<li data-id=${post.id}>${post.content}</li>`;
      })
      .join("")}
    </ul></div>`;
  };

  this.render = () => {
    $target.innerHTML = this.template();
    this.mounted();
  };

  this.mounted = () => {};

  this.render();
}
