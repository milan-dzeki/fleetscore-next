'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/hooks/store';
import { updateNames } from '@/store/slices/userSlice';
import { useRouter } from 'next/navigation';
import ROUTE_PATHS from '@/configs/routePaths';

interface Props {
  data: {
    firstName: string;
    lastName: string;
  } | null;
}

const UpdateUserProfile = ({ data }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const execute = async () => {
      if (data && data.firstName && data.lastName) {
        dispatch(updateNames({
          firstName: data.firstName,
          lastName: data.lastName
        }));

        router.refresh();
        router.replace(ROUTE_PATHS.HOME.root);
      }
    };
    execute();
  }, [data, dispatch, router]);
  return null;
};

export default UpdateUserProfile;