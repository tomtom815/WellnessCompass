const test = require('node:test');
const assert = require('node:assert/strict');
const { readdirSync, readFileSync } = require('node:fs');
const { join } = require('node:path');

test('browser request code never logs credentials or health response objects', () => {
  const walk = (directory) => readdirSync(directory, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(join(directory, entry.name)) : [join(directory, entry.name)]);
  const sources = walk(join(__dirname, '../src')).filter((path) => /\.jsx?$/.test(path));
  assert.ok(sources.length > 20);
  for (const path of sources) {
    const code = readFileSync(path, 'utf8');
    assert.doesNotMatch(code, /^\s*console\.log\(/m, path);
    for (const line of code.split('\n').filter((line) => /^\s*console\.error\(/.test(line))) {
      assert.equal(line.trim(), "console.error('Request failed.');", path);
    }
  }
});
