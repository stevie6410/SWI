import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiBuilderStageComponent } from './swi-builder-stage.component';

describe('SwiBuilderStageComponent', () => {
  let component: SwiBuilderStageComponent;
  let fixture: ComponentFixture<SwiBuilderStageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwiBuilderStageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwiBuilderStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
