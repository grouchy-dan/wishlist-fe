import { TestBed } from '@angular/core/testing';

import { ItemsService } from './items.service';
import { firstValueFrom } from 'rxjs';

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

  it('should delete an item', async () => {
    service.saveItem({name: "thing 1", url: "http://google.com"})
    service.saveItem({name: "thing 2", url: "http://google.com"})
    service.saveItem({name: "thing 3", url: "http://google.com"})

    let items = await firstValueFrom(service.getItems());

    service.deleteItem(items[1]);

    let result = await firstValueFrom(service.getItems());

    expect(result.length).toBe(2);
    expect(result[0].name).toEqual("thing 1");
    expect(result[1].name).toEqual("thing 3");
  })
});
