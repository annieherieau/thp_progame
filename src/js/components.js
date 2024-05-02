// Construire l'url Rawg
export function getRequestUrl(argument) {
  let type = argument.split("?type=")[1];
  argument = argument.split("?type=")[0];
  let url = `${process.env.RAWG_URL}/games?key=${process.env.RAWG_APIKEY}`;
  let param = "";
  if (type) {
    param += `&${type}=${argument}`;
  } else {
    param += argument ? `&search=${argument}` : "";
  }
  return url + param;
}

export function Button(text, btnClass = "btn", id = "") {
  id = id ? `id="${id}"` : "";
  return `<button type="button" class="${btnClass}" ${id} =>${text}</button>`;
}

export function linkButton(text, btnClass = "btn", id = "", src) {
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
      return `<a href="${window.location.origin}/#pagelist/${
        p["platform"]["id"]
      }?type=parent_platforms"><img class='logo' src="${getLogo(
        plateform
      )}"></a>`;
    })
    .join("");
  return html;
}

export function getLogo(name) {
  name = name.toLowerCase().split(" ").shift();
  let path = "src/assets/images/logos/";
  switch (name) {
    case "linux":
      name = `${path}linux.svg`;
      break;
    case "playstation":
      name = `${path}ps4.svg`;
      break;
    case "nintendo":
      name = `${path}switch.svg`;
      break;

    case "xbox":
      name = `${path}xbox.svg`;
      break;

    case "pc":
      name = `${path}windows.svg`;
      break;

    case "macos":
      name = `${path}apple.png`;
      break;

    case "apple":
      name = `${path}apple.png`;
      break;

    default:
      name = `${path}mobile.svg`;
      break;
  }
  return name;
}
