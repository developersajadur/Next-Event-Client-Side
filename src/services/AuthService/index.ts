"use server";
import { IUser, ResetPasswordPayload } from "@/app/types";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

// register user
export const registerUser = async (userData: FieldValues) => {
  try {
    const formData = new FormData();
    const { file, ...restData } = userData;

    if (file) {
      formData.append("file", file);
    } else {
      console.log("⚠️ No file selected to upload.");
    }

    formData.append("data", JSON.stringify(restData));

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/register`,
      {
        method: "POST",
        body: formData,
        credentials: "include",
      }
    );

    const userInfo = await res.json();
    return userInfo;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//login user
export const loginUser = async (userData: FieldValues) => {
  // console.log(loginUser);
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    // console.log(res);
    const userInfo = await res.json();
    if (userInfo.success) {
      (await cookies()).set("accessToken", userInfo.data.accessToken);
    }

    return userInfo;
  } catch (error) {
    console.error(error);
  }
};

export const getCurrentUser = async () => {
  const token = (await cookies()).get("accessToken")?.value;
  let decodedData = null;

  if (token) {
    decodedData = await jwtDecode<IUser>(token);
    return decodedData;
  } else {
    return null;
  }
};

export const getToken = async () => {
  return (await cookies()).get("accessToken")?.value;
};

// log out
export const logOut = async () => {
  (await cookies()).delete("accessToken");
};

// change password
export const changePassword = async (
  formData: {
    oldPassword: string;
    newPassword: string;
  },
  token: string
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/change-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(formData),
      }
    );

    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// forget password
export const ForgetPassword = async (userData: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/forget-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to send reset link");
    }

    return await res.json();
  } catch (error: any) {
    console.log(error);
    throw new Error("Something went wrong");
  }
};

// reset password
export const ResetPassword = async ({
  userId,
  token,
  newPassword,
}: ResetPasswordPayload) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          userId,
          newPassword,
        }),
      }
    );

    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message);
    }
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};
