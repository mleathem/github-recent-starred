import { TestBed } from '@angular/core/testing';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import { GdprPermissionComponent } from './gdpr-permission';
import { GdprPermissionStorage } from '../../utils/gdpr-permission.storage';

describe('GdprPermissionComponent', () => {
  let component: GdprPermissionComponent;

  beforeEach(async () => {
    vi.restoreAllMocks(); // reset all spies else tests might fail

    // mock local storage load so constructor has deterministic state
    vi.spyOn(GdprPermissionStorage, 'load').mockReturnValue({ granted: false });

    await TestBed.configureTestingModule({
      imports: [GdprPermissionComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(GdprPermissionComponent);
    component = fixture.componentInstance;
  });

  it('creates the component', () => {
    expect(component).toBeTruthy();
  });

  it('toggles isChecked when checkbox changes', () => {
    const ev = { target: { checked: true } } as unknown as Event;
    component.onCheckboxChange(ev);
    expect(component.isChecked()).toBe(true);
  });

  it('saves permission and emits when checked', () => {
    const saveSpy = vi.spyOn(GdprPermissionStorage, 'save');
    const emitSpy = vi.spyOn(component.permissionGranted, 'emit');

    component.isChecked.set(true);
    component.onSave();

    expect(saveSpy).toHaveBeenCalledWith(expect.objectContaining({ granted: true }));
    expect(emitSpy).toHaveBeenCalled();
  });

  it('does not save or emit when not checked', () => {
    const saveSpy = vi.spyOn(GdprPermissionStorage, 'save');
    const emitSpy = vi.spyOn(component.permissionGranted, 'emit');

    component.isChecked.set(false);
    component.onSave();

    expect(saveSpy).not.toHaveBeenCalled();
    expect(emitSpy).not.toHaveBeenCalled();
  });
});
