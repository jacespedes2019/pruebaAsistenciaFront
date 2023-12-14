import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, expand, pluck, toArray, concatMap  } from 'rxjs/operators';
import { of, forkJoin, mergeMap  } from 'rxjs';
import { EpisodeNoCha } from './episodeNoCharacters';

/**
 * Servicio que gestiona la obtención de datos relacionados con episodios de la serie "Rick and Morty".
 */
@Injectable({
  providedIn: 'root'
})
export class EpisodeService {
  /**
   * URL base de la API para los episodios.
   */
  private apiUrl = 'https://rickandmortyapi.com/api/episode';

  /**
   * Constructor del servicio EpisodeService.
   * @param http Cliente HTTP utilizado para realizar las solicitudes.
   */
  constructor(private http: HttpClient) {}

  /**
   * Obtiene la lista completa de episodios.
   * @returns Observable que emite un array de episodios.
   */
  getEpisodes(): Observable<EpisodeNoCha[]> {
    return this.http.get<{ info: { pages: number }; results: EpisodeNoCha[] }>(this.apiUrl + '?page=1').pipe(
      map((data) => {
        const requests: Observable<EpisodeNoCha[]>[] = [of(data.results)];

        // Realiza solicitudes para las páginas restantes
        for (let i = 2; i <= data.info.pages; i++) {
          requests.push(this.http.get<{ results: EpisodeNoCha[] }>(`${this.apiUrl}?page=${i}`).pipe(map(res => res.results)));
        }

        return forkJoin(requests).pipe(map((episodeArrays) => ([] as EpisodeNoCha[]).concat(...episodeArrays)));
      }),
      // Desenrolla la observación anidada
      mergeMap((episodes) => episodes)
    );
  }

  /**
   * Obtiene episodios filtrados por un término de búsqueda.
   * @param searchTerm Término de búsqueda.
   * @returns Observable que emite un array de episodios filtrados.
   */
  getFilteredEpisodes(searchTerm: string): Observable<EpisodeNoCha[]> {
    const url = searchTerm ? `${this.apiUrl}/?name=${searchTerm}` : this.apiUrl;
    if (searchTerm) {
      return this.http.get<{ info: { pages: number }; results: EpisodeNoCha[] }>(`${this.apiUrl}/?name=${searchTerm}&page=1`).pipe(
        map((data) => {
          const requests: Observable<EpisodeNoCha[]>[] = [of(data.results)];

          // Realiza solicitudes para las páginas restantes
          for (let i = 2; i <= data.info.pages; i++) {
            requests.push(this.http.get<{ results: EpisodeNoCha[] }>(`${this.apiUrl}/?name=${searchTerm}&page=${i}`).pipe(map(res => res.results)));
          }

          return forkJoin(requests).pipe(map((episodeArrays) => ([] as EpisodeNoCha[]).concat(...episodeArrays)));
        }),
        // Desenrolla la observación anidada
        mergeMap((episodes) => episodes)
      );
    } else {
      return this.getEpisodes();
    }
  }

  /**
   * Obtiene un episodio por su ID.
   * @param id ID del episodio.
   * @returns Observable que emite el episodio específico.
   */
  getEpisodeById(id: number): Observable<EpisodeNoCha> {
    // Realiza la solicitud HTTP para obtener el episodio específico
    return this.http.get<EpisodeNoCha>(`${this.apiUrl}/${id}`);
  }

  /**
   * Obtiene una lista de episodios a partir de una lista de URLs.
   * @param urls Lista de URLs de episodios.
   * @returns Observable que emite un array de episodios.
   */
  getEpisodesByUrlList(urls: string[]): Observable<EpisodeNoCha[]> {
    const requests: Observable<EpisodeNoCha[]>[] = [];

    for (const url of urls) {
      const request = this.http.get<EpisodeNoCha>(url).pipe(map((res) => [res]));
      requests.push(request);
    }

    return forkJoin(requests).pipe(map((episodeArrays) => ([] as EpisodeNoCha[]).concat(...episodeArrays)));
  }
}
