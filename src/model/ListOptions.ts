/**
 * These are the pagination parameters that are passed
 * to API functions that return a list of documents.
 */
export class ListOptions {
    constructor(public pageIndex: number, public pageSize: number) {}
}