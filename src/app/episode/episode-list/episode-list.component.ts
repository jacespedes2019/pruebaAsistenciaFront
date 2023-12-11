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
export class EpisodeListComponent implements OnInit {

  episodesNoCha: EpisodeNoCha[] = [];
  paginatedEpisodes: EpisodeNoCha[] = [];
  searchTerm: string = '';
  
  // Define el tamaño de la página y las opciones de tamaño de la página
  pageSize = 25;
  pageSizeOptions: number[] = [25, 50, 100];
  loading: boolean = true;
  
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private episodeService: EpisodeService) {}

  ngOnInit() {
    this.loadEpisodes();
    console.log('Personajes cargados');
    
  }

  ngAfterViewInit(): void {
    console.log(this.paginator.pageSize);
}

  loadEpisodes() {
    this.loading=true;
    this.episodeService.getEpisodes().subscribe((data) => {
      this.episodesNoCha = data;
      // this.obtainCharacters();
      this.paginateEpisodes();
      this.loading=false;
    });
  }

  paginateEpisodes() {
    if (this.paginator && this.paginator.pageSize) {
      console.log('Sirvio');
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      const endIndex = startIndex + this.paginator.pageSize;
      console.log(this.paginator.pageIndex);
      this.paginatedEpisodes = this.episodesNoCha.slice(startIndex, endIndex);
    }
    else if (this.paginator) {
      console.log('Sirvio');
      const startIndex = this.paginator.pageIndex * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      console.log(this.paginator.pageIndex);
      this.paginatedEpisodes = this.episodesNoCha.slice(startIndex, endIndex);
    }
  }

  getFilteredEpisodes(searchTerm: string = '') {
    this.loading=true;
    this.episodeService.getFilteredEpisodes(searchTerm).subscribe((data) => {
      this.episodesNoCha = data;
      // this.obtainCharacters();
      this.paginator.pageIndex=0
      this.paginateEpisodes();
      this.loading=false;
    });
  }

  search() {
    console.log('Entró s');
    this.getFilteredEpisodes(this.searchTerm);
    console.log('Salio s');
  }

  resetForm(form: NgForm): void {
    form.resetForm();
    this.paginator.pageIndex=0
    this.loadEpisodes(); // Puedes llamar a tu función de carga aquí si es necesario
    this.searchTerm="";
  }

  onPageChange(event: any) {
    console.log('Entró 2');
    // Maneja los cambios de página
    this.paginateEpisodes();
  }

}
