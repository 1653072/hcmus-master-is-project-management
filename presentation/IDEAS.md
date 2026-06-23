# Ý tưởng & nội dung slide thuyết trình HRIS

> Nguồn: BTDA-25C12002-25C12010.pdf (tổng hợp Phần I Yêu cầu 1, Phần I Yêu cầu 2, Phần II Lập kế hoạch dự án)

---

## SLIDE 1 - TRANG BÌA

**Giữa slide:**

# HỆ THỐNG QUẢN TRỊ NHÂN SỰ HRIS

Phân tích, Thiết kế, Dự toán chi phí và Lập Kế hoạch dự án

**Góc trái dưới:**

- Lê Ngọc Trúc Huỳnh — 25C12002
- Trần Kiến Quốc — 25C12010
- **Giảng viên hướng dẫn:** PGS.TS Nguyễn Văn Vũ
- **Môn học:** Quản trị Hệ thống thông tin

---

## SLIDE 2 - TỔNG QUAN TOÀN HỆ THỐNG


| Phần                   | Nội dung thực hiện                                                                                                                        |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **MÔ TẢ HỆ THỐNG**     | Giới thiệu HRIS (tham khảo Horilla HR); 13 vai trò; 2 NFR toàn cục; 8 nhóm nghiệp vụ / 21 Use Case; kiến trúc; ma trận & biểu đồ Use Case |
| **DỰ TOÁN CHI PHÍ**    | UCP (Quy định 671/QĐ-BTTTT); FPA (IFPUG); so sánh 2 phương pháp; bối cảnh GenAI; phân tích độ nhạy nhân sự ±20%; GenAI 50% & 80%          |
| **LẬP KẾ HOẠCH DỰ ÁN** | Lựa chọn Scrum; cơ cấu nhân sự & Training; WBS 5 giai đoạn; Critical Path; Stakeholder; giám sát EVM; leo thang sự cố; quản trị rủi ro    |


---

## SLIDE 3 - MÔ TẢ HỆ THỐNG

---

## SLIDE 4 - KIẾN TRÚC HỆ THỐNG & PHẠM VI NGHIỆP VỤ

**Mục tiêu hệ thống**

- HRIS cho doanh nghiệp lớn, bao phủ **toàn vòng đời nhân viên**: Tuyển dụng → Onboarding → Chấm công/Nghỉ phép → Tính lương/Tài sản → Đánh giá/Hỗ trợ → Offboarding → Báo cáo

**Kiến trúc (tham khảo Horilla, triển khai custom)**

- **Clean Architecture**, phát triển từ con số 0 (không dùng mã nguồn mở có sẵn)
- **Backend:** Golang + API REST, RBAC server-side
- **Frontend:** Web responsive (Desktop/Tablet)
- **Database:** PostgreSQL (ACID, chống deadlock, pessimistic locking)
- **Hạ tầng:** Cloud/Web-based, CI/CD, Docker; tích hợp LDAP/AD
- **Bảo mật:** AES-256, HTTPS/TLS 1.3, audit log; tuân thủ NĐ 13/2023/NĐ-CP

**8 module nghiệp vụ**

1. Quản trị hệ thống & nhân sự
2. Tuyển dụng & Tiếp nhận (phễu Kanban 13 giai đoạn)
3. Chấm công & Nghỉ phép
4. Tính lương & Quản lý tài sản
5. Đánh giá & Hỗ trợ
6. Nghỉ việc (Offboarding)
7. Báo cáo & Thống kê
8. Cấu hình & Cảnh báo

**NFR toàn cục:** Availability ≥ 99,5%; không lỗi nghiêm trọng vận hành/tài chính; không data race/deadlock

---

## SLIDE 5 - MA TRẬN 8 NHÓM × 21 USE CASE

**Quy ước màu:**

- 🟢 **Xanh — Simple** (≤ 3 transactions, trọng số 5)
- 🟡 **Vàng — Average** (4–7 transactions, trọng số 10)
- 🔴 **Đỏ — Complex** (> 7 transactions, trọng số 15)


