import {EStatus, ICourseSection} from "../../interfaces/interfaces.ts";
import {useUser} from "./ContentContext.tsx";
import TableChangeStatus from "../tables/TableChangeStatus.tsx";

const COLUMNS_EDIT = ['sequence', 'title', 'status']
    .map((key) => {
        switch (key) {
            case 'sequence':
                return {
                    header: '#',
                    accessor: key as keyof ICourseSection,
                    type: 'string',
                    columnStyle: 'col-1',
                    options: null
                }
            case 'title':
                return {
                    header: key.charAt(0).toUpperCase() + key.slice(1),
                    accessor: key as keyof ICourseSection,
                    type: 'string',
                    columnStyle: 'col',
                    options: null
                }
            case 'status':
                return {
                    header: key.charAt(0).toUpperCase() + key.slice(1),
                    accessor: key as keyof ICourseSection,
                    type: 'select',
                    columnStyle: 'col-3',
                    options: [
                        EStatus.Pending,
                        EStatus.InProgress,
                        EStatus.Postponed,
                        EStatus.Completed
                    ]
                }
            default:
                return {
                    header: key.charAt(0).toUpperCase() + key.slice(1),
                    accessor: key as keyof ICourseSection,
                    type: 'string',
                    options: null
                }
        }
    });

export default function CurrentCourseEdit({sections, setSections}
                                          : {sections: ICourseSection[], setSections: (sections: ICourseSection[]) => void}) {
    const {user, setUser} = useUser();

    function handleSectionsChange(sectionsUpdated: ICourseSection[]) {
        setSections(sectionsUpdated);
        setUser({
            ...user!,
            currentCourse: {
                ...user!.currentCourse!,
                sections: [...sections]
            }
        })
    }

    return (
        <>
            {user?.currentCourse && (
                <>
                    <div className="mt-2 mb-3">
                        <label htmlFor="controlTitle" className="form-label">Title</label>
                        <input type="email" className="form-control" id="controlTitle"
                               value={user?.currentCourse?.title}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="controlSource" className="form-label">Source</label>
                        <input type="email" className="form-control" id="controlSource"
                               value={user?.currentCourse?.source}
                        />
                    </div>
                    <div>
                        <TableChangeStatus columns={COLUMNS_EDIT}
                                           data={user!.currentCourse!.sections!}
                                           onChange={(sectionsUpdated) =>
                                               handleSectionsChange(sectionsUpdated)}
                        />
                    </div>
                </>
            )}
        </>
    );
}