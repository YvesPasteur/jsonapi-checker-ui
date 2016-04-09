JSON API Checker UI
=============================================

## Overview

You can see this UI here : https://jsonapi-spec-validator-ui.herokuapp.com/

For more information on JSON API : http://jsonapi.org

This UI is a light client of a REST API which is doing all the validation work.
The overall architecture is the following :
* UI : ReactJS + json-api-store + bootstrap
* Server : hapi (nodejs)
* JSON API validation library : built on Should (nodejs)

## Setup

All the static files are in the public folder. 
If you need to serve them with a nodejs server, you can launch one with the following command :
```
npm start
```

## Development tasks

To update the built javascript file :
```
npm install
npm run-script watch
```

## How to help

The UI could be easily better.
If you have some improvements or debugs, you can submit a PR.

Or maybe do you want to create your own UI using the validator API ?
Let me know if we can work together.

This project is developed on my free time. So any help is welcome !

And if you think it is useful, the first help is to give me your feedback !
For example on the jsonapi forum : http://discuss.jsonapi.org/t/development-of-a-validation-tool/416

## What next ?

The following features would be great:
* Better visualization of the body content (validation feedback directly in the editing area)
* Deal with the rules concerning the query-parameters
* Better rules list : filtering, ordering
* JSON API autocompletion in the editing area
* List of JSON API examples : single resource, collection, creation,...

Maybe have you some other ideas of interesting features ?