| Nhóm                 | UC     | Tên chức năng                   | Độ phức tạp |
| -------------------- | ------ | ------------------------------- | ----------- |
| **1. Quản trị & NS** | UC-1.1 | Quản lý hồ sơ nhân viên         | 🟡          |
|                      | UC-1.2 | Sơ đồ tổ chức phòng ban         | 🟡          |
|                      | UC-1.3 | Phân quyền RBAC                 | 🔴          |
|                      | UC-1.4 | Phiên đăng nhập & bảo mật       | 🟡          |
| **2. Tuyển dụng**    | UC-2.1 | Quản lý đợt tuyển dụng          | 🟡          |
|                      | UC-2.2 | Sàng lọc ứng viên (AI + Kanban) | 🔴          |
|                      | UC-2.3 | Lịch & đánh giá phỏng vấn       | 🟡          |
|                      | UC-2.4 | Offer Proposal & thư mời        | 🔴          |
|                      | UC-2.5 | Onboarding                      | 🟡          |
| **3. Chấm công**     | UC-3.1 | Check-in/Check-out              | 🔴          |
|                      | UC-3.2 | Ca làm việc & OT                | 🟡          |
|                      | UC-3.3 | Nộp đơn nghỉ phép               | 🟢          |
|                      | UC-3.4 | Phê duyệt nghỉ phép             | 🔴          |
| **4. Lương & TS**    | UC-4.1 | Hợp đồng lao động               | 🟡          |
|                      | UC-4.2 | Tính lương tự động              | 🔴          |
|                      | UC-4.3 | Cấp phát/thu hồi tài sản        | 🟡          |
| **5. Đánh giá & HT** | UC-5.1 | Chu kỳ đánh giá hiệu suất       | 🔴          |
|                      | UC-5.2 | Ticket hỗ trợ nội bộ            | 🟡          |
| **6. Offboarding**   | UC-6.1 | Quy trình nghỉ việc             | 🔴          |
| **7. Báo cáo**       | UC-7.1 | Dashboard tổng quan             | 🔴          |
| **8. Cấu hình**      | UC-8.1 | Cấu hình & thông báo tự động    | 🟡          |


**Tổng hợp:** 1 Simple · 11 Average · 9 Complex → TBF = **255 điểm**

**Ý tưởng trình bày:** heatmap 8×21 với 3 màu theo quy ước trên.

---

## SLIDE 6 - BIỂU ĐỒ TƯƠNG TÁC (USE-CASE DIAGRAM)

**Gợi ý trình bày slide:** chèn hình Use Case Diagram từ báo cáo; slide chỉ ghi chú giải thích.

**13 Actors (tất cả Complex — 4 điểm/actor):**

System Admin · HR General Manager · HR Admin · Recruitment Manager · Shift Manager · Payroll Manager · Performance Manager · Asset Manager · Recruiter · Interviewer · Employee · Line Manager · Helpdesk Staff

**Quan hệ chính:**

- **HR Admin / System Admin** → Nhóm 1 (quản trị, phân quyền)
- **Recruiter / Interviewer / Recruitment Manager** → Nhóm 2
- **Employee / Line Manager / Shift Manager** → Nhóm 3
- **Payroll Manager / Asset Manager** → Nhóm 4
- **Performance Manager / Line Manager** → Nhóm 5
- **HR Admin / Line Manager** → Nhóm 6
- **HR General Manager + các HR Manager** → Nhóm 7
- **System Admin** → Nhóm 8

**Include/Extend:** AI Screening CV (UC-2.2); tích hợp sinh trắc học (UC-3.1); đồng bộ Calendar (UC-2.3)

---

## SLIDE 7 - DỰ TOÁN CHI PHÍ

# DỰ TOÁN CHI PHÍ

---

## SLIDE 8 - CƠ SỞ PHƯƠNG PHÁP LUẬN (UCP & FPA)


