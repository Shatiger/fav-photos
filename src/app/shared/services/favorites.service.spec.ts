import { TestBed } from '@angular/core/testing';
import { LOCAL_STORAGE_KEY } from '../constants/storage';
import { FavoritesService } from './favorites.service';

describe('Service: Favorites', () => {
  let service: FavoritesService;
  let localStore: {
    [key: string]: string;
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FavoritesService],
    });
    
    localStore = {};
  
    spyOn(window.localStorage, 'getItem').and.callFake((key) =>
      key in localStore ? localStore[key] : null,
    );
    spyOn(window.localStorage, 'setItem').and.callFake(
      (key, value) => (localStore[key] = value + ''),
    );

    service = TestBed.inject(FavoritesService);
  });

  it('should get empty favorites', () => {
    service.getFavorites$().subscribe(favorites => {
      expect(favorites).toEqual([]);
    });
  });

  it('should get list of favorites', () => {
    const expected = [...Array(2)].map((_, index) => ({
      id: index,
      url: `/assets/images/${index}.jpg`,
    }));
    localStore[LOCAL_STORAGE_KEY] = '[0,1]';
    service.getFavorites$().subscribe(favorites => {
      expect(favorites).toEqual(expected);
    });
  });
});
