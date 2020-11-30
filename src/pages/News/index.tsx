import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useRouteMatch, Link } from 'react-router-dom';
import Gallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from 'react-images';
import Footer from '../../components/Footer';
import imgLogo from '../../assets/logo.jpg';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import { Cover, Main, ShelfGallery, HeaderSection } from './style';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface IRouterMatch {
  title: string;
}

const News: React.FC = () => {
  const { params } = useRouteMatch<IRouterMatch>();
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const photos = [
    {
      src: imgLogo,
      source: imgLogo,
      name: 'http://example.com/example/img1.jpg',
      width: 1,
      height: 1,
    },
    {
      src: imgLogo,
      source: imgLogo,
      name: 'http://example.com/example/img2.jpg',
      width: 1,
      height: 1,
    },
  ];

  const openLightbox = useCallback((event, { index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);
  const closeLightbox = useCallback((): void => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  }, []);

  return (
    <>
      <Header />
      <NavBar />
      <Main>
        <h1>titulo</h1>
        <p className="info">
          Data de publicação:&nbsp;
          <span>22/12/2020</span>
        </p>
        <Cover>
          <div className="line" />
          <img src={imgLogo} alt="img" />
          <div className="line" />
        </Cover>
        <HeaderSection>
          <h2>Descrição</h2>
        </HeaderSection>
        <p>asasdsadas</p>
        <hr />

        <HeaderSection>
          <h2>Fotos</h2>
        </HeaderSection>
        <ShelfGallery>
          <Gallery margin={8} photos={photos} onClick={openLightbox} />
          <ModalGateway>
            {viewerIsOpen ? (
              <Modal onClose={closeLightbox}>
                <Carousel
                  currentIndex={currentImage}
                  views={photos.map((x) => ({
                    ...x,
                    srcset: x.source,
                    caption: x.name,
                  }))}
                />
              </Modal>
            ) : null}
          </ModalGateway>
        </ShelfGallery>
        <hr />
        <HeaderSection>
          <h2>Referência</h2>
        </HeaderSection>
        <p className="info">
          +:&nbsp;
          <a>tecno</a>
          <hr />
        </p>
      </Main>
      <Footer />
    </>
  );
};

export default News;
