'use client';

import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { createClient } from '@/lib/supabase/client';

type UserData = {
  avatarUrl: string;
  fallback: string;
};

const UserAvatar = () => {
  const [avatarInfo, setAvatarInfo] = useState<UserData>({
    avatarUrl: '',
    fallback: ''
  });

  const fetchUserData = async (): Promise<UserData> => {
    const supabase = createClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();

    const avatarUrl = user?.user_metadata?.avatar_url;
    const fallback = user?.user_metadata.full_name?.slice(0, 2);

    return {
      avatarUrl,
      fallback
    };
  };

  useEffect(() => {
    fetchUserData().then((userData) => setAvatarInfo(userData));
  }, []);

  return (
    <Avatar className="cursor-pointer ">
      <AvatarImage src={avatarInfo?.avatarUrl} />
      <AvatarFallback>{avatarInfo.fallback}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
