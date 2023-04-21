import { Injectable } from '@angular/core';
import { Item } from './item';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private _items: Item[] = [];

  constructor() { }

  getItems(): Observable<Item[]> {
    return of(this._items);
  }

  saveItem(item: Item) {
    if (item.id) {
      console.log(item);
      let found = this._items.find(existingItem => existingItem.id == item.id);
      if (found !== undefined) {
        found.name = item.name;
        found.url = item.url;
      } else {
        throw "WTF";
      }
    } else {
      item.id = (Math.random() * 10)
      this._items.push(item);
    }
  }

  deleteItem(item: Item) {
    const index = this._items.indexOf(item)
    if (index >= 0) {
      this._items.splice(index, 1);
    }
  }
}
