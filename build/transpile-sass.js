const mkdirp = require('mkdirp');
const fs = require('fs');
const path = require('path');
const inPath = path.join(__dirname, '..', 'src', 'client', 'styles');
const outPath = path.join(__dirname, '..', 'dist');
const files = [
  {
    in: path.join(inPath, 'inline.scss'),
    out: path.join(outPath, 'views', 'inlines', 'bootstrap.css')
  },
  {
    in: path.join(inPath, 'fonts.scss'),
    out: path.join(outPath, 'views', 'inlines', 'fonts.css')
  }
];

const CleanCSS = require('clean-css');
const sass = require('node-sass');
files.forEach(file => {
  sass.render({
    file: file.in
  }, (err, result) => {
    if (err) {
      throw err;
    }

    mkdirp(path.dirname(file.out), err => {
      if (err) {
        throw err;
      }

      const output = new CleanCSS().minify(result.css);
      fs.writeFile(file.out, output.styles, 'utf-8', (err) => {
        if (err) throw err;
      });
    });
  });
});
