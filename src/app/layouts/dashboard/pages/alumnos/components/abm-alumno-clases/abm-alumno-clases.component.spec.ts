import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http'; 
import { SharedModule } from '../../../../../../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AbmAlumnoClasesComponent } from './abm-alumno-clases.component';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';

describe('AbmAlumnoClasesComponent', () => {
  let component: AbmAlumnoClasesComponent;
  let fixture: ComponentFixture<AbmAlumnoClasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AbmAlumnoClasesComponent],
      imports: [MatDialogModule, HttpClientModule, SharedModule, BrowserAnimationsModule, StoreModule.forRoot({})],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        provideMockStore(),
      ]
    })    
    .compileComponents();
    
    fixture = TestBed.createComponent(AbmAlumnoClasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
