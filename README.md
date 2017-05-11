# [WIP] Ember Giftwrap

This is a work-in-progress. It's alpha quality. Feedback appreciated.

# Why?

The Ember addons ecosystem is one of the best things about Ember. But
users of non ember-cli build systems have a hard time taking advantage
of it.

This tool is intended to be able to take *any* set of Ember addons and
package them in a standalone JS file that can be injected directly
into any Ember app, no matter how it was built.

# How?

1. Create a new ember-cli app. It will serve as a place to install the
   addons that you intend to package.

2. Install the *exact* same Ember version you intend to use in your
   application. This ensures that any templates inside the addons will
   get compiled with the right compiler.

3. Install whatever addons you want, using `ember
   install`. Remember that ember-cli will only recognize addons
   if they are both present in `node_modules` *and* listed in your
   `package.json`.

4. Install this addon with `ember install ember-giftwrap`.

5. Run `ember giftwrap`. You should end up with one JS file, one CSS
   file, and a sourcemap file, all in the `wrapped` subdir.

6. Add the script and stylesheet to your Ember app.

7. Right after instantiating your app, activate the addons like this:

```js
App = Ember.Application.create();
GiftWrap.install(App);
```

# Details of the `GiftWrap` API

We create a global object named `GiftWrap`. It has these methods & properties:

 - `install(app)`: takes an instance of Ember.Application and
   registers the packaged addons with the application's registry.

 - `require(moduleName)`: gives you access to the modules defined
   inside the addons bundle. For example, `var LiquidFire = GiftWrap.require('liquid-fire');`.

 - `define()`: gives you access to the AMD defining function used
   inside the addons bundle. This lets you pass modules to the
   addons. (We automatically `define('ember', ...)` for them as long
   as `window.Ember` exists).

 - `env`: an object that you can use to pass configuration to addons
   that are expecting to find it in `config/environment.js`.

# Known Caveats

 - there is no automatic support for addons that attempt to inject
   content directly into index.html.

 - `ember giftwrap` always packages *all* the addons that are
   installed, there's not currently a way to be more picky. Default ember apps include addons you may not need (ember-cli-ic-ajax, ember-data, etc), so you'll want to remove them from your `package.json` if that's the case.

 - preprocessor addons that blow up if they don't find the files or
   directories they're looking for can be problematic for us, since we
   aren't actually building a real app.
