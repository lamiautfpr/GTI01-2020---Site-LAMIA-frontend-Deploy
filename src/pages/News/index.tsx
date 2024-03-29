import React, { useCallback, useEffect, useState } from 'react';
import Carousel, { Modal, ModalGateway } from 'react-images';
import Gallery from 'react-photo-gallery';
import { useRouteMatch } from 'react-router-dom';
import { ImageProps } from '../../../myTypes/Images';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import { Cover, HeaderSection, Main, ShelfGallery } from './styles';
import api from '../../services/api';

interface NewsProps {
  id: number;
  title: string;
  content: string;
  datePublication: string;
  coverUrl: string;
  source: string;
  pictures: ImageProps[];
  font: string;
}
interface RouterMatch {
  id: string;
}

const News: React.FC = () => {
  const { params } = useRouteMatch<RouterMatch>();
  const [news, setNews] = useState<NewsProps>({} as NewsProps);
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);
  const closeLightbox = useCallback((): void => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  }, []);

  useEffect(() => {
    api.get(`news/${params.id}`).then((response) => {
      setNews(response.data);
    });
  }, [params.id]);

  return (
    <>
      <Header />
      <NavBar />
      {news.title && (
        <Main>
          <h1>{news.title}</h1>
          <p className="info">
            Data de publicação:&nbsp;
            <span>{news.datePublication}</span>
          </p>
          <Cover>
            <div className="line" />
            <img src={news.coverUrl} alt={news.title} />
            <div className="line" />
          </Cover>
          <HeaderSection>
            <h2>Descrição</h2>
          </HeaderSection>
          {news.content.split('\\n').map((item, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <p key={`${i}-news`}>{item}</p>
          ))}

          {news.pictures?.length > 0 && (
            <>
              <HeaderSection>
                <h2>Fotos</h2>
              </HeaderSection>
              <ShelfGallery>
                <Gallery
                  margin={8}
                  photos={news.pictures}
                  onClick={openLightbox}
                />
                <ModalGateway>
                  {viewerIsOpen ? (
                    <Modal onClose={closeLightbox}>
                      <Carousel
                        currentIndex={currentImage}
                        views={news.pictures.map((x) => ({
                          ...x,
                          srcset: x.source,
                          caption: x.name,
                        }))}
                      />
                    </Modal>
                  ) : null}
                </ModalGateway>
              </ShelfGallery>
            </>
          )}
          <HeaderSection>
            <h2>Referência</h2>
          </HeaderSection>
          <p className="info">
            <a href={news.source}>{news.font}</a>
          </p>
        </Main>
      )}

      <Footer />
    </>
  );
};

export default News;
