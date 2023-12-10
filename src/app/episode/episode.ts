import { Character } from "../character/character";

export class Episode {
    id: number;
    name: string;
    air_date: string;
    episode: string;
    characters: Character[];
    url: string;
    created: string;
  
    constructor(
      id: number,
      name: string,
      air_date: string,
      episode: string,
      characters: Character[],
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