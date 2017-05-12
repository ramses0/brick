const createFilter = require('rollup-pluginutils').createFilter;
const crypto = require('crypto');
const fs = require('fs');

function findHashes (options={}) {
  const filter = createFilter(options.include, options.exclude);

  return {
    transform (code, id) {
      if (!filter(id)) {
        return;
      }

      const needsHash = /{@hash\spath="([^"]+)"}{\/hash}/gim;
      let matches;
      do {
        matches = needsHash.exec(code);

        if (matches) {
          const path = matches[1];
          const hashedName = hashFileName(path).replace('dist/client', '/static');
          code = code.replace(`{@hash path="${path}"}{/hash}`, hashedName);
        }
      } while (matches);

      return {
        code,
        map: {mappings: ''}
      };
    }
  };
};

function hashFileName (path) {
  const hash = crypto
            .createHash('sha256')
            .update(fs.readFileSync(path))
            .digest('hex');

  return path.replace(/\.([^.]*?)$/, `.${hash}.$1`);
}

module.exports = {
  findHashes,
  hashFileName
};
