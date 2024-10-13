'use server';

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const signIn = async () => {
    try{
        // mutation / database /Make fetch
    }catch(error){
        console.error('Error',error);
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
        // for debug
        console.log("New User Account Created:", newUserAccount)

        const session = await account.createEmailPasswordSession(email, password);

        console.log("Session Created:", session);//for debugging

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
      return await account.get();
    } catch (error) {
      return null;
    }
  }
  