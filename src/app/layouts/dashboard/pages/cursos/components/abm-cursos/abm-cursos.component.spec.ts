import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms'; 
import { SharedModule } from '../../../../../../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AbmCursosComponent } from './abm-cursos.component';

describe('AbmCursosComponent', () => {
  let component: AbmCursosComponent;
  let fixture: ComponentFixture<AbmCursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AbmCursosComponent],
      imports: [MatDialogModule, FormsModule, SharedModule, BrowserAnimationsModule], 
      providers: [
        {
          provide: MatDialogRef,
          useValue: {} 
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {} 
        }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AbmCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
