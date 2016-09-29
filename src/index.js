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
  let options = _options || {};
  return ( files, metalsmith, done ) => {
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
      width: 560,
      height: 315
    };
    Object.assign(this.options, options);
  }

  parse(cb) {
    var self = this;
    Object.keys(this.files).forEach((file) => {
       let article_text = this.files[file].contents.toString();
       let matches = this._getYoutubes(article_text);
       if (matches !== null) {
         matches.forEach((element, index) => {
            var id = element.split('|')[1];
            var iframe = this._createIframeBody(id, this.options.width, this.options.height);
            this.files[file].contents = article_text.replace(element, iframe);
         });
       }
    });
    cb();
  }

  _getYoutubes(content) {
    return content.match(/youtube\|.\S*/g);
  }

  _createIframeBody(id, width, height) {
    let url;
    if (this.options.privacy) {
      url = `https://www.youtube-nocookie.com/embed/${id}`;
    } else {
      url = `https://www.youtube.com/embed/${id}`;
    }
    url += this.options.suggested ? `?rel=0&amp;` : `?`;
    url += this.options.showTitle ? `&amp;showinfo=0` : ``;
    url += this.options.controls ? `&amp;controls=0` : ``;
    const iframe = `<iframe width="${width}" height="${height}" src="${url}" frameborder="0" allowfullscreen></iframe>`;
    return iframe;
  }
}

/**
* Expose `plugin`.
*/
exports = module.exports = plugin;
