import React from "react";

export default function DauMiso() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Tiêu đề bài viết */}
      <h1 className="text-2xl md:text-3xl font-bold mb-2">
        ĐẬU PHỤ XỐT CAM TƯƠI VÀ TƯƠNG MISO
      </h1>

      {/* Thông tin ngày, tác giả */}
      <p className="text-sm text-gray-500 mb-4">04.08.24 / FIT MENU</p>

      {/* Ảnh chính */}
      <img
        src="https://file.hstatic.net/1000337345/article/dau_phu_sot_7e279703ca264608864be53244dd618a_1024x1024.png"
        alt="daumiso"
        className="w-full h-auto rounded mb-4"
      />

      {/* Mô tả ngắn */}
      <p className="mb-4">
        Cam xoàn đã về, ăn cam tươi chần chế rồi thì mình thử làm món đậu phụ
        xốt cam tươi và tương miso này nhé! Vị cam chua ngọt tươi mát hòa quyện
        với miso sẽ làm món ăn trở nên vô cùng hấp dẫn.
      </p>

      {/* Nguyên liệu */}
      <h2 className="text-xl font-semibold mb-2">Nguyên liệu:</h2>
      <ul className="list-disc list-inside mb-4">
        <li>1 thìa canh tương miso</li>
        <li>1 quả cam (vắt lấy nước, có thể dùng cam xoàn hoặc cam ngọt)</li>
        <li>2 thìa cà phê nước lọc</li>
        <li>450g đậu phụ (cắt miếng vừa ăn)</li>
        <li>1 thìa canh đường (có thể gia giảm theo độ chua/ngọt của cam)</li>
        <li>1 thìa canh nước mắm chay (hoặc nước tương)</li>
      </ul>

      {/* Cách làm */}
      <h2 className="text-xl font-semibold mb-2">Cách làm:</h2>
      <ol className="list-decimal list-inside mb-4">
        <li>
          1. Lấy một chiếc bát nhỏ, cho tương miso, nước cam, đường, nước mắm
          chay (hoặc nước tương) và 2 thìa cà phê nước lọc vào, khuấy đều để tạo
          thành hỗn hợp xốt.
        </li>
        <li>
          2. Cho đậu phụ vào ngâm cùng hỗn hợp xốt này (nếu có thời gian, ướp
          khoảng 15–20 phút để thấm vị).
        </li>
        <li>
          3. Chiên hoặc áp chảo đậu phụ đến khi vàng đều các mặt. Sau đó, thêm
          phần xốt còn lại vào chảo.
        </li>
        <li>
          4. Đun nhỏ lửa cho đến khi xốt sệt lại và thấm vào đậu phụ, nếm lại
          cho vừa ăn rồi tắt bếp.
        </li>
        <li>
          5. Dọn đậu phụ xốt cam ra đĩa, dùng nóng. Bạn có thể ăn kèm cơm trắng
          hoặc rau sống tùy thích.
        </li>
      </ol>

      {/* Video hướng dẫn */}
    </div>
  );
}
