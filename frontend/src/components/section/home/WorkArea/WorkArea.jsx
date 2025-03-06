import React from "react";
import "./workarea.css";

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
            className="work pt-32 pb-32 bg-cover bg-center"
            style={{
                backgroundImage: 'url("public/assets/images/banner1.jpg")',
            }}
        >
            <div className="container mx-auto">
                <div className="pb-16 border-b mb-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-center">
                        <div>
                            <div className="section-header m-0">
                                <h5
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
                                        src="assets/images/476495700_492431837268688_7240872719589669646_n.png"
                                        alt="Leaf Icon"
                                        className="mr-2"
                                        style={{ width: "30%", height: "30%" }}
                                    />
                                    Sứ mệnh của chúng tôi
                                </h5>
                                <h2
                                    className="wow fadeInUp text-3xl font-bold mt-4"
                                    data-wow-duration="1.4s"
                                    data-wow-delay=".4s"
                                    style={{
                                        visibility: "visible",
                                        animationDuration: "1.4s",
                                        animationDelay: "0.4s",
                                        animationName: "fadeInUp",
                                    }}
                                >
                                    Hàng đầu trong thiết kế thực đơn eatclean
                                </h2>
                            </div>
                        </div>
                        <div>
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
                                Chúng tôi muốn trở thành nền tảng hàng đầu trong lĩnh vực tư vấn 
                                và thiết kế thực đơn Eat Clean, góp phần thay đổi nhận thức cộng đồng 
                                về dinh dưỡng, giúp khách hàng duy trì lối sống khỏe mạnh thông qua 
                                chế độ ăn uống cân bằng và phù hợp với nhu cầu cá nhân.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
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
        </section>
    );
}
