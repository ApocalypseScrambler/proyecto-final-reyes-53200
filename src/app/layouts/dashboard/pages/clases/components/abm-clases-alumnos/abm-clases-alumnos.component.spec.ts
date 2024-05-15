import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http'; 
import { AbmClasesAlumnosComponent } from './abm-clases-alumnos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../../../../../shared/shared.module';

describe('AbmClasesAlumnosComponent', () => {
  let component: AbmClasesAlumnosComponent;
  let fixture: ComponentFixture<AbmClasesAlumnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AbmClasesAlumnosComponent],
      imports: [MatDialogModule, HttpClientModule, BrowserAnimationsModule, SharedModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    }) 
    .compileComponents();
    
    fixture = TestBed.createComponent(AbmClasesAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
