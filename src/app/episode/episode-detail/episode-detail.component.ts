import { Component, OnInit, ViewChild } from '@angular/core';
import { Character } from '../../character/character';
import { MatPaginator } from '@angular/material/paginator';
import { EpisodeService } from '../episode.service';
import { CharacterService } from '../../character/character.service';
import { EpisodeNoCha } from '../episodeNoCharacters';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-episode-detail',
  templateUrl: './episode-detail.component.html',
  styleUrls: ['./episode-detail.component.sass']
})
/**
 * Componente encargado de mostrar los detalles de un episodio en la interfaz de usuario.
 * Muestra la información del episodio y la lista paginada de personajes asociados.
 */
export class EpisodeDetailComponent implements OnInit {

  // Lista de personajes asociados al episodio y lista paginada de personajes
  characters: Character[] = [];
  paginatedCharacters: Character[] = [];

  // Detalles del episodio sin la lista de personajes
  episodeNoCha!: EpisodeNoCha;

  // Define el tamaño de la página y las opciones de tamaño de la página
  pageSize = 10; // Tamaño de la página por defecto
  pageSizeOptions: number[] = [5, 10, 15]; // Opciones de tamaño de página

  // Referencia al paginador de Material
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  /**
   * Constructor del componente.
   * @param route Servicio que permite acceder a los parámetros de la ruta actual.
   * @param episodeService Servicio que proporciona funciones para obtener detalles de episodios.
   * @param characterService Servicio que proporciona funciones para obtener detalles de personajes.
   */
  constructor(
    private route: ActivatedRoute,
    private episodeService: EpisodeService,
    private characterService: CharacterService
  ) {}

  /**
   * Método del ciclo de vida que se ejecuta al iniciar el componente.
   * Obtiene el ID del episodio desde la ruta y llama al servicio para obtener detalles del episodio.
   */
  ngOnInit(): void {
    const episodeId = this.route.snapshot.paramMap.get('id');
    
    if (episodeId) {
      this.episodeService.getEpisodeById(Number(episodeId)).subscribe((episodeNoCha) => {
        this.episodeNoCha = episodeNoCha;
        this.obtainCharacters(); // Obtener los personajes asociados al episodio
        this.paginateCharacters(); // Paginar los personajes después de obtenerlos
      });
    }
  }

  /**
   * Método para obtener y mostrar la lista de personajes asociados al episodio.
   * Utiliza el servicio de personajes para obtener los detalles de los personajes mediante sus URLs.
   */
  obtainCharacters() {
    this.characterService.getCharactersByUrlList(this.episodeNoCha.characters).subscribe((data) => {
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
    this.paginateCharacters();
  }
}