const Razorpay = require('razorpay');

function getKeys() {
  const key_id = process.env.RAZORPAY_KEY_ID || '';
  const key_secret = process.env.RAZORPAY_KEY_SECRET || '';
  return { key_id, key_secret };
}

function hasRazorpay() {
  const { key_id, key_secret } = getKeys();
  return Boolean(key_id && key_secret);
}

function getRazorpay() {
  const { key_id, key_secret } = getKeys();
  if (!key_id || !key_secret) return null;
  return new Razorpay({ key_id, key_secret });
}

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    if (req.body && typeof req.body === 'object') {
      resolve(req.body);
      return;
    }
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
      if (data.length > 1e6) {
        reject(new Error('Body too large'));
        req.destroy();
      }
    });
    req.on('end', () => {
      if (!data) return resolve({});
      try {
        resolve(JSON.parse(data));
      } catch (e) {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

module.exports = { getKeys, hasRazorpay, getRazorpay, json, readBody };
