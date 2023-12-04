> Or why you might not need a state management library

---

I've been fiddling around with the [EventTarget](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget) API
lately and have been enjoying the utility it provides in multi-package environments and complex 
web applications which don't rely on a "Context" -like API.

# Chapter 1: What are we working with?

## What is the EventTarget / Event API?

To keep this blog post short enough, we'll go through this quickly.

The **EventTarget** API is an interface that is implemented by most DOM objects such as the [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element)
class. It allows it's implementors to be able to communicate through [Events](https://developer.mozilla.org/en-US/docs/Web/API/Event).

If you've ever written front-end javascript, you should be familiar with this API. It's the `addEventListener`s and the `dispatchEvent`s you can call from your elements.

### So what's so cool about this API?

Well, here comes the fun part: As it's an extendable class, you can make pretty much anything
a EventTarget. It can be a regular Javascript class, it can be an DOM elements, anything!

And with this freedom, we can extend this event based functionality outside of the DOM. We can 
implement the same way to handle communication between parts of our software the same way we can
implement communication between DOM nodes.


## Basic EventTarget Example

Your run of the mill EventTarget might looks something like the following

```javascript
class EventManager extends EventTarget {
    constructor() {
        super();
    }
}

const instance = new EventManager();
export { instance as EventManager };
```

And after that, you can listen to events dispatched to this target from anywhere

**Listening to events**

```javascript
EventManager.addEventListener("my-custom-event", (ev) => {
    // Do magic
});
```

**Dispatching events**

```javascript
EventManager.dispatchEvent(new CustomEvent("my-custom-event"));
```

There. So that's all? We can just create a message proxy for our events?

**But wait. There's more**


# Chapter 2: Make the system your own!

## Creating your own events

While we can utilize the [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) API,
we might want some more flexibility and utility out of our events. For that, we can create our own classes/events!

```javascript
export class ButtonClicked extends Event {
    constructor() {
        super(ButtonClicked.name);
    }
}
```

When we create our own event, we need to pass the canonical event name to the `super` constructor
of our Event class. In many cases, we can just utilize the our class's name itself, as it will 
most likely be unique inside of our project.

### Payload all the things!

A lot of the time we might want to include some payload in our events. Well that is of course possible.

```javascript
export class ButtonClicked extends Event {
    /**
      * @prop { number } clickCount
      **/
    constructor(clickCount) {
        super(ButtonClicked.name);
        this.clickCount = clickCount;
    }
}
```

And when we are accessing our event, we are able to access this property.

```javascript
EventManager.addEventListener(ButtonClicked.name, (ev) => {
    const newCount = ev.clickCount;
});
```

---

## The title promised us state management! Where's the state?

Now we are moving to the second step in our event based system, and that is a centralized storage for our state.

If we take a look at our EventManager, it's easy to add state to our listener.

```javascript
class EventManager extends EventTarget {
    
    #state = {
        buttonClickCount: 0
    }

    constructor() {
        super();
    }
}

const instance = new EventManager();
export { instance as EventManager };
```

And if we were to update the state on said events, we could do the following:

```javascript
class EventManager extends EventTarget {
    
    #state = {
        buttonClickCount: 0
    }

    constructor() {
        super();

        this.addEventListener(ButtonClicked.name, (ev) => {
            this.#state.buttonClickCount = ev.clickCount;
        });
    }

    getClickCount() {
        return this.#state.buttonClickCount;
    }
}

const instance = new EventManager();
export { instance as EventManager };
```

And voilá! We have a state management system that can plug into any kind of a system, works on NodeJS and the browser 
and just in general is easy to approach.

So is that all?

---

# Chapter 3: Make the system really pop!

While the approach we introduced is nice, it can get a bit tedious doing all of this typecasting and 
handling of events my hand. We are going to look at a couple of approaches the really make our system more robust 
and at the same time, more usable.

## Package the state events

Since our system might want to be listening to multiple different lifecycle events of our system, writing the whole
seremony of addEventListeners and such can get tedious. Luckily the EventListener API is really robust and handles 
these things nicely.

In the following example, we are creating a centralized catcher for our events, listing our events in a clear pattern
and handling them in a **runtime** safe way.

```javascript
class EventManager extends EventTarget {
    
    #state = {
        buttonClickCount: 0
        user: {
            name: undefined
        }
    }

    LISTENED_EVENTS = [
        ButtonClicked,
        UserNameChanged
    ]

    constructor() {
        super();

        this.MANAGED_EVENTS.forEach(ev => {
            // This maps all of the events to the `handleEvent` function
            this.addEventListener(ev.name, this)
        });
    }

    /**
     * @param {Event} ev
     */
    handleEvent(ev) {
        if (ev instanceof UserNameChanged) {
            // Since we have made a instanceof cast here, we 
            // have the correct type in scope due to type narrowing.
            // When inspected, the `ev` variable is of class `UserNameChanged`
            // inside of this if-block.
            this.#state.user.name = ev.userName

            // Since events too are just classes, we can store functions in those events,
            // and then call them at the resolving end and act accordingly.
            if (ev.isUserNameCleared()) {
                this.dispatchEvent(new UserSettingsReset());
            }
            this.dispatchEvent(new EventManagerUpdated());
            return;
        }

        if (ev instanceof ButtonClicked) {
            this.#state.buttonClickedCount += 1;
            this.dispatchEvent(new EventManagerUpdated());
            return;
        }
    }

    getClickCount() {
        return this.#state.buttonClickCount;
    }
}

const instance = new EventManager();
export { instance as EventManager };
```

