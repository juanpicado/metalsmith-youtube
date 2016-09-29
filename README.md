# metalsmith-youtube

A [Metalsmith](https://github.com/segmentio/metalsmith) plugin that lets you get embed Youtube Videos

## Installation

    $ npm install metalsmith-youtube

## Usage

step 1

```js
var youtube = require('metalsmith-youtube');

metalsmith.use(youtube({
  suggested: true,       // optional, display suggested videos
  controls: true,     // optional, display controls
  showTitle: true // optional, show video title and player actions
  privacy : true  // optional, enable privacy-enhaced mode
}));
```

step 2

```
---
title: test
---

Hello World

## youtube url
youtube:https://www.youtube.com/watch?v=hWhMKalEic8

## only the id
youtube:hWhMKalEic8

```


## CLI Usage

```json
{
  "plugins": {
    "metalsmith-youtube": {
     "suggested": "true",   
	  "controls": "true", 
	  "showTitle": "true",
	  "privacy" : "true" 
    }
  }
}
```

## License

  MIT
