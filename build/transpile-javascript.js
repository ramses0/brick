const intro = `/**
 *
 * Author: Mirko Igumnovic
 *
 * Built: ${new Date()}
 */
`;

const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const entries = [
    'client/scripts/app.js'
];

let cache;
entries.forEach(entry => {
    rollup.rollup({
        entry: `src/${entry}`,
        cache,
        plugins: [
            babel()
        ]
    }).then(bundle => {
        cache = bundle;
        bundle.write({
            intro,
            format: 'iife',
            dest: `dist/${entry}`
        });
    });
});