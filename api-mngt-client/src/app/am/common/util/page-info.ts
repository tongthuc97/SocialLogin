export class PageInfo {
    /** the total elements */
    totalElements: number;

    /** the total page */
    totalPages: number;

    /** check is the last page */
    last: boolean;

    /** check is the first page */
    first: boolean;

    /** the size of the page */
    size: number;

    /** the number */
    number: number;

    /** the sort */
    sort: any;

    /** the total elements in current page */
    numberOfElements: number;
    
    /** the number of current page */
    currentPage: number;

    public choosePage(numberPage: number){
        if(numberPage>0 && numberPage<=this.totalPages){
            this.currentPage = numberPage-1;
        }
    }
}