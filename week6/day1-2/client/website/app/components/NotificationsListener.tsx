// components/NotificationsListener.tsx
'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socket from '@/lib/socket';
import { addNotification } from '@/redux/slices/notificationSlice';
import { toast } from 'sonner';

export default function NotificationsListener() {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth);
  console.log(user.user)
  useEffect(() => {
    if (!user?.user?.id) return;

    const register = () => {
      socket.emit('register', { userId: user.user.id, role: user.user.role });
      console.log('Registered socket:', user.user.id, user.user.role);
    };

    if (socket.connected) register();
    else socket.on('connect', register);

    const handleNotification = (data: { message: string }) => {
      dispatch(addNotification({ message: data.message, _id: `${Date.now()}` }));
      toast(data.message, { duration: 3000 });
    };

    socket.on('newProduct', handleNotification);
    socket.on('productOnSale', handleNotification);
    socket.on('newOrder', handleNotification);

    return () => {
      socket.off('newProduct', handleNotification);
      socket.off('productOnSale', handleNotification);
      socket.off('newOrder', handleNotification);
    };
  }, [user?.user?.id, user?.user?.role, dispatch]);

  return null;
}
