import { of } from 'rxjs';

export class ActivatedRouteStub {
  data = of({
    photo: {
      id: 0,
      url: '/assets/images/0.jpg',
    },
  });
}
