export function Button(text, btnClass = "btn btn-primary", id) {
  return `<button type="button" class="${btnClass}" id="${id}"=>${text}</button>`;
}

export function cardGame(article, collapse) {
  let html = `<a class="cardGame${
    collapse ? " collapse" : ""
  }" href="#pagedetail/${article.id}">
  <img class="cardImg" src="${article.background_image}">
  <h5>${article.name}</h5>
</a>`;
  return html;
}
