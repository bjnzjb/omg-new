// src/app/api.ts

// A simple helper function to simulate fetching user data
export async function getUsers() {
  // Here you would call your database or external API to get users.
  // For demonstration, we are using static data.
  return [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' }
  ];
}

// A function to simulate user creation
export async function createUser(name: string, email: string) {
  // Simulate user creation (this would normally involve database logic)
  const newUser = { id: Math.random(), name, email };
  return newUser;
}
