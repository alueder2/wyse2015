Summary:

Meteor.js uses javascript only on both the server and the client, making it extremely intuitive and easy to decipher. It uses a single command "meteor" from the terminal to compile and launch the app on localhost:3000.
The webpage is fully functional as is, but is missing some core features necessary for a full application. The overall administrators can create an account with "admin@wyse.com," which will automatically redirect them to the admin page; this gives them full access to all the rosters (once they are created), as well as the ability to lock the rosters and make any changes necessary. They can also see who has paid and who has not.

Coaches can simply create an account on the app, which then redirects them to enter their school info. Once that is entered, they can then enter their rosters, edit their school info, check their payment status, etc. All of the database information is located in the Models folder, with each MongoDB instance in a different file. These instances use a schema called SimpleSchema which is extremely intuitive and easy to use.

For site coordinators, one must register an account and then click the "Site Coordinator Validation" tab. They would then choose the site of which they are in charge (currently filled with placeholders), and enter the password (wyse2015), which can obviously be modified to be a little more secure than it currently is. About here is where my progress started to come to an end and I ran out of time, mainly in the facet of entering student answers one by one. This is a tough situation, since each student is part of an array, which is part of a database belonging to a coach. It can certainly be done, I just did not have the time.

List of the packages I used and their respective documentation:

accounts-ui
https://atmospherejs.com/meteor/accounts-ui

accounts-password
https://atmospherejs.com/meteor/accounts-password

iron:router
https://github.com/iron-meteor/iron-router

email
https://atmospherejs.com/meteor/email

aldeed:collection2
https://github.com/aldeed/meteor-collection2

themeteorchef:jquery-validation
https://atmospherejs.com/themeteorchef/jquery-validation

aldeed:autoform
https://github.com/aldeed/meteor-autoform

aldeed:autoform-bs-button-group-input
https://github.com/aldeed/meteor-autoform-bs-button-group-input/

momentjs:moment
https://atmospherejs.com/momentjs/moment

ongoworks:security
https://github.com/ongoworks/meteor-security/

alanning:roles
https://github.com/alanning/meteor-roles

bootstrap
getbootstrap.com/

mizzao:user-status
https://github.com/mizzao/meteor-user-status

aslagle:reactive-table
https://github.com/aslagle/reactive-table

yogiben:admin
https://github.com/yogiben/meteor-admin

dburles:collection-helpers
https://github.com/dburles/meteor-collection-helpers

fortawesome:fontawesome
https://github.com/FortAwesome/Font-Awesome

benjaminrh:event-hooks
https://atmospherejs.com/benjaminrh/event-hooks


# meteor-boilerplate

This boilerplate is here to give you a starting point for your meteor projects, with a console tool to ease up some tasks. Essential atmosphere packages are included to give you features like routing and collection schemas out-of-the-box.  

<!-- toc -->

