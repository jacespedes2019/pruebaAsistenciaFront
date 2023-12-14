import { Component, OnInit, ViewChild } from '@angular/core';
import { CharacterService } from '../../character/character.service';
import { Character } from '../../character/character';
import { MatPaginator } from '@angular/material/paginator';
import { NgForm } from '@angular/forms';
import { LocationService } from '../location.service';
import { LocationClass } from '../location';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.sass']
})
/**
 * Componente que representa una lista de ubicaciones en la interfaz de usuario.
 * Permite la visualización, filtrado y paginación de las ubicaciones.
 */
export class LocationListComponent implements OnInit {

  // Lista de todas las ubicaciones y lista paginada de ubicaciones
  locations: LocationClass[] = [];
  paginatedLocations: LocationClass[] = [];

  // Término de búsqueda para filtrar ubicaciones
  searchTerm: string = '';
  
  // Configuración de paginación
  pageSize = 25; // Tamaño de la página por defecto
  pageSizeOptions: number[] = [25, 50, 100]; // Opciones de tamaño de página

  // Estado de carga
  loading: boolean = true;
  
  // Referencia al paginador de Material
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  /**
   * Constructor del componente.
   * @param locationService Servicio que proporciona funciones para obtener información de ubicaciones.
   */
  constructor(private locationService: LocationService) {}

  /**
   * Método del ciclo de vida que se ejecuta al iniciar el componente.
   * Carga la lista completa de ubicaciones al iniciar el componente.
   */
  ngOnInit() {
    this.loadLocations();
    console.log('Locaciones cargados');
    
  }

  /**
   * Método del ciclo de vida que se ejecuta después de que se inicializa la vista.
   * Imprime el tamaño de la página después de inicializar la vista.
   */
  ngAfterViewInit(): void {
    console.log(this.paginator.pageSize);
  }

   /**
   * Método para cargar todas las ubicaciones desde el servicio.
   * Actualiza la lista completa de ubicaciones y la muestra paginada.
   */
  loadLocations() {
    this.loading=true;
    this.locationService.getLocations().subscribe((data) => {
      this.locations = data;
      // this.obtainCharacters();
      this.paginateLocations();
      this.loading=false;
    });
  }

  /**
   * Método para paginar las ubicaciones.
   * Utiliza el paginador de Material para mostrar la cantidad deseada de ubicaciones por página.
   */
  paginateLocations() {
    if (this.paginator && this.paginator.pageSize) {
      console.log('Sirvio');
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      const endIndex = startIndex + this.paginator.pageSize;
      console.log(this.paginator.pageIndex);
      this.paginatedLocations = this.locations.slice(startIndex, endIndex);
    }
    else if (this.paginator) {
      console.log('Sirvio');
      const startIndex = this.paginator.pageIndex * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      console.log(this.paginator.pageIndex);
      this.paginatedLocations = this.locations.slice(startIndex, endIndex);
    }
  }

  /**
   * Método para obtener y mostrar ubicaciones filtradas basadas en un término de búsqueda.
   * @param searchTerm Término de búsqueda para filtrar las ubicaciones por nombre.
   */
  getFilteredLocations(searchTerm: string = '') {
    this.loading=true;
    this.locationService.getFilteredLocations(searchTerm).subscribe((data) => {
      this.locations = data;
      // this.obtainCharacters();
      this.paginator.pageIndex=0
      this.paginateLocations();
      this.loading=false;
    });
  }

  /**
   * Método para iniciar una búsqueda basada en el término de búsqueda actual.
   * Imprime mensajes de depuración antes y después de la búsqueda.
   */
  search() {
    console.log('Entró s');
    this.getFilteredLocations(this.searchTerm);
    console.log('Salio s');
  }

  /**
   * Método para resetear el formulario y cargar todas las ubicaciones.
   * @param form Referencia al formulario que se desea resetear.
   */
  resetForm(form: NgForm): void {
    form.resetForm();
    this.paginator.pageIndex=0
    this.loadLocations(); 
    this.searchTerm="";
  }

  /**
   * Método que se ejecuta al cambiar de página.
   * Imprime un mensaje de depuración al cambiar de página.
   * Maneja los cambios de página actualizando la lista paginada.
   * @param event Objeto que representa el evento de cambio de página.
   */
  onPageChange(event: any) {
    console.log('Entró 2');
    // Maneja los cambios de página
    this.paginateLocations();
  }

}
