import { Component, OnInit, ViewChild } from '@angular/core';
import { Character } from '../../character/character';
import { MatPaginator } from '@angular/material/paginator';
import { CharacterService } from '../../character/character.service';
import { ActivatedRoute } from '@angular/router';
import { LocationClass } from '../location';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.sass']
})
/**
 * Componente que representa los detalles de una ubicación en la interfaz de usuario.
 * Muestra información detallada sobre la ubicación y los personajes asociados a esa ubicación.
 */
export class LocationDetailComponent implements OnInit {

  // Lista de personajes asociados a la ubicación
  characters: Character[] = [];

  // Detalles de la ubicación actual
  location!: LocationClass;

  // Lista paginada de personajes
  paginatedCharacters: Character[] = [];

  // Configuración de paginación
  pageSize = 10; // Tamaño de la página por defecto
  pageSizeOptions: number[] = [5, 10, 15]; // Opciones de tamaño de página

  // Referencia al paginador de Material
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  /**
   * Constructor del componente.
   * @param route Objeto que contiene información sobre la ruta activada actualmente.
   * @param locationService Servicio que proporciona funciones para obtener detalles de ubicaciones.
   * @param characterService Servicio que proporciona funciones para obtener detalles de personajes.
   */
  constructor(
    private route: ActivatedRoute,
    private locationService: LocationService,
    private characterService: CharacterService
  ) {}

  /**
   * Método del ciclo de vida que se ejecuta al iniciar el componente.
   * Obtiene el ID de la ubicación desde la ruta y carga los detalles de la ubicación y los personajes asociados.
   */
  ngOnInit(): void {
    // Obtiene el ID de la ubicación desde la ruta
    const locationId = this.route.snapshot.paramMap.get('id');
    
    if (locationId) {
      // Llama al servicio para obtener detalles de la ubicación
      this.locationService.getLocationById(Number(locationId)).subscribe((location) => {
        this.location = location;
        // Obtén los personajes asociados a la ubicación
        this.obtainCharacters();
        this.paginateCharacters(); // Paginar los personajes después de obtenerlos
      });
    }
  }

  /**
   * Método para obtener y mostrar los personajes asociados a la ubicación.
   * Utiliza el servicio de personajes para obtener los detalles de los personajes asociados a la ubicación actual.
   */
  obtainCharacters() {
    this.characterService.getCharactersByUrlList(this.location.residents).subscribe((data) => {
      // En este punto, 'data' es la lista de personajes obtenidos para la ubicación actual
      this.characters = data;
    });
  }

  /**
   * Método para paginar la lista de personajes.
   * Utiliza el paginador de Material para mostrar la cantidad deseada de personajes por página.
   */
  paginateCharacters() {
    if (this.paginator && this.paginator.pageSize) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      const endIndex = startIndex + this.paginator.pageSize;
      this.paginatedCharacters = this.characters.slice(startIndex, endIndex);
    } else if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.paginatedCharacters = this.characters.slice(startIndex, endIndex);
    }
  }

  /**
   * Método que se ejecuta al cambiar de página.
   * Maneja los cambios de página actualizando la lista paginada de personajes.
   * @param event Objeto que representa el evento de cambio de página.
   */
  onPageChange(event: any) {
    console.log('Entró al cambio de página');
    this.paginateCharacters();
  }

}
