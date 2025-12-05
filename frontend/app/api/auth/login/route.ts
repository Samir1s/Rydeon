import { NextResponse } from "next/server";
import { API_URL } from "@/config/api";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    
    console.log("API URL being used:", API_URL); // Debug log
    
    const backend = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await backend.json();

    if (!backend.ok) {
      return NextResponse.json(
        { error: data.detail || data.message || "Login failed" },
        { status: backend.status }
      );
    }

    const res = NextResponse.json({ 
      success: true,
      token: data.access_token 
    });

    res.cookies.set("token", data.access_token, {
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (error) {
    console.error("Login error:", error);
    
    // Check if backend is not responding
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return NextResponse.json(
        { error: "Backend server not responding. Please check if the backend is running on port 8000." },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { error: "Database connection error. Please set up the database to enable login." },
      { status: 500 }
    );
  }
}
