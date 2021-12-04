import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { BsChevronDoubleDown, BsChevronDoubleRight } from 'react-icons/bs';
import { GoGitBranch, GoGitCommit, GoRepo, GoStar } from 'react-icons/go';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { ImageProps } from '../../../myTypes/Images';
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
import api, { newApi } from '../../services/api';
import {
  CardWarning,
  HeaderSection,
  Main,
  SectionCards,
  SectionColumn,
  SectionLine,
  SectionNews,
  SectionVip,
} from './style';

interface IAreasExpertiseProps {
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

interface IAdvisorsProps {
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

interface IWorkListProps {
  slug: string;
  title: string;
  objective: string;
  coverUrl: string;
}

const Home: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isUsedNewAPI, _] = useState<boolean>(
    !!process.env.REACT_APP_NEW_API_FLAG,
  );

  const [areaExpertises, setAreaExpertises] = useState<IAreasExpertiseProps[]>(
    [],
  );

  const [partners, setPartners] = useState<PartnerProps[]>([]);

  const [lastWork, setLastWork] = useState<IWorkListProps[]>([]);

  const [advisors, setAdvisors] = useState<IAdvisorsProps[]>([]);
  const [news, setNews] = useState<NewsProps[]>([]);

  useEffect(() => {
    newApi
      .get(`/works`, {
        params: {
          orderBy: 'createAt',
          direction: 'DESC',
          perPage: 3,
        },
      })
      .then((response) => {
        setLastWork(response.data.works);
      });

    newApi
      .get<IAreasExpertiseProps[]>(`/works/areas-expertise`)
      .then((response) => {
        setAreaExpertises(response.data);
      });

    newApi.get(`members/patents/Orientador`).then((response) => {
      console.log(response);
      setAdvisors(response.data.members);
    });

    if (!isUsedNewAPI) {
      api.get<PartnerProps[]>(`partners`).then((response) => {
        setPartners(response.data);
      });

      api.get(`news`).then((response) => {
        setNews(response.data.news);
      });
    }
  }, [isUsedNewAPI]);

  return (
    <>
      <Header />

      <NavBar page="home" />

      <Main>
        {!isUsedNewAPI && (
          <>
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
          </>
        )}
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
                <Link to={`/work/${work.slug}`} key={work.slug}>
                  <img src={work.coverUrl || imgWorkDefault} alt={work.title} />
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
        {!isUsedNewAPI && (
          <>
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
          </>
        )}
        <SectionColumn id="Advisors">
          <HeaderSection>
            <h2>Orientadores</h2>
          </HeaderSection>
          {advisors.length > 0 ? (
            <div>
              <>
                {advisors.map((advisor) => (
                  <Link to={`/${advisor.login}`} key={advisor.login}>
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
