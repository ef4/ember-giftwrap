# [WIP] Ember Giftwrap

This is a work-in-progress. It's alpha quality. Feedback appreciated.

# Why?

The Ember addons ecosystem is one of the best things about Ember. But
users stuck on legacy build systems have a hard time taking advantage
of it.

This tool is intended to be able to take *any* set of Ember addons and
package them in a standalone JS file that can be injected directly
into any Ember app, no matter how it was built.

# How?

1. Create a new ember-cli app. It's just a placeholder for installing
   the addons you want to package.

2. Install whatever addons you want, using `ember install:addon`.

3. Also install this addon with `ember install:addon ember-giftwrap`.

4. Run `ember giftwrap`. You should end up with one JS file, one CSS
   file, and a sourcemap file, all in the `wrapped` subdir.

5. Add the script and stylesheet to your Ember app.

6. Right after instantiating your app, activate the addons like this:

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
   inside the addons bundle. This would let you pass modules to the
   addons. You probably don't need this -- we automatically make the
   `Ember` global available to them their `require`.

 - `env`: an object that you can use to pass configuration to addons
   that are expecting to find it in `config/environment.js`.
