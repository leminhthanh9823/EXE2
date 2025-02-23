import React, { useState } from "react";
import {
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
} from "@mui/material";
import Header from "../header/header";
import { useNavigate } from "react-router-dom";

const menuList = [
  {
    name: "Thực đơn Eat Clean 3 Ngày",
    details: "Thực đơn 3 ngày giúp bạn giữ dáng và khỏe mạnh.",
    days: [
      {
        day: "Ngày 1",
        meals: [
          {
            meal: "Sáng",
            dish: "Yến mạch trộn sữa chua và hoa quả",
            recipe:
              "Ngâm yến mạch với sữa chua qua đêm, sáng thêm hoa quả cắt nhỏ.",
          },
          {
            meal: "Trưa",
            dish: "Salad ức gà",
            recipe:
              "Ức gà nướng, cắt lát và trộn với rau xà lách, cà chua, dầu oliu.",
          },
          {
            meal: "Tối",
            dish: "Cá hồi áp chảo với rau củ",
            recipe: "Cá hồi áp chảo với tiêu, muối; ăn kèm bông cải xanh hấp.",
          },
        ],
      },
      {
        day: "Ngày 2",
        meals: [
          {
            meal: "Sáng",
            dish: "Sinh tố chuối yến mạch",
            recipe: "Xay chuối, yến mạch, sữa hạnh nhân và hạt chia.",
          },
          {
            meal: "Trưa",
            dish: "Cơm gạo lứt + thịt bò xào rau củ",
            recipe: "Xào thịt bò với cà rốt, súp lơ, nêm nếm vừa ăn.",
          },
          {
            meal: "Tối",
            dish: "Súp bí đỏ",
            recipe:
              "Nấu bí đỏ với nước dùng gà, xay nhuyễn, thêm sữa tươi không đường.",
          },
        ],
      },
      {
        day: "Ngày 3",
        meals: [
          {
            meal: "Sáng",
            dish: "Bánh mì nguyên cám với bơ đậu phộng",
            recipe: "Phết bơ đậu phộng lên bánh mì nguyên cám, ăn kèm chuối.",
          },
          {
            meal: "Trưa",
            dish: "Cá thu nướng + khoai lang hấp",
            recipe:
              "Ướp cá thu với tiêu, muối, nướng vàng; ăn cùng khoai lang.",
          },
          {
            meal: "Tối",
            dish: "Salad trộn dầu oliu",
            recipe: "Xà lách, cà chua bi, bơ, dầu oliu và chanh.",
          },
        ],
      },
    ],
  },
  {
    name: "Thực đơn Keto 7 Ngày",
    details:
      "Thực đơn 7 ngày theo chế độ Keto giúp giảm cân hiệu quả bằng cách giảm lượng carbohydrate. Phương pháp này thúc đẩy quá trình giảm cân nhanh chóng và ổn định đường huyết. Ngoài ra, thực đơn còn giúp giảm cảm giác thèm ăn, cải thiện chức năng não bộ và cung cấp năng lượng bền vững suốt cả ngày.",
    price: "699,000 VND",
    sumary: "Thực đơn 7 ngày theo chế độ Keto giúp giảm cân hiệu quả.",
    days: [
      {
        day: "Ngày 1",
        meals: [
          {
            meal: "Sáng",
            dish: "Trứng chiên bơ",
            recipe: "Chiên trứng với bơ lạt, ăn kèm rau cải bó xôi.",
          },
          {
            meal: "Trưa",
            dish: "Thịt ba chỉ nướng + dưa chuột",
            recipe: "Ướp thịt ba chỉ với tiêu, muối, tỏi băm; nướng vàng.",
          },
          {
            meal: "Tối",
            dish: "Cá hồi nướng sốt bơ tỏi",
            recipe: "Nướng cá hồi với bơ tỏi, ăn cùng súp lơ hấp.",
          },
        ],
      },
      {
        day: "Ngày 2",
        meals: [
          {
            meal: "Sáng",
            dish: "Sinh tố bơ dừa",
            recipe: "Xay bơ, nước cốt dừa, hạnh nhân, ít đá viên.",
          },
          {
            meal: "Trưa",
            dish: "Thịt bò xào nấm",
            recipe: "Xào thịt bò với nấm đông cô, dầu oliu, tiêu muối.",
          },
          {
            meal: "Tối",
            dish: "Gà sốt kem nấm",
            recipe: "Nấu gà với sốt kem từ sữa tươi không đường và nấm.",
          },
        ],
      },
      {
        day: "Ngày 3",
        meals: [
          {
            meal: "Sáng",
            dish: "Trứng luộc + bơ",
            recipe: "Luộc trứng lòng đào, ăn kèm bơ cắt lát.",
          },
          {
            meal: "Trưa",
            dish: "Salad cá ngừ sốt mayonnaise",
            recipe: "Trộn cá ngừ với rau xà lách, sốt mayonnaise.",
          },
          {
            meal: "Tối",
            dish: "Ức gà áp chảo + súp lơ",
            recipe: "Ức gà ướp tiêu, muối, chiên áp chảo, ăn kèm súp lơ hấp.",
          },
        ],
      },
    ],
  },
  {
    name: "Thực đơn Chay Thanh Đạm",
    details:
      "Thực đơn chay được thiết kế với sự cân bằng dinh dưỡng giữa đạm thực vật, chất xơ, vitamin và khoáng chất. Thực đơn này giúp thanh lọc cơ thể, tăng cường sức khỏe tim mạch, hỗ trợ tiêu hóa và giúp kiểm soát cân nặng. Việc hạn chế thực phẩm động vật cũng góp phần giảm viêm, cải thiện làn da và nâng cao sức khỏe tổng thể.",
    price: "599,000 VND",
    sumary: "Thực đơn chay đơn giản nhưng vẫn đầy đủ dinh dưỡng",
    days: [
      {
        day: "Ngày 1",
        meals: [
          {
            meal: "Sáng",
            dish: "Cháo yến mạch hạt sen",
            recipe: "Nấu yến mạch với hạt sen, thêm muối và ít sữa hạt.",
          },
          {
            meal: "Trưa",
            dish: "Đậu hũ sốt cà chua",
            recipe: "Chiên đậu hũ, nấu sốt cà chua và rưới lên đậu.",
          },
          {
            meal: "Tối",
            dish: "Canh rau củ",
            recipe: "Nấu súp lơ, cà rốt, bắp cải trong nước dùng rau củ.",
          },
        ],
      },
      {
        day: "Ngày 2",
        meals: [
          {
            meal: "Sáng",
            dish: "Bánh mì nguyên cám + bơ đậu phộng",
            recipe: "Phết bơ đậu phộng lên bánh mì nguyên cám, ăn kèm chuối.",
          },
          {
            meal: "Trưa",
            dish: "Cơm gạo lứt + rau củ xào",
            recipe: "Xào cà rốt, bắp cải, đậu que với dầu mè.",
          },
          {
            meal: "Tối",
            dish: "Nấm xào đậu hũ",
            recipe: "Xào nấm rơm với đậu hũ, thêm dầu hào chay.",
          },
        ],
      },
      {
        day: "Ngày 3",
        meals: [
          {
            meal: "Sáng",
            dish: "Sữa hạt + hạt chia",
            recipe: "Ngâm hạt chia với sữa hạnh nhân, uống kèm bánh gạo lứt.",
          },
          {
            meal: "Trưa",
            dish: "Rau luộc + chao",
            recipe: "Luộc bông cải, rau muống, ăn kèm chao chay.",
          },
          {
            meal: "Tối",
            dish: "Súp miso chay",
            recipe: "Nấu nước dashi từ rong biển, thêm đậu hũ và miso.",
          },
        ],
      },
    ],
  },
];

const MenuPage = () => {
  const [followingMenu, setFollowingMenu] = useState(menuList[0]);
  const [suggestedMenus] = useState(menuList.slice(1));
  const [selectedMenu, setSelectedMenu] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Thực Đơn Của Tôi</h1>
      <Card className="border border-gray-200 shadow-md mb-6 p-4">
        <CardContent>
          <h3 className="text-lg font-semibold">{followingMenu.name}</h3>
          <p className="text-gray-600 text-sm mb-2">{followingMenu.details}</p>
          <Button
            variant="outlined"
            size="small"
            onClick={() =>
              navigate("/menu-details", { state: { menu: followingMenu } })
            }
          >
            Xem Chi Tiết
          </Button>
        </CardContent>
      </Card>

      <h2 className="text-xl font-bold mb-3">Gợi Ý Thực Đơn Khác</h2>

      {/* Thực đơn gợi ý - hiển thị theo hàng ngang */}
      <Grid container spacing={3}>
        {suggestedMenus.map((menu, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card className="border border-gray-200 shadow-md p-4">
              <CardContent>
                <h3 className="text-md font-semibold">{menu.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{menu.sumary}</p>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => navigate("/menu-details", { state: { menu } })}
                >
                  Xem Chi Tiết
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MenuPage;