* [Installing with orion-cli](#installing-with-orion-cli)
* [How to use](#how-to-use)
  * [Generating files](#generating-files)
  * [Removing default code](#removing-default-code)
  * [Available profiles (cofeescript and es6)](#available-profiles-cofeescript-and-es6)
  * [Deployments](#deployments)
  * [SEO and other concerns](#seo-and-other-concerns)
  * [Adding allow rules for external URLs](#adding-allow-rules-for-external-urls)
* [Structure](#structure)
  * [Packages used](#packages-used)
  * [Folder structure](#folder-structure)
* [Other Awesome Boilerplates](#other-awesome-boilerplates)
* [License](#license)

<!-- toc stop -->

The boilerplate looks like following: [boilerplate.meteor.com](http://boilerplate.meteor.com). Have a look at [starthacking](http://starthacking.meteor.com/) for a project created with this boilerplate.

## Installing with orion-cli

```bash
npm install -g orion-cli
```

This will install the [orion-cli](https://github.com/matteodem/orion-cli) tool, which can be used for scaffolding files with different profiles.
You can still clone the repository, which doesn't give you the profile and scaffolding support.

## How to use

```sh
# Assuming meteor is already installed
orion create appName
cd appName && meteor
```

### Generating files

With orion-cli you can scaffold files based on your configuration that you've got.

```sh
orion generate routes
```

You can create models, views, change profiles and reset the project with the console tool (see below).


### Removing default code

There's already a lot of predefined code in this boilerplate, to show you the possible functionality. However, if you want to start off with an
empty project use the provided command to get rid off all the code you don't need.

```sh
orion reset
```

### Available profiles (coffeescript and es6)

* default (Plain Vanilla Javascript)
* coffee (coffeescript, Unfancy JavaScript)
* es6 (traceur, Traceur is a JavaScript.next-to-JavaScript-of-today compiler)

You can change your profile like that
```sh
orion set-profile
```

There will be a prompt, where you can enter __coffee__ or any other profile that you have specified. Also use the ```reset``` command to start off with blank files according to your profile.

### Deployments

It is highly recommended to use [Meteor Up](https://github.com/arunoda/meteor-up) for easy deployments. 
Have a look at the repository for more information.

### SEO and other concerns

> Meteor cannot do SEO 

This statement is only partially true, since there is a package called [ms-seo](https://github.com/DerMambo/ms-seo), which
has a lot of neat little tricks to help web crawlers notice your app the way you want them to. This boilerplate also adds constants under
__client/lib/constants.js__ for the app. Change SEO settings inside the routes like that.

```javascript
Router.route('/about', function () {
  this.render('about');
  // Using the app constants
  SEO.set({ title: 'About -' + Meteor.App.NAME, og: {...} });
});
```

### Adding allow rules for external URLs

The [browser-policy](https://atmospherejs.com/meteor/browser-policy) adds rules to deny all operations from external URLs.
This helps dealing with clickjacking and other XSS methods used to attack the client. To whitelist a url, add following to 
__server/config/security.js__

```javascript
BrowserPolicy.content.allowOriginForAll(YOUR_URL);
```

Other security enforcing packages like [audit-argument-checks](https://docs.meteor.com/#/full/auditargumentchecks) and 
[matteodem:easy-security](https://github.com/matteodem/meteor-easy-security) have also been added.

## Structure

### Packages used

* Meteor Core
  * meteor-platform
* Routing
  * [iron:router](https://github.com/EventedMind/iron-router)
  * [zimme:iron-router-active](https://github.com/zimme/meteor-iron-router-active)
* Collections
  * [aldeed:collection2](https://github.com/aldeed/meteor-collection2)
  * [dburles:collection-helpers](https://github.com/dburles/meteor-collection-helpers)
* Accounts
  * [accounts-password](https://github.com/meteor/meteor/tree/devel/packages/accounts-password)
  * [useraccounts:semantic-ui](https://github.com/meteor-useraccounts/semantic-ui)
* UI and UX
  * [fastclick](https://github.com/meteor/meteor/tree/devel/packages/fastclick)
  * [meteorhacks:fast-render](https://github.com/meteorhacks/fast-render)
  * [natestrauser:animate-css](https://github.com/nate-strauser/meteor-animate-css/)
  * [semantic:ui](https://github.com/Semantic-Org/Semantic-UI-Meteor/)
* Security
  * [browser-policy](https://github.com/meteor/meteor/tree/devel/packages/browser-policy)
  * [audit-argument-checks](https://github.com/meteor/meteor/tree/devel/packages/audit-argument-checks)
  * [matteodem:easy-security](https://github.com/matteodem/meteor-easy-security)
* SEO
  * [manuelschoebel:ms-seo](https://github.com/DerMambo/ms-seo)
* Development
  * [less](https://github.com/meteor/meteor/tree/devel/packages/less)
  * [jquery](https://github.com/meteor/meteor/tree/devel/packages/jquery)
  * [underscore](https://github.com/meteor/meteor/tree/devel/packages/underscore)
  * [raix:handlebar-helpers](https://github.com/raix/Meteor-handlebar-helpers)

The "insecure" and "autopublish" packages are removed by default (they make your app vulnerable).

### Folder structure

```
client/ 				# Client folder
    compatibility/      # Libraries which create a global variable
    config/             # Configuration files (on the client)
	lib/                # Library files that get executed first
    startup/            # Javascript files on Meteor.startup()
    stylesheets         # LESS files
    modules/            # Meant for components, such as form and more(*)
	views/			    # Contains all views(*)
	    common/         # General purpose html templates
model/  				# Model files, for each Meteor.Collection(*)
private/                # Private files
public/                 # Public files
routes/                 # All routes(*)
server/					# Server folder
    fixtures/           # Meteor.Collection fixtures defined
    lib/                # Server side library folder
    publications/       # Collection publications(*)
    startup/            # On server startup
meteor-boilerplate		# Command line tool
```

(*) = the command line tool creates files in these folders

## Other Awesome Boilerplates

- [Void](https://github.com/SachaG/Void) by Sacha Greif
- [meteor-jw-opinionated-skeleton](https://github.com/jamesdwilson/meteor-jw-opinionated-skeleton) by jamesdwilson (CoffeeScript)
- [meteor-boilerplate](https://github.com/BeDifferential/meteor-boilerplate) by BeDifferential (CoffeeScript)
- [em](https://github.com/EventedMind/em) by EventedMind (Boilerplate & Scaffolding)

## License
This boilerplate has an MIT License, see the LICENSE.txt for more information.
