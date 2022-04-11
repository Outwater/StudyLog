export const $ = (selector, $targetEl) => {
  if ($targetEl) {
    return $targetEl.querySelector(selector);
  }
  return document.querySelector(selector);
};
