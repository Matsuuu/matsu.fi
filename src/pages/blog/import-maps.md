Now that import maps are supported throughout all browsers, web development has taken a big step forwards. 
We can start writing web apps like it's 2015 again! All that is needed is a couple of mapped imports and we are off!

## What are import maps?

As per MDN:

> An import map is a JSON object that allows developers to control how the browser resolves module specifiers when importing JavaScript modules.
> It provides a mapping between the text used as the module specifier in an import statement or import() operator, and the corresponding value that will replace the text when resolving the specifier.
> The JSON object must conform to the Import map JSON representation format.

What this means in action is that we can have code in the shape of:

```javascript
import "@shoelace-style/shoelace/dist/components/button/button.js";

const HomeView = html`
    <sl-button variant="primary"></sl-button>
`;
```

And not have to build / bundle to project *at all*!

### Wait what, how?

Well this was quite leading but... 🥁 Import Maps!

## Setup

To get started using import maps, you can start a new project or start fiddling with an existing one. I decided to look into a project I've been working on.

The project is an internal tool for our company and has the following dependencies:

```json
{
  "dependencies": {
    "@shoelace-style/shoelace": "^2.3.0",
    "lit": "^2.7.0",
    "suunta": "file:../../suunta"
  }
}
```

As we can see, we have two external dependencies and one internal tool. In the modern way of packaging our application, we would be of course required to package this project
using some bundler like [ESBuild](https://esbuild.github.io/) or [Rollup](https://rollupjs.org/). But with import maps, we can instead utilize CDN's to deliver our packages and completely 
eliminate the bundling step.

### HTML Side

Import maps are created inside our HTML structures in a similiar way our regular script imports are done.

```html

<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Import Map Demo</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link href="./src/css/style.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.3.0/dist/themes/light.css" />
    <script type="importmap">
      {
        "imports": {
          "lit": "https://esm.run/lit",
          "@shoelace-style/shoelace": "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.3.0",
          "@shoelace-style/shoelace/": "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.3.0/",
          "suunta": "/node_modules/suunta/dist/main.js"
        }
      }
    </script>
  </head>
  <body>
    <main></main>

    <app-navigation></app-navigation>

    <script type="module" src="./src/index.js"></script>
  </body>
</html>
```

The part we are interested in is the `script` tag inside of our `head` element. It has a new Type attribute called `importmap`. That is how we are able to communicate to 
the browser that we want to be using this piece of script as a import map JSON entry.

Looking inside of the entry, we can see that we have mappings for all of our dependencies. Most of our entries are mapped with a single entry, but sometimes we might want to access 
subfolders inside of our dependency. In those cases we just provide a secondary entry with a suffixed `/` (forwards slash) to denote subfolder entries.

Note that you can utilize multiple CDN's and even local file systems for your imports!

### JS Side

Well how does this look like on the JS side then? Well. As we discussed before, import maps allow you to use your dependencies as if you were bundling them. 

What this means is that if you have everything setup correctly with your import maps, in the best case scenario you don't have to do *any* Javascript changes! Isn't that awesome!


## Some general gotchas

### Be wary of packaging

CDN's are quite advanced today and might package your package in different formats. If you take a look at the same package through [unpkg](https://unpkg.com/lit@2.7.0/index.js) and through [JSDelivr's ESM bundler](https://cdn.jsdelivr.net/npm/lit@2.7.0/+esm),
you can see that the outputs don't match. So if one CDN isn't working for you, sometimes another will.

### Code completions don't look at the cloud

Even if we are developing using CDN'd dependencies, your editors might want to have those files locally to use their data for completion, code action and general language support info. So it's good
practice to still keep your package.json up to date and npm install the packages locally too.

### Some packages might require some extra pathing

For some packages that might lazy load part of their assets, you might need to configure some extra parameters to support their functionality with import maps. 

For example Shoelace's [icons](https://shoelace.style/components/icon) are lazily loaded from local or CDN routes and might require you to [set the base path](https://shoelace.style/getting-started/installation?id=setting-the-base-path) for
said assets to load from. This setup usually is quite minimal though and shouldn't be bloating your codebase any more than a single line.



## In closing

Go check out import maps, try them out in your projects and see if you can make your projects buildless! Use the platform!


