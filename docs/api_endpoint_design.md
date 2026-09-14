# API Endpoint Design


## Courses

| Endpoint | Mô tả |
| --- | --- |
| `POST /api/v1/courses` | Tạo khóa học mới |
| `GET /api/v1/courses` | Lấy danh sách khóa học, có thể filter bằng `isActive`, `courseType`, `search`, `page`, `pageSize` |
| `GET /api/v1/courses/{courseId}` | Lấy chi tiết một khóa học |
| `PATCH /api/v1/courses/{courseId}` | Cập nhật một phần thông tin khóa học |
| `DELETE /api/v1/courses/{courseId}` | Xóa hoặc ngưng sử dụng khóa học |

## Classes

| Endpoint | Mô tả |
| --- | --- |
| `POST /api/v1/classes` | Tạo lớp học mới |
| `GET /api/v1/classes` | Lấy danh sách lớp học, có thể filter bằng `courseId`, `teacherId`, `supportStaffId`, `startDate`, `endDate`, `page`, `pageSize` |
| `GET /api/v1/classes/{classId}` | Lấy chi tiết một lớp học |
| `PATCH /api/v1/classes/{classId}` | Cập nhật một phần thông tin lớp học |
| `DELETE /api/v1/classes/{classId}` | Xóa lớp học |

## Schedule Sessions

| Endpoint | Mô tả |
| --- | --- |
| `POST /api/v1/classes/{classId}/schedule` | Tạo buổi học cho một lớp cụ thể |
| `GET /api/v1/schedule` | Lấy danh sách buổi học, có thể filter bằng `classId`, `sessionDate`, `page`, `pageSize` |
| `GET /api/v1/schedule/{sessionId}` | Lấy chi tiết một buổi học |
| `PATCH /api/v1/schedule/{sessionId}` | Cập nhật một phần thông tin buổi học |
| `DELETE /api/v1/schedule/{sessionId}` | Xóa buổi học |
| `POST /api/v1/schedule/generate` | Tạo lịch học tự động cho lớp |


## Enrollments

| Endpoint | Mô tả |
| --- | --- |
| `POST /api/v1/enrollments` | Đăng ký học viên vào lớp |
| `GET /api/v1/enrollments` | Lấy danh sách đăng ký, có thể filter bằng `userId`, `classId`, `status`, `paymentStatus`, `page`, `pageSize` |
| `GET /api/v1/enrollments/{enrollmentId}` | Lấy chi tiết một đăng ký học |
| `PATCH /api/v1/enrollments/{enrollmentId}` | Cập nhật một phần thông tin đăng ký, ví dụ `status`, `paymentStatus`, `months` |
| `DELETE /api/v1/enrollments/{enrollmentId}` | Hủy hoặc xóa đăng ký học |

## Attendance

| Endpoint | Mô tả |
| --- | --- |
| `POST /api/v1/attendance` | Tạo bản ghi điểm danh |
| `GET /api/v1/attendance` | Lấy danh sách điểm danh, có thể filter bằng `sessionId`, `userId`, `status`, `page`, `pageSize` |
| `GET /api/v1/attendance/{attendanceId}` | Lấy chi tiết một bản ghi điểm danh |
| `PATCH /api/v1/attendance/{attendanceId}` | Cập nhật trạng thái điểm danh |
| `DELETE /api/v1/attendance/{attendanceId}` | Xóa bản ghi điểm danh |

## Invoices

| Endpoint | Mô tả |
| --- | --- |
| `POST /api/v1/invoices` | Tạo hóa đơn cho một đăng ký học |
| `GET /api/v1/invoices` | Lấy danh sách hóa đơn, có thể filter bằng `enrollmentId`, `status`, `dueDate`, `page`, `pageSize` |
| `GET /api/v1/invoices/{invoiceId}` | Lấy chi tiết hóa đơn |
| `PATCH /api/v1/invoices/{invoiceId}` | Cập nhật một phần hóa đơn, ví dụ `discount`, `refund`, `status`, `dueDate` |
| `DELETE /api/v1/invoices/{invoiceId}` | Xóa hóa đơn nếu nghiệp vụ cho phép |
| `POST /api/v1/invoice/calc` | Tính thử học phí, giảm giá, hoàn tiền và tổng tiền |