|                        | **UCP**                               | **FPA**                                        |
| ---------------------- | ------------------------------------- | ---------------------------------------------- |
| **Căn cứ**             | Quy định **671/QĐ-BTTTT** (26/4/2024) | Chuẩn **IFPUG**                                |
| **Đơn vị đo**          | Use Case Point                        | Function Point                                 |
| **Công thức cốt lõi**  | `UCP = UUCP × TCF × ECF`              | `FP = UFP × VAF`                               |
| **UUCP/UFP**           | TAW (52) + TBF (255) = **307**        | ILF + EIF + EI + EO + EQ = **434 → 552,45 FP** |
| **Hệ số điều chỉnh**   | TCF = 1,18; EF = 0,62                 | VAF = 1,27                                     |
| **Định mức năng suất** | 22,73 giờ/UCP (Nhà nước)              | 10 person-days/FP (thương mại)                 |
| **Đơn giá**            | 35 triệu VNĐ/PM (in-house)            | $6.000/PM (fully-loaded)                       |
| **Mô hình triển khai** | Đội ngũ **in-house** tinh gọn         | Đội ngũ **enterprise** thuê ngoài              |


---

## SLIDE 9 - CÁN CÂN SO SÁNH UCP VS FPA

**Gợi ý hình:** cán cân nghiêng về phía FPA (ngân sách cao hơn ~30 lần)


| Chỉ số     | **UCP (In-house)**    | **FPA (Thương mại)**                   |
| ---------- | --------------------- | -------------------------------------- |
| Quy mô     | **224,6 UCP**         | **552,45 FP**                          |
| Nhân sự    | **5 người**           | **25 người**                           |
| Thời gian  | **6 tháng**           | **10 tháng**                           |
| Ngân sách  | **1.290.300.000 VNĐ** | **≈ 39.173.160.000 VNĐ** (~$1.506.660) |
| Chênh lệch | —                     | **≈ 30,36 lần**                        |


**Thông điệp cán cân:** cùng một HRIS, nhưng FPA phản ánh quy mô dữ liệu sâu hơn (2,46×) và chi phí thương mại cao hơn rất nhiều do đơn giá fully-loaded và đội ngũ lớn.

---

## SLIDE 10 - BÓC TÁCH DÒNG TIỀN (UCP VS FPA)


| Hạng mục                    | **UCP**                                  | **FPA**                               |
| --------------------------- | ---------------------------------------- | ------------------------------------- |
| **Lương nhân sự**           | 1.015.000.000 VNĐ (29 PM × 35 tr)        | ≈ 21.545.238.000 VNĐ (55% × 39,17 tỷ) |
| **Hạ tầng & công cụ AI**    | 78.000.000 VNĐ (Server 48 tr + AI 30 tr) | ≈ 7.834.632.000 VNĐ (20% overhead)    |
| **Chi phí dự phòng rủi ro** | 117.300.000 VNĐ (10% contingency)        | ≈ 5.875.974.000 VNĐ (15% risk buffer) |
| **TỔNG**                    | **1.290.300.000 VNĐ**                    | **≈ 39.173.160.000 VNĐ**              |


*FPA: các khoản QA (10%) và lợi nhuận nhà thầu đã gói trong $6.000/PM fully-loaded.*

---

## SLIDE 11 - KẾT LUẬN SO SÁNH CHI PHÍ 2 PHƯƠNG PHÁP

**Nguyên nhân chênh lệch lớn:**

- UCP đo theo **kịch bản nghiệp vụ** → dễ đánh giá thấp độ phức tạp ngầm (payroll ACID, concurrency)
- FPA bóc tách **cấu trúc dữ liệu** (8 ILF, 3 EIF, EI/EO/EQ) → quy mô FP cao hơn 2,46 lần
- Đơn giá FPA ($6.000/PM) đã bao gồm overhead, QA, risk buffer, lợi nhuận

**Đề xuất của nhóm:**

