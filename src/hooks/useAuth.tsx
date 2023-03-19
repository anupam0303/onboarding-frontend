import  {Amplify, Auth } from "aws-amplify";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AwsConfigAuth } from "../config/auth";

Amplify.configure({ Auth: AwsConfigAuth })

interface UseAuth {
    isLoading: boolean;
    isAuthenticated: boolean;
    username: string;
    name: string;
    email: string;
    signIn: (username: string, password: string) => Promise<Result>;
    signOut: () => void;
}

interface Result {
    success: boolean;
    message: string;
}

type Props = {
    children?: React.ReactNode;
};

const authContext = createContext({} as UseAuth);

export const ProvideAuth: React.FC<Props> = ({ children }) => {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
    return useContext(authContext);
};

const useProvideAuth = (): UseAuth => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        Auth.currentAuthenticatedUser()
            .then((result) => {
                console.log("Given Name: ", result.given_name);
                setUsername(result.username);
                setName(result.given_name + " "+ result.family_name);
                setEmail(result.email);
                setIsAuthenticated(true);
                setIsLoading(false);
            })
            .catch(() => {
                setUsername("");
                setName("");
                setEmail("");
                setIsAuthenticated(false);
                setIsLoading(false);
            });
    }, []);

    const signIn = async (username: string, password: string) => {
        try {
            const result = await Auth.signIn(username, password);
            const userData = result.challengeParam.userAttributes;
            setUsername(result.username);
            //console.log("Given Name: ", JSON.stringify(userData));
            setName(userData.given_name + " "+ userData.family_name);
            setEmail(userData.email);
            setIsAuthenticated(true);
            return { success: true, message: "" };
        } catch (error) {
            return {
                success: false,
                message: "LOGIN FAIL",
            };
        }
    };

    const signOut = async () => {
        try {
            await Auth.signOut();
            setUsername("");
            setName("");
            setEmail("");
            setIsAuthenticated(false);
            return { success: true, message: "" };
        } catch (error) {
            return {
                success: false,
                message: "LOGOUT FAIL",
            };
        }
    };

    return {
        isLoading,
        isAuthenticated,
        username,
        name,
        email,
        signIn,
        signOut,
    };
};