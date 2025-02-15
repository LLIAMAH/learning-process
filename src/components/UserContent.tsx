import {PropsWithChildren, useState} from "react";
import CurrentCourse from "./content/CurrentCourse.tsx";
import CoursesHistory from "./content/CoursesHistory.tsx";
import {EView} from "../interfaces/interfaces.ts";

export interface IUsersContent extends PropsWithChildren {
    dataView: EView,
}

export default function UserContent() {
    const [page, setPage] = useState<EView>(EView.CURRENT);

    function handlePageChange(dataViewLocal: EView) {
        setPage(dataViewLocal);
    }

    return (
        <div className="col">
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className={ page===EView.CURRENT ? "nav-link active" : "nav-link"} aria-current="page"
                       onClick={() => handlePageChange(EView.CURRENT)}>Current</a>
                </li>
                <li className="nav-item">
                    <a className={ page===EView.HISTORY ? "nav-link active" : "nav-link"} aria-current="page"
                       onClick={() => handlePageChange(EView.HISTORY)}>History</a>
                </li>
            </ul>

            {page === EView.CURRENT && <CurrentCourse/>}
            {page === EView.HISTORY && <CoursesHistory/>}
        </div>
    );
}