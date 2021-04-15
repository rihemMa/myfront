import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperManagerComponent } from './paper-manager.component';

describe('PaperManagerComponent', () => {
  let component: PaperManagerComponent;
  let fixture: ComponentFixture<PaperManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaperManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
