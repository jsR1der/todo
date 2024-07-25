import {TestBed} from '@angular/core/testing';
import {ExpansionListService} from "./expansion-list.service";


describe('ExpanstionListService', () => {
  let service: ExpansionListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpansionListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
