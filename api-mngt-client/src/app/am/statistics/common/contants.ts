
export class Contants {
    static DATE_FROM_TO = 7;

    static PAGE_SIZE = 2

    static LOG_DATA = "statistics_logdata";

    static MESSAGE_SERVICE = "statistics_message_service"

    static isEmptyObject(object: any) {
        if(object) {
            let k = 0;
            for(var prop in object) {
                k++;
                break
            }
            if(k <= 0) return false
            else return true
        } return false
        
    }
}