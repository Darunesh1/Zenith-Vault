'use server';

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const signIn = async ({email, password}: signInProps) => {
    try {
        const { account } = await createAdminClient();
        const response = await account.createEmailPasswordSession(email, password);

        if (response && response.secret) {
            cookies().set("appwrite-session", response.secret, {
                path: "/",
                httpOnly: true,
                sameSite: "strict",
                secure: true,
            });
        } else {
            console.error("Session secret not available.");
        }

        return parseStringify(response);
    } catch (error) {
        console.error('Error during sign-in:', error);
    }
}

export const signUp = async ( userData: SignUpParams) => {
    const {email,password,firstName,lastName} = userData;

    try{
        const { account } = await createAdminClient();

        const newUserAccount = await account.create(
            ID.unique(),
            email,
            password,
            `${firstName} ${lastName}`
        );
        // // for debug
        // console.log("New User Account Created:", newUserAccount)

        const session = await account.createEmailPasswordSession(email, password);

        // console.log("Session Created:", session);//for debugging

        cookies().set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        return parseStringify(newUserAccount);
    }catch(error){
        console.error('Error',error);
    }
}

// ... your initilization functions
export async function getLoggedInUser() {
    try {
        const { account } = await createSessionClient();
        const user = await account.get();

        return parseStringify(user);  // User should be parsed properly here.
    } catch (error) {
        console.error("Error getting logged-in user:", error);
        return null;  // Handle the case when no user is logged in.
    }
}


export const logoutAccount = async () => {
    try {
        const { account } = await createSessionClient();
        cookies().delete('appwrite-session');  // Delete session cookie
        await account.deleteSession('current');  // End session
    } catch (error) {
        console.error('Error during logout:', error);
        return null;
    }
}

  