import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, expand, pluck, toArray, concatMap  } from 'rxjs/operators';
import { Character } from './character';
import { of, forkJoin, mergeMap  } from 'rxjs';

/**
 * Servicio que gestiona la obtención de datos relacionados con personajes de la serie "Rick and Morty".
 */
@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  /**
   * URL base de la API para los personajes.
   */
  private apiUrl = 'https://rickandmortyapi.com/api/character';

  /**
   * Constructor del servicio CharacterService.
   * @param http Cliente HTTP utilizado para realizar las solicitudes.
   */
  constructor(private http: HttpClient) {}

  /**
   * Obtiene la lista completa de personajes.
   * @returns Observable que emite un array de personajes.
   */
  getCharacters(): Observable<Character[]> {
    return this.http.get<{ info: { pages: number }; results: Character[] }>(this.apiUrl + '?page=1').pipe(
      map((data) => {
        const requests: Observable<Character[]>[] = [of(data.results)];

        // Realizar solicitudes para las páginas restantes
        for (let i = 2; i <= data.info.pages; i++) {
          requests.push(this.http.get<{ results: Character[] }>(this.apiUrl +"?page="+ i).pipe(map(res => res.results)));
        }

        return forkJoin(requests).pipe(map((characterArrays) => ([] as Character[]).concat(...characterArrays)));
      }),
      // Desenrollar la observación anidada
      mergeMap((characters) => characters)
    );
  }

  
  /**
   * Obtiene personajes filtrados por un término de búsqueda.
   * @param searchTerm Término de búsqueda.
   * @returns Observable que emite un array de personajes filtrados.
   */
  getFilteredCharacters(searchTerm: string): Observable<Character[]> {
    const url = searchTerm ? `${this.apiUrl}/?name=${searchTerm}` : this.apiUrl;
    if(searchTerm){
      return this.http.get<{ info: { pages: number }; results: Character[] }>(this.apiUrl + "/?name="+ searchTerm +'&page=1').pipe(
        map((data) => {
          const requests: Observable<Character[]>[] = [of(data.results)];
  
          // Realizar solicitudes para las páginas restantes
          for (let i = 2; i <= data.info.pages; i++) {
            requests.push(this.http.get<{ results: Character[] }>(this.apiUrl +"/?name="+ searchTerm +"&page="+ i).pipe(map(res => res.results)));
          }
  
          return forkJoin(requests).pipe(map((characterArrays) => ([] as Character[]).concat(...characterArrays)));
        }),
        // Desenrollar la observación anidada
        mergeMap((characters) => characters)
      );
    }
    else{
      return this.getCharacters();
    }
    }

    /**
   * Obtiene una lista de personajes a partir de una lista de URLs.
   * @param urls Lista de URLs de personajes.
   * @returns Observable que emite un array de personajes.
   */
    getCharactersByUrlList(urls: string[]): Observable<Character[]> {
  
      const requests: Observable<Character[]>[] = [];
  
      for (const url of urls) {
        const request = this.http.get<Character>(url).pipe(map((res) => [res]));
        requests.push(request);
      }
  
      return forkJoin(requests).pipe(map((characterArrays) => ([] as Character[]).concat(...characterArrays)));
    }

    /**
   * Obtiene un personaje por su ID.
   * @param id ID del personaje.
   * @returns Observable que emite el personaje específico.
   */
    getCharacterById(id: number): Observable<Character> {
    // Hacer la solicitud HTTP para obtener el episodio específico
      return this.http.get<Character>(`${this.apiUrl}/${id}`);
  }
  
}
