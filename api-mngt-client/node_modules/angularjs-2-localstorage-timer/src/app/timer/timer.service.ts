import { Injectable, Inject }  from '@angular/core';
import { Broadcaster }         from '../broadcast/broadcaster.service';
import { LocalStorageService } from '../localstorage/localstorage.service';

@Injectable()
export class CountDownTimer {
  
  counter = 5;

  SERVICE     = "[CountDownTimer]";   
  DEBUG       = false;
  DEFAUTLS    = {
      counter:  60,
      interval: 1000
  }

  // Timer Private Variable
  // Properties - we define here our defaults, during init - we fill from LocalStorage
  _timer       : any;
  properties = {
      id:             "CountDownTimer",
      counter:        this.DEFAUTLS.counter,
      interval:       this.DEFAUTLS.interval,
      last_updated:   new Date(),
      orig_data:      this.DEFAUTLS,
  };

  constructor( private broadcaster : Broadcaster, private LocalStorage : LocalStorageService) { }

  init(_properties? : any) {
      this.LocalStorage.setId(_properties.id || this.properties.id);

      // Do we have something stored in LocalStorage ?
      var timer_storage = this.LocalStorage.get();
      if ( timer_storage ) {

          // We have an old timer, lets check its existance
          this.properties = timer_storage;

      } else {

          // Was a custom properties requested ?
          if ( _properties ) {
              Object.assign(this.properties, _properties);
          }

          // Create a new Timer
          this.properties.orig_data = {
              counter:    this.properties.counter,
              interval:   this.properties.interval,
          }            
      }

      if ( this.DEBUG ) {
        console.warn(this.SERVICE, "New Timer Has Been Created");
      }

      this.save();
  }


  // Private Functions
    private $timeout(interval? : number) {
        if ( !interval ) {
            interval = this.properties.interval;
        }
        
        return setTimeout(() => {
                   this._timerCtrl();
               }, interval);
    }

    private _timerCtrl(){        
        if (this.properties.counter > 0) {            
            this._timer = this.$timeout();
            this.properties.last_updated = new Date();
            this.properties.counter--;

            // Save data to LocalStorage
            this.save();

        } else {
            // Raise an exception, our timer has ended
            this.broadcaster.broadcast('CountDownTimerEndEvent', this.properties);
        }
    }

    private save() {
        // Save all data into Storage
        var DEBUG   = this.DEBUG;
        var SERVICE = this.SERVICE;

        if ( DEBUG ) {
            console.log(SERVICE, "[save] properties=", this.properties);
        }
        
        this.LocalStorage.set(this.properties);
        this.broadcaster.broadcast('CountDownTimerChangeEvent', this.properties);
    }


    // Public functions    
    getInfo() {
        return this.properties;
    }

    getCounter() {
        return this.properties.counter;
    }

    getLastUpdate() {        
        return new Date(this.properties.last_updated);
    }

    setDebug(to : boolean) {
        this.DEBUG = to;
    }

    start() {
        var interval = this.properties.interval;

        clearTimeout(this._timer);
        this._timer = this.$timeout();

        if ( this.DEBUG ) {
            console.log(this.SERVICE, "[start] starting with interval:", interval);
        }
    }

    stop() {
        clearTimeout(this._timer);

        if ( this.DEBUG ) {
            console.log(this.SERVICE, "[stop]");
        }
    }

    update(key : any, value : any) {
        // Update global properties
        this.properties[key]             = value;
        this.properties.orig_data[key]   = value;
        this.save();
    }

    restart() {        
        var original_props = this.properties.orig_data;

        if ( this.DEBUG ) {
            console.log(this.SERVICE, "[restart] original counter:", original_props.counter)
        }

        Object.assign(this.properties, original_props);
        this.save();

        clearTimeout(this._timer);        
    }

    destory() {
        // Removing the timer from LS
        var timer_id = this.properties.id;

        if ( timer_id ) {
            if ( this.DEBUG ) {
                console.log(this.SERVICE, "[remove] Removing timer", timer_id);
            }

            this.LocalStorage.destory();
        }
    }
}