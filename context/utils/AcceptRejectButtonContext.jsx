import { createContext, useContext, useState } from "react";

const AcceptRejectButtonContext = createContext()
function AcceptRejectButtonProvider({children}) {
    const [isAccepted, setIsAccepted] = useState(false)
    return <AcceptRejectButtonContext.Provider value={{ isAccepted, setIsAccepted }}>
        {children}
    </AcceptRejectButtonContext.Provider>
}

export default AcceptRejectButtonProvider

export const useButtonContext = () => useContext(AcceptRejectButtonContext)
