'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAppDispatch } from '@/hooks/store';
import { setUser } from '@/store/slices/userSlice';
import { ProfileApiResponseType } from '@/types/customApi/profileApi';
import ROUTE_PATHS from '@/configs/routePaths';

interface Props {
  data: ProfileApiResponseType | null;
}

const StoreLoginUserHandler = ({ data }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
      router.replace(data.profileCreated ? ROUTE_PATHS.HOME.root : ROUTE_PATHS.ONBOARDING.createProfile);
    }
  }, [data, dispatch, router]);
  return null;
};

export default StoreLoginUserHandler;