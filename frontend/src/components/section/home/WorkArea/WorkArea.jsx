import React from "react";
import "./workarea.css";
import { Link } from "react-router-dom";

export default function WorkArea() {
    const sectionDescription = [
        {
            id: 1,
            icon: "assets/images/work1.svg",
            title: <strong>Mục tiêu</strong>,
            description:
                "Chúng tôi không chỉ cung cấp giải pháp mà còn đồng hành cùng bạn trên hành trình hướng tới một lối sống lành mạnh và bền vững.",
        },
        {
            id: 2,
            icon: "assets/images/work2.svg",
            title: <strong>Tối ưu</strong>,
            description:
                "Tiết kiệm thời gian và chi phí của bạn bằng cách tối ưu hóa quy trình lựa chọn thực phẩm và lên kế hoạch dinh dưỡng chi tiết.",
        },
        {
            id: 3,
            icon: "assets/images/work3.svg",
            title: <strong>Sức khỏe</strong>,
            description:
                "Chúng tôi tập trung vào cung cấp thông tin dinh dưỡng chuẩn xác và giải pháp cá nhân hóa để nâng cao sức khỏe toàn diện của bạn.",
        },
        {
            id: 4,
            icon: "assets/images/work4.svg",
            title: <strong>Thói quen</strong>,
            description:
                "Chúng tôi giúp bạn hình thành lối sống khoa học, duy trì dinh dưỡng bền vững và tận hưởng sự cân bằng trong từng bữa ăn.",
        },
    ];
    return (
        <section
            className="work pt-5 pb-32 bg-cover bg-center relative"
            style={{
                backgroundImage: 'url("public/assets/images/banner1.jpg")',
            }}
        >
            <div className="absolute inset-0 "></div>
            <div className="relative z-10">
                {/* banner */}
                <div className="bg-black opacity-70">
                <img
                    src="https://file.hstatic.net/200000201805/article/a_9a1cb7cc4120473d99c61950a785ef43.jpg"
                    alt="banner"
                    className="w-full object-cover"
                    style={{ height: "70vh" }}
                />
                </div>
                {/* mission section */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <div className="container mx-auto">
                                        <div>
                                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-center">
                                                <div>
                                                    <div className="section-header m-0 bg-gradient-to-r from-green-700 to-green-300" 
                                                        style={{ padding:'20px', borderRadius:'10px', marginTop:'250px'}}>
                                                        
                                                        {/* <h5
                                                            className="wow fadeInUp text-lg font-semibold flex items-center"
                                                            data-wow-duration="1.2s"
                                                            data-wow-delay=".2s"
                                                            style={{
                                                                visibility: "visible",
                                                                animationDuration: "1.2s",
                                                                animationDelay: "0.2s",
                                                                animationName: "fadeInUp",
                                                            }}
                                                        >
                                                            <img
                                                                src="https://i.postimg.cc/5tW5h4Nd/fitmenulogo.png"
                                                                alt="Leaf Icon"
                                                                className="mr-2"
                                                                style={{ width: "30%", height: "30%" }}
                                                            />
                                                            Sứ mệnh của chúng tôi
                                                        </h5> */}
                                        <h2
                                            className="wow fadeInUp text-3xl font-bold mt-4 pb-4"
                                            data-wow-duration="1.4s"
                                            data-wow-delay=".4s"
                                            style={{
                                                visibility: "visible",
                                                animationDuration: "1.4s",
                                                animationDelay: "0.4s",
                                                animationName: "fadeInUp",
                                                
                                            }}
                                        >
                                            <h2 style={{marginBottom:'3px', color:'white'}}>Hàng đầu trong thiết kế</h2>
                                            <span style={{padding:'3px', backgroundColor:'#FFC000', color:'black', borderRadius:'5px'}}>Thực đơn Eatclean</span>
                                        </h2>
                                        <p
                                            className="wow fadeInUp text-lg"
                                            data-wow-duration="1.6s"
                                            data-wow-delay=".6s"
                                            style={{
                                                visibility: "visible",
                                                animationDuration: "1.6s",
                                                animationDelay: "0.6s",
                                                animationName: "fadeInUp",
                                            }}
                                        >
                                        </p>

                                        <Link to="/my-menu">
                                            <button className="px-6 py-3 rounded-lg hover:bg-green-700" style={{backgroundColor:'white', color:'rgb(22 163 84)'}}>
                                                <strong>Thử ngay</strong>
                                            </button>
                                        </Link>
                                    </div>
                                    
                                </div>
                            </div>
                            {/* Nút "Thử ngay" */}
                            <div className="flex justify-start mb-8 mt-4">
                                
                            </div>
                        </div>
                    </div>
                    {/* goal section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8" style={{padding:'0px 100px'}}>
                        {sectionDescription.map((item, index) => (
                            <div
                                key={item.id}
                                className="wow fadeInDown bg-white shadow-md rounded-lg relative"
                                data-wow-duration={`${1.2 + index * 0.2}s`}
                                data-wow-delay={`${0.2 + index * 0.2}s`}
                                style={{
                                    visibility: "visible",
                                    animationDuration: `${1.2 + index * 0.2}s`,
                                    animationDelay: `${0.2 + index * 0.2}s`,
                                    animationName: "fadeInDown",
                                }}
                            >
                                <div className="work__item">
                                    <div className="work__item-icon">
                                        <img src={item.icon} alt={`${item.title} Icon`} className="mr-2" />
                                        <span className="text-lg font-semibold">{`0${item.id}`}</span>
                                    </div>
                                    <h3 >
                                        <a href="service-single.html">{item.title}</a>
                                    </h3>
                                    <p >{item.description}</p>
                                    <a
                                        className="work__item-arrow"
                                        href="service-single.html"
                                    >
                                        <i className="fa-solid fa-arrow-right"></i>
                                    </a>
                                    <div className="work__item-leaf ">
                                        <img src="assets/images/work-leaf.png" alt={`${item.title} Leaf`} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
