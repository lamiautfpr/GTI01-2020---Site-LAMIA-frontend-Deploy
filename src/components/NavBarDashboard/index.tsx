import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FaMedal } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';

import { Container, Header, ItemMenu, Footer } from './styles';
import { useAuth, officesPermitted, hasPermission } from '../../hooks/Auth';
import Button from '../Button';

import imgMemberDefault from '../../assets/imgDefault/member.jpg';

export interface IMenuBurgerProps {
  page?: string;
}

const NavBarDashboard: React.FC<IMenuBurgerProps> = ({ page }) => {
  const { member, signOut } = useAuth();
  const history = useHistory();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [permitted, setPermitted] = useState(() => {
    const checkPermission = officesPermitted.find(
      (officePermitted) => `${officePermitted}` === member.patent.name,
    );

    return !!checkPermission;
  });

  return (
    <Container>
      <Header>
        <Link to="/dashboard">
          <div>
            <img
              src={member.avatar ? member.avatar : imgMemberDefault}
              alt={member.name}
            />
            <div>
              Bem Vindo,
              <span>{member.name}</span>
            </div>
          </div>
          <span>
            <FaMedal size={32} />
            {member.patent.name}
          </span>
          <div className="bar" />
        </Link>
      </Header>

      <ul>
        {hasPermission.includes(member.patent.name) && (
          <>
            <ItemMenu active={page === 'members'}>
              <Link to="/dashboard/members">Integrantes</Link>
            </ItemMenu>
            <ItemMenu active={page === 'expertise-areas'}>
              <Link to="/dashboard/expertise-areas">Área de Atuação</Link>
            </ItemMenu>
            <ItemMenu active={page === 'categories'}>
              <Link to="/dashboard/categories">Categorias de trabalho</Link>
            </ItemMenu>
            <ItemMenu active={page === 'types'}>
              <Link to="/dashboard/types">Tipos de trabalho</Link>
            </ItemMenu>
          </>
        )}
        {[...hasPermission, 'Membro'].includes(member.patent.name) && (
          <>
            <ItemMenu active={page === 'works'}>
              <Link to="/dashboard/works">Produtos</Link>
            </ItemMenu>
          </>
        )}
        <ItemMenu active={page === 'phrases'}>
          <Link to="/dashboard/phrases">Frases para Rodapé</Link>
        </ItemMenu>
      </ul>

      <Footer>
        <div className="bar" />
        <Button
          onClick={() => {
            history.push('/');
            signOut();
          }}
        >
          Sair
          <FiLogOut size={24} />
        </Button>
      </Footer>
    </Container>
  );
};

export default NavBarDashboard;
