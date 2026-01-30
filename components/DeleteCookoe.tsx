'use client';


import { useEffect } from "react";

const DeleteCookoe = () => {
  useEffect(() => {
    async function deleteCookie() {
      await fetch('/api/auth/delete-email-cookie', { method: 'POST', credentials: 'include' });
    }
    deleteCookie();
  }, []);
  return null;
}

export default DeleteCookoe