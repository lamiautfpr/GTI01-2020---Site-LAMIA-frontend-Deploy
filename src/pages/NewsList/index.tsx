/* eslint-disable @typescript-eslint/interface-name-prefix */
import React, { useEffect, useState } from 'react';
import { BsChevronDoubleRight } from 'react-icons/bs';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Link, useLocation } from 'react-router-dom';
import { ImageProps } from '../../../myTypes/Images';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import api from '../../services/api';
import { HeaderSection, Main, SectionsNews, SelectPage } from './style';

interface INewsProps {
  datePublication: string;
  coverUrl: string;
  id: number;
  title: string;
  content: string;
  pictures: ImageProps[];
}

const NewsList: React.FC = () => {
  const [news, setNews] = useState<INewsProps[]>([]);
  const [indexPages, setIndexPages] = useState([1]);
  const [page, setPage] = useState<number>(1);
  const location = useLocation();

  useEffect(() => {
    const locationPage = location.search.replace('?page=', '');

    // eslint-disable-next-line radix
    const currentPage = parseInt(locationPage) || 1;

    setPage(currentPage);
    api.get(`news?page=${currentPage}`).then((response) => {
      setNews(response.data.news);
      setIndexPages(response.data.totalPages);
    });
  }, [location.search]);

  return (
    <>
      <Header />
      <NavBar page="home" />
      <Main>
        <SectionsNews title="News" id="News">
          <HeaderSection>
            <h2>Notícias</h2>
          </HeaderSection>

          {news.map((n) => (
            <div key={n.id}>
              <div>
                <img src={n.coverUrl} alt={n.title} />
                <div>
                  <h2>{n.title}</h2>
                  <p>{n.content.split('\n')[0]}</p>
                </div>
              </div>
              <Link to={`/news/${n.id}`}>
                Veja Mais
                <BsChevronDoubleRight />
              </Link>
              <div className="line" />
            </div>
          ))}
        </SectionsNews>
        <SelectPage currentPage={page}>
          <ul>
            {page !== 1 && (
              <li>
                <Link to={`/news?page=${page - 1}`}>
                  <IoIosArrowBack size={24} />
                </Link>
              </li>
            )}
            {indexPages.map((p) => (
              <li key={p}>
                <Link to={`/news?page=${p}`}>{p}</Link>
              </li>
            ))}
            {page !== indexPages.length && (
              <li>
                <Link to={`/news?page=${page + 1}`}>
                  <IoIosArrowForward size={24} />
                </Link>
              </li>
            )}
          </ul>
        </SelectPage>
      </Main>
      <Footer />
    </>
  );
};

export default NewsList;
