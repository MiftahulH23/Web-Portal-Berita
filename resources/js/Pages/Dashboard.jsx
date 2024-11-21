import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function Dashboard(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");

    const [isNotif, setIsNotif] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            title,
            description,
            category,
        };
        Inertia.post("/news", data);
        setIsNotif(true);
        setTitle("");
        setDescription("");
        setCategory("");
    };

    // useEffect(() => {
    //     if (props.flash.message) {
    //         setTimeout(() => {
    //             setIsNotif(false);
    //         }, 3000);
    //     }
    // }, [props.flash.message]);

    useEffect(() => {
        if (!props.myNews) {
            Inertia.get("/news");
        }
        return;
        console.log("props", props);
    }, []);

    console.log("props last", props);
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-6">
                    <form
                        onSubmit={handleSubmit}
                        className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-4 flex flex-col gap-2"
                    >
                        <div>{isNotif && props.flash.message}</div>
                        <input
                            type="text"
                            placeholder="Title"
                            className="input input-bordered w-full"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                        <input
                            type="text"
                            placeholder="descripsi"
                            className="input input-bordered w-full"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                        />
                        <input
                            type="text"
                            placeholder="category"
                            className="input input-bordered w-full"
                            onChange={(e) => setCategory(e.target.value)}
                            value={category}
                        />
                        <button className="btn btn-primary w-fit" type="submit">
                            Submit
                        </button>
                    </form>

                    <div className="flex flex-col lg:flex-row lg:flex-wrap lg:items-stretch justify-center items-center gap-4">
                        {props.myNews && props.myNews.length > 0 ? props.myNews.map((news, i) => {
                            return (
                                <div key={i} className="card bg-base-100 w-full shadow-xl lg:w-96">
                                    <div className="card-body">
                                        <h2 className="card-title">
                                            {news.title}
                                            <div className="badge badge-secondary">
                                                NEW
                                            </div>
                                        </h2>
                                        <p>{news.description}</p>
                                        <div className="card-actions justify-end">
                                            <div className="badge badge-outline">
                                                {news.category}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }) : <p>Belum ada berita</p>}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
