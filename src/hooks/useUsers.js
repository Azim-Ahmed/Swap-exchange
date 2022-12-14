import * as React from "react";
import { awareness } from "../YjsProvider";

/**
 * Subscribe to the presence of other users within the provider's awareness API.
 */
export function useUsers() {
    const [users, setUsers] = React.useState();

    React.useEffect(() => {
        function updateUsersState() {
            const states = awareness.getStates();
            setUsers(Array.from(states.values()));
        }
        updateUsersState();
        awareness.on("change", updateUsersState);
        return () => {
            awareness.off("change", updateUsersState);
        };
    }, []);

    return { users };
}
