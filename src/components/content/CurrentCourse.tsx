import {ICourse, ICourseSection} from "../../interfaces/interfaces.ts";
import {useUser} from "./ContentContext.tsx";
import CurrentCourseAdd from "./CurrentCourseAdd.tsx";
import CurrentCourseEdit from "./CurrentCourseEdit.tsx";
import {useState} from "react";

export default function CurrentCourse() {
    const {user, setUser} = useUser();
    const [sections, setSections] = useState<ICourseSection[]>([]);

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

    return (
        <>
            <div>
                {!user?.currentCourse?.sections && <CurrentCourseAdd sections={sections} setSections={setSections}/>}
                {user?.currentCourse?.sections && <CurrentCourseEdit sections={sections} setSections={setSections}/>}
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
    )
}