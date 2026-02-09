import { Component, signal } from '@angular/core';
import { GithubResultsComponent } from './components/github-results/github-results';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [GithubResultsComponent, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Trending Repos');
}
