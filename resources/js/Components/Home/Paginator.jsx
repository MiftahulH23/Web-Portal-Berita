import React from "react";
import { Pagination } from "@mui/material";
import { Link } from "@inertiajs/react";

const Paginator = ({ meta }) => {
    const currentPage = meta.current_page;
    const lastPage = meta.last_page;

    const handlePageChange = (event, page) => {
        const link = meta.links.find((link) => link.label == page)?.url;
        if (link) {
            window.location.href = link; // Redirect to the selected page
        }
    };

    return (
        <div className="my-4 flex justify-center">
            <Pagination
                count={lastPage} // Total number of pages
                page={currentPage} // Current active page
                onChange={handlePageChange}
            />
        </div>
    );
};

export default Paginator;
