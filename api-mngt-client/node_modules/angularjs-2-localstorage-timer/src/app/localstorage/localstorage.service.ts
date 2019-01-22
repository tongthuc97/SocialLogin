import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService  { 
    SERVICE = "[LocalStorage]";
    DEBUG   = false;        // Throw console msgs ? true/false
    id      = "MyStorage"

    constructor() {
        if ( this.DEBUG ) {
            console.log(this.SERVICE, "[init]");
        }
    }

    get() {
        // Get data        
        var data = JSON.parse( window.localStorage && window.localStorage.getItem(this.id) );

        if ( this.DEBUG ) {
            console.log(this.SERVICE, "[get]", this.id, "=", data);        
        }

        return data;
    }

    setId(id : any) {
        this.id = id;
    }

    set(data : any) {
        if ( this.DEBUG ) {
            console.log(this.SERVICE, "[set]", this.id, "=", data);
        }

        window.localStorage && window.localStorage.setItem(this.id, JSON.stringify(data));          
    }

    destory() {
        window.localStorage && window.localStorage.removeItem(this.id);
    }
}
