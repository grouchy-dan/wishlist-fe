import { TestBed } from '@angular/core/testing';

import { ItemsService } from './items.service';

describe('ItemsService', () => {
  let service: ItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add an item', () => {
    service.saveItem({name: "thing", url: "http://google.com"});
    service.getItems().subscribe(items => {
      expect(items.length).toBe(1);
      expect(items[0].name).toBe("thing");
      expect(items[0].url).toBe("http://google.com");
      expect(items[0].id).not.toBeNull();
    })
  })
});
