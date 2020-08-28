export class SearchUser {
    static readonly type = '[Search] Users';

    constructor(public query: string, public page: number = 1) { }
}
