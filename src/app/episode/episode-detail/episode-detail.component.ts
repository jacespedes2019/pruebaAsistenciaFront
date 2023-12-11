import { Component, OnInit, ViewChild } from '@angular/core';
import { Episode } from '../episode';
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
export class EpisodeDetailComponent implements OnInit {

  characters: Character[] = [];
  episodeNoCha!: EpisodeNoCha;
  paginatedCharacters: Character[] = [];

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
    const episodeId = this.route.snapshot.paramMap.get('id');
    
    if (episodeId) {
      // Llama al servicio para obtener detalles del episodio
      this.episodeService.getEpisodeById(Number(episodeId)).subscribe((episodeNoCha) => {
        this.episodeNoCha = episodeNoCha;
        // Obtén los personajes asociados al episodio
        this.obtainCharacters();
        this.paginateCharacters();
      });
    }
  }

  obtainCharacters() {
    this.characterService.getCharactersByUrlList(this.episodeNoCha.characters).subscribe((data) => {
    // Aquí, data es la lista de personajes obtenidos para el episodio actual
    this.characters = data;
      });
  }

  paginateCharacters() {
    if (this.paginator && this.paginator.pageSize) {
      console.log('Sirvio');
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      const endIndex = startIndex + this.paginator.pageSize;
      console.log(this.paginator.pageIndex);
      this.paginatedCharacters = this.characters.slice(startIndex, endIndex);
    }
    else if (this.paginator) {
      console.log('Sirvio');
      const startIndex = this.paginator.pageIndex * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      console.log(this.paginator.pageIndex);
      this.paginatedCharacters = this.characters.slice(startIndex, endIndex);
    }
  }

  onPageChange(event: any) {
    console.log('Entró 2');
    // Maneja los cambios de página
    this.paginateCharacters();
  }



}
