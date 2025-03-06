import React from "react";

export default function Practice3() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Tiêu đề bài viết */}
      <h1 className="text-2xl md:text-3xl font-bold mb-2">
        6 CÁCH GIÚP GIẢM KHÓ THỞ KHI CHẠY BỘ
      </h1>

      {/* Thông tin ngày, tác giả */}
      <p className="text-sm text-gray-500 mb-4">02.07.23 / FIT MENU</p>

      {/* Ảnh chính (thay link ảnh phù hợp nếu muốn) */}

      {/* Giới thiệu ngắn */}
      <p className="mb-4">
        Các vấn đề liên quan đến khó thở khi chạy bộ có thể được khắc phục bằng
        cách điều chỉnh một vài thói quen. Dưới đây là 6 mẹo nhỏ bạn nên tham
        khảo để chạy bộ thoải mái hơn, giảm tình trạng hụt hơi và nâng cao hiệu
        quả tập luyện.
      </p>

      {/* Nội dung chính: 6 cách giúp giảm khó thở */}

      <ol className="list-decimal list-inside mb-4 space-y-2">
        <li>
          <strong>Khởi động đúng cách:</strong> Khởi động ít nhất 5-10 phút
          trước khi chạy để làm nóng cơ bắp, tăng lưu lượng máu và điều chỉnh
          nhịp thở. Điều này giúp cơ thể sẵn sàng cho hoạt động cường độ cao.
        </li>
        <li>
          <strong>Phân chia quãng chạy:</strong> Thay vì chạy liên tục quãng
          dài, bạn có thể chia nhỏ quãng đường, xen kẽ giữa chạy và đi bộ. Cách
          này giúp cơ thể có thời gian hồi phục, giảm tình trạng thở dốc.
        </li>
        <li>
          <strong>Duy trì đúng tư thế:</strong> Để dễ tăng cường luồng oxy trong
          cơ thể và cảm thấy thoải mái, hãy chú ý đến tư thế khi chạy. Giữ lưng
          thẳng, mắt hướng về phía trước, tránh ngả người quá mức.
        </li>
        <li>
          <strong>Thở nhịp nhàng:</strong> Hít thở sâu và đều đặn sẽ giúp phổi
          hấp thụ nhiều oxy hơn và giảm căng thẳng cho cơ thể. Hãy thử đếm nhịp
          (ví dụ: 2 bước hít vào, 2 bước thở ra) để duy trì nhịp thở ổn định.
        </li>
        <li>
          <strong>Hít thở không khí trong lành:</strong> Nếu có thể, chọn chạy ở
          nơi không khí thoáng đãng, ít khói bụi. Không khí trong lành giúp bạn
          hô hấp dễ dàng hơn, giảm nguy cơ kích ứng đường thở.
        </li>
        <li>
          <strong>Tập thói quen hít thở:</strong> Kết hợp các bài tập thở sâu,
          thiền hoặc yoga để rèn luyện phổi. Điều này sẽ giúp cơ thể dần thích
          nghi và hạn chế cảm giác khó thở khi chạy.
        </li>
      </ol>

      {/* Đoạn kết / ghi chú */}
      <p className="mb-4">
        Trên đây là chia sẻ từ FIT MENU mang tính tham khảo, khuyến khích bạn
        theo dõi sức khỏe định kỳ và tập luyện phù hợp với thể trạng. Chúc các
        bạn chạy bộ hiệu quả, cải thiện sức bền và sức khỏe!
      </p>

      {/* Video hướng dẫn (nếu có) */}
    </div>
  );
}
