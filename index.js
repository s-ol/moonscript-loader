/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Sol Bekic / s-ol.nu
*/

const loader_utils = require('loader-utils');
const child_process = require('child_process');
const Readable = require('stream').Readable;


module.exports = function(content) {
  const callback = this.async();
  this.cacheable && this.cacheable();

  const options = Object.assign(
    {},
    { moonc: 'moonc' },
    loader_utils.getOptions(this)
  );

  const job = child_process.spawn(
    options.moonc,
    ['--'],
    { encoding: 'utf8', windows_hide: true }
  );

  job.stdin.write(content);
  job.stdin.end();

  let done;
  job.on('error', function (err) {
    done = true;
    callback(err);
  });

  let data = '';
  let error = '';
  job.stdout.on('data', function (d) {
    data += d.toString();
  });

  job.stderr.on('data', function (d) {
    error += d.toString();
  });

  job.on('close', function (code) {
    if (done)
      return;
    if (code === 0)
      callback(null, data);
    else
      callback(new Error(error));
  });
}

module.exports.seperable = true;
