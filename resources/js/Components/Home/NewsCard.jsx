import React from "react";

const isNews = (news) => {
    return news.map((data, i) => {
        return (
        <div key={i} className="card bg-base-100 w-full shadow-xl lg:w-96">
            <figure>
                <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Shoes"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {data.title}
                    <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>{data.description}</p>
                <div className="card-actions justify-end">
                    <div className="badge badge-outline bg-slate-100">{data.category}</div>
                    <div className="badge badge-outline">{data.author}</div>
                </div>
            </div>
        </div>
        );
    });
};

const noNews = () => {
    return (
        <p>Data tidak tersedia</p>
    )
}

const NewsCard = ({ news }) => {

   return !news ? noNews() : isNews(news);
};

export default NewsCard;
