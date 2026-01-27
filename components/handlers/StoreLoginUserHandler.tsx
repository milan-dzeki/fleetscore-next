'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/types/store/hooks';
import { setUser } from '@/store/slices/userSlice';
import { ProfileApiResponseType } from '@/types/customApi/profileApi';

interface Props {
  data: ProfileApiResponseType | null;
}

const StoreLoginUserHandler = ({ data }: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    }
  }, [data, dispatch]);
  return null;
};

export default StoreLoginUserHandler;