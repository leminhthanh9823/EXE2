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
import { Image, Container, Row, Col } from "react-bootstrap"; // Add these imports

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

  const handleNavigateToDetails = (menu) => {
    window.scrollTo(0, 0); // Scroll to top
    navigate("/menu-details", { state: { menu } });
  };

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
        backgroundColor: "#f0fdf4",
        borderRadius: "8px",
        boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h1
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px", color: "#065f46" }}
      >
        Thực Đơn Của Tôi
      </h1>

      {menus.length > 0 ? (
        <>
          {/* Thực đơn của tôi */}
          {myMenus.length > 0 ? (
            <Grid container spacing={2}>
              {myMenus.map((menu) => (
                <Grid item xs={12} sm={6} key={menu._id}>
                  <Card
                    role="button"
                    style={{
                      border: "1px solid #ddd",
                      boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
                      padding: "14px",
                      cursor: "pointer",
                      pointerEvents: "auto",
                      marginBottom: "12px",
                      borderRadius: "8px",
                      transition: "transform 0.2s",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "100%",
                    }}
                    onClick={() => handleNavigateToDetails(menu)}
                    onTouchStart={() => handleNavigateToDetails(menu)}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  >
                    <CardContent>
                      <Container>
                        <Row className="justify-content-center">
                          <Col xs="auto">
                            <Image
                              src={menu.name === 'Thực đơn 10-day' ? "https://i.postimg.cc/v8hFpjYD/Yellow-Green-Modern-Drink-Instagram-Post.png" : 'https://i.postimg.cc/bw1PMHzL/NAM.png'}
                              alt={menu.name}
                              rounded
                              style={{ width: "100%", height: "auto", marginBottom: "12px", objectFit: "cover" }}
                            />
                          </Col>
                        </Row>
                        <Row className="justify-content-center">
                          <Col xs="auto">
                            <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#065f46", textAlign: "center" }}>
                              {menu.name}
                            </h3>
                          </Col>
                        </Row>
                        <Row className="justify-content-center">
                          <Col xs="auto">
                            <p
                              style={{
                                color: "#065f46",
                                fontSize: "14px",
                                marginBottom: "8px",
                                textAlign: "center",
                              }}
                            >
                              {menu.details}
                            </p>
                          </Col>
                        </Row>
                        <Row className="justify-content-center">
                          <Col xs="auto" className="text-center">
                            <Button
                              variant="outlined"
                              size="small"
                              style={{ borderColor: "#065f46", color: "#065f46" }}
                              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#065f46", e.currentTarget.style.color = "#fff")}
                              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent", e.currentTarget.style.color = "#065f46")}
                            >
                              Xem Chi Tiết
                            </Button>
                          </Col>
                        </Row>
                      </Container>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography
              style={{ textAlign: "center", color: "#065f46", marginTop: "12px" }}
            >
              Bạn chưa có thực đơn nào.
            </Typography>
          )}

          {/* Danh sách gợi ý (các menu còn lại) */}
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              marginBottom: "12px",
              color: "#065f46",
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
                    borderRadius: "8px",
                    transition: "transform 0.2s",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                  }}
                  onClick={() => handleNavigateToDetails(menu)}
                  onTouchStart={() => handleNavigateToDetails(menu)}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <CardContent>
                    <Container>
                      <Row className="justify-content-center">
                        <Col xs="auto">
                          <Image
                            src={menu.name === 'Thực đơn 10-day' ? "https://i.postimg.cc/v8hFpjYD/Yellow-Green-Modern-Drink-Instagram-Post.png" : 'https://i.postimg.cc/bw1PMHzL/NAM.png'}
                            alt={menu.name}
                            rounded
                            style={{ width: "100%", height: "auto", marginBottom: "12px", objectFit: "cover" }}
                          />
                        </Col>
                      </Row>
                      <Row className="justify-content-center">
                        <Col xs="auto">
                          <h3 style={{ fontSize: "16px", fontWeight: "bold", color: "#065f46", textAlign: "center" }}>
                            {menu.name}
                          </h3>
                        </Col>
                      </Row>
                      <Row className="justify-content-center">
                        <Col xs="auto">
                          <p
                            style={{
                              color: "#065f46",
                              fontSize: "14px",
                              marginBottom: "8px",
                              textAlign: "center",
                            }}
                          >
                            {menu.details}
                          </p>
                        </Col>
                      </Row>
                      <Row className="justify-content-center">
                        <Col xs="auto" className="text-center">
                          <Button
                            variant="outlined"
                            size="small"
                            style={{ borderColor: "#065f46", color: "#065f46" }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#065f46", e.currentTarget.style.color = "#fff")}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent", e.currentTarget.style.color = "#065f46")}
                          >
                            Xem Chi Tiết
                          </Button>
                        </Col>
                      </Row>
                    </Container>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <Typography
          style={{ textAlign: "center", color: "#065f46", marginTop: "12px" }}
        >
          Không có thực đơn nào.
        </Typography>
      )}
    </div>
  );
};

export default MenuPage;
