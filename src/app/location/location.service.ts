import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, expand, pluck, toArray, concatMap  } from 'rxjs/operators';
import { of, forkJoin, mergeMap  } from 'rxjs';
import { LocationClass } from './location';

@Injectable({
  providedIn: 'root'
})
/**
 * Clase encargada de ser el servicio de las Locaciones y obtenerlas de la API
 */
export class LocationService {

  // URL de la API
  private apiUrl = 'https://rickandmortyapi.com/api/location';

  /**
   * Constructor de la clase
   * @param http HttpClient que se utiliza para realizar las solicitudes HTPP
   */
  constructor(private http: HttpClient) {}

  /**
   * Obtiene todas las ubicaciones paginadas.
   * @returns Un Observable de la lista completa de ubicaciones.
   */
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

  /**
   * Obtiene ubicaciones filtradas por nombre.
   * @param searchTerm Término de búsqueda para filtrar las ubicaciones por nombre.
   * @returns Un Observable de la lista de ubicaciones filtradas.
   */
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

    /**
   * Obtiene una ubicación por su ID.
   * @param id ID de la ubicación que se desea obtener.
   * @returns Un Observable de la ubicación con el ID especificado.
   */
  getLocationById(id: number): Observable<LocationClass> {
    // Hacer la solicitud HTTP para obtener el episodio específico
    return this.http.get<LocationClass>(`${this.apiUrl}/${id}`);
  }

  /**
   * Obtiene una lista de ubicaciones a partir de una lista de URLs.
   * @param urls Lista de URLs de ubicaciones que se desea obtener.
   * @returns Un Observable de la lista de ubicaciones obtenidas.
   */
  getLocationsByUrlList(urls: string[]): Observable<LocationClass[]> {
  
    const requests: Observable<LocationClass[]>[] = [];

    for (const url of urls) {
      const request = this.http.get<LocationClass>(url).pipe(map((res) => [res]));
      requests.push(request);
    }

    return forkJoin(requests).pipe(map((locationArrays) => ([] as LocationClass[]).concat(...locationArrays)));
  }


}
