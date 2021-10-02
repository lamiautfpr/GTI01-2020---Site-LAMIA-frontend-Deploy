import React from 'react';
import { stack as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { Nav, NavItem, styleBugerMenu } from './style';

interface IMenuBurgerProps {
  page?:
    | 'members'
    | 'products'
    | 'projects'
    | 'publications'
    | 'home'
    | 'recruitment';
}

const NavBar: React.FC<IMenuBurgerProps> = ({ page }) => {
  return (
    <>
      <Nav>
        <ul>
          <NavItem active={page === 'home'}>
            <Link to="/">Home</Link>
            <ul className="DropDraw">
              <NavItem>
                <HashLink smooth to="/#Statistics">
                  Linhas de Códigos Produzidas
                </HashLink>
              </NavItem>
              <li>
                <NavItem>
                  <HashLink smooth to="/#News">
                    Notícias
                  </HashLink>
                </NavItem>
              </li>
              <NavItem>
                <HashLink smooth to="/#Mission">
                  Missão
                </HashLink>
              </NavItem>
              <NavItem>
                <HashLink smooth to="/#LatestPublications">
                  Ultimas publicações
                </HashLink>
              </NavItem>
              <NavItem>
                <HashLink smooth to="/#AreasExpertise">
                  Áreas de Atuação
                </HashLink>
              </NavItem>
              <NavItem>
                <HashLink smooth to="/#Partners">
                  Parceiros
                </HashLink>
              </NavItem>
              <NavItem>
                <HashLink smooth to="/#Advisors">
                  Orientadores
                </HashLink>
              </NavItem>
            </ul>
          </NavItem>
          <NavItem active={page === 'products'}>
            <Link to="/works/products">Produtos</Link>
          </NavItem>
          <NavItem active={page === 'projects'}>
            <Link to="/works/projects">Projetos</Link>
          </NavItem>
          <NavItem active={page === 'publications'}>
            <Link to="/works/publications">Publicações</Link>
          </NavItem>
          <NavItem active={page === 'members'}>
            <Link to="/members">Integrantes</Link>
          </NavItem>
          <NavItem active={page === 'recruitment'}>
            <Link to="/processo-seletivo">Processo Seletivo</Link>
          </NavItem>
        </ul>
        <Menu right styles={{ bmOverlay: styleBugerMenu.bmOverlay }}>
          <ul>
            <NavItem active={page === 'home'}>
              <Link to="/">Home</Link>
              <ul className="DropDraw">
                <NavItem>
                  <HashLink smooth to="/#Statistics">
                    Linhas de Códigos Produzidas
                  </HashLink>
                </NavItem>
                <li>
                  <NavItem>
                    <HashLink smooth to="/#News">
                      Notícias
                    </HashLink>
                  </NavItem>
                </li>
                <NavItem>
                  <HashLink smooth to="/#Mission">
                    Missão
                  </HashLink>
                </NavItem>
                <NavItem>
                  <HashLink smooth to="/#LatestPublications">
                    Ultimas publicações
                  </HashLink>
                </NavItem>
                <NavItem>
                  <HashLink smooth to="/#AreasExpertise">
                    Áreas de Atuação
                  </HashLink>
                </NavItem>
                <NavItem>
                  <HashLink smooth to="/#Partners">
                    Parceiros
                  </HashLink>
                </NavItem>
                <NavItem>
                  <HashLink smooth to="/#Advisors">
                    Orientadores
                  </HashLink>
                </NavItem>
              </ul>
            </NavItem>
            <NavItem active={page === 'products'}>
              <Link to="/works/products">Produtos</Link>
            </NavItem>
            <NavItem active={page === 'projects'}>
              <Link to="/works/projects">Projetos</Link>
            </NavItem>
            <NavItem active={page === 'publications'}>
              <Link to="/works/publications">Publicações</Link>
            </NavItem>
            <NavItem active={page === 'members'}>
              <Link to="/members">Integrantes</Link>
            </NavItem>
            <NavItem active={page === 'recruitment'}>
              <Link to="/processo-seletivo">Processo Seletivo</Link>
            </NavItem>
          </ul>
        </Menu>
      </Nav>
    </>
  );
};

export default NavBar;
