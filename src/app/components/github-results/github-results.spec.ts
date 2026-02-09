import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import { GithubResultsComponent } from './github-results';
import { GithubService } from '../../services/github.service';
import { of } from 'rxjs';

describe('GithubResultsComponent', () => {
  let component: GithubResultsComponent;
  let fixture: ComponentFixture<GithubResultsComponent>;
  let githubService: GithubService;

  beforeEach(async () => {
    // Mock IntersectionObserver for Vitest
    class MockIntersectionObserver {
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
    }
    globalThis.IntersectionObserver = MockIntersectionObserver as any;

    await TestBed.configureTestingModule({
      imports: [GithubResultsComponent],
      providers: [
        {
          provide: GithubService,
          useValue: {
            fetchGithub: vi.fn().mockReturnValue(of([])),
          },
        },
      ],
    }).compileComponents();

    githubService = TestBed.inject(GithubService);
    fixture = TestBed.createComponent(GithubResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty repositories', () => {
    expect(component.repositories()).toEqual([]);
  });

  it('should call GitHub service on init', () => {
    expect(githubService.fetchGithub).toHaveBeenCalled();
  });

  it('should have isLoading false after initialization', () => {
    expect(component.isLoading()).toBeFalsy();
  });

  it('should render without errors', () => {
    const compiled = fixture.nativeElement;
    expect(compiled).toBeTruthy();
  });
});

