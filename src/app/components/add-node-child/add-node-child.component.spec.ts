import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNodeChildComponent } from './add-node-child.component';

describe('AddNodeChildComponent', () => {
  let component: AddNodeChildComponent;
  let fixture: ComponentFixture<AddNodeChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNodeChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNodeChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
