export function Button(text, btnClass = "btn btn-primary", id) {
  return `<button type="button" class="${btnClass}" id="${id}"=>${text}</button>`;
}

export function cardGame(article, collapse) {
  let genres = article.genres.map((genre) => {
    return genre['name'];
  }).join(', ');
  let html = 
  `<a class="cardGame${collapse ? " collapse" : ""
    }" href="#pagedetail/${article.id}">
    <div class="cardBody">
      <img class="cardImg" src="${article.background_image}">
      <div class="overlay d-flex">
        <div class="textCard">date: ${article.released}<br>
        Genres: ${genres}<br>
        Rating: ${article.rating}<br>
        Rating count: ${article.ratings_count}</div>
      </div>
    </div>
    <h5>${article.name}</h5>
  </a>`;
  return html;
}
