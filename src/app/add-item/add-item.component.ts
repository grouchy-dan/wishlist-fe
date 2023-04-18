import { Component } from '@angular/core';
import { ItemsService } from '../items.service';
// TODO: Angular is whining about this rather a lot.
// need to find an ECMAScript module equivalent
import isUrl from 'is-url';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.less']
})
export class AddItemComponent {
  public constructor(private itemsService: ItemsService) {}

  newItemName: string = "";
  newItemUrl: string = "";

  get urlValid(): boolean {
    return this.newItemUrl.length > 0 && isUrl(this.newItemUrl)
  }

  get nameValid(): boolean {
    return this.newItemName.length > 0
  }

  get canSave(): boolean {
    return this.nameValid && this.urlValid
  }

  addItem(): void {
    this.itemsService.saveItem({name: this.newItemName, url: this.newItemUrl})
    this.newItemName = "";
    this.newItemUrl = "";
  }
}
