import { Component, Input     } from '@angular/core';
import { Broadcaster          } from './broadcast/broadcaster.service';
import { LocalStorageService  } from './localstorage/localstorage.service';
import { CountDownTimer       } from './timer/timer.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  providers: [Broadcaster, CountDownTimer, LocalStorageService]
})
export class AppComponent {
    CLASS = "[AppComponent]";    
    
    @Input() properties = {
        counter:  5,
        interval: 1000,
        id:       "CountDownTest"
    };

    constructor(private broadcaster: Broadcaster, private AppTimer : CountDownTimer) {

        // Events              
        this.broadcaster.on<string>('CountDownTimerChangeEvent').subscribe(message => {            
            console.log("[event] CountDownTimerChangeEvent");
        });

        this.broadcaster.on<string>('CountDownTimerEndEvent').subscribe(message => {
            console.log("[event] CountDownTimerEndEvent");
        });

        this.reload();      
    }

    // Timer functionality
    reload() {
        this.AppTimer.init(this.properties);                
    }

    recreate() {
        console.log(this.CLASS, "recreate with", this.properties);

        this.AppTimer.init(this.properties);        
    }

    resume() {
        this.AppTimer.start();
    }

    destory() {
        this.AppTimer.destory();
    }
    
}
