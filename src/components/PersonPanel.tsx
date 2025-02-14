import {useUser} from "./ContentContext.tsx";

export function PersonPanel() {
    const { user } = useUser();

    if (!user) {
        return <div>No user data available</div>;
    }

    return (
        <div className="col-4">
            <div className="card">
                <img src={user.photo} className="card-img-top" alt="person photo"/>
                <div className="card-body">
                    <h5 className="card-title">{user.fullName}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{user.position}</h6>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Phone: <strong>{user.phone}</strong></li>
                        <li className="list-group-item">Email: <strong>{user.email}</strong></li>
                        <li className="list-group-item">Dept: <strong>{user.department}</strong></li>
                        <li className="list-group-item">Location: <strong>{user.location}</strong></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

