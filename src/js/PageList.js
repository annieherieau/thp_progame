import { cardGame } from "./components";

export const PageList = (argument = "") => {

  // Préparer le template
  const preparePage = () => {
    const cleanedArgument = argument.trim().replace(/\s+/g, '-');

    // affichage des articles
    const displayResults = (articles) => {
      const resultsContent = articles.map((article) => cardGame(article));
      const resultsContainer = document.querySelector('.page-list .articles');
      resultsContainer.innerHTML = resultsContent.join("");
    };

    // REQUEST
    const fetchList = (url, argument) => {
      const finalURL = argument ? `${url}&search=${argument}` : url;
      fetch(finalURL)
        .then((response) => response.json())
        .then((responseData) => {
          displayResults(responseData.results)
        });
    };

    fetchList(`${process.env.RAWG_URL}?key=${process.env.RAWG_APIKEY}`, cleanedArgument);
  };

  // Affichage de la page
  const render = () => {
    pageContent.innerHTML = `
      <section class="page-list">
        <div class="articles d-flex gap-3 flex-wrap">Recherche : ${argument}</div>
      </section>
    `;

    preparePage();
  };
  render();
};
