import { GithubResultDTO } from '../model/github-result.model';
import { PaginatorIndex } from '../model/paginator-index.model';

export type SearchStateModel = {
  lastSearch: string;
  lastResult: GithubResultDTO;
  paginationIndex: PaginatorIndex;
};
