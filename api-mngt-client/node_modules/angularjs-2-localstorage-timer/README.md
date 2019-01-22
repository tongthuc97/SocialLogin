## AngulsrJS 2.x LocalStorage CountDown Timer

> A countdown timer that write the data into the localStorage of the browser.
> It's being used incase of:
> -You want to refresh the page and continue from where you left off.
> -You want to get notified when the time is up ( Event ) and trigger something.

```shell
$ npm install --save angularjs-2-localstorage-timer 
```

## Usage example
A full-featured working example can be found when running in the root folder
Inisde `node_modules/angularjs-2-localstorage-timer`
```html
npm install
npm start
```


## Init our timer
In AngularJS 2.x we need to inject the timer into our component
```javascript
constructor(private broadcaster: Broadcaster, private AppTimer : CountDownTimer) {
    // this.AppTimer is our timer
}
```

```javascript
// Init with properties ( inside our app.component.ts )
this.AppTimer.init({
    counter:  5,
    interval: 1000,
    id:       "CountDownTest"
});
```

## Events
```javascript
constructor(private broadcaster: Broadcaster, private AppTimer : CountDownTimer) {

    // Events              
    this.broadcaster.on<string>('CountDownTimerChangeEvent').subscribe(message => {       
        console.log("[event] CountDownTimerChangeEvent");
    });

    this.broadcaster.on<string>('CountDownTimerEndEvent').subscribe(message => {
        console.log("[event] CountDownTimerEndEvent");
    });
}
```

## Timer Functions
### .start()
Start/Resume the timer

```html
<button ng-click="AppTimer.start()"> Start </button>
```

### .stop()
Stop our timer

```html
<button ng-click="AppTimer.stop()"> Stop </button>
```

### .restart()
Restart the timer with the values given when creating the timer.
Timer won't start running, need to use `start()`
```html
<button ng-click="AppTimer.restart()"> Restart </button>
```

### .update()
Update one of the following parameters: 
- id       ( string )
- counter  ( integer )
- interval ( integer )

The update action will:
- save the values into `LocalStorage` as well
- It won't restart the timer or take any other action, meaning:
-- If we've updated the value while the timer is running - it will continue running from the new value

```html
<button ng-click="AppTimer.update('counter', 120)"> Update </button>
```

### .destory()
Remove the timer **entirly** from `LocalStorage`.
Remember that in order to continue from where we left off - the timer is always there ...

```html
<button ng-click="AppTimer.destroy()"> Remove </button>
```

## Timer Information
### .getCounter()
Will return the exiting counter value
```javascript
this.counter = this.AppTimer.getCounter()
```

Or, live information via HTML 
```html
<pre>{{ AppTimer.getCounter() }}</pre>
```

### .getLastUpdate()
Will return the "last updated" value that the timer has stored.
The value is a `Date()` object.
```javascript
this.lastUpdate = this.AppTimer.getLastUpdate();
```

Or, live information via HTML 
```html
<pre>{{ AppTimer.getLastUpdate() }}</pre>
```


### .getInfo()
Return as `JSON` all the possible information stored in `LocalStorage`.
You can review all data when adding to the template:
```javascript
this.timer_information = this.AppTimer.getInfo()
```

Or, live information via HTML 
```html
<pre>{{ AppTimer.getInfo() | json }}</pre>
```

## Further Custom Actions

### .reload()
So the `reload()` isn't really there ... we need to write it on our own in our `controller` as:
If `$scope.properties.id` - is already found in `LocalStorage` - the timer will be reloaded with the last counter.
But if the `id` isn't found, it will create a new timer.

```javascript
    reload() {
        this.AppTimer.init(this.properties);                
    }
```

### .recreate()
Re-create a new timer, overriding the existing timer with the new timer
```javascript
    recreate() {
        console.log(this.CLASS, "recreate with", this.properties);
        this.AppTimer.init(this.properties);        
    }
```




