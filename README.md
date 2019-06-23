# Mucher

[![Greenkeeper badge](https://badges.greenkeeper.io/serby/mucher.svg)](https://greenkeeper.io/)

Simple Static Web Server With Custom 404 and secure headers

## Installation

`npm install --global mucher`

`yarn global add mucher`

## Usage

`mucher --port 1337 --path .`

## Root Folder Structure

Path is expected to have at least a `public` folder where all files that you want to serve will be placed.

* /public

The following are optional:

* /404.html - Custom 404 page
* /headers.json - Add or override default headers
* /redirects.json - List of redirects - Coming soon!

## Credits
[Paul Serby](https://github.com/serby/) follow me on twitter [@serby](http://twitter.com/serby)

## License
Licensed under the [ISC](https://opensource.org/licenses/ISC)
