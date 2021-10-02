import React, { useCallback, useState } from 'react';
import Carousel, { Modal, ModalGateway } from 'react-images';
import Gallery from 'react-photo-gallery';
import { ImageProps } from '../../../myTypes/Images';
import Recrutament01 from '../../assets/imgDefault/Recrutament_01.jpeg';
import Recrutament02 from '../../assets/imgDefault/Recrutament_02.jpeg';
import Recrutament03 from '../../assets/imgDefault/Recrutament_03.jpg';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import {
  HeaderSection,
  Main,
  ScheduleTable,
  SectionLine,
  SubTitle,
  ShelfGallery,
} from './style';

const pictures: ImageProps[] = [
  {
    id: 0,
    src: Recrutament01,
    source: Recrutament01,
    name: '5º Reunião Geral Lamia',
    path: Recrutament01,
    width: 0,
    height: 0,
  },
  {
    id: 2,
    src: Recrutament02,
    source: Recrutament02,
    name: '6º Reunião Geral Lamia',
    path: Recrutament02,
    width: 0,
    height: 0,
  },
  {
    id: 3,
    src: Recrutament03,
    source: Recrutament03,
    name: '4º Reunião Geral Lamia',
    path: Recrutament03,
    width: 0,
    height: 0,
  },
];

const ProcessoSelectivo: React.FC = () => {
  // Gallery
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

  return (
    <>
      <Header />

      <NavBar page="recruitment" />

      <Main>
        <SectionLine id="Mission">
          <HeaderSection>
            <h2>Processo Seletivo 2021/02</h2>
          </HeaderSection>
          <div>
            <div>
              <p>
                Considerando o Regimento Interno do Laboratório de Aprendizado
                de Máquina e Imagens Aplicados à Indústria – LAMIA, que tem como
                missão produzir conhecimento acadêmico e soluções para a
                indústria por meio de pesquisas nas áreas de Ciência de Dados e
                Visão Computacional, este torna público a abertura de vagas para
                discentes dos cursos das áreas de computação e afins da UTFPR.
              </p>
              <p>
                Todos os interessados a participar do processo seletivo devem
                ler o
                <a href="https://bit.ly/RegulamentoLAMIA" target="blank">
                  {' '}
                  REGULAMENTO INTERNO PARA O PROCESSO SELETIVO 2021/2 DO LAMIA
                </a>
                , e seguirem as instruções que lá estão para acessarem o
                formulário de inscrições, bem como terem conhecimento das demais
                etapas e prazos do processo seletivo.
              </p>
              <ScheduleTable>
                <SubTitle>CRONOGRAMA DE EXECUÇÃO DO EDITAL</SubTitle>
                <div>
                  <div>
                    <div>Publicação do edital</div>
                    <div>04/10/2021</div>
                  </div>
                  <div>
                    <div>Período de inscrição de estudantes</div>
                    <div>04/10/2021 a 15/10/2021 </div>
                  </div>
                  <div>
                    <div>
                      Publicação das inscrições deferidas
                      <a href="https://bit.ly/1FasePSLAMIA" target="blank">
                        <strong>Resultado das inscrições deferidas</strong>
                      </a>
                    </div>
                    <div>17/10/2021 às 18h</div>
                  </div>
                  <div>
                    <div>
                      Entrevistas (enviado por e-mail os horários e link)
                    </div>
                    <div>18/10/2021 a 23/10/2021</div>
                  </div>
                  <div>
                    <div>
                      Publicação do resultado preliminar
                      <a href="https://bit.ly/2FasePSLAMIA" target="blank">
                        <strong>Resultado Preliminar</strong>
                      </a>
                    </div>
                    <div>24/10/2021 às 18h</div>
                  </div>
                  <div>
                    <div>Interposição de recursos</div>
                    <div>25/10/2021 até as 18h</div>
                  </div>
                  <div>
                    <div>
                      Homologação do resultado final
                      <a href="https://bit.ly/2FasePSLAMIA" target="blank">
                        <strong>Resultado Final</strong>
                      </a>
                    </div>
                    <div>26/10/2021 às 18h</div>
                  </div>
                </div>
              </ScheduleTable>
            </div>
          </div>
          <div>
            <SubTitle>Nosso Time</SubTitle>
            <ShelfGallery>
              <Gallery margin={8} photos={pictures} onClick={openLightbox} />
              <ModalGateway>
                {viewerIsOpen ? (
                  <Modal onClose={closeLightbox}>
                    <Carousel
                      currentIndex={currentImage}
                      views={pictures.map((x) => ({
                        ...x,
                        srcset: x.source,
                        caption: x.name,
                      }))}
                    />
                  </Modal>
                ) : null}
              </ModalGateway>
            </ShelfGallery>
          </div>
        </SectionLine>
        <hr />
      </Main>

      <Footer />
    </>
  );
};

export default ProcessoSelectivo;
