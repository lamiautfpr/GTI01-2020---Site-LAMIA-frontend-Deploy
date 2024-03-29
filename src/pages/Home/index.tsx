import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { BsChevronDoubleDown, BsChevronDoubleRight } from 'react-icons/bs';
import { GoGitBranch, GoGitCommit, GoRepo, GoStar } from 'react-icons/go';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { ImageProps } from '../../../myTypes/Images';
import { WorkListProps } from '../../../myTypes/WorkListProps';
import { imageAreaExpertises, mission } from '../../assets/dataStatistic';
import imgTeacherDefault from '../../assets/imgDefault/teacher.png';
import imgWorkDefault from '../../assets/imgDefault/work1.png';
import imgDisoriented from '../../assets/imgWarning/disoriented.jpg';
import imgFocus from '../../assets/imgWarning/focus.gif';
import imgDoPartner from '../../assets/imgWarning/partner.jpg';
import imgLogo from '../../assets/logo.jpg';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import Slider from '../../components/Slider';
import api from '../../services/api';
import {
  CardWarning,
  HeaderSection,
  Main,
  SectionCards,
  SectionColumn,
  SectionLine,
  SectionVip,
  SectionNews,
} from './style';

interface StatisticsProps {
  countRepositories: number;
  countCommits: number;
  countBranches: number;
  countStars: number;
}

interface AreasExpertiseProps {
  id: number;
  name: string;
  description?: string | null;
}

interface PartnerProps {
  id: number;
  name: string;
  logoUrl?: string | null;
  linkPage?: string | null;
}

interface AdvisorsProps {
  id: number;
  name: string;
  description: string;
  avatar: ImageProps;
  login: string;
}

interface NewsProps {
  id: number;
  title: string;
  content: string;
  datePublication: string;
  coverUrl: string;
  pictures: ImageProps[];
}

