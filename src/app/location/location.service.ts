import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, expand, pluck, toArray, concatMap  } from 'rxjs/operators';
import { of, forkJoin, mergeMap  } from 'rxjs';
import { LocationClass } from './location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private apiUrl = 'https://rickandmortyapi.com/api/location';

  constructor(private http: HttpClient) {}

  getLocations(): Observable<LocationClass[]> {
    return this.http.get<{ info: { pages: number }; results: LocationClass[] }>(this.apiUrl + '?page=1').pipe(
      map((data) => {
        const requests: Observable<LocationClass[]>[] = [of(data.results)];

        // Realizar solicitudes para las páginas restantes
        for (let i = 2; i <= data.info.pages; i++) {
          requests.push(this.http.get<{ results: LocationClass[] }>(this.apiUrl +"?page="+ i).pipe(map(res => res.results)));
        }

        return forkJoin(requests).pipe(map((locationArrays) => ([] as LocationClass[]).concat(...locationArrays)));
      }),
      // Desenrollar la observación anidada
      mergeMap((locations) => locations)
    );
  }

  getFilteredLocations(searchTerm: string): Observable<LocationClass[]> {
    const url = searchTerm ? `${this.apiUrl}/?name=${searchTerm}` : this.apiUrl;
    if(searchTerm){
      return this.http.get<{ info: { pages: number }; results: LocationClass[] }>(this.apiUrl + "/?name="+ searchTerm +'&page=1').pipe(
        map((data) => {
          const requests: Observable<LocationClass[]>[] = [of(data.results)];
  
          // Realizar solicitudes para las páginas restantes
          for (let i = 2; i <= data.info.pages; i++) {
            requests.push(this.http.get<{ results: LocationClass[] }>(this.apiUrl +"/?name="+ searchTerm +"&page="+ i).pipe(map(res => res.results)));
          }
  
          return forkJoin(requests).pipe(map((locationArrays) => ([] as LocationClass[]).concat(...locationArrays)));
        }),
        // Desenrollar la observación anidada
        mergeMap((locations) => locations)
      );
    }
    else{
      return this.getLocations();
    }
    }

    // Método para obtener un episodio por ID desde la ruta
  getLocationById(id: number): Observable<LocationClass> {
    // Hacer la solicitud HTTP para obtener el episodio específico
    return this.http.get<LocationClass>(`${this.apiUrl}/${id}`);
  }

  getLocationsByUrlList(urls: string[]): Observable<LocationClass[]> {
  
    const requests: Observable<LocationClass[]>[] = [];

    for (const url of urls) {
      const request = this.http.get<LocationClass>(url).pipe(map((res) => [res]));
      requests.push(request);
    }

    return forkJoin(requests).pipe(map((locationArrays) => ([] as LocationClass[]).concat(...locationArrays)));
  }


}