Well isn't that nice? We have runtime type safety in our event system without even introducing TypeScript
to our project. By using classes for our events, we can do a lot more safe operations on our events than we would
with the CustomEvent API.

In our example above, we are also dispatching a `EventManagerUpdated` event when the state updates.
We could pass the updated properties to the class but for brewity, I've omitted that from the example.

---

So putting all we have so far together, what do we have?

We have...

- An event system that can be subscribed to and communicated with
- A persistent state that can be triggered from outside of the class
- A reactive system that manages custom events accordingly

... But what if we could still delve deeper and reduce some of the boilerplate?

# Chapter 4: Reactivity

Reactivity. That word seems to have been the talk of the town around frontend for a while and for a good reason!

Things change, we want to know when things change, and we want to act when things change. Well, with our current system
we are dispatching information when things change but with quite a boilerplatey approach. What if our state
was just reactive through **magic**?

## JavaScript proxies!

Javascript proxies are a technology that seems to pop it's head out at times, but mostly in the library author scene.

They are a powerful tool especially when you want to do reactive systems.

The next code snippet is a recursive proxy system that I've introduced to my approach, which is easier to explain by annotations
so just follow along the code and let's go for a ride!

```javascript
import { EventManagerClass } from "./event-manager";
import { EventManagerUpdated } from "./events/event-manager-updated";

// This is our entrypoint function into wrapping our proxies.
// In our EventManager class, we are calling this function with the following:
// `this.#state = getStateProxy(this.#state, this);`

/**
 * @param {EventManagerClass} thisInstance
 * @param {Record<string, unknown>} stateObject
 */
export function getStateProxy(stateObject, thisInstance) {
    // Proppath is used later on to enable sub-property events.
    const propPath = [];
    // The main proxy would be enough if we had a one-level state object
    // but often we have objects in our state, which might have objects in their props and so on...
    const mainProxy = setupProxy(stateObject, thisInstance, propPath);

    // So to utilize the whole state with our system, we also want to handle the nested objects.
    setupNestedProxy(stateObject, thisInstance, propPath);

    return mainProxy;
}


/**
 * @param {any} targetObject
 * @param {EventManagerClass} thisInstance
 * @param {string[]} propPath
 */
function setupProxy(targetObject, thisInstance, propPath) {
    // Setting up a basic proxy, we want to create a new Proxy object 
    // targeting our object that will contain the reactive properties
    return new Proxy(targetObject, {
        /**
         * @param {any} target
         * @param {any} prop
         * @param {unknown} receiver
         */
        get(target, prop, receiver) {
            // For the getters, we could of course look at something like memoization,
            // but for this example, we are just using Reflection to handle getters 
            // in the default way they would be handled.
            return Reflect.get(target, prop, receiver);
        },

        /**
         * @param {any} obj
         * @param {string} prop
         * @param {unknown} value
         */
        set(obj, prop, value) {
            // Now for the setters, here's where we're actually doing something interesting.
            // First off, we are grabbing the so called changedata, so we take the old value
            // of our property as well as the new value.
            const oldValue = Reflect.get(obj, prop);
            const reflectResult = Reflect.set(obj, prop, value);

            // And here we are just managing the property access path. This doesn't do anything
            // special when accessing single level depth state objects but when you go 2 or more
            // levels deeper, we will need the whole path of objects that got updated and that's 
            // where this comes in handy.
            const eventPropPaths = [...propPath, prop];
            let propKey = "";
            while (eventPropPaths.length > 0) {
                if (propKey.length > 0) {
                    propKey += ".";
                }
                propKey = propKey + eventPropPaths.shift();
                thisInstance.broadcast(new EventManagerUpdated(propKey, oldValue, value));
            }

            // So imagine a state object
            // #state = {
            //      user: {
            //          name: ""
            //      }
            // }

            // When the user's name changes, we want to trigger the event for both,
            // the ones listening to changes on `user` as well as those listenining
            // to changes on just `user.name`.

            // By parsing the whole path and sending EventmanagerUpdated events for each level,
            // we are able to broadcast these changes across all of our listeners.

            return reflectResult
        }
    });
}

// And here, for those nested objects, we are just iterating through them 
// recursively to apply a proxy to each layer, saving the property accessors path 
// while we're going deeper.

/**
 * @param {Object} targetObject
 * @param {EventManagerClass} thisInstance
 * @param {string[]} propPath
 */
