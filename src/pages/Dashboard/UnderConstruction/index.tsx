import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import NavBarDashboard from '../../../components/NavBarDashboard';
// import imgMemberDefault from '../../../assets/imgDefault/member.jpg';
import { Container, Content, HeaderSection } from './styles';

const UnderConstruction: React.FC = () => {
  const { path } = useRouteMatch();
  const [title, setTitle] = useState<'Frases' | undefined>(() => {
    if (path.includes('phrases')) {
      return 'Frases';
    }
  });

  useEffect(() => {
    if (path.includes('phrases')) {
      setTitle('Frases');
    }
  }, [path]);

  return (
    <Container>
      <NavBarDashboard page="phrases" />
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
