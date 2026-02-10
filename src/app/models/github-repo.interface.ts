export interface GithubRepository {
  readonly id: string;
  readonly name: string;
  readonly description: string | null;
  readonly stargazers_count: number;
  readonly open_issues_count: number;
  readonly owner: {
    readonly login: string;
    readonly avatar_url: string;
    // id: number;
    // gravatar_id: string;
  };
  readonly pushed_at: string;
  // "created_at": "2019-01-28T14:07:18Z",
  // "updated_at": "2025-09-02T09:11:33Z",
  readonly html_url: string;
  readonly ssh_url: string;
  readonly clone_url: string;
}

export interface GithubSearchResponse {
  readonly items: GithubRepository[];
  readonly total_count: number;
}
