/**
 * Automated Stage 1 Smoke Test
 * Tests API health endpoint and verifies proper JSON response structure.
 */
import http from 'http';

const testEndpoint = (path) => {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:5000${path}`, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, body: data });
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
};

const run = async () => {
  console.log('🧪 Testing Stage 1 Server Health Endpoint...');
  try {
    const health = await testEndpoint('/api/health');
    console.log('Status Code:', health.status);
    console.log('Health Response:', JSON.stringify(health.body, null, 2));

    if (health.status === 200 && health.body.status === 'success') {
      console.log('✅ Stage 1 Server Health Check Passed!');
      process.exit(0);
    } else {
      console.error('❌ Unexpected response structure');
      process.exit(1);
    }
  } catch (err) {
    console.error('❌ Failed to connect to server:', err.message);
    process.exit(1);
  }
};

run();
