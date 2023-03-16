import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PhotosService } from '../services/photos.service';
import { PhotoResolver } from './photo.resolver';

describe('Photo Resolver', () => {
  let service: PhotoResolver;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PhotoResolver,
        PhotosService,
      ],
    });
    
    service = TestBed.inject(PhotoResolver);
  });

  it('should get photo with assigned id', () => {
    const expected = {
      id: 0,
      url: '/assets/images/0',
    };

    service.resolve(
      <ActivatedRouteSnapshot><unknown>{ params: { id: '0' } },
      <RouterStateSnapshot>{},
    ).subscribe(photo => {
      expect(photo).toEqual(expected);
    });
  });

  it('should throw an error if id is more than count of pictures', fakeAsync(() => {
    service.resolve(
      <ActivatedRouteSnapshot><unknown>{ params: { id: '999' } },
      <RouterStateSnapshot>{},
    ).subscribe(photo => {
      expect(photo).toEqual(null);
    });
  }));
});