"use client";
import React, { useEffect, useState } from 'react';

import UserContext from "@/context/userContext";
import { toast } from "react-toastify";
import { currentUser } from "@/services/userService";


const UserProvider = ({ children }) => {
    const [user, setUser] = useState(undefined);
    const [loading, setLoading] = useState(true); // Add loading state



    useEffect(() => {
        async function load() {
            try {
                console.log("This is userProvider");
                const logUser = await currentUser();
                setUser({ ...logUser });
                console.log(logUser);
                console.log(user);
            } catch (e) {
                console.error(e);
                toast.error("Error in loading current user");
            } finally {
                setLoading(false); // Set loading to false regardless of success or failure
            }
        }
        load();
    }, []);


    // Render children only when the data is loaded
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {loading ? (
                // You can add a loading indicator here if needed
                <p>Loading...</p>
            ) : (
                children
            )}
        </UserContext.Provider>
    );
};

export default UserProvider;
