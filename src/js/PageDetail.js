import { linkButton } from "./components";
import { getLogo } from "./components";

export const PageDetail = (argument = "") => {
  const preparePage = () => {
    const cleanedArgument = argument.trim().replace(/\s+/g, "-");
    const displayGame = (gameData) => {
      const {
        id,
        name,
        background_image,
        description,
        released,
        developers,
        tags,
        genres,
        publishers,
        parent_platforms,
        website,
        rating,
        reviews_count,
        stores,
      } = gameData;

      let websiteBtn = linkButton(
        "Check Website",
        "btn",
        "websiteBtn",
        website
      );
      //banner
      pageBanner.innerHTML = `<div id="bannerImage">
        <div class="hero-text">
        ${websiteBtn}
      </div>
      </div>`;
      bannerImage.style.backgroundImage = `url(${background_image})`;

      // Page content
      const articleDOM = document.querySelector(".page-detail");
      artH1.innerText = name;
      artRating.innerText = `${rating.toString()}/5 - ${reviews_count} votes`;
      artDescription.innerHTML = description
        .replace("<p>Plot</p>", "<h5>Plot</h4>")
        .replace("<p>Gameplay</p>", "<h5>Gameplay</h4>")
        .replace("h3>", "h5>");

      displayInfos("Developper", developers, 'developers');
      displayInfos("Plaforms", parent_platforms, 'parent_platforms');
      displayInfos("Publisher", publishers, 'publishers');
      displayInfos("Genre", genres, 'genres');
      displayInfos("Tags", tags, 'tags');
      displayStores(id, stores);
      fetchData(id, "screenshots");
      // fetchData(id, "youtube"); // business and entreprise account only
    };

    function fetchGame(fullargument) {
      fullargument = fullargument.split("?type=");
      let argument = fullargument.shift();
      let type = fullargument.toString();

      fetch(
        `${process.env.RAWG_URL}/${type ? type : "games"}/${argument}?key=${
          process.env.RAWG_APIKEY
        }`
      )
        .then((response) => response.json())
        .then((responseData) => {
          displayGame(responseData);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }

    fetchGame(cleanedArgument);
  };

  function fetchData(gameId, data) {
    fetch(
      `${process.env.RAWG_URL}/games/${gameId}/${data}?key=${process.env.RAWG_APIKEY}`
    )
      .then((response) => response.json())
      .then((responseData) => {
        displayData(responseData.results, data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  function displayData(responseData, data) {
    switch (data) {
      case "screenshots":
        responseData.forEach((shot) => {
          artScreenshots.innerHTML += `<img class="screenshot" src="${shot.image}">`;
        });
        break;
      case "stores":
        let stores = {};
        for (const store of responseData) {
          stores[store.store_id] = store.url;
        }
        let storesLinks = document.querySelectorAll(".storesLink");
        storesLinks.forEach((link) => {
          link.href = stores[link.id];
        });
        break;

      default:
        break;
    }
  }

  function displayStores(gameId, stores) {
    stores.forEach((s) => {
      artStores.innerHTML += `<p><a href="" class="storesLink" id="${
        s.store.id
      }" target="_blank"><strong>${
        s.store.name
      }</strong> <img class='logo' src="${getLogo(s.store.name)}"></a></p>`;
    });
    fetchData(gameId, "stores");
  }

  function displayInfos(title, infos, type) {
    let infos_string = infos
      .map((i) => {
        if (i.name) {
          return `<a href="${window.location.origin}/#pagelist/${i.id}?type=${type}">${i.name}</a>`;
        } else {
          return `<a href="${window.location.origin}/#pagelist/${i.platform["id"]}?type=${type}">${i.platform["name"]}</a>`;
        }
      })
      .join(", ");
    artInfos.innerHTML += `<div style="min-width:7rem"><h6>${title}</h6><p>${infos_string}</p></div>`;
  }

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-detail">
        <div id="article">
          <div class="d-flex justify-content-between"><h1 id="artH1"></h1><h4 id="artRating" class="text-primary"></h4></div>
          <div id="artDescription"></div>
          <div id="artInfos" class="d-flex flex-wrap gap-3"></div>
        </div>
        <div id="artStores"><h1 class="text-primary">BUY</h1></div>
        <div id="artTrailer"></div>
        <div>
        <h1 class="text-primary">SCREENSHOTS</h1>
        <div id="artScreenshots"></div>
        </div>
      </section>
    `;

    preparePage();
  };

  render();
};
