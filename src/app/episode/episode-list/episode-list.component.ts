import { Component, OnInit, ViewChild } from '@angular/core';
import { CharacterService } from '../../character/character.service';
import { Character } from '../../character/character';
import { MatPaginator } from '@angular/material/paginator';
import { NgForm } from '@angular/forms';
import { EpisodeNoCha } from '../episodeNoCharacters';
import { EpisodeService } from '../episode.service';

@Component({
  selector: 'app-episode-list',
  templateUrl: './episode-list.component.html',
  styleUrls: ['./episode-list.component.sass']
})
/**
 * Componente que representa la lista de episodios en la interfaz de usuario.
 * Permite la visualización y búsqueda de episodios, así como la paginación de los resultados.
 */
export class EpisodeListComponent implements OnInit {

  // Lista de episodios sin personajes asociados y lista paginada de episodios
  episodesNoCha: EpisodeNoCha[] = [];
  paginatedEpisodes: EpisodeNoCha[] = [];

  // Término de búsqueda para filtrar episodios
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
   * @param episodeService Servicio que proporciona funciones para obtener detalles de episodios.
   */
  constructor(private episodeService: EpisodeService) {}

  /**
   * Método del ciclo de vida que se ejecuta al iniciar el componente.
   * Carga la lista de episodios y realiza algunas configuraciones iniciales.
   */
  ngOnInit() {
    this.loadEpisodes();
    console.log('Episodios cargados');
  }

  /**
   * Método que se ejecuta después de que se ha inicializado la vista.
   * Imprime en la consola el tamaño de la página del paginador.
   */
  ngAfterViewInit(): void {
    console.log(this.paginator.pageSize);
  }

  /**
   * Método para cargar la lista de episodios.
   * Utiliza el servicio de episodios para obtener los detalles de los episodios.
   */
  loadEpisodes() {
    this.loading = true;
    this.episodeService.getEpisodes().subscribe((data) => {
      this.episodesNoCha = data;
      this.paginateEpisodes(); // Paginar los episodios después de obtenerlos
      this.loading = false;
    });
  }

  /**
   * Método para paginar la lista de episodios.
   * Utiliza el paginador de Material para mostrar la cantidad deseada de episodios por página.
   */
  paginateEpisodes() {
    if (this.paginator && this.paginator.pageSize) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      const endIndex = startIndex + this.paginator.pageSize;
      this.paginatedEpisodes = this.episodesNoCha.slice(startIndex, endIndex);
    } else if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.paginatedEpisodes = this.episodesNoCha.slice(startIndex, endIndex);
    }
  }

  /**
   * Método para obtener y mostrar episodios filtrados por nombre.
   * Utiliza el servicio de episodios para obtener los episodios filtrados.
   * @param searchTerm Término de búsqueda para filtrar episodios por nombre.
   */
  getFilteredEpisodes(searchTerm: string = '') {
    this.loading = true;
    this.episodeService.getFilteredEpisodes(searchTerm).subscribe((data) => {
      this.episodesNoCha = data;
      this.paginator.pageIndex = 0;
      this.paginateEpisodes(); // Paginar los episodios filtrados
      this.loading = false;
    });
  }

  /**
   * Método que se ejecuta al hacer clic en el botón de búsqueda.
   * Inicia la búsqueda de episodios con el término especificado.
   */
  search() {
    console.log('Entró a la búsqueda');
    this.getFilteredEpisodes(this.searchTerm);
    console.log('Salió de la búsqueda');
  }

  /**
   * Método para restablecer el formulario de búsqueda.
   * Reinicia el paginador y carga la lista completa de episodios.
   * @param form Objeto que representa el formulario de búsqueda.
   */
  resetForm(form: NgForm): void {
    form.resetForm();
    this.paginator.pageIndex = 0;
    this.loadEpisodes(); // Puedes llamar a tu función de carga aquí si es necesario
    this.searchTerm = "";
  }

  /**
   * Método que se ejecuta al cambiar de página.
   * Maneja los cambios de página actualizando la lista paginada de episodios.
   * @param event Objeto que representa el evento de cambio de página.
   */
  onPageChange(event: any) {
    console.log('Entró al cambio de página');
    this.paginateEpisodes();
  }

}
