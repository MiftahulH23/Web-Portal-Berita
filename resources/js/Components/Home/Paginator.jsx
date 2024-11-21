import { Link } from "@inertiajs/react";
import React from "react";

const Paginator = ({ meta }) => {
    const prevPage = meta.links[0].url;
    const nextPage = meta.links[meta.links.length - 1].url;
    const currentPage = meta.current_page;
    const lastPage = meta.last_page;

    return (
        <div className="join">
            {prevPage && <Link href={prevPage} className="join-item btn">«</Link>}
            <button className="join-item btn">{currentPage}</button>
            {nextPage && <Link href={nextPage} className="join-item btn">»</Link>}
        </div>
    );
};

export default Paginator;
