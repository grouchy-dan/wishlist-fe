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

  describe('can save property', () => {
    describe('should be false', () => {
      it('if name is missing', () => {
        component.newItemName = "";
        component.newItemUrl = "http://test.org";

        expect(component.canSave).toBeFalse();
      })

      it('if url is missing', () => {
        component.newItemName = "name";
        component.newItemUrl = "";

        expect(component.canSave).toBeFalse();
      })

      it ('if url is completely bogus', () => {
        component.newItemName = "name";
        component.newItemUrl = "Hot sauce.";

        expect(component.canSave).toBeFalse();
      })
    })
    it('should be true if name and URL are not missing', () => {
      component.newItemName = "Test";
      component.newItemUrl = "http://www.google.com/";

      expect(component.canSave).toBeTrue();
    })
  })
});
