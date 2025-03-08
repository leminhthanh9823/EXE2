import React from "react";

export default function Practice() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Tiêu đề bài viết */}
      <h1 className="text-2xl md:text-3xl font-bold mb-2">
        Bài tập bụng hiệu quả trong 8 phút
      </h1>

      {/* Thông tin ngày, tác giả */}
      <p className="text-sm text-gray-500 mb-4">04.08.24 / FIT MENU</p>

      {/* Ảnh chính */}
      <img
        src="https://sohanews.sohacdn.com/thumb_w/1000/2019/5/22/4x6-1-15585039919151195292538-1558536108221938409728.png"
        alt="miến nấu nấm hương"
        className="w-full h-auto rounded mb-4"
      />
    </div>
  );
}
