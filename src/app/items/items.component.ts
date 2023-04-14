import { Component, OnInit } from '@angular/core';
import { Item } from '../item';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.less']
})
export class ItemsComponent implements OnInit {
  constructor(private itemService: ItemsService) {}

  ngOnInit(): void {
    this.getItems();
  }

  items: Item[] = [];

  private getItems(): void {
    this.itemService.getItems().subscribe(items => this.items = items);
  }
}
