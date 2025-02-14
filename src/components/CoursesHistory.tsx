import Table from "./Table.tsx";
import {useUser} from "./ContentContext.tsx";
import {ICourse} from "../interfaces/interfaces.ts";

const COLUMNS = ['title', 'source', 'status']
    .map((key) => ({
        header: key.charAt(0).toUpperCase() + key.slice(1),
        accessor: key as keyof ICourse,
        type: 'string'
    }));

export default function CoursesHistory() {
    const { user } = useUser();

    if (!user) {
        return <div>No user data available</div>;
    }

    return (
        <>
            <Table columns={COLUMNS} data={user?.history}/>
        </>
    );
}