import { Component, input, ChangeDetectionStrategy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubRepository } from '../../models/github-repo.interface';

@Component({
  selector: 'app-repo-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './repo-item.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepoItemComponent {
  repository = input.required<GithubRepository>();

  daysAgoText = computed(() => {
    const pushed = new Date(this.repository().pushed_at).getTime();
    const now = Date.now();
    const diffMs = now - pushed;
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    // In the case of 'Submitted 0 days ago' make this more user friendly
    if (days === 0) {
      return 'Submitted today';
    }

    return `Submitted ${days} days ago`;
  });
}