function setupNestedProxy(targetObject, thisInstance, propPath) {
    [...Object.entries(targetObject)].filter(
        ([key, value]) => value instanceof Object && !Array.isArray(value)
    ).forEach(entry => {
        const key = entry[0];
        const value = entry[1];
        const newPropPath = [...propPath, key];
        targetObject[key] = setupProxy(value, thisInstance, newPropPath);
        setupNestedProxy(value, thisInstance, newPropPath);
    });

}
```

**So yeah. That was quite some code that we added to our codebase. How are we going to use it?**

Well the usage part is actually quite simple. We can take a look at our eventmanager.

```javascript
    constructor() {
        super();

        this.#state = getStateProxy(this.#state, this);
    }
```

That's it! That' literally the only change we have to do to our eventmanager!
And with this proxy change, we can now get rid of all of our `EventManagerUpdated` event 
dispatches we had written around our `handleEvent` function!

### And listening to the events isn't hard either.

```javascript
// event-manager-updated.js
export class EventManagerUpdated extends Event {
    /**
     * @param {string} key
     * @param {unknown} oldValue
     * @param {unknown} newValue
     */
    constructor(key, oldValue, newValue) {
        // We can dynamically name our event to make the API event simpler to use.
        super(EventManagerUpdated.forProperty(propertyName));

        this.key = key;
        this.oldValue = oldValue;
        this.newValue = newValue;
    }

    /**
     * @param {string} propertyName
     */
    static forProperty(propertyName) {
        return EventManagerUpdated.name + "-" + propertyName;
    }
}

// any-view.js
EventManager.addEventListener(EventManagerUpdated.forProperty("user.name"), (ev) => {
    console.log("User.name updated!");
    updateView();
});
```

Or we could write up a small utility method to help us out

```javascript
/**
 * @param {string} propKey
 * @param {EventListenerOrEventListenerObject} callback
 */
listen(propKey, callback) {
    return this.addEventListener(EventManagerUpdated.forProperty(propKey), callback);
}
```

After which our users could just utilize it as follows:

```javascript
EventManager.listen("user.name", (ev) => {
    console.log("User.name updated!");
    updateView();
});

EventManager.listen("user", (ev) => {
    console.log("User updated!");
    updateView();
});
```


# Chapter 5: Putting it all together

So there ya have it! We have state management system we can freely build upon, while relying on existing 
web standards, utilizing native events and overall adding 0 dependencies to your project!

And what's fun, is that you can freely control if you want to utilize this system in an synchronous
or an asynchronous way. Allowing you to completely cater the system to your own needs.

Here's the complete EventManager class we built. And the actual meat and bones of things is
event shorter as this example provided some utility methods.

```javascript
import { ButtonClicked } from "./events/button-clicked.js";
import { EventManagerInitialized } from "./events/event-manager-initialized.js";
import { EventManagerUpdated } from "./events/event-manager-updated.js";
import { UsernameChanged } from "./events/user-name-changed.js";
import { UserPhoneNumberUpdated } from "./events/user-phone-number-updated.js";
import { UserSettingsReset } from "./events/user-settings-reset.js";
import { getStateProxy } from "./reactive-properties.js";


class EventManager extends EventTarget {

    #state = {
        buttonClickedCount: 0,
        user: {
            name: undefined,
            contact: {
                phone: undefined
            }
        },
        alerts: []
    };

    MANAGED_EVENTS = [
        UsernameChanged,
        ButtonClicked,
        UserPhoneNumberUpdated
    ]

    constructor() {
        super();

        this.#state = getStateProxy(this.#state, this);

        this.MANAGED_EVENTS.forEach(ev => {
            // This maps all of the events to the `handleEvent` function
            this.addEventListener(ev.name, this)
        });

        // Could do some async calls and therefor initialization might not be synchronous...
        this.broadcast(new EventManagerInitialized());
    }

    /**
     * @param {string} propKey
     * @param {EventListenerOrEventListenerObject} callback
     */
    listen(propKey, callback) {
        return this.addEventListener(EventManagerUpdated.forProperty(propKey), callback);
    }


    /**
     * @param {Event} ev
     */
    handleEvent(ev) {
        if (ev instanceof UsernameChanged) {
            this.#state.user.name = ev.userName

            if (ev.isUserNameCleared()) {
                this.broadcast(new UserSettingsReset());
            }
            return;
        }

        if (ev instanceof ButtonClicked) {
            this.#state.buttonClickedCount += 1;
        }

        if (ev instanceof UserPhoneNumberUpdated) {
            this.#state.user.contact.phone = ev.phone;
        }
    }

    /**
     * Broadcast an event to everyone listening to said event 
     * in the EventManager instance.
     * @param {Event} ev
     */
    broadcast(ev) {
        this.dispatchEvent(ev);
    }

    getButtonClickCount() {
        return this.#state.buttonClickedCount;
    }

    getUserName() {
        return this.#state.user.name;
    }
}


let instance = new EventManager();

export { instance as EventManager };
export { EventManager as EventManagerClass };
```

The whole codebase with examples can be found on my GitHub at https://github.com/Matsuuu/event-based-state-management

If you found this article interesting or anything, please let me know in [Twitter](https://twitter.com/matsuuu_) 
or [mastodon](https://mastodon.world/@matsuuu) ! I'd love to start some discussion on this subject 
and want to hear your thoughts around this approach.
