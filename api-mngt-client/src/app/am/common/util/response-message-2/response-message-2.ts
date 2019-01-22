export class ResponseMessage2 {
    response: any;
    title: string;
    isHide: boolean;
    
    setTitle(title: string){
        this.isHide = false;
        this.title = title;
    }
}