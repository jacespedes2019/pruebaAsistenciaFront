/**
 * Clase que representa un personaje en la serie "Rick and Morty".
 */
export class Character {
  /**
   * Identificador único del personaje.
   */
  id: number;

  /**
   * Nombre del personaje.
   */
  name: string;

  /**
   * Estado del personaje (vivo, muerto, etc.).
   */
  status: string;

  /**
   * Especie del personaje.
   */
  species: string;

  /**
   * Tipo del personaje.
   */
  type: string;

  /**
   * Género del personaje.
   */
  gender: string;

  /**
   * Origen del personaje, que incluye el nombre y la URL.
   */
  origin: {
    name: string;
    url: string;
  };

  /**
   * Ubicación actual del personaje, que incluye el nombre y la URL.
   */
  location: {
    name: string;
    url: string;
  };

  /**
   * URL de la imagen del personaje.
   */
  image: string;

  /**
   * Lista de URLs de los episodios en los que aparece el personaje.
   */
  episode: string[];

  /**
   * URL del personaje.
   */
  url: string;

  /**
   * Fecha de creación del personaje.
   */
  created: string;

  /**
   * Constructor de la clase Character.
   * @param id Identificador único del personaje.
   * @param name Nombre del personaje.
   * @param status Estado del personaje.
   * @param species Especie del personaje.
   * @param type Tipo del personaje.
   * @param gender Género del personaje.
   * @param origin Origen del personaje (nombre y URL).
   * @param location Ubicación actual del personaje (nombre y URL).
   * @param image URL de la imagen del personaje.
   * @param episode Lista de URLs de los episodios en los que aparece el personaje.
   * @param url URL del personaje.
   * @param created Fecha de creación del personaje.
   */
    constructor(
      id: number,
      name: string,
      status: string,
      species: string,
      type: string,
      gender: string,
      origin: {
        name: string;
        url: string;
      },
      location: {
        name: string;
        url: string;
      },
      image: string,
      episode: string[],
      url: string,
      created: string
    ) {
      this.id = id;
      this.name = name;
      this.status = status;
      this.species = species;
      this.type = type;
      this.gender = gender;
      this.origin = { ...origin };
      this.location = { ...location };
      this.image = image;
      this.episode = [...episode];
      this.url = url;
      this.created = created;
    }
  }
  