- **Triển khai:** UCP In-house — **1,29 tỷ VNĐ**, 5 kỹ sư, 6 tháng, sở hữu 100% mã nguồn
- **Kiểm soát chất lượng:** dùng **FPA làm thước đo tham chiếu** (552,45 FP) để không bỏ sót rủi ro kỹ thuật
- Tiết kiệm ~600 triệu so với dự toán 671 đầy đủ (1,95 tỷ) nhờ tự xây dựng, không qua nhà thầu

---

## SLIDE 12 - ĐỘ NHẠY: GIẢM 20% NHÂN SỰ


| Chỉ số       | **UCP (5→4 người)**              | **FPA (25→20 người)**    |
| ------------ | -------------------------------- | ------------------------ |
| Thời gian    | 6 → **7 tháng**                  | 10 → **12,76 tháng**     |
| Nỗ lực (PM)  | 29 (không đổi)                   | 251,11 (không đổi)       |
| Lương        | 1,015 tỷ (không đổi)             | 39,17 tỷ (không đổi)     |
| Hạ tầng + AI | 78 tr → **83 tr** (+13 tr/tháng) | Đã bao gồm               |
| **Tổng**     | **1,303 tỷ** (+13 tr)            | **39,17 tỷ** (không đổi) |


**Nhận xét:** UCP tự gánh chi phí vận hành theo tháng → giảm nhân sự = kéo dài dự án = **tăng chi phí ẩn**.

---

## SLIDE 13 - ĐỘ NHẠY: TĂNG 20% NHÂN SỰ


| Chỉ số       | **UCP (5→6 người)**              | **FPA (25→30 người)**    |
| ------------ | -------------------------------- | ------------------------ |
| Thời gian    | 6 → **4,5–5 tháng**              | 10 → **8,5 tháng**       |
| Nỗ lực (PM)  | 29 (không đổi)                   | 251,11 (không đổi)       |
| Lương        | 1,015 tỷ (không đổi)             | 39,17 tỷ (không đổi)     |
| Hạ tầng + AI | 78 tr → **65 tr** (−13 tr/tháng) | Đã bao gồm               |
| **Tổng**     | **1,277 tỷ** (−13 tr)            | **39,17 tỷ** (không đổi) |


**Nhận xét:** UCP tăng nhẹ nhân sự → rút ngắn 1 tháng → **tiết kiệm chi phí duy trì**. FPA: Brooks' Law — nhồi thêm người không tăng hiệu quả tuyến tính trên module phức tạp.

---

## SLIDE 14 - BẢNG ĐỐI CHIẾU ĐỘ NHẠY NHÂN SỰ & KẾT LUẬN


| Tiêu chí                    | Giảm 20%             | Tăng 20%                      |
| --------------------------- | -------------------- | ----------------------------- |
| **UCP — Tổng chi phí**      | ↑ 1,303 tỷ           | ↓ 1,277 tỷ                    |
| **UCP — Rủi ro tiến độ**    | Kéo dài +1 tháng     | Rút ngắn ~1 tháng             |
| **FPA — Tổng chi phí**      | Không đổi            | Không đổi                     |
| **FPA — Rủi ro chất lượng** | Kéo dài → rủi ro UAT | Brooks' Law → giảm chất lượng |


**Kết luận:**

- **UCP In-house:** nên **duy trì hoặc tăng nhẹ** nhân sự (+20%) để tối ưu cả tiến độ lẫn chi phí vận hành
- **FPA Thuê ngoài:** ngân sách an toàn, nhưng cần **SLA chặt** về chất lượng và tiến độ; giám sát nhà thầu không tăng/giảm người tùy tiện

---

## SLIDE 15 - ĐỘ NHẠY: GENAI 50%


