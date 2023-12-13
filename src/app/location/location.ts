/**
 * Clase que representa una ubicación en la serie "Rick and Morty".
 */
export class LocationClass {
    /**
     * Identificador único de la ubicación.
     */
    id: number;
  
    /**
     * Nombre de la ubicación.
     */
    name: string;
  
    /**
     * Tipo de la ubicación (por ejemplo, "Planet").
     */
    type: string;
  
    /**
     * Dimensión a la que pertenece la ubicación.
     */
    dimension: string;
  
    /**
     * Lista de URLs de los residentes de la ubicación.
     */
    residents: string[];
  
    /**
     * URL de la ubicación.
     */
    url: string;
  
    /**
     * Fecha de creación de la ubicación.
     */
    created: string;
  
    /**
     * Constructor de la clase LocationClass.
     * @param id Identificador único de la ubicación.
     * @param name Nombre de la ubicación.
     * @param type Tipo de la ubicación.
     * @param dimension Dimensión a la que pertenece la ubicación.
     * @param residents Lista de URLs de los residentes de la ubicación.
     * @param url URL de la ubicación.
     * @param created Fecha de creación de la ubicación.
     */
    constructor(
      id: number,
      name: string,
      type: string,
      dimension: string,
      residents: string[],
      url: string,
      created: string
    ) {
      this.id = id;
      this.name = name;
      this.type = type;
      this.dimension = dimension;
      this.residents = residents;
      this.url = url;
      this.created = created;
    }
  }
  