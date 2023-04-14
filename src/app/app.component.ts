import { Component } from '@angular/core';
import { ItemsService } from './items.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  constructor(private itemsService: ItemsService) {}
  title = 'wishlist-fe';
  newItemName: string = "";
  newItemUrl: string = "";

  addItem(): void {
    this.itemsService.saveItem({name: this.newItemName, url: this.newItemUrl})
    this.newItemName = "";
    this.newItemUrl = "";
  }
}