| Chỉ số               | **UCP**                     | **FPA**                         |
| -------------------- | --------------------------- | ------------------------------- |
| Giảm nỗ lực          | **−31,5%** (29 → 19,865 PM) | Nội bộ nhà thầu: ~172 PM        |
| Lương                | 1,015 tỷ → **695,3 tr**     | **39,17 tỷ (không đổi)**        |
| Công cụ AI           | 30 tr → **60 tr**           | Nhà thầu tự chi                 |
| **Tổng**             | **1,000,6 tỷ**              | **39,17 tỷ**                    |
| **Lợi ích ròng UCP** | **Tiết kiệm ~289,7 triệu**  | Bàn giao sớm: 10 → **~7 tháng** |


---

## SLIDE 16 - ĐỘ NHẠY: GENAI 80%


| Chỉ số               | **UCP**                     | **FPA**                         |
| -------------------- | --------------------------- | ------------------------------- |
| Giảm nỗ lực          | **−60,5%** (29 → 11,455 PM) | Nội bộ nhà thầu: ~99 PM         |
| Lương                | 1,015 tỷ → **400,9 tr**     | **39,17 tỷ (không đổi)**        |
| Công cụ AI           | 30 tr → **105 tr**          | Nhà thầu tự chi                 |
| **Tổng**             | **751,2 tr**                | **39,17 tỷ**                    |
| **Lợi ích ròng UCP** | **Tiết kiệm ~539 triệu**    | Bàn giao sớm: 10 → **~5 tháng** |


**Điểm mạnh GenAI 80%:** Frontend (−80%), Testing (−70%), Backend (−60%)

---

## SLIDE 17 - BẢNG ĐỐI CHIẾU GENAI & KẾT LUẬN


| Tiêu chí                | **UCP In-house**                 | **FPA Thuê ngoài**       |
| ----------------------- | -------------------------------- | ------------------------ |
| Biến động ngân sách     | **Giảm mạnh** (1,29 tỷ → 751 tr) | **Không đổi**            |
| Ai hưởng lợi tài chính? | **Doanh nghiệp**                 | **Nhà thầu**             |
| Chi phí AI              | Doanh nghiệp tự trả thêm         | Đã gói trong giá         |
| Lợi ích khách hàng      | Tiết kiệm tiền mặt               | Time-to-market nhanh hơn |


**Kết luận:** GenAI tạo **bất đối xứng tài chính** — UCP + GenAI 80% là phương án tối ưu: sở hữu mã nguồn, bảo mật dữ liệu nhạy cảm, ngân sách < 1 tỷ VNĐ. Nếu thuê ngoài: dùng GenAI làm **vũ khí đàm phán** (ép giảm giá hoặc tăng scope).

---

## SLIDE 18 - LẬP KẾ HOẠCH DỰ ÁN

# LẬP KẾ HOẠCH DỰ ÁN

---

## SLIDE 19 - SCRUM: LÝ DO CHỌN, ƯU/NHƯỢC & KHẮC PHỤC (1/2)

**Lý do chọn Scrum (thay Waterfall/RUP):**

- 8 nhóm nghiệp vụ, 21 UC — phát triển theo **increment**
- Yêu cầu HR **dễ thay đổi** (phễu tuyển dụng, chính sách phép, onboarding...)
- Nhiều stakeholder cần **phản hồi liên tục** qua Sprint Review
- Hybrid: giữ tài liệu PM (UCP, FPA, WBS, Risk) + thực thi **Scrum 12 Sprint × 2 tuần**

**Ưu điểm:** phản hồi sớm · linh hoạt thay đổi · Increment chạy được mỗi Sprint · giảm rủi ro tích hợp muộn

---

## SLIDE 20 - SCRUM: ƯU/NHƯỢC & KHẮC PHỤC (2/2)


