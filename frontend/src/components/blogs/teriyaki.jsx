import React from "react";

export default function Teriyaki() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Tiêu đề bài viết */}
      <h1 className="text-2xl md:text-3xl font-bold mb-2">
        CƠM ĐẬU PHỤ SỐT TERIYAKI
      </h1>

      {/* Thông tin ngày, tác giả */}
      <p className="text-sm text-gray-500 mb-4">04.08.24 / FIT MENU</p>

      {/* Ảnh chính */}
      <img
        src="https://file.hstatic.net/1000337345/file/cdptryakiempk_a3bfa42793a7401eaeac8a701a76e9af_grande.jpg"
        alt="teriyaki"
        className="w-full h-auto rounded mb-4"
      />

      {/* Mô tả ngắn */}
      <p className="mb-4">
        Món cơm trộn đậu phụ súp lơ sốt teriyaki kiểu này ăn rất ngon, có vị đậm
        đà thơm của gừng.
      </p>

      {/* Nguyên liệu */}
      <h2 className="text-xl font-semibold mb-2">Nguyên liệu:</h2>
      <ul className="list-disc list-inside mb-4">
        <li>100g đậu phụ áp chảo, cắt khúc nhỏ</li>
        <li>100g súp lơ, cắt khúc</li>
        <li>80g cà rốt, thái nhỏ</li>
        <li>1 củ hành tím</li>
        <li>5 cây nấm hướng đã ngâm thái mỏng (40g)</li>
      </ul>
      <h2 className="text-xl font-semibold mb-2">Nước sốt teriyaki:</h2>
      <ul className="list-disc list-inside mb-4">
        <li>2 thìa nước tương soy sauce</li>
        <li>2 thìa mirin ( loại rượu ngọt) hoặc thay thế chút đường vàng</li>
        <li>1 chút gừng băm nhỏ ( ½ thìa nhỏ)</li>
        <li>10ml dầu vừng</li>
        <li>Cho hỗn hợp nước sốt vào bát trộn đều.</li>
      </ul>

      {/* Cách làm */}
      <h2 className="text-xl font-semibold mb-2">Cách làm:</h2>
      <ol className="list-decimal list-inside mb-4">
        <li>
          1. Đặt nồi nước lên bếp cho súp lơ và cà rốt vào hấp cách thuỷ khoảng
          2 - 3 phút. Sau đó gắp rau củ ra đĩa.
        </li>
        <li>
          2. Cho 1 thìa nước vào chảo sau đó cho hành, nấm hương vào đảo đều.
          Nếu bị khô cho thêm chút nước.
        </li>
        <li>
          3. Cho đậu phụ vào xào cùng với nấm hương và đổ 1/2 phần nước sốt, lúc
          này cho thêm 3 thìa nước vào đun cùng. Đun khoảng 7 -10 phút.
        </li>
        <li>
          4. Cho phần súp lơ, cà rốt, phần nước sốt còn lại vào đảo đều với đậu
          phụ. Đun đến khi rau củ chín sau đó tắt bếp.
        </li>
        <li>5. Cho rau củ ra đĩa ăn kèm với cơm gạo lứt sẽ rất ngon.</li>
      </ol>

      {/* Video hướng dẫn */}
      <h2 className="text-xl font-semibold mb-2">
        Video hướng dẫn cách làm tham khảo:
      </h2>
      <div className="mb-4">
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/SLRAqHNLDpU"
          title="Hướng dẫn canh chua giò chay"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Ghi chú cuối */}
    </div>
  );
}
