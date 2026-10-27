DEVOPS-INFRASTRUCTURE

Tổng quan dành cho thành viên mới

Chào mừng bạn đến với repository

Tài liệu này giúp thành viên mới nhanh chóng hiểu repository devops-infrastructure dùng để làm gì, vì sao nó tồn tại, có những thành phần nào và nên bắt đầu từ đâu. Đây là tài liệu giới thiệu kiến trúc và quy ước chung; các hướng dẫn thao tác chi tiết sẽ nằm trong tài liệu của từng thành phần.

1. Repository này là gì?

devops-infrastructure là nơi quản lý cấu hình hạ tầng, công cụ vận hành và quy trình tự động hóa dùng chung cho hệ thống. Repository này tập trung vào cách xây dựng, đóng gói, triển khai và theo dõi ứng dụng; không phải nơi chứa source code nghiệp vụ của từng microservice.

Hiểu ngắn gọn: repository ứng dụng chứa logic nghiệp vụ; repository này mô tả cách đưa ứng dụng đó vào môi trường chạy và vận hành nó.

2. Vì sao cần repository riêng?

Tập trung cấu hình DevOps ở một nơi, tránh để mỗi service tự định nghĩa quy trình triển khai theo cách khác nhau.

Tái sử dụng pipeline và script cho nhiều microservice.

Theo dõi lịch sử thay đổi bằng Git, review trước khi áp dụng và dễ tìm nguyên nhân khi có sự cố.

Tách cấu hình vận hành khỏi code nghiệp vụ để dễ phân quyền và quản lý vòng đời.

Giúp thành viên mới hiểu luồng CI/CD và cách hệ thống được triển khai mà không phải đọc toàn bộ source code ứng dụng.

3. Repository này giải quyết vấn đề gì?

Thiếu quy trình thống nhất: Chuẩn hóa các bước build, test, đóng gói và triển khai.

Lặp lại cấu hình giữa các service: Tạo mẫu pipeline/script có thể dùng lại và điều chỉnh theo service.

Khó truy vết thay đổi: Lưu cấu hình dưới dạng code, có lịch sử commit và review.

Triển khai xong nhưng không biết service khỏe không: Bổ sung health check và liên kết với hệ thống log/metric/trace khi phù hợp.

Rủi ro lộ bí mật: Quy định rõ secret không được commit; sử dụng hệ thống quản lý credentials phù hợp.

4. Repository này liên quan thế nào đến hệ thống?

Source code repository (ví dụ ECRMS microservices)
              |
              | push code / trigger pipeline
              v
      Jenkins / CI-CD
              |
              | build, test, tạo Docker image
              v
       Docker Registry
              |
              | pull image theo phiên bản
              v
        Linux Server
              |
              +--> Chạy các microservice
              |
              +--> Health check / logs / metrics / traces
                         |
                         +--> Prometheus / Grafana
                         +--> Loki
                         +--> OpenTelemetry

Sơ đồ trên là luồng mục tiêu ở mức tổng quan. Các tích hợp cụ thể phụ thuộc cấu hình thực tế của dự án; không phải mọi thành phần đều bắt buộc phải có ngay từ giai đoạn đầu.

5. Các thư mục và thành phần dự kiến

jenkins/ Cấu hình chạy Jenkins và các thiết lập liên quan.

pipelines/ Pipeline dùng chung, ví dụ quy trình build/test ứng dụng .NET.

scripts/ Script triển khai, kiểm tra sức khỏe và các thao tác vận hành.

docker/ Mẫu cấu hình Docker dùng chung nếu có nhu cầu.

monitoring/ Cấu hình monitoring/logging được quản lý trong repository này, nếu nhóm chọn đặt chung.

docs/ Tài liệu kiến trúc, hướng dẫn bắt đầu, quy trình triển khai và xử lý sự cố.

Cấu trúc này là đề xuất định hướng. Hãy kiểm tra nội dung thực tế của repository trước khi giả định một thư mục hoặc công cụ đã được triển khai.

6. Vai trò của các công cụ

Git: Lưu trữ và review cấu hình, script và tài liệu.

Jenkins: Điều phối tự động các bước CI/CD.

Docker: Đóng gói ứng dụng thành image để chạy nhất quán giữa môi trường.

Docker Registry: Lưu image theo phiên bản để server có thể tải đúng bản cần chạy.

Linux Server: Môi trường chạy ứng dụng sau triển khai.

Prometheus và Grafana: Thu thập và hiển thị metrics.

Loki: Tập trung và truy vấn logs.

OpenTelemetry: Chuẩn hóa việc tạo/thu thập telemetry như traces, metrics và logs theo cấu hình.

7. Điều gì không nên đưa vào repository?

Mật khẩu, access token, SSH private key hoặc credentials thật.

File .env chứa giá trị bí mật; chỉ đưa file mẫu như .env.example với giá trị giả/placeholder.

Database dump, dữ liệu khách hàng hoặc log chứa thông tin nhạy cảm.

Source code nghiệp vụ của microservice nếu đã được quản lý ở repository riêng.

8. Thành viên mới nên bắt đầu từ đâu?

Đọc README này để hiểu mục tiêu và phạm vi repository.

Xem cây thư mục và đọc README của từng thành phần nếu có.

Tìm sơ đồ kiến trúc và xác định pipeline đi từ source code đến môi trường chạy như thế nào.

Kiểm tra file cấu hình mẫu; không chạy lệnh triển khai lên môi trường thật khi chưa hiểu tác động.

Hỏi người phụ trách về môi trường được phép sử dụng, quyền truy cập, registry và quy trình phê duyệt.

9. Quy ước an toàn khi thay đổi

Ưu tiên tạo branch và pull request; mô tả rõ mục đích, phạm vi ảnh hưởng và cách kiểm thử.

Không tự ý chạy deploy production hoặc thay đổi secrets/quyền truy cập.

Tránh lệnh có thể dừng hoặc xóa toàn bộ stack khi chỉ cần cập nhật một service.

Dùng image tag có thể truy vết; không phụ thuộc duy nhất vào tag latest.

Sau triển khai, kiểm tra trạng thái service, health endpoint và logs theo runbook.

10. Tài liệu nên có trong repository

README.md: tổng quan, mục tiêu, sơ đồ kiến trúc và hướng dẫn bắt đầu.

docs/architecture.md: kiến trúc chi tiết và luồng giữa các thành phần.

docs/deployment.md: cách triển khai theo từng môi trường và cách rollback.

docs/troubleshooting.md: lỗi thường gặp, cách kiểm tra và hướng xử lý.

Mỗi thư mục thành phần có README riêng khi đủ phức tạp.

11. Tóm tắt trong một phút

devops-infrastructure là nguồn tập trung cho cách nhóm tự động hóa và vận hành hệ thống. Nó giúp quy trình build/test/deploy nhất quán, cấu hình có thể review và truy vết, triển khai có kiểm soát và dễ quan sát sau triển khai. Khi tham gia repository, hãy hiểu mục đích trước, kiểm tra môi trường và quyền hạn, không đưa bí mật vào Git, và luôn biết thay đổi của mình tác động đến service/môi trường nào.