| Nhược điểm              | Biện pháp khắc phục                                                       |
| ----------------------- | ------------------------------------------------------------------------- |
| Scope creep             | PO ưu tiên backlog; giới hạn scope Sprint Planning; Definition of Done rõ |
| Thiếu tài liệu kỹ thuật | Test Report mỗi Sprint; duy trì Architecture & Design Document            |
| Ước lượng không ổn định | UCP/FPA làm baseline; Gantt Chart cập nhật sau mỗi Sprint                 |
| Phụ thuộc PO/SM         | Phân công rõ; EM kiêm SM đảm bảo Daily Scrum & Retrospective              |
| Rủi ro tích hợp module  | Integration Sprint; CI/CD; test tự động NFR                               |


---

## SLIDE 21 - CƠ CẤU NHÂN SỰ & TRAINING PLAN

**Đội ngũ in-house (5 kỹ sư FT + PO):**


| Vai trò                 | Số lượng | Trách nhiệm chính                      |
| ----------------------- | -------- | -------------------------------------- |
| Product Owner           | 1        | Định hướng backlog, nghiệp vụ HR       |
| Engineering Manager     | 1        | Kiến trúc, kiêm SM & Tech Lead         |
| Full-stack AI Engineers | 3        | Dev FE/BE với GenAI                    |
| QA Engineer             | 1        | Test tự động, CI/CD, load test 500 CCU |


**Training Plan (Sprint 2 — tuần 3–4, tháng 1):**

- **Kỹ năng:** Cursor IDE, GitHub Copilot, Prompt Engineering (Claude 3.5, GPT-4o)
- **Điều kiện:** CI/CD + DB lõi + RBAC đã xong; GenAI tích hợp IDE
- **Phương pháp:** On-the-job + Cross-training
- **Mục tiêu:** Sẵn sàng phát triển Core Backend từ Sprint 3

---

## SLIDE 22 - WBS: 5 GIAI ĐOẠN


| Giai đoạn                   | Sprint        | Mục tiêu chính                                          |
| --------------------------- | ------------- | ------------------------------------------------------- |
| **1. Khởi tạo & Kiến trúc** | S1–S2 (T1)    | DB ACID, CI/CD, RBAC, tích hợp GenAI IDE                |
| **2. Core Backend & APIs**  | S3–S6 (T2–T3) | Hồ sơ NS, chấm công, tính lương/OT, tuyển dụng, AES-256 |
| **3. UI/UX Frontend**       | S7–S8 (T4)    | Web responsive, Dashboard realtime, Kanban tuyển dụng   |
| **4. Load test & Pen-test** | S9–S10 (T5)   | Ép tải 500 CCU, quét XSS/SQLi, fix Critical/High        |
| **5. UAT & Go-live**        | S11–S12 (T6)  | UAT với HR, User Manual, deploy Production              |


**Tổng:** 6 tháng · 12 Sprint · 29 Person-Month

---

## SLIDE 23 - CRITICAL PATH

**Đường găng (màu đỏ):**

`(1.1) DB ACID` → `(2.1) Backend Core` → `(4.1) Load test 500 CCU` + `(4.2) Pen-test` → `(5.1) UAT`

**Tại sao là đường găng?**

- Database phải xong trước mọi thuật toán backend (payroll ACID)
- Backend hoàn chỉnh mới load test & pen-test được
- Vượt load test/pen-test mới UAT & nghiệm thu

**Công việc song song (màu xanh — có float):**

RBAC (1.2) · UI/UX (3.1–3.2) · AES-256 (2.2) · Đóng gói tài liệu (5.2)

**Kiểm soát:** trễ S1/S3/S9/S11 → kích hoạt **leo thang**; tăng GenAI token nếu Backend chậm

**Ý tưởng trình bày:** chèn sơ đồ Critical Path từ báo cáo (hình chữ nhật đỏ = đường găng, xanh = float).

---

## SLIDE 24 - STAKEHOLDER MANAGEMENT

**Ma trận Power/Interest (4 nhóm):**


