WeatherApp
==========

This application was created according to [Andrew Mead's course from Udemy](https://www.udemy.com/the-complete-nodejs-developer-course-2) (4th section)

It shows you the current temperature by the place. It is based on [Google Maps API](https://developers.google.com/maps/) and [Dark Sky API](https://darksky.net/dev/docs).

Example of usage
----------------

The next query

`
node app.js --address="Moscow, Solyanka 1"
`

returns

`
It's currently 23. It feels like 22.
`

Installation
------------

You will need `node` and `npm` installed.

To run app type `npm install` in the main folder.

Arguments
---------

**--address, -a \[string\]** 

Address to fetch weather for

**--version, -v**

Show version number

**--help, -h**

Show help

License
-------

MIT

