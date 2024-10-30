import { renderApp } from "./app/App.tsx";

globalThis.addEventListener("load", () => {
  const elAppRoot = document.getElementById("app_root");
  if (!elAppRoot) {
    throw Error(`element #app_root is not found`);
  }
  renderApp(elAppRoot);
});
