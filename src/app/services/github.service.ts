import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GithubRepository, GithubSearchResponse } from '../models/github-repo.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

// Github doc:  https://docs.github.com/en/rest/search/search#search-repositories
/*
  eg.
  https://api.github.com/search/repositories?q=created:>[Start_Date]&sort=stars&order=desc
  https://api.github.com/search/repositories?q=created:>09-02-2026&sort=stars&order=desc

  pagination:
  https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc&page=2
*/

export class GithubService {
  private http = inject(HttpClient);

  private readonly DATE_OFFSET = 30; // 30 days ago
  private currentPage = signal(1);

  private getSearchDate(): string {
    const date = new Date();
    date.setDate(date.getDate() - this.DATE_OFFSET);
    return date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
  }

  private buildSearchUrl(page: number): string {
    const searchDate = this.getSearchDate();
    const baseUrl = 'https://api.github.com/search/repositories';
    const query = `created:>${searchDate}`;
    const params = `q=${encodeURIComponent(query)}&sort=stars&order=desc&page=${page}`;
    return `${baseUrl}?${params}`;
  }

  public fetchGithub(page: number = 1): Observable<GithubRepository[]> {
    this.currentPage.set(page);
    const url = this.buildSearchUrl(page);

    return this.http.get<GithubSearchResponse>(url).pipe(
      map((response) => response.items),
    );
  }

  public getCurrentPage(): number {
    return this.currentPage();
  }

  public nextPage(): number {
    const next = this.currentPage() + 1;
    this.currentPage.set(next);
    return next;
  }

  // public resetPage(): void {
  //   this.currentPage.set(1);
  // }

}
