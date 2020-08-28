export class SearchUser {
    static readonly type = '[Search] Users';

    constructor(public query: string, public page: number = 1) { }
}

export class ResetSearch {
    static readonly type = '[Search] Reset';
}