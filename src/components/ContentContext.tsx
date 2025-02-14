import {createContext, useContext, useState} from "react";
import {IUser, UserContextType, UserProviderProps} from "../interfaces/interfaces.ts";
import {USER} from "../data/data.ts";

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useState<IUser | null>(USER);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}

export default UserContext;