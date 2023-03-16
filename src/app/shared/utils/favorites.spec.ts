import { LOCAL_STORAGE_KEY } from '../constants/storage';
import { addToFavorites, getFavorites, removeFromFavorites } from './favorites';

describe('Favorites functions', () => {
  let localStore: {
    [key: string]: string;
  };

  beforeEach(() => {
    localStore = {};
  
    spyOn(window.localStorage, 'getItem').and.callFake((key) =>
      key in localStore ? localStore[key] : null,
    );
    spyOn(window.localStorage, 'setItem').and.callFake(
      (key, value) => (localStore[key] = value + ''),
    );
  });

  it('should add id to favorites if localStorage key is not defined', () => {
    addToFavorites(0);
    expect(localStore[LOCAL_STORAGE_KEY]).toEqual('[0]');
  });

  it('should add id to favorites if localStorage key is defined', () => {
    localStore[LOCAL_STORAGE_KEY] = '[0]';
    addToFavorites(1);
    expect(localStore[LOCAL_STORAGE_KEY]).toEqual('[0,1]');
  });

  it('should not add id to favorites if it is already in the localStorage', () => {
    localStore[LOCAL_STORAGE_KEY] = '[0,1]';
    addToFavorites(1);
    expect(localStore[LOCAL_STORAGE_KEY]).toEqual('[0,1]');
  });

  it('should get empty array from localStorage if key is not defined', () => {
    expect(getFavorites()).toEqual([]);
  });

  it('should get favorites from localStorage if defined', () => {
    localStore[LOCAL_STORAGE_KEY] = '[0,1]';
    expect(getFavorites()).toEqual([0, 1]);
  });

  it('should remove from favorites if localStorage key is defined', () => {
    localStore[LOCAL_STORAGE_KEY] = '[0,1]';
    removeFromFavorites(0);
    expect(localStore[LOCAL_STORAGE_KEY]).toEqual('[1]');
  });

  it('should not remove from favorites if localStorage key is not defined', () => {
    removeFromFavorites(0);
    expect(localStore[LOCAL_STORAGE_KEY]).toEqual('[]');
  });
});
