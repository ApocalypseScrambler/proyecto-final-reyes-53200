import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbmAlumnosComponent } from './abm-alumnos.component';
import { FormsModule } from '@angular/forms'; 
import { SharedModule } from '../../../../../../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AbmAlumnosComponent', () => {
  let component: AbmAlumnosComponent;
  let fixture: ComponentFixture<AbmAlumnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AbmAlumnosComponent],
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
    
    fixture = TestBed.createComponent(AbmAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});