import React, { useEffect, useState } from 'react';
import {
  FaEnvelope,
  FaGithub,
  FaGithubSquare,
  FaLinkedinIn,
  FaListUl,
  FaMedal,
  FaRegCalendarAlt,
  FaRegClipboard,
} from 'react-icons/fa';
import { Link, useRouteMatch } from 'react-router-dom';
import { WorkListProps } from '../../../myTypes/WorkListProps';
import iconLattes from '../../assets/icons/lattes.svg';
import imgMemberDefault from '../../assets/imgDefault/member.jpg';
import imgWorkDefault from '../../assets/imgDefault/work1.png';
import imgDoubt from '../../assets/imgWarning/doubt.jpg';
import imgTraining from '../../assets/imgWarning/training.gif';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import { IMembersProps } from '../../hooks/Auth';
import { newApi } from '../../services/api';
import { Card, CardWarning, Headline, Main, Shelf, Title } from './style';

interface MembersParams {
  login: string;
}

interface MembersPageProps extends IMembersProps {
  works: WorkListProps[];
}

const Member: React.FC = () => {
  const { params } = useRouteMatch<MembersParams>();
  const [getApi, setGetApi] = useState(false);

  const [member, setMember] = useState<MembersPageProps | null>(null);

  useEffect(() => {
    newApi.get<MembersPageProps>(`members/${params.login}`).then((response) => {
      setMember(response.data);
      setGetApi(true);
    });
  }, [params.login]);

  return (
    <>
      <Header
        title={member?.quoteName ? `LAMIA - ${member?.quoteName}` : 'LAMIA'}
      />

      <NavBar />
      <Main>
        {member ? (
          <>
            <Headline>
              <div className="basicInfo">
                <div className="leftInfo">
                  <div className="column">
                    <div className="name">
                      <h1>{member.name}</h1>
                    </div>
                    <div className="icons">
                      <div className="office">
                        <FaMedal size={21} />
                        <span>{member.patent.name}</span>
                      </div>
                      {member.gitHub && (
                        <a
                          href={`https://github.com/${member.gitHub}`}
                          target="bank"
                        >
                          <FaGithubSquare size={26} />
                        </a>
                      )}
                      {member.linkedin && (
                        <a
                          href={`https://br.linkedin.com/public-profile/in/${member.linkedin}`}
                          target="bank"
                        >
                          <FaLinkedinIn size={26} />
                        </a>
                      )}
                      {member.lattes && (
                        <a
                          href={`http://lattes.cnpq.br/${member.lattes}`}
                          target="bank"
                        >
                          <img src={iconLattes} alt="Lattes" />
                        </a>
                      )}
                    </div>
                    <a href={`mailto:${member.email}`} className="contact">
                      <FaEnvelope size={20} />
                      {member.email}
                    </a>
                  </div>
                </div>
                <div className="leftInfo">
                  <div className="description">
                    <span>Descrição: </span>
                    {member.description}
                  </div>
                </div>
              </div>

              <div className="imgBorde">
                <div>
                  <img
                    src={member.avatar ? member.avatar : imgMemberDefault}
                    alt={member.name}
                  />
                </div>
              </div>
            </Headline>

            <Title>
              <header>
                <h2>Projetos</h2>
              </header>
            </Title>
            {member.works.length > 0 ? (
              <Shelf>
                {member.works.map((workData) => {
                  return (
                    <Card key={workData.id}>
                      <img
                        src={
                          workData.pictures?.length > 0
                            ? workData.pictures[0].src
                            : imgWorkDefault
                        }
                        alt="Capa do Projeto"
                      />
                      {/* <div className="imgCase" /> */}
                      <div className="bookContainer">
                        <div className="content">
                          <Link to={`/work/${workData.slug}`}>
                            <button type="button"> Saiba mais </button>
                          </Link>
                        </div>
                      </div>
                      <div className="informationContainer">
                        <h2 className="title">
                          {workData.title.length <= 25
                            ? workData.title
                            : `${workData.title.slice(0, 25)}...`}
                        </h2>
                        <div className="primaryInformation">
                          {workData.areaExpertise.length > 0 && (
                            <span>
                              <FaListUl size={16} />
                              {workData.areaExpertise.map(
                                (area) => `${area.name}; `,
                              )}
                            </span>
                          )}
                          {workData.types.length > 0 && (
                            <span>
                              <FaRegClipboard size={16} />
                              {workData.types.map((type) => `${type.name}; `)}
                            </span>
                          )}
                        </div>

                        <div className="moreInformation">
                          <div className="infoDateContainer">
                            {workData.urlGithub && (
                              <a
                                href={workData.urlGithub}
                                target="bank"
                                className="box git"
                              >
                                <FaGithub size={24} />
                                <p>Repositório</p>
                              </a>
                            )}

                            <div className="box Date">
                              <FaRegCalendarAlt size={24} />
                              <p>{workData.startDate}</p>
                            </div>
                          </div>
                          <div className="objective">
                            <p>
                              {`${workData.objective?.slice(0, 80)}`}
                              {workData.objective &&
                                workData.objective.length > 80 &&
                                '...'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </Shelf>
            ) : (
              <CardWarning>
                <img src={imgTraining} alt="em treinamento" />
                <h2>Jovem padoã em treinamento</h2>
              </CardWarning>
            )}
          </>
        ) : (
          getApi && (
            <CardWarning>
              <img src={imgDoubt} alt="membro errado" />
              <h2>
                Membro errado amigo.
                <br />
                Estava me testando?
              </h2>
            </CardWarning>
          )
        )}
      </Main>
      <Footer />
    </>
  );
};

export default Member;
