// /lib/auth.ts
export const getLoggedInUser = async (): Promise<null | { id: string; name: string; email: string }> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/check`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data;
  } catch (error) {
    return null;
  }
};
