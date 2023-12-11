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
export class LocationDetailComponent implements OnInit {

  characters: Character[] = [];
  location!: LocationClass;
  paginatedCharacters: Character[] = [];

  // Define el tamaño de la página y las opciones de tamaño de la página
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 15];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private locationService: LocationService,
    private characterService: CharacterService
  ) {}

  ngOnInit(): void {
    // Obtiene el ID del episodio desde la ruta
    const locationId = this.route.snapshot.paramMap.get('id');
    
    if (locationId) {
      // Llama al servicio para obtener detalles del episodio
      this.locationService.getLocationById(Number(locationId)).subscribe((location) => {
        this.location = location;
        // Obtén los personajes asociados al episodio
        this.obtainCharacters();
        this.paginateCharacters();
      });
    }
  }

  obtainCharacters() {
    this.characterService.getCharactersByUrlList(this.location.residents).subscribe((data) => {
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
