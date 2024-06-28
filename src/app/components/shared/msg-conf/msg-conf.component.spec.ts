import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgConfComponent } from './msg-conf.component';

describe('MsgConfComponent', () => {
  let component: MsgConfComponent;
  let fixture: ComponentFixture<MsgConfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MsgConfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MsgConfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
