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
    // TODO: Continue from here
    return new Proxy(targetObject, {
        /**
         * @param {any} target
         * @param {any} prop
         * @param {unknown} receiver
         */
        get(target, prop, receiver) {
            // console.log("GET", { target, prop, receiver });
            return Reflect.get(target, prop, receiver);
        },

        /**
         * @param {any} obj
         * @param {string} prop
         * @param {unknown} value
         */
        set(obj, prop, value) {
            // console.log("SET ", { obj, prop, value });
            const oldValue = Reflect.get(obj, prop);
            const reflectResult = Reflect.set(obj, prop, value);

            const eventPropPaths = [...propPath, prop];
            let propKey = "";
            while (eventPropPaths.length > 0) {
                if (propKey.length > 0) {
                    propKey += ".";
                }
                propKey = propKey + eventPropPaths.shift();
                thisInstance.broadcast(new EventManagerUpdated(propKey, oldValue, value));
            }

            return reflectResult
        }
    });
}

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
