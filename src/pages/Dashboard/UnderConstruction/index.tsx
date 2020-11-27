import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import NavBarDashboard from '../../../components/NavBarDashboard';
// import imgMemberDefault from '../../../assets/imgDefault/member.jpg';
import { Container, Content, HeaderSection } from './styles';

const UnderConstruction: React.FC = () => {
  const { path } = useRouteMatch();
  const [title, setTitle] = useState<
    'Publicações' | 'Produtos' | 'Projetos' | undefined
  >(() => {
    if (path.includes('publications')) {
      return 'Publicações';
    }
    if (path.includes('products')) {
      return 'Produtos';
    }
    if (path.includes('projects')) {
      return 'Projetos';
    }
    return undefined;
  });

  useEffect(() => {
    if (path.includes('publications')) {
      setTitle('Publicações');
    } else if (path.includes('products')) {
      setTitle('Produtos');
    } else if (path.includes('projects')) {
      setTitle('Projetos');
    } else {
      setTitle(undefined);
    }
  }, [path]);

  return (
    <Container>
      <NavBarDashboard page={title} />
      <Content>
        <HeaderSection>
          <h2>{title}</h2>
          <div className="bar" />
        </HeaderSection>

        <div className="warning">
          <img
            src="https://static.wixstatic.com/media/27b0f6_3744fbfc1bd04ed1b8e63cd09925c2bc~mv2.gif"
            alt="Pagina em Construção"
          />
          <strong>
            Estamos estudando a melhor forma para construir está página
          </strong>
          <span>Nosso objetivo é trazer a melhor experiência para você</span>
        </div>
      </Content>
    </Container>
  );
};

export default UnderConstruction;
