import { GdprPermission } from '../models/gdpr-permission.interface';

export class GdprPermissionStorage {
  private static readonly KEY = 'github-3rdparty-permission';

  static load(): GdprPermission {
    const raw = localStorage.getItem(this.KEY);
    return { granted: raw === 'true' };
  }

  static save(permission: GdprPermission): void {
    localStorage.setItem(this.KEY, String(permission.granted));
  }
}
