import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms'; 
import { SharedModule } from '../../../../../../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AbmClasesComponent } from './abm-clases.component';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';

describe('AbmClasesComponent', () => {
  let component: AbmClasesComponent;
  let fixture: ComponentFixture<AbmClasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AbmClasesComponent],
      imports: [MatDialogModule, FormsModule, SharedModule, BrowserAnimationsModule, HttpClientModule, StoreModule.forRoot({})], 
      providers: [
        {
          provide: MatDialogRef,
          useValue: {} 
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {} 
        },
        provideMockStore(),
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AbmClasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
