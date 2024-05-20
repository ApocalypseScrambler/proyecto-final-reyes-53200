import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http'; 
import { SharedModule } from '../../../../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlumnosComponent } from './alumnos.component';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';

describe('AlumnosComponent', () => {
  let component: AlumnosComponent;
  let fixture: ComponentFixture<AlumnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlumnosComponent],
      imports: [HttpClientModule, SharedModule, BrowserAnimationsModule,StoreModule.forRoot({})],
      providers: [provideMockStore()] 
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
