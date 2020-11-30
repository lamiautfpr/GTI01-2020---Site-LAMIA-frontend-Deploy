import React from 'react';
import { BsChevronDoubleRight, BsChevronDoubleDown } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';

import imgLogo from '../../assets/logo.jpg';

import Header from '../../components/Header';
import NavBar from '../../components/NavBar';

import { SelectPage, Main, HeaderSection, SetionsNews } from './style';

const NewsList: React.FC = () => {
  return (
    <>
      <Header />
      <NavBar page="home" />
      <Main>
        <SetionsNews title="News" id="News">
          <HeaderSection>
            <h2>Notícias</h2>
          </HeaderSection>

          <div>
            <div>
              <img src={imgLogo} alt="Tester" />
              <div>
                <h2>titulo</h2>
                <p>descrição</p>
              </div>
            </div>
            <Link to="home">
              Veja Mais
              <BsChevronDoubleRight />
            </Link>
            <div className="line" />
          </div>
          <div>
            <div>
              <img src={imgLogo} alt="Tester" />
              <div>
                <h2>titulo</h2>
                <p>descrição</p>
              </div>
            </div>
            <Link to="home">
              Veja Mais
              <BsChevronDoubleRight />
            </Link>
            <div className="line" />
          </div>
          <div>
            <div>
              <img src={imgLogo} alt="Tester" />
              <div>
                <h2>titulo</h2>
                <p>descrição</p>
              </div>
            </div>
            <Link to="home">
              Veja Mais
              <BsChevronDoubleRight />
            </Link>
            <div className="line" />
          </div>
          <div>
            <div>
              <img src={imgLogo} alt="Tester" />
              <div>
                <h2>titulo</h2>
                <p>descrição</p>
              </div>
            </div>
            <Link to="home">
              Veja Mais
              <BsChevronDoubleRight />
            </Link>
            <div className="line" />
          </div>
        </SetionsNews>
        <SelectPage>
          <ul>
            <li>
              <Link to="home">1</Link>
            </li>
            <li>
              <Link to="home">2</Link>
            </li>
            <li>
              <Link to="home">3</Link>
            </li>
            <li>
              <Link to="home">4</Link>
            </li>
            <li>
              <Link to="home">5</Link>
            </li>
          </ul>
        </SelectPage>
      </Main>
      <Footer />
    </>
  );
};

export default NewsList;
