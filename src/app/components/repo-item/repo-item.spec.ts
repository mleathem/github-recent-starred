import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, beforeEach, expect } from 'vitest';
import { RepoItemComponent } from './repo-item';
import { GithubRepository } from '../../models/github-repo.interface';

describe('RepoItemComponent', () => {
  let component: RepoItemComponent;
  let fixture: ComponentFixture<RepoItemComponent>;

  const mockRepository: GithubRepository = {
    name: 'test-repo',
    // html_url: 'https://github.com/test/test-repo',
    description: 'A test repository',
    stargazers_count: 100,
    open_issues_count: 5,
    // language: 'TypeScript',
    // created_at: '2025-01-01T00:00:00Z',
    // updated_at: '2025-01-02T00:00:00Z',
    owner: {
      login: 'testuser',
      avatar_url: 'https://example.com/avatar.jpg',
    },
    pushed_at: '2025-01-02T00:00:00Z',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepoItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RepoItemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('repository', mockRepository);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the repository', () => {
    expect(component.repository()).toEqual(mockRepository);
  });

  it('should render without errors', () => {
    const compiled = fixture.nativeElement;
    expect(compiled).toBeTruthy();
  });
});

