# metalsmith-youtube

A [Metalsmith](https://github.com/segmentio/metalsmith) plugin that lets you get embed Youtube Videos

[![Build Status](https://travis-ci.org/juanpicado/metalsmith-youtube.svg?branch=master)](https://travis-ci.org/juanpicado/metalsmith-youtube)

## Installation

    $ npm install metalsmith-youtube

## Usage

step 1

```js
var youtube = require('metalsmith-youtube');

metalsmith.use(youtube({
  width: 560,      // optional, width video (default 560)
  height: 315,     // optional, height video (default 560)
  suggested: true,       // optional, display suggested videos
  controls: true,     // optional, display controls
  showTitle: true // optional, show video title and player actions
  privacy : true  // optional, enable privacy-enhaced mode
}));
```

Note that metalsmith-youtube should run before your Markdown parser. While you *can* run it after parsing Markdown, doing so is a bad idea.

step 2

```
---
title: test
---

## only the id
youtube|hWhMKalEic8

```


## CLI Usage

```json
{
  "plugins": {
    "metalsmith-youtube": {
    "width:": "560",
    "height": "315",
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
