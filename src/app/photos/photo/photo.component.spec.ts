import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PhotoComponent } from './photo.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteStub } from '../../../test/activated-route.stub';
import { RouterStub } from '../../../test/route.stub';
import { MatSnackBarStub } from '../../../test/snackbar.stub';
import { LOCAL_STORAGE_KEY } from 'src/app/shared/constants/storage';

describe('PhotoComponent', () => {
  let component: PhotoComponent;
  let fixture: ComponentFixture<PhotoComponent>;
  let localStore: {
    [key: string]: string;
  };
  let router: Router;
  let snackbar: MatSnackBar;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useClass: ActivatedRouteStub,
        },
        {
          provide: Router,
          useClass: RouterStub,
        },
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
    fixture = TestBed.createComponent(PhotoComponent);
    component = fixture.componentInstance;
    localStore = {};
    router = TestBed.inject(Router);
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

  it('should set photo', fakeAsync(() => {
    component.ngOnInit();
    tick();

    expect(component.photo).toEqual({
      id: 0,
      url: '/assets/images/0.jpg',
    });
  }));

  it('should remove from favorites', () => {
    localStore[LOCAL_STORAGE_KEY] = '[0,1]';
    component.onRemove({
      id: 0,
      url: '/assets/images/0.jpg',
    });

    expect(localStore[LOCAL_STORAGE_KEY]).toEqual('[1]');
    expect(router.navigateByUrl).toHaveBeenCalledWith('/favorites');
    expect(snackbar.open).toHaveBeenCalled();
  });
});
