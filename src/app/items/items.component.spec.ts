import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsComponent } from './items.component';
import { AddItemComponent } from '../add-item/add-item.component';
import { FormsModule } from '@angular/forms';
import { ItemsService } from '../items.service';
import { Item } from '../item';
import { of } from 'rxjs';
import { ItemComponent } from '../item/item.component';

describe('ItemsComponent', () => {
  let component: ItemsComponent;
  let fixture: ComponentFixture<ItemsComponent>;
  let unSpy: jasmine.SpyObj<ItemsService>;

  beforeEach(async () => {
    let spy = jasmine.createSpyObj("ItemsService", ["deleteItem", "getItems"])
    await TestBed.configureTestingModule({
      declarations: [ ItemsComponent, AddItemComponent, ItemComponent],
      imports: [FormsModule],
      providers: [
        {provide: ItemsService, useValue: spy}
      ]
    })
    .compileComponents();

    unSpy = TestBed.inject(ItemsService) as jasmine.SpyObj<ItemsService>;
    unSpy.getItems.and.returnValue(of([{name: "Thing 1", url: "http://www.google.com", id: 1}]))

    fixture = TestBed.createComponent(ItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('delete item', () => {
    it('should call ItemService.deleteItem()', () => {
      let dummy: Item = {name: "Thing", url: "http://www.google.com"};
      component.deleteItem(dummy);

      expect(unSpy.deleteItem).toHaveBeenCalledWith(dummy);
    })
  })
});
