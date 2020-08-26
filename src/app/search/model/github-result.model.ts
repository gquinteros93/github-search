import { GithubUser } from './github-user.model';

export type GithubResult = {
  total_count: number;
  incomplete_results: boolean;
  items: GithubUser[]
};
