const http = require('http');

// Định nghĩa tỉ lệ các API sẽ được gọi ngẫu nhiên
const endpoints = [
  { path: '/api/products', weight: 70 }, // 70% Request bình thường thành công
  { path: '/api/slow', weight: 20 },     // 20% Request chậm (đo latency)
  { path: '/api/error', weight: 10 }     // 10% Request lỗi 500 (test alert)
];

function getRandomEndpoint() {
  const rand = Math.random() * 100;
  let cumulative = 0;
  for (const ep of endpoints) {
    cumulative += ep.weight;
    if (rand <= cumulative) return ep.path;
  }
  return '/api/products';
}

function sendRequest() {
  const path = getRandomEndpoint();
  const options = {
    hostname: 'localhost',
    port: 5000, // Cổng mặc định của .NET API
    path: path,
    method: 'GET'
  };

  const req = http.request(options, (res) => {
    console.log(`[Traffic Gen] GET ${path} | Status Code: ${res.statusCode}`);
  });

  req.on('error', (error) => {
    console.error(`[Traffic Gen Error] Không thể kết nối tới .NET API: ${error.message}`);
  });

  req.end();
}

console.log('🚀 Đang chạy script giả lập traffic liên tục tới .NET API (Nhấn Ctrl+C để dừng)...');
// Bắn request đều đặn mỗi 300 miligiây
setInterval(sendRequest, 300);