| Nhóm               | Stakeholder                                              | Chiến lược                                            |
| ------------------ | -------------------------------------------------------- | ----------------------------------------------------- |
| **Manage Closely** | PO, HR General Manager, EM/SM                            | Daily Scrum, Sprint Review mỗi Sprint                 |
| **Keep Satisfied** | BOD, System Admin                                        | Executive Summary hàng tháng; báo cáo kỹ thuật S9–S10 |
| **Keep Informed**  | HR Admin, 5 HR Manager, Line Manager, Recruiter, Dev, QA | Backlog Refinement, demo Sprint Review, email/Jira    |
| **Monitor**        | Employee, Interviewer                                    | User Manual, FAQ tại UAT & Go-live                    |


---

## SLIDE 25 - GIÁM SÁT HIỆU SUẤT

**Khung EVM (Earned Value Management):**

- **BAC:** 1.290.300.000 VNĐ · **PV/Sprint:** ≈ 107,5 triệu VNĐ
- **SPI** = EV ÷ PV · **CPI** = EV ÷ AC

**Ngưỡng cảnh báo:**


| Mức     | Điều kiện                  | Hành động                 |
| ------- | -------------------------- | ------------------------- |
| 🟢 Xanh | SPI & CPI ≥ 0,9            | Tiếp tục kế hoạch         |
| 🟡 Vàng | SPI hoặc CPI < 0,9 (≥ 0,8) | Thảo luận Daily Scrum     |
| 🔴 Đỏ   | SPI hoặc CPI < 0,8         | Khắc phục + **leo thang** |


**KPI bổ sung:** Velocity · Defect rate & MTTR (Critical ≤24h, Major ≤72h) · Story Points Done/Sprint

**Báo cáo:** Sprint Status Report (cuối Sprint) → PO & HR GM; Executive Summary (hàng tháng) → BOD

---

## SLIDE 26 - QUY TRÌNH LEO THANG SỰ CỐ


| Cấp   | Vai trò            | Điều kiện kích hoạt                                               | Hành động                                   |
| ----- | ------------------ | ----------------------------------------------------------------- | ------------------------------------------- |
| **1** | Dev + EM           | SPI/CPI < 0,9; Critical defect >24h; blocker ≤3 ngày              | Daily Scrum, phân bổ lại task, tháo blocker |
| **2** | PO + EM            | 2 Sprint liên tiếp SPI < 0,8; thay đổi ≥3 US; blocker API >3 ngày | Sprint Review đặc biệt, điều chỉnh backlog  |
| **3** | HR General Manager | Critical Path trễ (S1/S3–4/S9/S11); downtime > NFR                | Giảm scope, bổ sung nhân sự/GenAI token     |
| **4** | BOD                | Vượt BAC; Go-live trễ >2 tuần                                     | Phê duyệt điều chỉnh ngân sách/dự phòng 10% |


**Thời gian phản hồi:** Cấp 1 — 4h · Cấp 2 — 24h · Cấp 3–4 — 48h

---

## SLIDE 27 - QUẢN TRỊ RỦI RO

**Phương pháp:** Avoid · Mitigate · Transfer · Accept — Ma trận **Xác suất × Ảnh hưởng**

**Top rủi ro Priority 1:**


| #   | Rủi ro                                                       | Chiến lược                                                   |
| --- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| R1  | Thiếu kinh nghiệm GenAI sàng lọc CV                          | Training S2, POC trước S5, fallback thủ công, ngưỡng ≥80%    |
| R2  | Tích hợp chéo chấm công–lương–tài sản                        | Integration test S4–6, ACID + lock ordering, regression test |
| R3  | API bên thứ ba không ổn định (LinkedIn, sinh trắc, Calendar) | Mock API, retry 3 lần, circuit breaker, nhập liệu thủ công   |


**Chu kỳ rà soát:** cập nhật Risk Register cuối mỗi Sprint; Risk Review 30 phút tại Retrospective

---

## SLIDE 28 - KẾT LUẬN CHUNG

**Hệ thống:** HRIS enterprise 8 module · 21 UC · 13 actors · tham khảo Horilla, triển khai Golang custom · NFR ≥99,5%

