import { Component, signal, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GdprPermissionStorage } from '../../utils/gdpr-permission.storage';

@Component({
  selector: 'app-gdpr-permission',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gdpr-permission.html',
})
export class GdprPermissionComponent {
  isChecked = signal(false);
  permissionGranted = output<void>();

  constructor() {
    const stored = GdprPermissionStorage.load();
    this.isChecked.set(stored.granted);
  }

  onCheckboxChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.isChecked.set(target.checked);
  }

  onSave(): void {
    if (this.isChecked()) {
      GdprPermissionStorage.save({ granted: true });
      this.permissionGranted.emit();
    }
  }

  static hasPermission(): boolean {
    return GdprPermissionStorage.load().granted;
  }
}
