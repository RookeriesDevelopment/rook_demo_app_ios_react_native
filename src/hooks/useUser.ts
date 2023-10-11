import { Platform } from 'react-native';
import { useRookUser } from 'rook_users';

type useUserProps = {
  user: string | number;
};

export const useUser = () => {
  const { getUserID, registerUser, ready } = useRookUser();

  const checkUserID = async (): Promise<string> => {
    const saved = await getUserID();

    if (saved) {
      return saved.user_id;
    }

    throw new Error('No user registered');
  };

  const updateUser = async ({ user }: useUserProps): Promise<string> => {
    const response = await registerUser({
      user,
      dataSource: Platform.OS === 'android' ? 'Health Connect' : 'Apple Health',
    });

    return response.user_id;
  };

  return {
    ready,
    checkUserID,
    updateUser,
  };
};
