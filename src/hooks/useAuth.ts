import { useState, useEffect } from 'react';
import { API_URL } from '@/lib/api';

interface User {
  id: string;
  username: string;
  robloxUserId: string;
  avatarUrl?: string;
  balance?: number;
  totalBet?: number;
  totalProfit?: number;
  totalWon?: number;
  inventoryTotalValue?: number;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    console.log('useAuth: Fetching user with token');

    let responseStatus: number | null = null;

    try {
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 8000);
      const response = await fetch(`${API_URL}/auth/me`, {
        signal: controller.signal,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      window.clearTimeout(timeout);
      responseStatus = response.status;
      const data = await response.json();

      console.log('useAuth: Response:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch user');
      }

      setUser(data);
      console.log('useAuth: User set:', data);
      console.log('useAuth: User ID:', data.id);
    } catch (err) {
      console.error('useAuth: Error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      if (responseStatus === 401 || (err instanceof Error && err.message.toLowerCase().includes('token'))) {
        localStorage.removeItem('token');
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return {
    user,
    loading,
    error,
    fetchUser,
    refresh: fetchUser,
  };
};
