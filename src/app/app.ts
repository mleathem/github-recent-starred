import { Component, signal, inject, computed } from '@angular/core';
// import { GdprPermission } from './models/gdpr-permission.interface';

import { GdprPermissionComponent } from './components/gdpr-permission/gdpr-permission';
import { GithubResultsComponent } from './components/github-results/github-results';
import { CommonModule } from '@angular/common';
// import { GdprService } from './services/gdpr.service';


@Component({
  selector: 'app-root',
  imports: [GdprPermissionComponent, GithubResultsComponent, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  protected readonly title = signal('Trending Repos');

  protected permissionGranted = signal(GdprPermissionComponent.hasPermission());

  protected onPermissionGranted(): void {
    this.permissionGranted.set(true);
  }
}
