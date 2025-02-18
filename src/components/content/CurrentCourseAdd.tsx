import {ICourse, ICourseSection} from "../../interfaces/interfaces.ts";
import {useUser} from "./ContentContext.tsx";
import TableAdd from "../tables/TableAdd.tsx";

const COLUMNS_ADD = ['sequence', 'title']
    .map((key) => {
        switch (key) {
            case 'sequence':
                return {
                    header: '#',
                    accessor: key as keyof ICourseSection,
                    type: 'sequence',
                    columnStyle: 'col-1',
                    options: null
                }
            case 'title':
                return {
                    header: key.charAt(0).toUpperCase() + key.slice(1),
                    accessor: key as keyof ICourseSection,
                    type: 'stringEdit',
                    columnStyle: 'col',
                    options: null
                }
            default:
                return {
                    header: key.charAt(0).toUpperCase() + key.slice(1),
                    accessor: key as keyof ICourseSection,
                    type: 'string',
                    options: null
                }
        }
    })

export default function CurrentCourseAdd({sections, setSections}
                                         : {sections: ICourseSection[], setSections: (sections: ICourseSection[]) => void}) {
    const {user, setUser} = useUser();
    // const [sections, setSections] = useState<ICourseSection[]>(
    //     user?.currentCourse?.sections ||
    //     [{
    //         title: '',
    //         status: EStatus.Pending,
    //         sequence: 1
    //     }]);

    const newCourse: ICourse = {
        title: '',
        source: '',
        sections: sections
    };

    const handleAddCourse = () => {
        if (user) {
            const updatedUser = {
                ...user,
                currentCourse: newCourse,
            };
            console.log("Added Course Data:", updatedUser);
            setUser(updatedUser);
        }
    }

    function handleSectionsChange(sectionsUpdated: ICourseSection[]) {
        setSections(sectionsUpdated);
        if (user) {
            const updateUserData = {
                ...user,
                currentCourse: {
                    ...user.currentCourse,
                    sections: sections,
                    title: user.currentCourse?.title ?? '',
                    source: user.currentCourse?.source ?? '',
                }
            };
            setSections(sectionsUpdated);
            setUser(updateUserData);
        }
    }

    return (
        <>
            {user?.currentCourse == null && (
                <button className="btn btn-primary mt-2" onClick={handleAddCourse}>Add Course</button>
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
                                               title: e.target.value || '',
                                               source: user.currentCourse?.source ?? '',
                                               sections: user.currentCourse?.sections ?? []
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
                                               source: e.target.value || '',
                                               title: user.currentCourse?.title ?? '',
                                               sections: user.currentCourse?.sections ?? []
                                           }
                                       });
                                   }
                               }}
                        />
                    </div>
                    <div>
                        <TableAdd columns={COLUMNS_ADD}
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