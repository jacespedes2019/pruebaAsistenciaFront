/**
 * Clase que representa un episodio en la serie "Rick and Morty" sin incluir información de personajes.
 */
export class EpisodeNoCha {
  /**
   * Identificador único del episodio.
   */
  id: number;

  /**
   * Nombre del episodio.
   */
  name: string;

  /**
   * Fecha de emisión del episodio.
   */
  air_date: string;

  /**
   * Número del episodio.
   */
  episode: string;

  /**
   * Lista de URLs de los personajes presentes en el episodio.
   */
  characters: string[];

  /**
   * URL del episodio.
   */
  url: string;

  /**
   * Fecha de creación del episodio.
   */
  created: string;

  /**
   * Constructor de la clase EpisodeNoCha.
   * @param id Identificador único del episodio.
   * @param name Nombre del episodio.
   * @param air_date Fecha de emisión del episodio.
   * @param episode Número del episodio.
   * @param characters Lista de URLs de los personajes presentes en el episodio.
   * @param url URL del episodio.
   * @param created Fecha de creación del episodio.
   */
    constructor(
      id: number,
      name: string,
      air_date: string,
      episode: string,
      characters: string[],
      url: string,
      created: string
    ) {
      this.id = id;
      this.name = name;
      this.air_date = air_date;
      this.episode = episode;
      this.characters = characters;
      this.url = url;
      this.created = created;
    }
  }