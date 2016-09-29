import "babel-polyfill";

import fs from 'fs';
import path from 'path';
import debug from 'debug';

debug('metalsmith-youtube');

/**
 * Metalsmith plugin to render Youtube Video
 * @param {Object} options (optional)
 * @return {Function}
 */

function plugin( _options ) {
  let options = options || {};
  return ( files, metalsmith, done ) => {
    //setImmediate(done);
    let metadata      = metalsmith.metadata();
    let collections   = metadata.collections;

    let colName, file, filePath;
    let app = new Youtube( options, files );
    app.parse( function() {
      done();
    });
  };
};

class Youtube {

  constructor(options, files) {
    this.files = files;
    this.options = {
      suggested: options.suggested || true,
      showTitle: options.showTitle || true, // null, undefined default to true
      privacy: options.privacy || true,
      controls: options.controls || true,
    };
  }

  parse(cb) {
    Object.keys(this.files).forEach((file) => {
       console.log('file', file, this.files[file].youtube);
    });
    cb();
  }

  _createIframeBody() {
    // <iframe width="1280" height="720" src="https://www.youtube.com/embed/Q_Gjvvxi2jU" frameborder="0" allowfullscreen></iframe>
  }
}

/**
* Expose `plugin`.
*/
exports = module.exports = plugin;
