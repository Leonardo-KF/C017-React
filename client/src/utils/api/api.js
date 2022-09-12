const defaultUrl = "https://animes-api-c017.herokuapp.com/animes";

export const api = {
  createAnime: async (anime) => {
    const response = await fetch(defaultUrl + "/create", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(anime),
    });
    const newAnime = await response.json();
    return newAnime;
  },
};
