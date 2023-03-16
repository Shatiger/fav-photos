import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarStub } from '../../test/snackbar.stub';
import { PAGE_ITEMS_COUNT } from '../shared/constants/photos';
import { LOCAL_STORAGE_KEY } from '../shared/constants/storage';
import { PhotosService } from '../shared/services/photos.service';
import { PhotosComponent } from './photos.component';

describe('PhotosComponent', () => {
  let component: PhotosComponent;
  let fixture: ComponentFixture<PhotosComponent>;

  let localStore: {
    [key: string]: string;
  };
  let snackbar: MatSnackBar;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotosComponent ],
      providers: [
        PhotosService,
        {
          provide: MatSnackBar,
          useClass: MatSnackBarStub,
        }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotosComponent);
    component = fixture.componentInstance;
    localStore = {};
    snackbar = TestBed.inject(MatSnackBar);
  
    spyOn(window.localStorage, 'getItem').and.callFake((key) =>
      key in localStore ? localStore[key] : null,
    );
    spyOn(window.localStorage, 'setItem').and.callFake(
      (key, value) => (localStore[key] = value + ''),
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set initial list of photos', fakeAsync(() => {
    const expected = [...Array(PAGE_ITEMS_COUNT)].map((_, index) => ({
      id: index,
      url: `/assets/images/${index}.jpg`,
    }));

    component.onLoad();

    tick(300);

    expect(component.photos).toEqual(expected);
  }));

  it('should add photos to existing list', fakeAsync(() => {
    component.photos = [{
      id: 0,
      url: '/assets/images/0.jpg',
    }];
    const expected = [...Array(PAGE_ITEMS_COUNT + 1)].map((_, index) => ({
      id: index,
      url: `/assets/images/${index}.jpg`,
    }));

    component.onLoad();

    tick(300);

    expect(component.photos).toEqual(expected);
  }));

  it('should add to favorites', () => {
    localStore[LOCAL_STORAGE_KEY] = '[0]';

    component.onClick({
      id: 1,
      url: '/assets/images/1.jpg',
    });

    expect(localStore[LOCAL_STORAGE_KEY]).toEqual('[0,1]');
    expect(snackbar.open).toHaveBeenCalled();
  });
});