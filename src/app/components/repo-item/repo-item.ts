import { Component, input, ChangeDetectionStrategy, computed, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Menu, MenuItem, MenuTrigger, MenuContent } from '@angular/aria/menu';
import { GithubRepository } from '../../models/github-repo.interface';

@Component({
  selector: 'app-repo-item',
  standalone: true,
  imports: [CommonModule, Menu, MenuItem, MenuTrigger, MenuContent],
  templateUrl: './repo-item.html',
  styleUrl: './repo-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepoItemComponent {
  public repository = input.required<GithubRepository>();

  public menu = viewChild<Menu<string>>('repoMenu');

  public daysAgoText = computed(() => {
    const pushed = new Date(this.repository().pushed_at).getTime();
    const now = Date.now();
    const diffMs = now - pushed;
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    // In the case of 'Submitted X days ago - make this more user friendly
    if (days === 0) {
      return 'Submitted today';
    } else if (days === 1) {
      return 'Submitted yesterday';
    }

    return `Submitted ${days} days ago`;
  });

  public openGithubUrl() {
    window.open(this.repository().html_url, '_blank');
  }

  public openGithubIssuesUrl() {
    window.open(this.repository().html_url + '/issues', '_blank');
  }

  public copyGithubUrl() {
    navigator.clipboard.writeText(this.repository().html_url);
  }

  public copySshUrl() {
    navigator.clipboard.writeText(this.repository().ssh_url);
  }

  public copyGithubCli() {
    navigator.clipboard.writeText(`gh repo clone ${this.repository().clone_url}`);
  }
}
