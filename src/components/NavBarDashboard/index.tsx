import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FaMedal } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';

import { Container, Header, ItemMenu, Footer } from './styles';
import { useAuth, officesPermitted } from '../../hooks/Auth';
import Button from '../Button';

import imgMemberDefault from '../../assets/imgDefault/member.jpg';

interface IMenuBurgerProps {
  page?:
    | 'members'
    | 'Produtos'
    | 'Projetos'
    | 'Publicações'
    | 'phrases'
    | 'administrative';
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
        {/* Apenas para Administrador, Coordenador, Orientador */}
        {['Administrador', 'Coordenador', 'Orientador'].includes(
          member.patent.name,
        ) && (
          <ItemMenu active={page === 'members'}>
            <Link to="/dashboard/members">Integrantes</Link>
          </ItemMenu>
        )}
        <ItemMenu active={page === 'Produtos'}>
          <Link to="/dashboard/products">Produtos</Link>
        </ItemMenu>
        <ItemMenu active={page === 'Projetos'}>
          <Link to="/dashboard/projects">Projetos</Link>
        </ItemMenu>
        <ItemMenu active={page === 'Publicações'}>
          <Link to="/dashboard/publications">Publicações</Link>
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
