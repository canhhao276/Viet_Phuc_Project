# **PHÂN CÔNG CÔNG VIỆC NHÓM 2 NGƯỜI**

## **Dự án: Việt Phục Remix**

---

## **2\. Thành viên 1: Phụ trách giao diện, trải nghiệm và avatar 3D**

### **2.1. Vai trò chính**

* Thiết kế luồng trải nghiệm người dùng.  
* Làm giao diện web/app demo.  
* Xây dựng khu vực avatar mô phỏng 3D.  
* Hiển thị kết quả phối đồ theo dạng trực quan.  
* Chuẩn bị phần trình bày hình ảnh cho video demo.

### **2.2. Nhiệm vụ chi tiết**

**a) Thiết kế luồng người dùng**

* Xác định các màn hình chính:  
  * Màn hình chọn trang phục.  
  * Màn hình chọn bối cảnh/sự kiện.  
  * Màn hình chỉnh avatar.  
  * Màn hình chọn màu sắc, phụ kiện, phong cách.  
  * Màn hình hiển thị kết quả.  
* Vẽ wireframe hoặc phác thảo bố cục giao diện trước khi code.

**b) Xây dựng giao diện demo**

* Tạo layout tổng thể cho ứng dụng.  
* Làm các thành phần tương tác như:  
  * dropdown,  
  * nút chọn,  
  * thanh slider,  
  * thẻ outfit,  
  * khu vực hiển thị ảnh/mockup,  
  * phần mô tả ngắn.  
* Đảm bảo giao diện dễ nhìn, hiện đại, phù hợp tinh thần Gen Z nhưng vẫn giữ nét văn hóa.

**c) Xây dựng avatar mô phỏng 3D**

* Tạo khu vực hiển thị nhân vật 3D giống kiểu game.  
* Làm các thanh chỉnh cơ thể cơ bản:  
  * chiều cao,  
  * vai,  
  * ngực,  
  * eo,  
  * hông,  
  * chiều dài thân trên,  
  * chiều dài thân dưới.  
* Cho phép xoay 360 độ, zoom và đổi góc nhìn.  
* Hiển thị outfit lên avatar để người dùng quan sát trực tiếp.

**d) Hiển thị kết quả đầu ra**

* Làm khu vực hiển thị:  
  * tên outfit,  
  * ảnh hoặc mockup,  
  * avatar 3D đang mặc,  
  * các món phối,  
  * mức độ phù hợp,  
  * ghi chú văn hóa ngắn.  
* Có thể thêm chức năng:  
  * so sánh 2 phương án,  
  * lưu lookbook,  
  * xem cảnh báo phối sai.

**e) Hỗ trợ demo và video**

* Chịu trách nhiệm chuẩn bị màn hình trình diễn.  
* Sắp xếp luồng demo sao cho người xem hiểu ngay từ đầu.  
* Hỗ trợ quay video giới thiệu sản phẩm.

### **2.3. Kết quả đầu ra cần bàn giao**

* Giao diện hoàn chỉnh của phần frontend.  
* Khu vực avatar 3D hoạt động được.  
* Các màn hình demo chính.  
* Mockup hoặc ảnh minh họa outfit.  
* Phiên bản dùng được cho video giới thiệu.

---

## **3\. Thành viên 2: Phụ trách nội dung văn hóa, logic phối và Gemini**

### **3.1. Vai trò chính**

* Xây dựng bộ dữ liệu kiến thức nền về Việt phục.  
* Viết prompt cho Gemini.  
* Thiết kế logic phối đồ.  
* Kiểm tra tính phù hợp văn hóa của kết quả.  
* Chuẩn bị nội dung giải thích và cảnh báo.

### **3.2. Nhiệm vụ chi tiết**

**a) Xây dựng dữ liệu văn hóa**

* Thu thập và tổng hợp thông tin về loại trang phục được chọn, ví dụ:  
  * áo dài,  
  * áo tứ thân,  
  * áo ngũ thân.  
* Chuẩn bị các mục dữ liệu:  
  * đặc điểm nhận diện,  
  * hoàn cảnh sử dụng,  
  * màu sắc phù hợp,  
  * phụ kiện phù hợp,  
  * điều nên tránh.  
* Viết nội dung ngắn gọn, dễ hiểu để đưa vào hệ thống.

**b) Thiết kế logic phối đồ**

* Xác định quy tắc cơ bản:  
  * sự kiện nào hợp với loại trang phục nào,  
  * màu nào phù hợp với bối cảnh nào,  
  * phụ kiện nào đi kèm hợp lý,  
  * kiểu avatar nào phù hợp để thử bộ phối đó.  
