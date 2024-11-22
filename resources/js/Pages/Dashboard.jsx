import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/react";
import Alert from "@mui/material/Alert";

export default function Dashboard(props) {
    const [isNotif, setIsNotif] = useState(false);
    const { flash, errors } = usePage().props;
    const [flashMessage, setFlashMessage] = useState(flash.message);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const data = {
            title: formData.get("title"),
            description: formData.get("description"),
            category: formData.get("category"),
        };
        Inertia.post("/news", data, {
            preserveState: true,
            headers: {
                "X-CSRF-TOKEN": document
                    .querySelector('meta[name="csrf-token"]')
                    .getAttribute("content"),
            },
        });
    };

    useEffect(() => {
        if (errors) {
            setIsNotif(true);
            setTimeout(() => {
                setIsNotif(false);
            }, 5000);
        }
    }, []);
    setTimeout(() => {
        setFlashMessage(null);
    }, 3000);

    // Untuk Mengambil Data
    useEffect(() => {
        if (!props.myNews) {
            Inertia.get("/news");
        }
        return;
    }, []);

    console.log("props last", props);
    console.log("errors last", errors);
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
                        {isNotif &&
                            errors &&
                            Object.keys(errors).length > 0 && (
                                <Alert severity="error">
                                    <ul>
                                        {Object.keys(errors).map(
                                            (field, index) => (
                                                <li key={index}>
                                                    {field}: {errors[field]}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </Alert>
                            )}

                        {/* {errors && <p>{errors.body}</p>} */}

                        {flashMessage && (
                            <Alert severity="success">{flashMessage}</Alert>
                        )}

                        <input
                            type="text"
                            placeholder="Title"
                            name="title"
                            className="input input-bordered w-full"
                            required
                        />
                        <input
                            type="text"
                            placeholder="descripsi"
                            name="description"
                            className="input input-bordered w-full"
                            required
                        />
                        <input
                            type="text"
                            placeholder="category"
                            name="category"
                            className="input input-bordered w-full"
                            required
                        />
                        <button className="btn btn-primary w-fit" type="submit">
                            Submit
                        </button>
                    </form>

                    <div className="flex flex-col lg:flex-row lg:flex-wrap lg:items-stretch justify-center items-center gap-4">
                        {props.myNews && props.myNews.length > 0 ? (
                            props.myNews.map((news, i) => {
                                return (
                                    <div
                                        key={i}
                                        className="card bg-base-100 w-full shadow-xl lg:w-96"
                                    >
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
                            })
                        ) : (
                            <p>Belum ada berita</p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
