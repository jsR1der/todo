import { TestBed } from '@angular/core/testing';

import { TodoHttpService } from './todo-http.service';

describe('TodoService', () => {
  let service: TodoHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