**Chi phí:** UCP In-house **1,29 tỷ VNĐ** vs FPA thương mại **~39 tỷ VNĐ** → chọn **UCP + GenAI 80%** (còn ~751 tr), FPA làm thước đo chất lượng

**Kế hoạch:** Scrum 12 Sprint/6 tháng · 5 kỹ sư AI-native · WBS 5 giai đoạn · Critical Path: DB → Backend → Load test → UAT · EVM + leo thang 4 cấp · Risk Register chủ động

**Giá trị mang lại:** số hóa toàn vòng đời nhân sự · làm chủ mã nguồn & dữ liệu nhạy cảm · time-to-market nhanh · tối ưu ngân sách nhờ GenAI

---

## SLIDE 29 - CÁM ƠN

# CÁM ƠN THẦY VÀ CÁC BẠN ĐÃ QUAN TÂM THEO DÕI

---

## Gợi ý thiết kế & trình bày tổng thể

1. **Slide 5:** dùng heatmap 8×21 với 3 màu (Xanh = Simple, Vàng = Average, Đỏ = Complex).
2. **Slide 6 & 23:** chèn diagram từ PDF (Use Case Diagram, Critical Path).
3. **Slide 9:** vẽ cán cân — trái UCP (nhẹ), phải FPA (nặng, nghiêng mạnh).
4. **Màu chủ đạo:** xanh navy (HR/corporate) + accent cam/vàng cho cảnh báo.
5. **Thời lượng gợi ý:** ~25–30 phút (≈1 phút/slide nội dung, 2 phút cho slide số liệu).

---

## Cấu trúc mục lục slide (29 slide)


| # | Tiêu đề |
| --- | --- |
| 1 | TRANG BÌA |
| 2 | TỔNG QUAN TOÀN HỆ THỐNG |
| 3 | MÔ TẢ HỆ THỐNG |
| 4 | KIẾN TRÚC HỆ THỐNG & PHẠM VI NGHIỆP VỤ |
| 5 | MA TRẬN 8 NHÓM × 21 USE CASE |
| 6 | BIỂU ĐỒ TƯƠNG TÁC (USE-CASE DIAGRAM) |
| 7 | DỰ TOÁN CHI PHÍ |
| 8 | CƠ SỞ PHƯƠNG PHÁP LUẬN (UCP & FPA) |
| 9 | CÁN CÂN SO SÁNH UCP VS FPA |
| 10 | BÓC TÁCH DÒNG TIỀN (UCP VS FPA) |
| 11 | KẾT LUẬN SO SÁNH CHI PHÍ 2 PHƯƠNG PHÁP |
| 12 | ĐỘ NHẠY: GIẢM 20% NHÂN SỰ |
| 13 | ĐỘ NHẠY: TĂNG 20% NHÂN SỰ |
| 14 | BẢNG ĐỐI CHIẾU ĐỘ NHẠY NHÂN SỰ & KẾT LUẬN |
| 15 | ĐỘ NHẠY: GENAI 50% |
| 16 | ĐỘ NHẠY: GENAI 80% |
| 17 | BẢNG ĐỐI CHIẾU GENAI & KẾT LUẬN |
| 18 | LẬP KẾ HOẠCH DỰ ÁN |
| 19 | SCRUM: LÝ DO CHỌN, ƯU/NHƯỢC & KHẮC PHỤC (1/2) |
| 20 | SCRUM: ƯU/NHƯỢC & KHẮC PHỤC (2/2) |
| 21 | CƠ CẤU NHÂN SỰ & TRAINING PLAN |
| 22 | WBS: 5 GIAI ĐOẠN |
| 23 | CRITICAL PATH |
| 24 | STAKEHOLDER MANAGEMENT |
| 25 | GIÁM SÁT HIỆU SUẤT |
| 26 | QUY TRÌNH LEO THANG SỰ CỐ |
| 27 | QUẢN TRỊ RỦI RO |
| 28 | KẾT LUẬN CHUNG |
| 29 | CÁM ƠN |

