import { Component, OnInit, ViewChild } from '@angular/core';
import { CharacterService } from '../character.service';
import { Character } from '../character';
import { MatPaginator } from '@angular/material/paginator';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.sass']
})
export class CharacterListComponent implements OnInit {

  characters: Character[] = [];
  paginatedCharacters: Character[] = [];
  searchTerm: string = '';
  // Define el tamaño de la página y las opciones de tamaño de la página
  pageSize = 25;
  pageSizeOptions: number[] = [25, 50, 100];
  
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private characterService: CharacterService) {}

  ngOnInit() {
    this.loadCharacters();
    console.log('Personajes cargados');
    
  }

  ngAfterViewInit(): void {
    console.log(this.paginator.pageSize);
}

  loadCharacters() {
    this.characterService.getCharacters().subscribe((data) => {
      this.characters = data;
      this.paginateCharacters();
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

  getFilteredCharacters(searchTerm: string = '') {
    this.characterService.getFilteredCharacters(searchTerm).subscribe((data) => {
      this.characters = data;
      this.paginator.pageIndex=0
      this.paginateCharacters();
    });
  }

  search() {
    console.log('Entró s');
    this.getFilteredCharacters(this.searchTerm);
    console.log('Salio s');
  }

  resetForm(form: NgForm): void {
    form.resetForm();
    this.paginator.pageIndex=0
    this.loadCharacters(); // Puedes llamar a tu función de carga aquí si es necesario
    this.searchTerm="";
  }

  onPageChange(event: any) {
    console.log('Entró 2');
    // Maneja los cambios de página
    this.paginateCharacters();
  }
}
