export const request = (url, resolve, reject) => {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("load", (e) => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(xhr.statusText);
      }
    }
  });

  xhr.addEventListener("error", (e) => reject(e));

  xhr.open("GET", url);
  xhr.send();
};
