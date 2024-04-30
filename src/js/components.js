export function Button(text, btnClass = "btn btn-primary", id) {
  return `<button type="button" class="${btnClass}" id="${id}"=>${text}</button>`;
}

export function cardGame(article, collapse) {
  let genres = article.genres
    .map((genre) => {
      return genre["name"];
    })
    .join(" ");

  let plateforms = getPlatforms(article.parent_platforms);
  let image = article.background_image
    ? article.background_image
    : "src/assets/images/placeholder.png";
  let html = `<div class="cardGame${collapse ? " collapse" : ""}">
    <div class="cardBody">
      <img class="cardImg" src="${image}">
      <div class="overlay d-flex">
        <div class="textCard">date: ${article.released}<br>
        Genres: ${genres}<br>
        Rating: ${article.rating}<br>
        Rating count: ${article.ratings_count}</div>
      </div>
    </div>
    <h5><a href="#pagedetail/${article.id}">${article.name}</a></h5>
    ${plateforms}
  </div>`;
  return html;
}

function getPlatforms(plateforms) {
  let html = plateforms
    .map((p) => {
      let url = "/platforms";
      return `<a href="${url}"><img class='logo' src="${getLogo(
        p["platform"]["name"]
      )}"></a>`;
    })
    .join("");
  return html;
}

function getLogo(string) {
  string = string.toLowerCase().split(" ").shift();
  let path = "src/assets/images/logos/";
  switch (string) {
    case "linux":
      string = `${path}linux.svg`;
      break;
    case "playstation":
      string = `${path}ps4.svg`;
      break;
    case "nintendo":
      string = `${path}switch.svg`;
      break;

    case "xbox":
      string = `${path}xbox.svg`;
      break;

    case "pc":
      string = `${path}windows.svg`;
      break;

    case "macos":
      string = `${path}apple.png`;
      break;

    case "apple":
      string = `${path}apple.png`;
      break;

    default:
      string = `${path}mobile.svg`;
      break;
  }
  return string;
}
