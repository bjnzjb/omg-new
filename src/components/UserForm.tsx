// src/components/UserForm.tsx
import { useState } from 'react';
import { post } from 'lib/apiClient'; // Import the POST method from apiClient.ts

const UserForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newUser = await post('/users', { name, email }); // Use the post method to send data
      setMessage(`User created: ${newUser.name}`);
    } catch (error) {
      setMessage('Failed to create user');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Create User</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default UserForm;
