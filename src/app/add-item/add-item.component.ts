import { Component } from '@angular/core';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.less']
})
export class AddItemComponent {
  public constructor(private itemsService: ItemsService) {}

  newItemName: string = "";
  newItemUrl: string = "";

  addItem(): void {
    this.itemsService.saveItem({name: this.newItemName, url: this.newItemUrl})
    this.newItemName = "";
    this.newItemUrl = "";
  }
}
