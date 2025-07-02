const crypto = require('crypto');

function generateSign(params, m_key) {
  const sortedKeys = Object.keys(params).sort();
  let str = '';
  sortedKeys.forEach(key => {
    str += `${key}=${params[key]}&`;
  });
  str += m_key;

  const doubleMd5 = crypto.createHash('md5').update(
    crypto.createHash('md5').update(str).digest('hex')
  ).digest('hex');

  return doubleMd5;
}

module.exports = generateSign;
