import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemComponent } from './add-item.component';
import { ItemsService } from '../items.service';
import { FormsModule } from '@angular/forms';

describe('AddItemComponent', () => {
  let component: AddItemComponent;
  let fixture: ComponentFixture<AddItemComponent>;
  let unSpy: jasmine.SpyObj<ItemsService>;

  beforeEach(async () => {
    let spy = jasmine.createSpyObj("ItemsService", ["saveItem"])
    await TestBed.configureTestingModule({
      declarations: [ AddItemComponent ],
      providers: [
        { provide: ItemsService, useValue: spy }
      ],
      imports: [FormsModule]
    })
    .compileComponents();

    unSpy = TestBed.inject(ItemsService) as jasmine.SpyObj<ItemsService>;

    fixture = TestBed.createComponent(AddItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('add item', () => {
    it('should call ItemsService.saveItem()', () => {
      component.newItemName = "A Thing";
      component.newItemUrl = "http://google.com";      
      fixture.componentInstance.addItem();

      expect(unSpy.saveItem).toHaveBeenCalledWith({name: 'A Thing', url: 'http://google.com'})
    })
  })
});
