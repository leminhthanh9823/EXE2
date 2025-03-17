import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import WorkArea from "../../components/section/home/WorkArea/WorkArea";

export default function Home() {

  // Sử dụng state để lưu danh mục hiện tại: "food" hoặc "training"
  const [category, setCategory] = useState("food");

  // Dữ liệu cho danh mục "Món ăn"
  const foodData = {
    main: {
      image:
        "https://file.hstatic.net/1000337345/article/bqlgc_cda32ebaf1504fba93e4eafe8b8497d7_1024x1024.jpg",
      title: "BÍ QUYẾT LÀM MÓN CUỐN RAU CỦ SỐT CHẤM BƠ LẠC",
      link: "/food-blog",
    },
    secondary: [
      {
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgTc3Wx1PdxViBJ8yDkJYDLHr7TSMcBB1pZg&s",
        title: "CANH CHUA GIÒ CHAY VỊ NẤM ĐƯA CƠM",
        date: "04.08.24 / FIT MENU",
        link: "/canh-chua",
      },
      {
        image:
          "https://file.hstatic.net/1000337345/file/cdptryakiempk_a3bfa42793a7401eaeac8a701a76e9af_grande.jpg",
        title: "CƠM ĐẬU PHỤ SỐT TERIYAKI",
        date: "04.08.24 / FIT MENU",
        link: "/teriyaki",
      },
      {
        image: "https://i.ytimg.com/vi/d1UxcfkdDdA/maxresdefault.jpg",
        title: "CÁCH LÀM MIẾN NẤU NẤM HƯƠNG",
        date: "04.08.24 / FIT MENU",
        link: "/mien-nam",
      },
      {
        image:
          "https://file.hstatic.net/1000337345/article/dau_phu_sot_7e279703ca264608864be53244dd618a_1024x1024.png",
        title: "ĐẬU PHỤ XỐT CAM TƯƠI VÀ TƯƠNG MISO",
        date: "04.08.24 / FIT MENU",
        link: "/dau-phu",
      },
    ],
  };

  // Dữ liệu cho danh mục "Tập luyện"
  const trainingData = {
    main: {
      image:
        "https://login.medlatec.vn//ImagePath/images/20201212/20201212_cac-bai-tap-bung-cho-nam-gym.jpg",
      title: "BÀI TẬP GIẢM MỠ BỤNG",
      link: "/practice",
    },
    secondary: [
      {
        image:
          "https://www.33fuel.com/cdn/shop/articles/33fuel_common_endurance_training_mistakes_-_consistent_training.jpg?v=1597395522",
        title: "Tập luyện khi nắng nóng thế nào để tránh sốc nhiệt",
        date: "06.09.24 / FIT MENU",
        link: "/practice1",
      },
      {
        image:
          "https://thumbs.dreamstime.com/b/two-people-jogging-fitness-running-road-38215045.jpg",
        title: "Tập thể dục thời điểm nào tốt nhất cho cơ thể?",
        date: "06.09.24 / FIT MENU",
        link: "/practice2",
      },
      {
        image:
          "https://thumbs.dreamstime.com/b/runners-running-jogging-health-fitness-people-run-road-nature-couple-women-men-training-outside-53680920.jpg",
        title: "6 cách giúp giảm khó thở khi chạy bộ",
        date: "05.09.24 / FIT MENU",
        link: "/practice3",
      },
      {
        image:
          "https://media-cdn-v2.laodong.vn/storage/newsportal/2022/4/30/1040078/Chuoi.jpg",
        title:
          "Ăn chuối có giảm cân không? Cách sử dụng chuối trong chế độ ăn hàng ngày",
        date: "05.09.24 / FIT MENU",
        link: "practice4",
      },
    ],
  };

  // Chọn dữ liệu dựa trên danh mục hiện tại
  const currentData = category === "food" ? foodData : trainingData;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header, WorkArea */}
      <div className="w-full m-auto">
      </div>
      <WorkArea />

      {/* Nội dung chính */}
      <div className="min-h-screen p-4 bg-gray-50">
        {/* Tiêu đề chung */}
        <h1 className="text-center text-3xl md:text-4xl font-bold mb-8">
          KIẾN THỨC EAT CLEAN
        </h1>

        {/* Nút danh mục */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setCategory("food")}
            className={`px-4 py-2 rounded ${
              category === "food"
                ? "bg-red-500 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
          >
            MÓN ĂN
          </button>
          <button
            onClick={() => setCategory("training")}
            className={`px-4 py-2 rounded ${
              category === "training"
                ? "bg-neutral-700 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
          >
            TẬP LUYỆN
          </button>
        </div>

        

        {/* Bố cục 2 cột */}
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-4">
          {/* Cột trái: bài viết chính */}
          <div className="w-full md:w-2/3">
            <Link to={currentData.main.link}>
              <img
                src={currentData.main.image}
                alt="bài viết chính"
                className="w-full h-[400px] object-cover rounded-lg"
              />
            </Link>
            <Link to={currentData.main.link}>
              <h3 className="text-xl md:text-2xl font-bold mt-4 hover:underline">
                {currentData.main.title}
              </h3>
            </Link>
          </div>

          {/* Cột phải: danh sách bài viết phụ */}
          <div className="w-full md:w-1/3 flex flex-col gap-7">
            {currentData.secondary.map((article, index) => (
              <div className="flex gap-3" key={index}>
                {/* Thay vì img trực tiếp, ta bọc trong div w-20 h-20 */}
                <Link to={article.link}>
                  <div className="w-20 h-20 overflow-hidden rounded-lg">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>
                <Link to={article.link}>
                  <div>
                    <h4 className="font-semibold leading-tight">
                      {article.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">{article.date}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer có thể mở lại nếu cần */}
      {/* <Footer /> */}
    </div>
  );
}
