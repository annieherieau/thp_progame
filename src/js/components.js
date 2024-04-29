export function Button(text, btnClass = "btn btn-primary") {
  return `<button class="${btnClass}">${text}</button>`;
}

export function cardGame(article) {
  let html = `<a class="cardGame" href="#pagedetail/${article.id}">
  <img class="cardImg" src="${article.background_image}">
  <h5>${article.name}</h5>
</a>`;
  return html;
}

