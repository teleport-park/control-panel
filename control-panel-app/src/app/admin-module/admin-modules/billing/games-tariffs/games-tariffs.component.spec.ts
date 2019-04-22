import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesTariffsComponent } from './games-tariffs.component';

describe('GamesTariffsComponent', () => {
  let component: GamesTariffsComponent;
  let fixture: ComponentFixture<GamesTariffsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamesTariffsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesTariffsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
