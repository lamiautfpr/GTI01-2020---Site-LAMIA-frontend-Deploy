import React, { createContext, useCallback, useContext, useState } from 'react';
import { ImageProps } from '../../myTypes/Images';
import { newApi } from '../services/api';
import { useToast } from './Toast';

interface IWorksFilters {
  id: string;
  name: string;
  description?: string;
}

export interface IMembersProps {
  id: number;
  name: string;
  email: string;
  login: string;
  linkedin?: string | null;
  gitHub?: string | null;
  lattes?: string | null;
  quoteName: string;
  description: string;
  avatar?: string;
  patent: IWorksFilters;
}

interface IAuthState {
  token: string;
  member: IMembersProps;
}

interface ISignInCredentials {
  username: string;
  password: string;
}

interface IAuthProviderData {
  token: string;
  member: IMembersProps;
  signIn(credentials: ISignInCredentials): Promise<void>;
  signOut(): void;
  updateMember(member: IMembersProps): void;
}

export const officesPermitted: number[] = [1, 2, 3];
const AuthContext = createContext<IAuthProviderData>({} as IAuthProviderData);

export const AuthProvider: React.FC = ({ children }) => {
  const { addToast } = useToast();

  const [data, setData] = useState<IAuthState>(() => {
    const token = localStorage.getItem('@LAMIA:token');
    const member = localStorage.getItem('@LAMIA:member');

    if (token && member) {
      return { token, member: JSON.parse(member) };
    }

    return {} as IAuthState;
  });

  const signIn = useCallback(
    async ({ username, password }) => {
      try {
        const response = await newApi.post('auth/login', {
          username,
          password,
        });

        const { auth, member } = response.data;

        localStorage.setItem('@LAMIA:token', auth.accessToken);
        localStorage.setItem('@LAMIA:member', JSON.stringify(member));

        setData({ token: auth.accessToken, member });
      } catch (error) {
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais',
        });
      }
    },
    [addToast],
  );

  const signOut = useCallback(() => {
    localStorage.removeItem('@LAMIA:token');
    localStorage.removeItem('@LAMIA:member');
  }, []);

  const updateMember = useCallback(
    (member: IMembersProps) => {
      setData({
        token: data.token,
        member,
      });
      localStorage.setItem('@LAMIA:member', JSON.stringify(member));
    },
    [data.token],
  );

  return (
    <AuthContext.Provider
      value={{
        token: data.token,
        member: data.member,
        signIn,
        signOut,
        updateMember,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): IAuthProviderData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('Usou Auth sem a inicialização do AuthProvider');
  }

  return context;
}
