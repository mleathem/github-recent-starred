import { Component, input, ChangeDetectionStrategy } from '@angular/core';
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
}
