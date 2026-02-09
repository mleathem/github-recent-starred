import { Injectable } from '@angular/core';
import { GdprPermission } from '../models/gdpr-permission.interface';

@Injectable({
  providedIn: 'root',
})
export class GdprService {
  private readonly PERMISSION_KEY = 'github-3rdparty-permission-granted';

  public getPermission(): GdprPermission {
    const value = localStorage.getItem(this.PERMISSION_KEY);
    return { granted: value === 'true' };
  }

  public hasPermission(): boolean {
    return this.getPermission().granted;
  }

  public grantPermission(): void {
    localStorage.setItem(this.PERMISSION_KEY, 'true');
  }

  public revokePermission(): void {
    localStorage.removeItem(this.PERMISSION_KEY);
  }
}
