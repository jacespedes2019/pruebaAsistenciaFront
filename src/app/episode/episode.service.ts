import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, expand, pluck, toArray, concatMap  } from 'rxjs/operators';
import { of, forkJoin, mergeMap  } from 'rxjs';
import { EpisodeNoCha } from './episodeNoCharacters';

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {

  private apiUrl = 'https://rickandmortyapi.com/api/episode';

  constructor(private http: HttpClient) {}

  getEpisodes(): Observable<EpisodeNoCha[]> {
    return this.http.get<{ info: { pages: number }; results: EpisodeNoCha[] }>(this.apiUrl + '?page=1').pipe(
      map((data) => {
        const requests: Observable<EpisodeNoCha[]>[] = [of(data.results)];

        // Realizar solicitudes para las páginas restantes
        for (let i = 2; i <= data.info.pages; i++) {
          requests.push(this.http.get<{ results: EpisodeNoCha[] }>(this.apiUrl +"?page="+ i).pipe(map(res => res.results)));
        }

        return forkJoin(requests).pipe(map((episodeArrays) => ([] as EpisodeNoCha[]).concat(...episodeArrays)));
      }),
      // Desenrollar la observación anidada
      mergeMap((episodes) => episodes)
    );
  }

  getFilteredEpisodes(searchTerm: string): Observable<EpisodeNoCha[]> {
    const url = searchTerm ? `${this.apiUrl}/?name=${searchTerm}` : this.apiUrl;
    if(searchTerm){
      return this.http.get<{ info: { pages: number }; results: EpisodeNoCha[] }>(this.apiUrl + "/?name="+ searchTerm +'&page=1').pipe(
        map((data) => {
          const requests: Observable<EpisodeNoCha[]>[] = [of(data.results)];
  
          // Realizar solicitudes para las páginas restantes
          for (let i = 2; i <= data.info.pages; i++) {
            requests.push(this.http.get<{ results: EpisodeNoCha[] }>(this.apiUrl +"/?name="+ searchTerm +"&page="+ i).pipe(map(res => res.results)));
          }
  
          return forkJoin(requests).pipe(map((episodeArrays) => ([] as EpisodeNoCha[]).concat(...episodeArrays)));
        }),
        // Desenrollar la observación anidada
        mergeMap((episodes) => episodes)
      );
    }
    else{
      return this.getEpisodes();
    }
    }

    // Método para obtener un episodio por ID desde la ruta
  getEpisodeById(id: number): Observable<EpisodeNoCha> {
    // Hacer la solicitud HTTP para obtener el episodio específico
    return this.http.get<EpisodeNoCha>(`${this.apiUrl}/${id}`);
  }

  getEpisodesByUrlList(urls: string[]): Observable<EpisodeNoCha[]> {
  
    const requests: Observable<EpisodeNoCha[]>[] = [];

    for (const url of urls) {
      const request = this.http.get<EpisodeNoCha>(url).pipe(map((res) => [res]));
      requests.push(request);
    }

    return forkJoin(requests).pipe(map((episodeArrays) => ([] as EpisodeNoCha[]).concat(...episodeArrays)));
  }

}
