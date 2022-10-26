const defaultUrl = "https://el-geladon-backend.herokuapp.com/paletas";

export const api = {
  createPaleta: async (paleta) => {
    const response = await fetch(`${defaultUrl}/create`, {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(paleta),
    });

    const newPaleta = await response.json();

    return newPaleta;
  },

  getAllPaletas: async () => {
    const response = await fetch(`${defaultUrl}/find-paletas`);
    const allPaletas = response.json();
    return allPaletas;
  },

  getPaletaById: async (id) => {
    const response = await fetch(`${defaultUrl}/find-paleta/${id}`);
    const paleta = response.json();
    return paleta;
  },

  updatePaleta: async (id, paleta) => {
    const response = await fetch(`${defaultUrl}/update/${id}`, {
      method: "PUT",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(paleta),
    });

    const paletaUpdated = await response.json();

    return paletaUpdated;
  },

  deletePaleta: async (id) => {
    const response = await fetch(`${defaultUrl}/delete/${id}`, {
      method: "DELETE",
      headers: new Headers({ "Content-Type": "application/json" }),
    });

    const paletaDeleted = response.json();

    return paletaDeleted;
  },

  getAllSacola: async () => {
    const response = await fetch(`${defaultUrl}/all-sacola`);

    const allSacola = response.json();
    
    return allSacola;
  },

  createSacola: async (sacola) => {
    const response = await fetch(`${defaultUrl}/create-sacola`, {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(sacola),
    });

    const newSacola = await response.json();

    return newSacola;
  },

  finishSacola: async () => {
    const response = await fetch(`${defaultUrl}/finish-sacola`, {
      method: "DELETE",
    });

    const sacolaClosed = response.json();

    return sacolaClosed;
  },
};
