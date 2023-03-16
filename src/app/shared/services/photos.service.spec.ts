import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { PAGE_ITEMS_COUNT, TOTAL_ITEMS_COUNT } from '../constants/photos';
import { PhotosService } from './photos.service';

describe('Service: Photos', () => {
  let service: PhotosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PhotosService],
    });

    service = TestBed.inject(PhotosService);
  });

  it('should get photos from page 1', () => {
    const expected = [...Array(PAGE_ITEMS_COUNT)].map((_, index) => ({
      id: index,
      url: `/assets/images/${index}.jpg`,
    }));

    service.getPhotos$().subscribe(imageList => {
      expect(imageList.list).toEqual(expected);
      expect(imageList.isLastPage).toBeFalse();
      expect(imageList.totalItems).toEqual(TOTAL_ITEMS_COUNT);
    });
  });

  it('should get photos from page 2', () => {
    const expected = [...Array(PAGE_ITEMS_COUNT)].map((_, index) => ({
      id: index + PAGE_ITEMS_COUNT,
      url: `/assets/images/${index + PAGE_ITEMS_COUNT}.jpg`,
    }));

    service.getPhotos$(PAGE_ITEMS_COUNT).subscribe(imageList => {
      expect(imageList.list).toEqual(expected);
      expect(imageList.isLastPage).toBeFalse();
      expect(imageList.totalItems).toEqual(TOTAL_ITEMS_COUNT);
    });
  });

  it('should get last page', () => {
    const expected = [...Array(PAGE_ITEMS_COUNT)].map((_, index) => {
      const id = index + PAGE_ITEMS_COUNT * (TOTAL_ITEMS_COUNT / PAGE_ITEMS_COUNT);
      return {
        id,
        url: `/assets/images/${id}.jpg`,
      };
    });

    service.getPhotos$(PAGE_ITEMS_COUNT * (TOTAL_ITEMS_COUNT / PAGE_ITEMS_COUNT)).subscribe(imageList => {
      expect(imageList.list).toEqual(expected);
      expect(imageList.isLastPage).toBeTrue();
      expect(imageList.totalItems).toEqual(TOTAL_ITEMS_COUNT);
    });
  });

  it('should get image with assigned id', () => {
    const expected = {
      id: 0,
      url: '/assets/images/0.jpg',
    };
    
    service.getPhoto$(0).subscribe(image => {
      expect(image).toEqual(expected);
    });
  });

  it('should throw an error if id is more than count of pictures', fakeAsync(() => {
    let error;
    service.getPhoto$(999).subscribe(() => {}, (err) => {
      error = err;
    });

    tick(300);
    
    expect(error).not.toBeNull();
  }));
});
