import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router'; 
import { HttpClientModule } from '@angular/common/http'; 
import { LoginComponent } from '../login/login.component';
import { SharedModule } from '../../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { FormsModule } from '@angular/forms'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent, LoginComponent],
      imports: [
        HttpClientModule, 
        SharedModule, 
        FormsModule, 
        BrowserAnimationsModule, 
        StoreModule.forRoot({}) 
      ],
      providers: [
        provideMockStore(), 
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => 'someValue' } } }
        }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