const Home: React.FC = () => {
  const [areaExpertises, setAreaExpertises] = useState<AreasExpertiseProps[]>(
    [],
  );

  const [partners, setPartners] = useState<PartnerProps[]>([]);

  const [lastWork, setLastWork] = useState<WorkListProps[]>([]);

  const [advisors, setAdvisors] = useState<AdvisorsProps[]>([]);
  const [news, setNews] = useState<NewsProps[]>([]);

  useEffect(() => {
    api.get<AreasExpertiseProps[]>(`area-expertises`).then((response) => {
      setAreaExpertises(response.data);
    });

    api.get<PartnerProps[]>(`partners`).then((response) => {
      setPartners(response.data);
    });

    api
      .get<WorkListProps[]>(`last-work`, {
        params: {
          limit: 3,
        },
      })
      .then((response) => {
        setLastWork(response.data);
      });

    api.get<AdvisorsProps[]>(`members/Orientador`).then((response) => {
      setAdvisors(response.data);
    });

    api.get(`news`).then((response) => {
      setNews(response.data.news);
    });
  }, []);

  return (
    <>
      <Header />

      <NavBar page="home" />

      <Main>
        <SectionNews title="News" id="News">
          <HeaderSection>
            <h2>Notícias</h2>
          </HeaderSection>
          <Slider className="slider-news">
            {news.map((n) => (
              <div className="slider-news-item" key={n.id}>
                <div>
                  <img src={n.coverUrl} alt={n.title} />
                  <div>
                    <h2>{n.title}</h2>
                    <p>{n.content.split('\\n')[0]}</p>
                  </div>
                </div>
                <Link to={`news/${n.id}`}>
                  Todas Notícias
                  <BsChevronDoubleRight />
                </Link>
              </div>
            ))}
          </Slider>

          <Link to="/news">
            Mais Noticias
            <BsChevronDoubleDown />
          </Link>
        </SectionNews>
        <hr />
        <SectionLine id="Mission">
          <HeaderSection>
            <h2>História e Missão</h2>
          </HeaderSection>
          <div>
            <div>
              <ReactMarkdown>{mission}</ReactMarkdown>
            </div>
            <img src={imgLogo} alt="LAMIA" />
          </div>
        </SectionLine>
        <hr />
        <SectionColumn title="LatestPublications" id="LatestPublications">
          <HeaderSection>
            <h2>Últimas Publicações e Projetos</h2>
          </HeaderSection>
          {lastWork.length > 0 ? (
            <div>
              {lastWork.map((work) => (
                <Link to={`/work/${work.id}`} key={work.id}>
                  <img
                    src={
                      work.pictures?.length > 0
                        ? work.pictures[0].src
                        : imgWorkDefault
                    }
                    alt={
                      work.pictures.length > 0
                        ? work.pictures[0].name
                        : 'Capa do Projeto'
                    }
                  />
                  <header>
                    <h2>{work.title}</h2>
                  </header>
                  <p>
                    {work.objective.length <= 130
                      ? work.objective
                      : `${work.objective?.slice(0, 130)}...`}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <CardWarning>
              <img src={imgFocus} alt="plusUltra" />
              <h2>Estamos dando PLUS ULTRA para publiar nosso trabalho</h2>
            </CardWarning>
          )}
        </SectionColumn>
        <hr />
        <SectionCards title="Statistics" id="Statistics">
          <HeaderSection>
            <h2>Tecnologias Produzidas</h2>
          </HeaderSection>
          <div>
            <div>
              <h3>Repositórios</h3>
              <div>
                <GoRepo />
                <CountUp delay={1} end={12} />
              </div>
            </div>
            <div>
              <h3>Commits</h3>
              <div>
                <GoGitCommit />
                <CountUp delay={1} end={3213} />
              </div>
            </div>
            <div>
              <h3>Branches</h3>
              <div>
                <GoGitBranch />
                <CountUp delay={1} end={24} />
              </div>
            </div>
            <div>
              <h3>Star</h3>
              <div>
                <GoStar />
                <CountUp delay={1} end={10} />
              </div>
            </div>
          </div>
        </SectionCards>
        <hr />
        <SectionColumn id="AreasExpertise">
          <HeaderSection>
            <h2>Área de Atuação</h2>
          </HeaderSection>
          <div>
            {areaExpertises.map((area, index) => (
              <div key={area.id}>
                <img
                  className="area-expertise"
                  src={imageAreaExpertises[index]}
                  alt={area.name}
                />
                <header>
                  <h2>{area.name}</h2>
                </header>
                <p>
                  {area.description
                    ? `${area.description.split('.')[0]}.`
                    : 'Lendo alguns artigos para definição perfeita da aplicação científica e industrial. Isso pode demorar um pouco...'}
                </p>
              </div>
            ))}
          </div>
        </SectionColumn>
        <hr />
        <SectionVip id="Partners">
          <header>
            <h2>Parceiros</h2>
            {partners.length > 0 && (
              <a href="mailto:naves@utfpr.edu.br">seja um parceiro</a>
            )}
          </header>
          {partners.length > 0 ? (
            <div>
              {partners.map((partner) => (
                <a
                  href={
                    partner.linkPage ||
                    'https://www.lamia.sh.utfpr.edu.br/#Partners'
                  }
                  key={partner.id}
                  target="bank"
                >
                  {partner.logoUrl ? (
                    <img src={partner.logoUrl} alt={partner.name} />
                  ) : (
                    <h2>{partner.name}</h2>
                  )}
                </a>
              ))}
            </div>
          ) : (
            <CardWarning textColor="#f0f0f0">
              <img src={imgDoPartner} alt="logoLex" />
              <a href="mailto:naves@utfpr.edu.br">seja um parceiro</a>
            </CardWarning>
          )}
        </SectionVip>
        <hr />
        <SectionColumn id="Advisors">
          <HeaderSection>
            <h2>Orientadores</h2>
          </HeaderSection>
          {advisors.length > 0 ? (
            <div>
              <>
                {advisors.map((advisor) => (
                  <Link to={`/${advisor.login}`} key={advisor.id}>
                    <img
                      src={
                        advisor.avatar ? advisor.avatar.src : imgTeacherDefault
                      }
                      alt={advisor.avatar ? advisor.avatar.name : 'sem imagem'}
                    />
                    <header>
                      <h2>{advisor.name}</h2>
                    </header>
                    <p>{advisor.description}</p>
                  </Link>
                ))}
              </>
            </div>
          ) : (
            <CardWarning>
              <img src={imgDisoriented} alt="sem orientador" />
              <h2>Estamos desorientados</h2>
            </CardWarning>
          )}
        </SectionColumn>
      </Main>

      <Footer />
    </>
  );
};

export default Home;
