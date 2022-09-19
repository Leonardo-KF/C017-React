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

  getAllAnimes: async () => {
    const response = await fetch(defaultUrl + "/");
    const allAnimes = await response.json();

    return allAnimes;
  },

  deleteAnime: async (animeId) => {
    const response = await fetch(defaultUrl + "/delete/" + animeId, {
      method: "DELETE",
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    const animeDeleted = await response.json();
    return animeDeleted;
  },

  updateAnime: async (anime) => {
    const response = await fetch(defaultUrl + "/update", {
      method: "PUT",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(anime),
    });

    const animeUpdated = await response.json();
    return animeUpdated;
  },
};
