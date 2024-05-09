import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClasesComponent } from './clases.component';
import { HttpClientModule } from '@angular/common/http'; 
import { SharedModule } from '../../../../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ClasesComponent', () => {
  let component: ClasesComponent;
  let fixture: ComponentFixture<ClasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClasesComponent],
      imports: [HttpClientModule, SharedModule, BrowserAnimationsModule] 
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

