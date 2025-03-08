import React from "react";

export default function CanhChua() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Tiêu đề bài viết */}
      <h1 className="text-2xl md:text-3xl font-bold mb-2">
        CANH CHUA GIÒ CHAY VỊ NẤM ĐƯA CƠM
      </h1>

      {/* Thông tin ngày, tác giả */}
      <p className="text-sm text-gray-500 mb-4">
        04.08.24 / ROLIE Việt Nam / bình luận
      </p>

      {/* Ảnh chính */}
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgTc3Wx1PdxViBJ8yDkJYDLHr7TSMcBB1pZg&s"
        alt="canh chua giò chay"
        className="w-full h-auto rounded mb-4"
      />

      {/* Mô tả ngắn */}
      <p className="mb-4">
        Món canh chua giò chay vị nấm thơm ngon ăn kèm với cơm hay bún đều ngon,
        cách chế biến đơn giản không mất thời gian vào bếp. Cả nhà cùng làm
        thưởng thức nhé!
      </p>

      {/* Nguyên liệu */}
      <h2 className="text-xl font-semibold mb-2">Nguyên liệu:</h2>
      <ul className="list-disc list-inside mb-4">
        <li>2 - 3 quả sấu hoặc 1 thìa me chua</li>
        <li>100g cà chua, cắt lát</li>
        <li>1 quả ớt sừng nhỏ (nếu thích vị cay)</li>
        <li>1 củ hành tím thái mỏng</li>
        <li>60g giò chay (cắt nhỏ)</li>
        <li>60g nấm rơm (nếu có)</li>
        <li>1 thìa đường (có thể thay thế)</li>
        <li>1 thìa rau sống ăn kèm</li>
        <li>1 chút rong biển (tuỳ chọn)</li>
      </ul>

      {/* Cách làm */}
      <h2 className="text-xl font-semibold mb-2">Cách làm:</h2>
      <ol className="list-decimal list-inside mb-4">
        <li>Cho một thìa nước sau đó cho hành, ớt vào đảo đều.</li>
        <li>
          Thêm cà chua, sấu hoặc me, 60g nấm, 60g giò chay, 1 thìa nước mắm
          chay, đun lửa đều trong khoảng 2 phút.
        </li>
        <li>
          Thêm nước dùng (hoặc nước lọc) vào nồi canh. Đun khoảng 5 phút nêm nếm
          gia vị vừa ăn.
        </li>
        <li>
          Múc canh ra bát trang trí rau thì là, hành lá kèm rau sống ăn kèm nếu
          thích.
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
          src="https://www.youtube.com/embed/z0O6hcXTBm4"
          title="Hướng dẫn canh chua giò chay"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Ghi chú cuối */}
      <p className="text-gray-600">
        Đây là ví dụ nội dung chi tiết cho bài viết về canh chua giò chay. Bạn
        có thể tuỳ chỉnh lại hình ảnh, nguyên liệu, video, hoặc thông tin khác
        theo nhu cầu thực tế.
      </p>
    </div>
  );
}
