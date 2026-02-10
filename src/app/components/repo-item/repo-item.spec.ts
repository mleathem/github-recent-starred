import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, beforeEach, expect } from 'vitest';
import { RepoItemComponent } from './repo-item';
import { GithubRepository } from '../../models/github-repo.interface';
import { CommonModule } from '@angular/common';
import { Menu, MenuItem, MenuTrigger, MenuContent } from '@angular/aria/menu';

describe('RepoItemComponent', () => {
  let component: RepoItemComponent;
  let fixture: ComponentFixture<RepoItemComponent>;

  const mockRepository: GithubRepository = {
    name: 'test-repo',
    id: '123456ID',
    html_url: 'https://github.com/test/test-repo',
    description: 'A test repository',
    stargazers_count: 100,
    open_issues_count: 5,
    owner: {
      login: 'testuser',
      avatar_url: 'https://example.com/avatar.jpg',
    },
    pushed_at: '2025-01-02T00:00:00Z',
    ssh_url: 'git@github.com:test/test-repo.git',
    clone_url: 'https://github.com/test/test-repo.git',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepoItemComponent, CommonModule, Menu, MenuItem, MenuTrigger, MenuContent],
    }).compileComponents();

    fixture = TestBed.createComponent(RepoItemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('repository', mockRepository);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should accept the repository input', () => {
    expect(component.repository()).toEqual(mockRepository);
  });

  it('should render without errors', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('button')).toBeTruthy();
    expect(compiled.textContent).toContain('test-repo');
  });
});
