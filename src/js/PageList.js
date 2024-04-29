import { Button, cardGame } from "./components";

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

        // Toggle button showMore / ShowLess
document.getElementById("showBtn").addEventListener("click", (e) => {
  const cardGames = document.querySelectorAll(".cardGame");
  const extraCards = Array.from(cardGames).slice(9)
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
    const fetchList = (url, argument) => {
      const finalURL = argument ? `${url}&search=${argument}` : url;
      fetch(finalURL)
        .then((response) => response.json())
        .then((responseData) => {
          displayResults(responseData.results);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };

    fetchList(
      `${process.env.RAWG_URL}?key=${process.env.RAWG_APIKEY}`,
      cleanedArgument
    );
  };

  // Affichage de la page
  const render = () => {
    pageContent.innerHTML = `
      <section class="page-list">
        <div class="articles d-flex gap-3 flex-wrap"></div>
      </section>
    `;

    preparePage();
  };
  render();
};