## Payments

| Endpoint | Mô tả |
| --- | --- |
| `POST /api/v1/payments` | Tạo giao dịch thanh toán cho hóa đơn |
| `GET /api/v1/payments` | Lấy danh sách thanh toán, có thể filter bằng `invoiceId`, `method`, `paymentDate`, `page`, `pageSize` |
| `GET /api/v1/payments/{paymentId}` | Lấy chi tiết giao dịch thanh toán |
| `PATCH /api/v1/payments/{paymentId}` | Cập nhật một phần thông tin thanh toán nếu nghiệp vụ cho phép |
| `POST /api/v1/payments/{paymentId}/refunds` | Tạo yêu cầu hoàn tiền cho một giao dịch thanh toán |

Endpoint `POST /api/v1/payments/{paymentId}/refunds` là business action vì hoàn tiền là nghiệp vụ phát sinh từ một payment đã tồn tại.

## Customers

| Endpoint | Mô tả |
| --- | --- |
| `POST /api/v1/customers` | Tạo khách hàng |
| `GET /api/v1/customers` | Lấy danh sách khách hàng, có thể filter bằng `search`, `page`, `pageSize` |
| `GET /api/v1/customers/{customerId}` | Lấy chi tiết khách hàng |
| `PATCH /api/v1/customers/{customerId}` | Cập nhật một phần thông tin khách hàng |
| `DELETE /api/v1/customers/{customerId}` | Xóa khách hàng nếu nghiệp vụ cho phép |

## Services

| Endpoint | Mô tả |
| --- | --- |
| `POST /api/v1/services` | Tạo dịch vụ |
| `GET /api/v1/services` | Lấy danh sách dịch vụ, có thể filter bằng `search`, `page`, `pageSize` |
| `GET /api/v1/services/{serviceId}` | Lấy chi tiết dịch vụ |
| `PATCH /api/v1/services/{serviceId}` | Cập nhật một phần thông tin dịch vụ |
| `DELETE /api/v1/services/{serviceId}` | Xóa dịch vụ |

## Service Requests

| Endpoint | Mô tả |
| --- | --- |
| `POST /api/v1/service-requests` | Tạo yêu cầu dịch vụ |
| `GET /api/v1/service-requests` | Lấy danh sách yêu cầu dịch vụ, có thể filter bằng `customerId`, `serviceId`, `assignedStaffId`, `status`, `page`, `pageSize` |
| `GET /api/v1/service-requests/{serviceRequestId}` | Lấy chi tiết yêu cầu dịch vụ |
| `PATCH /api/v1/service-requests/{serviceRequestId}` | Cập nhật một phần yêu cầu, ví dụ `status`, `assignedStaffId`, `responseAt`, `feedback` |
| `DELETE /api/v1/service-requests/{serviceRequestId}` | Xóa yêu cầu dịch vụ nếu nghiệp vụ cho phép |

## Users And Roles

| Endpoint | Mô tả |
| --- | --- |
| `POST /api/v1/users` | Tạo user |
| `GET /api/v1/users` | Lấy danh sách user, có thể filter bằng `isActive`, `roleId`, `search`, `page`, `pageSize` |
| `GET /api/v1/users/{userId}` | Lấy chi tiết user |
| `PATCH /api/v1/users/{userId}` | Cập nhật một phần thông tin user |
| `DELETE /api/v1/users/{userId}` | Xóa hoặc vô hiệu hóa user |
| `POST /api/v1/users/{userId}/roles` | Gán role cho user |
| `GET /api/v1/users/{userId}/roles` | Lấy danh sách role của user |
| `DELETE /api/v1/users/{userId}/roles/{roleId}` | Gỡ role khỏi user |
