// src/app/api/users/route.ts
import { NextResponse } from 'next/server';
import { getUsers, createUser } from '../api'; // Import functions from api.ts

// Handle GET request for fetching users
export async function GET() {
  try {
    const users = await getUsers(); // Call getUsers function from api.ts
    return NextResponse.json(users); // Return the list of users in JSON format
  } catch (error) {
    return NextResponse.error(); // Handle errors and return a response
  }
}

// Handle POST request for creating a new user
export async function POST(req: Request) {
  try {
    const { name, email } = await req.json(); // Extract data from the request body
    const newUser = await createUser(name, email); // Call createUser from api.ts
    return NextResponse.json(newUser, { status: 201 }); // Return the newly created user
  } catch (error) {
    return NextResponse.error(); // Handle errors and return a response
  }
}
