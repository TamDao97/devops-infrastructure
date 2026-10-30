import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 }, // Tăng dần lên 20 VUs trong 30 giây
    { duration: '1m', target: 20 },  // Duy trì 20 VUs trong 1 phút
    { duration: '10s', target: 0 },  // Giảm về 0
  ],
};

const BASE_URL = 'http://117.1.172.92:5000/'; // Thay port của bạn vào đây

export default function () {
  // 70% request gọi API thành công
  let resNormal = http.get(`${BASE_URL}/normal-api`);
  check(resNormal, { 'status was 200': (r) => r.status === 200 });

  // 30% request gọi API gây lỗi HTTP 500
  let resError = http.get(`${BASE_URL}/simulate-error`);
  check(resError, { 'status was 500': (r) => r.status === 500 });

  sleep(0.5);
}