/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FaMailBulk } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Link, useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Textarea from '../../../components/Input/Textarea';
import NavBarDashboard from '../../../components/NavBarDashboard';
import { IMembersProps, useAuth } from '../../../hooks/Auth';
import { useToast } from '../../../hooks/Toast';
import { newApi } from '../../../services/api';
import AppError from '../../../utils/AppError';
import getValidationErrors from '../../../utils/getValidationErrors';
import { Container, Content, HeaderSection, Main, SelectPage } from './styles';

interface IClassificationWorkProps {
  id: string;
  name: string;
  description: string;
}

interface IWorkProps {
  id: number;
  internalCode: string;
  title: string;
  slug: string;
  objective?: string;
  github?: string;
  startDate: Date;
  endDate?: Date;
  visible: boolean;
  members: IMembersProps[];
  areaExpertise: IClassificationWorkProps[];
  categories: IClassificationWorkProps[];
  types: IClassificationWorkProps[];
}

interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: string;
  totalItems: number;
  totalItemsCurrentPage: string;
  butonsPage: React.FC[];
}

const DashboardWorks: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { token } = useAuth();
  const { addToast } = useToast();

  const location = useLocation();

  const [works, setWorks] = useState<IWorkProps[]>([]);
  const [paginationInfo, setPaginationInfo] = useState<IPaginationProps>();

  const handleSubmit = useCallback(
    async (data: Omit<IWorkProps, 'id' | 'quantityWorks'>) => {
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          description: Yup.string().required('Descrição obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        // await newApi.post(`works`, data, {
        //   headers: { authorization: `Bearer ${token}` },
        // });

        addToast({
          type: 'success',
          title: 'Cadastraado com sucesso!',
        });

        formRef.current?.clearField('name');
        formRef.current?.clearField('description');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }
        if (err instanceof AppError) {
          addToast({
            type: 'error',
            title: 'Erro ao cadastrar novo membro',
            description: err.mensagem,
          });
          return;
        }
        if (err.response.status) {
          addToast({
            type: 'error',
            title: 'O Back-end retornou um erro',
            description: err.response.data.errors,
          });
          return;
        }
        addToast({
          type: 'error',
          title: 'Internal Server ERROR',
          description:
            'Tente mais tarde! Caso erro persista entre em contato com o suporte :D',
        });
      }
    },
    [addToast, token],
  );

  useEffect(() => {
    const locationPage = location.search.replace('?page=', '');

    // eslint-disable-next-line radix
    const currentPage = parseInt(locationPage) || 1;

    newApi
      .get(`works`, {
        params: {
          orderBy: 'createAt',
          direction: 'DESC',
          perPage: 3,
          page: currentPage,
        },
      })
      .then((response) => {
        const { works: workService, pagination } = response.data;
        setWorks(workService);

        const butonsPage = [] as any;

        for (let p = 1; p <= pagination.totalPages; p++) {
          butonsPage.push(
            <li>
              <Link to={`/dashboard/works?page=${p}`}>{p}</Link>
            </li>,
          );
        }

        console.log(pagination);

        setPaginationInfo({ ...pagination, butonsPage });
      });
  }, [location.search]);

  return (
    <Container>
      <NavBarDashboard page="works" />
      <Content>
        <HeaderSection>
          <div>
            <h2> Trabalhos </h2>
            <div className="bar" />
          </div>
        </HeaderSection>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <header>
            <div>
              Casdastrar Novo
              <div className="bar" />
            </div>
          </header>
          <Input
            icon={FaMailBulk}
            name="name"
            type="text"
            placeholder="Nome da nova Área de Atuação"
            isFormGroup
          />
          <Textarea name="description" placeholder="" />

          <Button width="320px" type="submit">
            Salvar Trabalho
            <FaMailBulk size={24} />
          </Button>
        </Form>

        <Main>
          <header>
            <div>
              Listar
              <div className="bar" />
            </div>
            <aside>
              <section>
                <div>
                  <strong>Página Atual: </strong>
                  {paginationInfo?.currentPage}
                </div>
                <div>
                  <strong>Trabalhos nessa página: </strong>
                  {paginationInfo?.totalItemsCurrentPage}
                </div>
              </section>
              <section>
                <div>
                  <strong>Total de Página: </strong>
                  {paginationInfo?.totalPages}
                </div>
                <div>
                  <strong>Total de Trabalho: </strong>
                  {paginationInfo?.totalItems}
                </div>
              </section>
            </aside>
          </header>
          {works?.map((work, index) => (
            <Link key={index} to={`/dashboard/works/:${work.slug}`}>
              <div>
                <strong>
                  {work.title}
                  <span>
                    <FaMailBulk size={14} />
                  </span>
                </strong>
              </div>
              <p>{work.objective}</p>
            </Link>
          ))}

          <footer>
            <SelectPage currentPage={paginationInfo?.currentPage || 1}>
              <ul>
                {paginationInfo?.currentPage !== 1 && (
                  <li>
                    <Link
                      to={`/dashboard/works?page=${
                        (paginationInfo?.currentPage || 1) - 1
                      }`}
                    >
                      <IoIosArrowBack size={24} />
                    </Link>
                  </li>
                )}
                {paginationInfo?.butonsPage}
                {paginationInfo?.currentPage !== paginationInfo?.totalPages && (
                  <li>
                    <Link
                      to={`/dashboard/works?page=${
                        (paginationInfo?.currentPage || 1) + 1
                      }`}
                    >
                      <IoIosArrowForward size={24} />
                    </Link>
                  </li>
                )}
              </ul>
            </SelectPage>
          </footer>
        </Main>
      </Content>
    </Container>
  );
};

export default DashboardWorks;
