# ERD – Giải Trình Thiết Kế Cơ Sở Dữ Liệu

## 1. Các Entity

- **User:** `Id (PK)`, `Email`, `Password`, `UserName`, `FullName`, `IsActive`, `CreatedAt`
- **Role:** `Id (PK)`, `Name`
- **UserRole:** `UserId (PK, FK)`, `RoleId (PK, FK)`
- **Course:** `Id (PK)`, `Name`, `Description`, `BasePrice`, `CourseType`, `IsActive`
- **Class:** `Id (PK)`, `CourseId (FK)`, `StartDate`, `EndDate`, `TeacherId (FK)`, `SupportStaffId (FK)`, `MaxStudents`, `GoogleMeetLink`, `ClassCode`, `Book`
- **ScheduleSession:** `Id (PK)`, `ClassId (FK)`, `SessionDate`, `StartTime`, `EndTime`
- **Attendance:** `Id (PK)`, `ScheduleId (FK)`, `UserId (FK)`, `Status`
- **Enrollment:** `Id (PK)`, `UserId (FK)`, `ClassId (FK)`, `EnrolledAt`, `Status`, `PaymentStatus`, `Months`
- **Invoice:** `Id (PK)`, `EnrollmentId (FK)`, `Subtotal`, `Discount`, `Refund`, `Total`, `PromoCode`, `Status`, `DueDate`, `CreatedAt`
- **Payment:** `Id (PK)`, `InvoiceId (FK)`, `TransactionCode`, `Amount`, `PaymentDate`, `Method`
- **Customer:** `Id (PK)`, `Email`, `Phone`, `Name`, `CreatedAt`
- **Service:** `Id (PK)`, `Name`, `Description`, `CreatedAt`
- **ServiceRequest:** `Id (PK)`, `CustomerId (FK)`, `ServiceId (FK)`, `AssignStaffId (FK)`, `Status`, `Description`, `RequestAt`, `ResponseAt`, `Feedback`

---

## 2. Quan hệ giữa các Entity

| Quan hệ                                | Cardinality | Khóa ngoại / Bảng trung gian                  |
| -------------------------------------- | ----------- | --------------------------------------------- |
| User – Role                            | N-N         | `UserRole(UserId FK, RoleId FK)`              |
| Course – Class                         | 1-N         | `Class.CourseId FK`                           |
| Class – ScheduleSession                | 1-N         | `ScheduleSession.ClassId FK`                  |
| User – ScheduleSession                 | N-N         | `Attendance(UserId FK, ScheduleId FK)`        |
| User – Class                           | N-N         | `Enrollment(UserId FK, ClassId FK)`           |
| Enrollment – Invoice                   | 1-N         | `Invoice.EnrollmentId FK`                     |
| Invoice – Payment                      | 1-N         | `Payment.InvoiceId FK`                        |
| Customer – Service                     | N-N         | `ServiceRequest(CustomerId FK, ServiceId FK)` |
| User – Class (Teacher)                 | 1-N         | `Class.TeacherId FK → User.Id`                |
| User – Class (Support Staff)           | 1-N         | `Class.SupportStaffId FK → User.Id`           |
| User – ServiceRequest (Assigned Staff) | 1-N         | `ServiceRequest.AssignStaffId FK → User.Id`   |

### Quan hệ chi tiết

- **User N-N Role** thông qua `UserRole`.
- **Course 1-N Class**: một khóa học có thể có nhiều lớp.
- **Class 1-N ScheduleSession**: một lớp có nhiều buổi học.
- **User N-N ScheduleSession** thông qua `Attendance`.
- **User N-N Class** thông qua `Enrollment`.
- **Enrollment 1-N Invoice**: một enrollment có thể có nhiều hóa đơn.
- **Invoice 1-N Payment**: một hóa đơn có thể có nhiều lần thanh toán.
- **Customer N-N Service** thông qua `ServiceRequest`.
- Một **User** có thể làm giáo viên cho nhiều `Class`.
- Một **User** có thể làm nhân viên hỗ trợ cho nhiều `Class`.
- Một **User** có thể được phân công xử lý nhiều `ServiceRequest`.

---

## 3. Vì sao thiết kế vậy?

1. **User – Role:** Dùng `UserRole` để biểu diễn quan hệ N-N, cho phép một user có nhiều role và phân quyền linh hoạt.
2. **Course – Class – ScheduleSession:** Tách 3 cấp để một khóa học có nhiều lớp, mỗi lớp có nhiều buổi học với lịch riêng.
3. **Attendance:** Dùng làm bảng liên kết User và ScheduleSession, đồng thời lưu trạng thái điểm danh của từng học viên.
4. **Enrollment:** Biểu diễn quan hệ N-N giữa User và Class, đồng thời lưu thông tin đăng ký, thanh toán và số tháng học.
5. **Status – PaymentStatus:** Tách riêng vì một trạng thái quản lý tiến trình đăng ký, trạng thái còn lại quản lý tình hình thanh toán.
6. **Enrollment – Invoice – Payment:** Cho phép một enrollment có nhiều hóa đơn và một hóa đơn có nhiều giao dịch thanh toán.
7. **Customer – Service:** Dùng `ServiceRequest` để liên kết khách hàng với dịch vụ và quản lý nhân viên phụ trách, trạng thái xử lý và phản hồi.
