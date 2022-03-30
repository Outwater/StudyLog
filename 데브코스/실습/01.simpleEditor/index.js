const $commandBtns = document.querySelectorAll(".toolbar button");

$commandBtns.forEach(($btn) => {
  $btn.addEventListener("click", (e) => {
    const command = e.target.dataset["command"];
    document.execCommand(command);
  });
});
