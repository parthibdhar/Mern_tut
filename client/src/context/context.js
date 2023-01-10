import { createContext, useContext, useState } from "react"

const defaultData = null

const UserDataContext = createContext(defaultData)

export function useUserData() {
    return useContext(UserDataContext);
}

export function UserDataProvider({ children }) {

    const [userData, setUserData] = useState(defaultData)

    return <UserDataContext.Provider value={{ userData, setUserData }}> {children} </UserDataContext.Provider>
}