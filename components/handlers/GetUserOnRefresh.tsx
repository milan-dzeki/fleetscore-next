'use client';

import SERVER_METHODS from '@/configs/server/methods';
import { setUser } from '@/store/slices/userSlice';
import { useAppDispatch, useAppSelector } from '@/types/store/hooks';
import { useEffect, useRef, useCallback } from 'react';

const GetUserOnRefresh = () => {
  const { data: authUser } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const fetched = useRef(false);

  const fetchProfileClient = useCallback(async () => {
    if (fetched.current || authUser) {
      return;
    }

    try {
      const response = await fetch('/api/auth', {
        method: SERVER_METHODS.GET,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for cookies
      });

      if (!response.ok) {
        dispatch(setUser(null));
      }

      fetched.current = true;

      const data = await response.json();
      dispatch(setUser(data.data));
    } catch {
      dispatch(setUser(null));
    }
  }, [dispatch, authUser]);
  
  useEffect(() => {
    fetchProfileClient();
  }, [fetchProfileClient])
  return null;
}

export default GetUserOnRefresh