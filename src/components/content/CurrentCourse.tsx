import {EStatus, ICourse, ICourseSection} from "../../interfaces/interfaces.ts";
import {useUser} from "./ContentContext.tsx";
import TableAdd from "../tables/TableAdd.tsx";
import {useState} from "react";

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

export default function CurrentCourse() {
    const {user, setUser} = useUser();
    const [sections, setSections] = useState<ICourseSection[]>(
        user?.currentCourse?.sections ||
        [{
            title: '',
            status: EStatus.Pending,
            sequence: 1
        }]);

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

    const handleUpdateCourse = () => {
        if (user) {
            const updatedCourse: ICourse = {
                ...user.currentCourse!,
                sections: [...sections]
            };
            const data = {
                ...user,
                currentCourse: updatedCourse,
            };
            console.log("Saved Course Data:", data);
            setUser(data); // Обновляем пользователя с сохраненными изменениями
        }

    };

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
                                  data={sections}
                                  canAddRows={true}
                                  onChange={(sectionsUpdated) =>
                                      handleSectionsChange(sectionsUpdated)}
                        />
                    </div>
                    <div className="row">
                        <div className="col text-end">
                            <button className="btn btn-primary mt-2"
                                    onClick={handleUpdateCourse}>
                                Save Changes
                            </button>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}