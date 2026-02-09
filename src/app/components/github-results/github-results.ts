import {
  Component,
  ChangeDetectionStrategy,
  signal,
  effect,
  ElementRef,
  viewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubService } from '../../services/github.service';
import { GithubRepository } from '../../models/github-repo.interface';
import { RepoItemComponent } from '../repo-item/repo-item';

@Component({
  selector: 'app-github-results',
  standalone: true,
  imports: [CommonModule, RepoItemComponent],
  templateUrl: './github-results.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GithubResultsComponent {
  private githubService = inject(GithubService);
  private intersectionObserver: IntersectionObserver | null = null;

  repositories = signal<GithubRepository[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);
  currentPage = signal(1);

  resultsList = viewChild<ElementRef>('resultsList');

  constructor() {
    effect(() => {
      // Setup intersection observer after the list is rendered
      if (this.resultsList()) {
        this.setupIntersectionObserver();
      }
    });

    // Fetch first page on init
    this.fetchPage(1);
  }

  private setupIntersectionObserver(): void {
    const listElement = this.resultsList()?.nativeElement;
    if (!listElement) return;

    // Clean up existing observer
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }

    // Create new observer to detect when user scrolls to end
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.isLoading()) {
            this.fetchNextPage();
          }
        });
      },
      { rootMargin: '200px' },
    );

    // Observe the last item in the list
    const lastItem = listElement.querySelector('li:last-child');
    if (lastItem) {
      this.intersectionObserver.observe(lastItem);
    }
  }

  private fetchPage(page: number): void {
    if (this.isLoading()) return;

    this.isLoading.set(true);
    this.error.set(null);

    this.githubService.fetchGithub(page).subscribe({
      next: (repos) => {
        if (page === 1) {
          this.repositories.set(repos);
        } else {
          this.repositories.update((current) => [...current, ...repos]);
        }
        this.currentPage.set(page);
        this.isLoading.set(false);
        // Re-setup observer after new items are added
        setTimeout(() => this.setupIntersectionObserver(), 0);
      },
      error: (err) => {
        this.error.set(err.message || 'Failed to fetch repositories');
        this.isLoading.set(false);
      },
    });
  }

  private fetchNextPage(): void {
    const nextPage = this.currentPage() + 1;
    this.fetchPage(nextPage);
  }

  ngOnDestroy(): void {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }
}
