import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Button,
  Grid,
  CircularProgress,
  Typography,
} from "@mui/material";
import axios from "axios";

const MenuPage = () => {
  const [menus, setMenus] = useState([]);
  const [myMenus, setMyMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyMenus = async () => {
      setLoading(true);
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user._id) return;

        const response = await axios.get(
          `https://fitmenu.store/api/menus?userId=${user._id}`
        );
        console.log("API Response:", response.data);

        setMyMenus(response.data.myMenus);
        setMenus(response.data.menus);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyMenus();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );

  if (error)
    return (
      <Typography className="text-red-500 text-center mt-4">{error}</Typography>
    );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Thực Đơn Của Tôi</h1>

      {menus.length > 0 ? (
        <>
          {/* Thực đơn đang theo dõi (menu đầu tiên) */}
          {/* Thực đơn của tôi */}
          {myMenus.length > 0 ? (
            myMenus.map((menu) => (
              <Card
                key={menu._id}
                className="border border-gray-200 shadow-md mb-6 p-4"
              >
                <CardContent>
                  <h3 className="text-lg font-semibold">{menu.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{menu.details}</p>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() =>
                      navigate("/menu-details", { state: { menu } })
                    }
                  >
                    Xem Chi Tiết
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography className="text-center text-gray-500 mt-4">
              Bạn chưa có thực đơn nào.
            </Typography>
          )}
          {/* Danh sách gợi ý (các menu còn lại) */}
          <h2 className="text-xl font-bold mb-3">Gợi Ý Thực Đơn Khác</h2>
          <Grid container spacing={3}>
            {menus.map((menu) => (
              <Grid item xs={12} md={6} key={menu._id}>
                <Card className="border border-gray-200 shadow-md p-4">
                  <CardContent>
                    <h3 className="text-md font-semibold">{menu.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{menu.details}</p>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() =>
                        navigate("/menu-details", {
                          state: { menu },
                        })
                      }
                    >
                      Xem Chi Tiết
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <Typography className="text-center text-gray-500 mt-4">
          Không có thực đơn nào.
        </Typography>
      )}
    </div>
  );
};

export default MenuPage;
