import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const backend = await fetch(`${apiUrl}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await backend.json();

    if (!backend.ok) {
      // Check if it's a database connection error
      if (data.detail && typeof data.detail === 'string' && data.detail.includes('database')) {
        return NextResponse.json(
          { error: "Database not connected. Please set up PostgreSQL or switch to SQLite in backend/.env" },
          { status: 503 }
        );
      }
      
      return NextResponse.json(
        { error: data.detail || data.message || "Registration failed" },
        { status: backend.status }
      );
    }

    // Return success - user needs to login separately
    return NextResponse.json({ 
      success: true,
      message: data.message || "Account created successfully" 
    });
  } catch (error) {
    console.error("Registration error:", error);
    
    // Check if backend is not responding
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return NextResponse.json(
        { error: "Backend server not responding. Please check if the backend is running on port 8000." },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { error: "Database connection error. Please set up the database to enable registration." },
      { status: 500 }
    );
  }
}
