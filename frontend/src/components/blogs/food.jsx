// src/pages/BaiViet/BaiVietCuonRauCu.js

import React from "react";

export default function Food() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">
        BÍ QUYẾT LÀM MÓN CUỐN RAU CỦ SỐT CHẤM BƠ LẠC NGON
      </h1>
      <p className="text-sm text-gray-500 mb-4">08.08.24 / FIT MENU</p>

      <img
        src="https://file.hstatic.net/1000337345/article/bqlgc_cda32ebaf1504fba93e4eafe8b8497d7_1024x1024.jpg"
        alt="rau cuon"
        className="w-full h-auto rounded mb-4"
      />

      <p className="mb-4">
        Món cuốn rau củ kiểu này có thể thêm quả bơ béo ngậy kết hợp các loại
        rau thơm chấm kèm với sốt bơ lạc ăn rất ngon. Món ăn theo ý thích của
        gia đình Emma.
      </p>

      <h2 className="text-xl font-semibold mb-2">Sốt bơ lạc chấm gỏi cuốn:</h2>
      <ul className="list-disc list-inside mb-4">
        <li>1 thìa bơ lạc</li>
        <li>1 thìa nước tương</li>
        <li>2 thìa tương ớt</li>
        <li>1 thìa nước cốt chanh</li>
        <li>1 thìa mật ong</li>
        <li>Thêm chút nước ấm để hỗn hợp bớt đặc (tùy ý)</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">Phần rau cuốn gồm:</h2>
      <ul className="list-disc list-inside mb-4">
        <li>1 cây rau xà lách</li>
        <li>1 bó rau thơm</li>
        <li>1 quả bơ cắt mỏng</li>
        <li>100g đậu phụ áp chảo</li>
        <li>1 củ cà rốt thái sợi</li>
        <li>Bánh đa cuốn theo sở thích</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">Cách làm:</h2>
      <ol className="list-decimal list-inside mb-4">
        <li>
          Nếu bạn ăn bánh đa thì cuốn tất cả các loại rau và bơ vào bánh sau đó
          chấm với sốt bơ lạc.
        </li>
        <li>
          Không ăn bánh thì xà lách cuốn với rau củ bên trong cũng rất ngon.
        </li>
      </ol>

      <h2 className="text-xl font-semibold mb-2">Video cách làm tham khảo:</h2>
      <div className="mb-4">
        {/* Ví dụ nhúng video YouTube */}
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/lPCMhinUGkE"
          title="Hướng dẫn cuốn rau củ"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
