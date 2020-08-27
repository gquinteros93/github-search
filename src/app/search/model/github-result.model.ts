import { GithubUser } from './github-user.model';

export interface GithubResult {
  total_count: number;
  incomplete_results: boolean;
  items: GithubUser[];
};

export interface GithubResultDTO extends GithubResult{
  page: number;
  per_page: number;
}