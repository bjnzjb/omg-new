// src/hooks/useAuth.ts
import { useState } from 'react';

export default function useAuth() {
  const [user, setUser] = useState<any>(null);

  const login = (username: string, password: string) => {
    // Implement login logic here (e.g., API call)
    setUser({ username });
  };

  const logout = () => {
    setUser(null);
  };

  return {
    user,
    login,
    logout
  };
}
