JSON API Checker UI
=============================================

## Overview

You can see this UI here : https://jsonapi-spec-validator-ui.herokuapp.com/

For more information on JSON API : jsonapi.org

This UI is a light client of a REST API which is doing all the validation work.
The architecture is the following : 
* ReactJS UI 
* nodejs (hapi) API
* nodejs (Should extension) lib to check the json validity

## Setup

All the static files are in the public folder. 
If you need a server, you can use one with the following command :
```
npm start
```

## Development tasks

```
npm install
npm run-script watch
```

## How to help

The UI could be easily better.
If you have some improvements or debugs, you can submit a PR on my UI project.
Or maybe you want to do your own new UI ? Let me know if we can work together.

This project is developed on my free time.
So any help is welcome !
And if you think it is useful, the first help is to give me your feedback !
For example on the jsonapi forum : http://discuss.jsonapi.org/t/development-of-a-validation-tool/416

## What next ?

The following features would be great:
* Better visualization of the body content (validation feedback directly in the editing area)
* Deal with the rules concerning the query-parameters
* Better rules list : filtering, ordering
* Autocompletion in the editing area

Maybe have you some other ideas of interesting features ?
