import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http'; 
import { AbmClasesAlumnosComponent } from './abm-clases-alumnos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../../../../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';

describe('AbmClasesAlumnosComponent', () => {
  let component: AbmClasesAlumnosComponent;
  let fixture: ComponentFixture<AbmClasesAlumnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AbmClasesAlumnosComponent],
      imports: [MatDialogModule, HttpClientModule, BrowserAnimationsModule, SharedModule, StoreModule.forRoot({}) 
    ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        provideMockStore(),
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
