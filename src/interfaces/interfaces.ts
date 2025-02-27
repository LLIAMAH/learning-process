import {ReactNode} from "react";

export enum EView {
    CURRENT,
    HISTORY
}

export interface UserContextType {
    user: IUser | null;
    setUser: (user: IUser | null) => void;
}

export interface UserProviderProps {
    children: ReactNode;
}

export enum EStatus {
    Pending,
    InProgress,
    Postponed,
    Completed,
}

export interface IUser {
    fullName: string;
    position: string;
    photo: string;
    location: string;
    department: string;
    email: string;
    phone: string;
    currentCourse: ICourse;
    history: ICourse[];
    subordinates: IUser[];
}

export interface ICourse {
    title: string;
    source: string;
    status: string | EStatus;
    sections: ICourseSection[];
}

export interface ICourseSection {
    sequence: number;
    title: string;
    status: string | EStatus
}

