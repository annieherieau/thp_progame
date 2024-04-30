import { linkButton } from "./components";

export const PageDetail = (argument = "") => {
  const preparePage = () => {
    const cleanedArgument = argument.trim().replace(/\s+/g, "-");
    const displayGame = (gameData) => {
      const {
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
        "check Website",
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
      console.log(background_image);
      bannerImage.style.backgroundImage = `url(${background_image})`;

      // Page content
      const articleDOM = document.querySelector(".page-detail");
      artH1.innerText = name;
      artRating.innerText = `${rating.toString()}/5 - ${reviews_count} votes`;
      artDescription.innerHTML = description
        .replace("<p>Plot</p>", "<h5>Plot</h4>")
        .replace("<p>Gameplay</p>", "<h5>Gameplay</h4>");
      // artInfos.innerHTML = `ok`;
    };

    const fetchGame = (url, argument) => {
      fetch(`${url}/games/${argument}?key=${process.env.RAWG_APIKEY}`)
        .then((response) => response.json())
        .then((responseData) => {
          displayGame(responseData);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };

    fetchGame(`${process.env.RAWG_URL}`, cleanedArgument);
  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-detail">
        <div id="article">
          <div id="artTitle"><h1 id="artH1"></h1><h4 id="artRating"></h4></div>
          <div id="artDescription"></d>
          <div id="artInfos"></div>
        </div>
        <div id="artStores"></div>
        <div id="artTrailer"></div>
        <div id="artScreenshots">
        <h1>SCREENSHOTS</h1>
        </div>
        <div id="artYoutube">
          <h1>YOUTUBE</h1>
          <div id="artYoutubeBanner"></div>
          <div id="artYoutubeVideos"></div>
        </div>
        <div id="artSimilar"></div>
      </section>
    `;

    preparePage();
  };

  render();
};
