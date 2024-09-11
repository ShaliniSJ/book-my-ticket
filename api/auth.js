// src/api/auth.js
import { supabase } from "./supabaseClient";

export const signUp = async (username, email, password) => {
  try {
    const data = await supabase
      .from("users")
      .insert({ username, email, password });
    console.log("Sign-up data:", data);
    return { success: true, data };
  } catch (err) {
    console.error("Unexpected sign-up error:", err);
    return { success: false, error: "Unexpected error occurred." };
  }
};

export const signIn = async (email, password) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("email", email)
      .eq("password", password);

    if (data && data.length > 0) {
      return { success: true, data };
    } else {
      return { success: false, error: "Invalid email or password." };
    }
  } catch (err) {
    console.error("Unexpected sign-in error:", err);
    return { success: false, error: "Unexpected error occurred." };
  }
};