* Tạo bộ rule để lọc lựa chọn trước khi đưa vào Gemini.  
* Kiểm tra kết quả phối có giữ đúng đặc trưng văn hóa hay không.

**c) Viết prompt cho Gemini**

* Viết prompt theo cấu trúc cố định.  
* Ép Gemini trả kết quả rõ ràng, ngắn gọn, có format nhất quán.  
* Yêu cầu Gemini sinh:  
  * tên outfit,  
  * danh sách món phối,  
  * lý do phù hợp,  
  * thông tin ý nghĩa văn hóa,  
  * cảnh báo nếu có sai lệch.  
* Test prompt với nhiều trường hợp khác nhau.

**d) Kiểm thử và tinh chỉnh**

* Kiểm tra Gemini với các tình huống:  
  * đi học,  
  * chụp ảnh,  
  * Tết,  
  * lễ hội,  
  * phối quá hiện đại,  
  * phối màu không hợp.  
* Ghi lại các lỗi sinh ra để sửa prompt hoặc sửa rule.  
* Chuẩn bị phần giải thích cho báo cáo và trình bày.

### **3.3. Kết quả đầu ra cần bàn giao**

* Bộ dữ liệu văn hóa ngắn.  
* Bộ rule phối đồ cơ bản.  
* Prompt Gemini đã tối ưu.  
* Nội dung mô tả outfit và cảnh báo văn hóa.  
* Ghi chú test case và kết quả kiểm thử.

---

## **4\. Phần làm chung của cả hai người**

### **4.1. Chốt phạm vi sản phẩm**

Cả hai cùng thống nhất:

* Chỉ chọn 1 nhóm trang phục chính.  
* Chỉ làm 3 đến 5 bối cảnh.  
* Chỉ tập trung vào các tính năng đủ cho demo.  
* Chỉ làm avatar 3D ở mức vừa đủ để demo rõ, không làm quá nặng.

### **4.2. Kiểm thử cuối**

* Người 1 kiểm tra giao diện và avatar.  
* Người 2 kiểm tra nội dung và logic.  
* Cùng sửa lỗi khi kết quả hiển thị chưa hợp lý.

### **4.3. Làm báo cáo và nộp bài**

* Cùng viết nội dung mô tả giải pháp.  
* Cùng chuẩn bị video giới thiệu.  
* Cùng kiểm tra các đường link:  
  * demo,  
  * repo,  
  * video,  
  * cuộc trò chuyện Gemini.

---

## **5\. Phân chia theo giai đoạn**

### **Giai đoạn 1: Lên ý tưởng và chốt phạm vi**

* Thành viên 1: phác thảo UI, luồng người dùng, vị trí avatar 3D.  
* Thành viên 2: chọn dữ liệu văn hóa, xác định rule phối.

### **Giai đoạn 2: Làm bản nháp**

* Thành viên 1: dựng frontend cơ bản và khung avatar.  
* Thành viên 2: viết prompt, chuẩn bị nội dung gợi ý.

### **Giai đoạn 3: Tích hợp**

* Thành viên 1: gắn dữ liệu đầu ra lên giao diện, xử lý xoay 3D và slider.  
* Thành viên 2: test Gemini, sửa logic và prompt.

### **Giai đoạn 4: Hoàn thiện**

* Thành viên 1: chỉnh UI, tối ưu trải nghiệm demo.  
* Thành viên 2: chuẩn hóa nội dung, viết cảnh báo và mô tả văn hóa.  
* Cả hai: quay video, hoàn thiện repo và file nộp.

---

## **6\. Gợi ý ưu tiên khi làm**

Nếu thời gian hạn chế, nên ưu tiên theo thứ tự:

1. Giao diện chọn trang phục và bối cảnh.  
2. Avatar 3D cơ bản với xoay và vài thanh chỉnh.  
3. Logic phối đồ và hiển thị outfit.  
4. Gemini sinh mô tả và cảnh báo.  
5. Lookbook và chức năng nâng cao.

## **7\. Kết luận**

Cách chia này giúp nhóm 2 người làm song song mà vẫn đồng bộ. Một người tập trung vào **trải nghiệm, giao diện và avatar 3D**, người còn lại tập trung vào **nội dung văn hóa, Gemini và logic phối**. Như vậy sản phẩm vừa có tính thẩm mỹ, vừa có chiều sâu nội dung, đủ mạnh để làm demo và thuyết trình trước hội đồng.

