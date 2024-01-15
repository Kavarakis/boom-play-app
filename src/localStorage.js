import store from "./redux/store";

export function initLocalStorage() {
  store.subscribe(() => {
    window.localStorage.setItem(
      "store",
      JSON.stringify(store.getState().gameCounter)
    );
  });
}

export function clearLocalStorage() {
  window.localStorage.clear();
}
