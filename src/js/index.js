import "../style/index.scss"; // Sass

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";
import { routes } from "./routes";

// Search form
document.addEventListener("submit", (e) => {
  e.preventDefault();
  let searchInput = encodeURIComponent(
    document.getElementById("search").value
  ).trim();
  document.location.href = `/#${routes.pagelist.name.toLowerCase()}/${searchInput}`;
});

// ROUTER
const callRoute = () => {
  const { hash } = window.location;
  const pathParts = hash.substring(1).split("/");
  const pageName = pathParts[0];
  const pageArgument = pathParts[1] || "";
  const pageFunction = routes[pageName];

  if (pageFunction !== undefined) {
    pageFunction(pageArgument);
  }
};

window.addEventListener("hashchange", () => callRoute());
window.addEventListener("DOMContentLoaded", () => callRoute());
