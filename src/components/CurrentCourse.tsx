import {EStatus, ICourse, ICourseSection} from "../interfaces/interfaces.ts";
import {useUser} from "./ContentContext.tsx";
import Table from "./Table.tsx";

const COLUMNS = ['sequence', 'title', 'status']
    .map((key) => {
        if (key === 'status') {
            return {
                header: 'Status',
                accessor: key as keyof ICourseSection,
                type: 'select',
                options: [
                    EStatus[EStatus.Pending],
                    EStatus[EStatus.InProgress],
                    EStatus[EStatus.Postponed],
                    EStatus[EStatus.Completed]
                ]
            }
        }
        return {
            header: key.charAt(0).toUpperCase() + key.slice(1),
            accessor: key as keyof ICourseSection,
            type: 'string',
            options: null
        }
    }
)

export default function CurrentCourse() {
    const {user, setUser} = useUser();

    // Example new course data
    const newCourse: ICourse = {
        title: "Advanced TypeScript",
        source: "Udemy",
        sections: [],
        status: EStatus.Pending
    };

    const handleUpdateCourse = () => {
        if (user) {
            setUser({
                ...user,
                currentCourse: newCourse,
            });
        }
    };

    return (
        <>
            {user?.currentCourse == null && (
                <button className="btn btn-primary mt-2" onClick={handleUpdateCourse}>Add Course</button>
            )}
            {user?.currentCourse && (
                <>
                    <div className="mt-2 mb-3">
                        <label htmlFor="controlTitle" className="form-label">Title</label>
                        <input type="email" className="form-control" id="controlTitle"
                               value={user?.currentCourse?.title}
                               onChange={(e) => {
                                   if (user) {
                                       setUser({
                                           ...user,
                                           currentCourse: {
                                               ...user.currentCourse,
                                               title: e.target.value
                                           }
                                       });
                                   }
                               }}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="controlSource" className="form-label">Source</label>
                        <input type="email" className="form-control" id="controlSource"
                               value={user?.currentCourse?.source}
                               onChange={(e) => {
                                   if (user) {
                                       setUser({
                                           ...user,
                                           currentCourse: {
                                               ...user.currentCourse,
                                               source: e.target.value
                                           }
                                       });
                                   }
                               }}
                        />
                    </div>
                    <div>
                        <Table columns={COLUMNS}
                               data={user?.currentCourse?.sections}
                        />
                    </div>
                </>
            )}
        </>
    );
}