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
          `http://localhost:5000/api/menus?userId=${user._id}`
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        <CircularProgress />
      </div>
    );

  if (error)
    return (
      <Typography
        style={{ color: "red", textAlign: "center", marginTop: "16px" }}
      >
        {error}
      </Typography>
    );

  return (
    <div
      style={{
        padding: "24px",
        maxWidth: "800px",
        margin: "0 auto",
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <h1
        style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "12px" }}
      >
        Thực Đơn Của Tôi
      </h1>

      {menus.length > 0 ? (
        <>
          {/* Thực đơn của tôi */}
          {myMenus.length > 0 ? (
            myMenus.map((menu) => (
              <Card
                key={menu._id}
                role="button"
                style={{
                  border: "1px solid #ddd",
                  boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
                  padding: "14px",
                  cursor: "pointer",
                  pointerEvents: "auto",
                }}
                onClick={() => navigate("/menu-details", { state: { menu } })}
                onTouchStart={() =>
                  navigate("/menu-details", { state: { menu } })
                }
              >
                <CardContent>
                  <h3 style={{ fontSize: "16px", fontWeight: "bold" }}>
                    {menu.name}
                  </h3>
                  <p
                    style={{
                      color: "#666",
                      fontSize: "13px",
                      marginBottom: "6px",
                    }}
                  >
                    {menu.details}
                  </p>
                  <Button variant="outlined" size="small">
                    Xem Chi Tiết
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography
              style={{ textAlign: "center", color: "#888", marginTop: "12px" }}
            >
              Bạn chưa có thực đơn nào.
            </Typography>
          )}

          {/* Danh sách gợi ý (các menu còn lại) */}
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            Gợi Ý Thực Đơn Khác
          </h2>
          <Grid container spacing={2}>
            {menus.map((menu) => (
              <Grid item xs={12} sm={6} key={menu._id}>
                <Card
                  role="button"
                  style={{
                    border: "1px solid #ddd",
                    boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
                    padding: "14px",
                    cursor: "pointer",
                    pointerEvents: "auto",
                  }}
                  onClick={() => navigate("/menu-details", { state: { menu } })}
                  onTouchStart={() =>
                    navigate("/menu-details", { state: { menu } })
                  }
                >
                  <CardContent>
                    <h3 style={{ fontSize: "14px", fontWeight: "bold" }}>
                      {menu.name}
                    </h3>
                    <p
                      style={{
                        color: "#666",
                        fontSize: "13px",
                        marginBottom: "6px",
                      }}
                    >
                      {menu.details}
                    </p>
                    <Button variant="outlined" size="small">
                      Xem Chi Tiết
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <Typography
          style={{ textAlign: "center", color: "#888", marginTop: "12px" }}
        >
          Không có thực đơn nào.
        </Typography>
      )}
    </div>
  );
};

export default MenuPage;
