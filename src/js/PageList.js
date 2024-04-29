export const PageList = (argument = "") => {
  console.log("Page List", argument);

  // Préparer le template
  const preparePage = () => {
    const cleanedArgument = argument.trim().replace(/\s+/g, '-');

    // affichage des articles
    const displayResults = (articles) => {
      const resultsContent = articles.map((article) => (
        `<article class="cardGame">
          <h1>${article.name}</h1>
          <h2>${article.released}</h2>
          <a href="#pagedetail/${article.id}">${article.id}</a>
        </article>`
      ));
      const resultsContainer = document.querySelector('.page-list .articles');
      resultsContainer.innerHTML = resultsContent.join("\n");
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
        <div class="articles">Hey, this page is a PageList template, about : ${argument}</div>
      </section>
    `;

    preparePage();
  };
  render();
};
