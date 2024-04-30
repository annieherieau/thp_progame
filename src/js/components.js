// Construire l'url Rawg
export function getRequestUrl(type, argument) {
  let url = `${process.env.RAWG_URL}/${type}?key=${process.env.RAWG_APIKEY}`;
  let param = "";
  if (type === "games") {
    param = argument ? `&search=${argument}` : `&ordering=released`;
  }
  if (type === "games") {
    param = argument ? `&search=${argument}` : `&ordering=released`;
  }

  return url + param;
}

export function Button(text, btnClass = "btn", id="") {
  id = id ? `id="${id}"` : "";
  return `<button type="button" class="${btnClass}" ${id} =>${text}</button>`;
}

export function linkButton(text, btnClass = "btn", id="", src) {
  id = id ? `id="${id}"` : "";
  return `<a class="${btnClass}" href="${src}" ${id} target="_blank"=>${text}</a>`;
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
      let plateform = p["platform"]["name"];
      return `<img class='logo' src="${getLogo(plateform)}">`;
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
