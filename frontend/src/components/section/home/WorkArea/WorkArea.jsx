import React from "react";
import "./workarea.css";

export default function WorkArea() {
    const sectionDescription = [
        {
            id: 1,
            icon: "assets/images/work1.svg",
            title: "Community Forestry",
            description:
                "We maintain a busy network of forestry and social development staff along with local facilitators in the areas we work.",
        },
        {
            id: 2,
            icon: "assets/images/work2.svg",
            title: "Individuals",
            description:
                "We maintain a busy network of forestry and social development staff along with local facilitators in the areas we work.",
        },
        {
            id: 3,
            icon: "assets/images/work3.svg",
            title: "Companies",
            description:
                "We maintain a busy network of forestry and social development staff along with local facilitators in the areas we work.",
        },
        {
            id: 4,
            icon: "assets/images/work4.svg",
            title: "Education",
            description:
                "We maintain a busy network of forestry and social development staff along with local facilitators in the areas we work.",
        },
    ];
    return (
        <section
            className="work pt-32 pb-32 bg-cover bg-center"
            style={{
                backgroundImage: 'url("assets/images/banner1.jpg")',
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
                                        src="assets/images/leaf.svg"
                                        alt="Leaf Icon"
                                        className="mr-2"
                                    />
                                    HOW WE WORK
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
                                    We work together for bettering tomorrow
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
                                We are an organization engaged in "Tree Planting" activities,
                                therefore you can "Donate Trees." We also join in "Community
                                Forestry | Reforestation" to keep the earth together so that it
                                remains sustainable.
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
