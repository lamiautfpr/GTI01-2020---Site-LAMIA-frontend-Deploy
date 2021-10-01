import React from 'react';
import Recrutament01 from '../../assets/imgDefault/Recrutament_01.jpeg';
import Recrutament02 from '../../assets/imgDefault/Recrutament_02.jpeg';
import Recrutament03 from '../../assets/imgDefault/Recrutament_03.jpeg';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import { HeaderSection, Main, ScheduleTable, SectionLine } from './style';

const ProcessoSelectivo: React.FC = () => {
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
                Considerando o Regimento Interno do Grupo de Pesquisa, o
                Laboratório de Aprendizado de Máquina e Imagens Aplicados à
                Indústria – LAMIA, que tem como missão produzir conhecimento
                acadêmico e soluções para a indústria por meio de pesquisas nas
                áreas de Ciência de Dados e Visão Computacional, torna público a
                abertura de vagas para discentes dos cursos na área da
                computação e afins da UTFPR.
              </p>
              <p>
                Pedimos para que todos interessados a participar do processo
                para lerem o
                <a href="http://">
                  {' '}
                  REGULAMENTO INTERNO PARA O PROCESSO SELETIVO 2021/2 DO
                  LABORATÓRIO DE APRENDIZADO DE MÁQUINA E IMAGENS APLICADOS À
                  INDÚSTRIA – LAMIA.
                </a>
              </p>
              <ScheduleTable>
                <h3>CRONOGRAMA DE EXECUÇÃO DO EDITAL</h3>
                <div>
                  <div>
                    <div>Publicação do edital</div>
                    <div>04/10/2021</div>
                  </div>
                  <div>
                    <div>Período de inscrição de estudantes</div>
                    <div>04/10 a 15/10/2021 </div>
                  </div>
                  <div>
                    <div>Publicação das inscrições deferidas</div>
                    <div>17/10 às 18h</div>
                  </div>
                  <div>
                    <div>Entrevistas</div>
                    <div>18/10 a 23/10</div>
                  </div>
                  <div>
                    <div>
                      Publicação do resultado provisório
                      <a href="https://bit.ly/1FasePSLAMIA" target="blank">
                        <strong>Resultados Prelimirares</strong>
                      </a>
                    </div>
                    <div>24/10 às 18h</div>
                  </div>
                  <div>
                    <div>Interposição de recursos</div>
                    <div>25/10/2021</div>
                  </div>
                  <div>
                    <div>
                      Homologação do resultado final
                      <a href="https://bit.ly/2FasePSLAMIA" target="blank">
                        <strong>Resultados Final</strong>
                      </a>
                    </div>
                    <div>26/10/2021 às 18h</div>
                  </div>
                </div>
              </ScheduleTable>
            </div>
            <aside>
              <img src={Recrutament01} alt="LAMIA" />
              <img src={Recrutament02} alt="LAMIA" />
              <img src={Recrutament03} alt="LAMIA" />
            </aside>
          </div>
        </SectionLine>
        <hr />
      </Main>

      <Footer />
    </>
  );
};

export default ProcessoSelectivo;
