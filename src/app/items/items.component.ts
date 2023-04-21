import { Component, OnInit } from '@angular/core';
import { Item } from '../item';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.less']
})
export class ItemsComponent implements OnInit {
  editMode: boolean = false;
  constructor(private itemService: ItemsService) {}

  ngOnInit(): void {
    this.getItems();
  }

  items: Item[] = [];

  deleteItem(item: Item) {
    this.itemService.deleteItem(item);
  }

  private getItems(): void {
    this.itemService.getItems().subscribe(items => this.items = items);
  }
}
