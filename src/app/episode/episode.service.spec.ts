/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EpisodeService } from './episode.service';

describe('Service: Episode', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EpisodeService]
    });
  });

  it('should ...', inject([EpisodeService], (service: EpisodeService) => {
    expect(service).toBeTruthy();
  }));
});
