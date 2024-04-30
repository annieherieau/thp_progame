import { Button, cardGame } from "./components";
import { getRequestUrl } from "./components";

export const PageList = (argument = "") => {
  // Préparer le template
  const preparePage = () => {
    const cleanedArgument = argument.trim().replace(/\s+/g, "-");

    // affichage des articles
    const displayResults = (articles) => {
      const resultsContent = articles.map((article, i) => {
        let collapse = i < 9 ? false : true;
        return cardGame(article, collapse);
      });

      const resultsContainer = document.querySelector(".page-list .articles");
      resultsContainer.innerHTML += resultsContent.join("");
      const listContainer = document.querySelector(".page-list");
      listContainer.innerHTML += `<div class='d-flex justify-content-center my-3'>${Button(
        "Show More",
        "btn btn-primary showMore",
        "showBtn"
      )}</div>`;

      // Toggle button showMore / ShowLess
      document.getElementById("showBtn").addEventListener("click", (e) => {
        const cardGames = document.querySelectorAll(".cardGame");
        const extraCards = Array.from(cardGames).slice(9);
        if (e.target.className.includes("showMore")) {
          cardGames.forEach((card) => {
            card.classList.remove("collapse");
          });
          e.target.classList.replace("showMore", "showLess");
          e.target.innerText = "Show Less";
        } else {
          extraCards.forEach((card) => {
            card.classList.add("collapse");
          });
          e.target.classList.replace("showLess", "showMore");
          e.target.innerText = "Show More";
        }
      });

    };

    // REQUEST
    const fetchList = (argument) => {
      argument = argument.split('?').shift();
      // get param TYPE
      fetch(getRequestUrl(argument))
        .then((response) => response.json())
        .then((responseData) => {
          displayResults(responseData.results);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };

    fetchList(cleanedArgument);
  };

  // Affichage de la page
  const render = () => {
    pageBanner.innerHTML = `<h2>Welcome,</h2>
  <p>The Hyper Progame is the world’s premier event for computer and video games and related products. At The Hyper Progame,
    the video game industry’s top talent pack the Los Angeles Convention Center, connecting tens of thousands of the best,
    brightest, and most innovative in the interactive entertainment industry. For three exciting days, leading-edge companies,
    groundbreaking new technologies, and never-before-seen products will be showcased. The Hyper Progame connects you
    with both new and existing partners, industry executives, gamers, and social influencers providing unprecedented exposure</p>`;
    pageContent.innerHTML = `
      <section class="page-list">
        <div id="filter"></div>
        <div class="articles d-flex gap-3 flex-wrap"></div>
      </section>
    `;

    preparePage();
  };
  render();
};
