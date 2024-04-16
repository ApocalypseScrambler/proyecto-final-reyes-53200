import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmUsuariosComponent } from './abm-usuarios.component';

describe('AbmUsuariosComponent', () => {
  let component: AbmUsuariosComponent;
  let fixture: ComponentFixture<AbmUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AbmUsuariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AbmUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
