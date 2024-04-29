import "../style/index.scss"; // Sass

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";
import { routes } from "./routes";
/*
// You can also import JavaScript plugins individually as needed to keep bundle
import Alert from 'bootstrap/js/dist/alert'

// or, specify which plugins you need:
import { Tooltip, Toast, Popover } from 'bootstrap'
*/

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
