import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemtypelistComponent } from './itemtypelist.component';

describe('ItemtypelistComponent', () => {
  let component: ItemtypelistComponent;
  let fixture: ComponentFixture<ItemtypelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemtypelistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemtypelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
