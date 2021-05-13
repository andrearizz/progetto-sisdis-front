import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecureNotesComponent } from './secure-notes.component';

describe('SecureNotesComponent', () => {
  let component: SecureNotesComponent;
  let fixture: ComponentFixture<SecureNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecureNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecureNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
