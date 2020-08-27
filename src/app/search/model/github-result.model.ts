import { GithubUser } from './github-user.model';

export interface GithubResult {
  total_count: number;
  incomplete_results: boolean;
  items: GithubUser[]
};
