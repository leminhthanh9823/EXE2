import React from "react";

export default function MienNamHuong() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Tiêu đề bài viết */}
      <h1 className="text-2xl md:text-3xl font-bold mb-2">
        CÁCH LÀM MIẾN NẤU NẤM HƯƠNG
      </h1>

      {/* Thông tin ngày, tác giả */}
      <p className="text-sm text-gray-500 mb-4">04.08.24 / FIT MENU</p>

      {/* Ảnh chính */}
      <img
        src="https://i.ytimg.com/vi/d1UxcfkdDdA/maxresdefault.jpg"
        alt="miến nấu nấm hương"
        className="w-full h-auto rounded mb-4"
      />

      {/* Mô tả ngắn */}
      <p className="mb-4">
        Món miến nấu nấm hương này có hương vị thanh nhẹ, dễ ăn, kết hợp cùng
        rau thơm hoặc các loại rau khác tùy sở thích. Thời gian nấu nhanh, rất
        thích hợp cho bữa sáng hoặc bữa tối nhẹ nhàng.
      </p>

      {/* Nguyên liệu */}
      <h2 className="text-xl font-semibold mb-2">Nguyên liệu:</h2>
      <ul className="list-disc list-inside mb-4">
        <li>1 gói miến khô (60g)</li>
        <li>5 cây nấm hương ngâm, thái mỏng</li>
        <li>60g nấm đùi gà (nếu có)</li>
        <li>60g giò chay (cắt nhỏ)</li>
        <li>1 củ hành tím thái mỏng</li>
        <li>1 củ hành tây (nếu có)</li>
        <li>1 trái ớt (nếu thích cay)</li>
        <li>1 thìa nước mắm chay</li>
        <li>1 chút muối biển</li>
        <li>1 chút nước tương</li>
        <li>Rau thơm ăn kèm (tùy sở thích)</li>
      </ul>

      {/* Cách làm */}
      <h2 className="text-xl font-semibold mb-2">Cách làm:</h2>
      <ol className="list-decimal list-inside mb-4">
        <li>
          1. Cho một ít dầu ăn vào chảo, thêm hành tím, hành tây (nếu dùng), nấm
          hương và nấm đùi gà. Đảo đều khoảng 2 phút.
        </li>
        <li>
          2. Thêm giò chay và ớt (nếu ăn cay). Nêm 1 thìa nước mắm chay, 1 chút
          muối, nước tương rồi tiếp tục đảo thêm 2-3 phút.
        </li>
        <li>
          3. Đổ khoảng 2 bát nước (hoặc nước dùng) vào nồi, đun sôi. Cho miến
          khô vào nấu đến khi miến mềm (khoảng 3-5 phút), nêm nếm lại cho vừa
          miệng.
        </li>
        <li>
          4. Tắt bếp, múc miến ra tô. Thêm rau thơm ăn kèm nếu muốn, dùng nóng.
        </li>
      </ol>

      {/* Video hướng dẫn */}
      <h2 className="text-xl font-semibold mb-2">
        Video hướng dẫn cách làm tham khảo:
      </h2>
      <div className="mb-4">
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/d1UxcfkdDdA"
          title="Hướng dẫn miến nấu nấm hương"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Ghi chú cuối */}
    </div>
  );
}
