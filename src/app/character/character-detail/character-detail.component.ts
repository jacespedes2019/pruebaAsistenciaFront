import { Component, OnInit, ViewChild } from '@angular/core';
import { Character } from '../character';
import { EpisodeNoCha } from '../../episode/episodeNoCharacters';
import { ActivatedRoute } from '@angular/router';
import { EpisodeService } from '../../episode/episode.service';
import { CharacterService } from '../character.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.sass']
})
export class CharacterDetailComponent implements OnInit {

  character!: Character;
  episodes: EpisodeNoCha[] = [];
  paginatedEpisodes: EpisodeNoCha[] = [];

  // Define el tamaño de la página y las opciones de tamaño de la página
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 15];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;


  constructor(
    private route: ActivatedRoute,
    private episodeService: EpisodeService,
    private characterService: CharacterService
  ) {}

  ngOnInit(): void {
    // Obtiene el ID del episodio desde la ruta
    const chaId = this.route.snapshot.paramMap.get('id');
    
    if (chaId) {
      // Llama al servicio para obtener detalles del episodio
      this.characterService.getCharacterById(Number(chaId)).subscribe((character) => {
        this.character = character;
        // Obtén los personajes asociados al episodio
        this.obtainEpisodes();
      });
    }
  }

  obtainEpisodes() {
    this.episodeService.getEpisodesByUrlList(this.character.episode).subscribe((data) => {
    // Aquí, data es la lista de personajes obtenidos para el episodio actual
    this.episodes = data;
    this.paginateEpisodes();
      });
  }
  
  paginateEpisodes() {
    if (this.paginator && this.paginator.pageSize) {
      console.log('Sirvio');
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      const endIndex = startIndex + this.paginator.pageSize;
      console.log(this.paginator.pageIndex);
      this.paginatedEpisodes = this.episodes.slice(startIndex, endIndex);
    }
    else if (this.paginator) {
      console.log('Sirvio');
      const startIndex = this.paginator.pageIndex * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      console.log(this.paginator.pageIndex);
      this.paginatedEpisodes = this.episodes.slice(startIndex, endIndex);
    }
  }

  onPageChange(event: any) {
    console.log('Entró 2');
    // Maneja los cambios de página
    this.paginateEpisodes();
  }

  getLocationId(url:string){
    // Dividir la URL por el carácter '/'
    const segments = url.split('/');

    // Obtener el último segmento
    const lastSegment = segments[segments.length - 1];

    return Number(lastSegment);
  }
}
