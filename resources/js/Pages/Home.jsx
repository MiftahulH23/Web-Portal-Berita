import Navbar from "@/Components/Navbar";
import NewsCard from "@/Components/Home/NewsCard";
import { Head, Link } from "@inertiajs/react";
import React from "react";
import Paginator from "@/Components/Home/Paginator";
export default function Home(props) {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen mx-5 my-3 gap-10">
            <Navbar user={props.auth.user} />
            <div>
                <Head title={props.tittleHead} />
                <h1 className="text-blue-500 font-bold text-2xl">
                    This Home Page
                </h1>
            </div>
            <div className="flex flex-col lg:flex-row lg:flex-wrap lg:items-stretch justify-center items-center gap-4">
                <NewsCard news={props.news.data} />
            </div>
            <div className="flex justify-center items-center">
                <Paginator meta={props.news.meta} />
            </div>
        </div>
    );
}
