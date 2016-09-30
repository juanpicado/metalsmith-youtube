import 'babel-polyfill';

/**
 * Youtube iframe generator
 */
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

  /**
   * Parse the content
   * @param cb callback {Function}
   */
  parse(cb) {
    Object.keys(this.files).forEach((file) => {
       let articleText = this.files[file].contents.toString();
       let matches = this._getYoutubes(articleText);
       if (matches !== null) {
         matches.forEach((element) => {
            var id = element.split('|')[1];
            var iframe = this._createIframeBody(id, this.options.width, this.options.height);
            this.files[file].contents = articleText.replace(element, iframe);
         });
       }
    });
    cb();
  }

  /**
   * Return all youtube definitions within the body content
   * @param content
   * @returns {Array|{index: number, input: string}|*}
   * @private
   */
  _getYoutubes(content) {
    return content.match(/youtube\|.\S*/g);
  }

  /**
   * Create a YouTube iframe
   * @param id the YouTube id
   * @param width iframe width
   * @param height iframe height
   * @returns {string} iframe as string
   * @private
   */
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
    const iframe = `<iframe width='${width}' height='${height}' src='${url}' frameborder='0' allowfullscreen></iframe>`;
    return iframe;
  }
}

/**
 * Metalsmith plugin to render Youtube Video
 * @param {Object} options (optional)
 * @return {Function}
 */
function plugin( _options ) {
  let options = _options || {};
  return ( files, metalsmith, done ) => {
    let app = new Youtube( options, files );
    app.parse( function() {
      done();
    });
  };
}


/**
* Expose `plugin`.
*/
exports = module.exports = plugin;
