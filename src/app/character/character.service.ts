import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, expand, pluck, toArray, concatMap  } from 'rxjs/operators';
import { Character } from './character';
import { of, forkJoin, mergeMap  } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) {}

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

    
}
