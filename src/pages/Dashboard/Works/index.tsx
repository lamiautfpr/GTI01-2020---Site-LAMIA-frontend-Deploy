/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FaGithub, FaMailBulk } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Link, useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import {
  MdArticle,
  MdCategory,
  MdDescription,
  MdGroups,
  MdLink,
  MdQrCode,
  MdVisibility,
  MdVisibilityOff,
} from 'react-icons/md';
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
import Select from '../../../components/Select';
import { BsCalendar2DateFill } from 'react-icons/bs';
import { BiTargetLock } from 'react-icons/bi';

interface IClassificationWorkProps {
  id: string;
  name: string;
  description: string;
}

interface IWorkProps extends ISelectItem {
  id: number;
  internalCode: string; //
  title: string; //
  slug: string; //
  objective?: string; //
  github?: string;
  startDate: Date; //
  endDate?: Date; //
  visible: boolean; //
}

interface ISelectItem {
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
  const [optionsForSelect, setOptionsForSelect] = useState<ISelectItem>(
    {} as ISelectItem,
  );

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

        setPaginationInfo({ ...pagination, butonsPage });
      });

    const requestParamsForSelectOptions = {
      orderBy: 'name',
      direction: 'ASC',
    };

    newApi
      .get(`/works/areas-expertise`, {
        params: { ...requestParamsForSelectOptions },
      })
      .then((response) => {
        setOptionsForSelect((oldSate) => ({
          ...oldSate,
          areaExpertise: response.data,
        }));
      });

    newApi
      .get(`/works/categories`, {
        params: { ...requestParamsForSelectOptions },
      })
      .then((response) => {
        setOptionsForSelect((oldSate) => ({
          ...oldSate,
          categories: response.data,
        }));
      });

    newApi
      .get(`/works/types`, {
        params: { ...requestParamsForSelectOptions },
      })
      .then((response) => {
        setOptionsForSelect((oldSate) => ({
          ...oldSate,
          types: response.data,
        }));
      });

    newApi
      .get(`members`, {
        params: { ...requestParamsForSelectOptions },
      })
      .then((response) => {
        setOptionsForSelect((oldSate) => ({
          ...oldSate,
          members: response.data,
        }));
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
              Casdastrar
              <div className="bar" />
            </div>
          </header>
          <div className="form-group">
            <Input
              icon={MdQrCode}
              name="internalCode"
              type="text"
              placeholder="Código interno"
              isFormGroup
            />
            <Select
              name="visible"
              icon={MdVisibility}
              placeholder="Para o público?"
              options={[
                { value: true, label: 'Visível' },
                { value: false, label: 'Oculto' },
              ]}
            />
          </div>
          <Input
            icon={MdArticle}
            name="title"
            type="text"
            placeholder="Titulo do Trabalho"
          />
          <Input
            icon={MdLink}
            name="slug"
            type="text"
            placeholder="Slug do Trabalho"
            disabled
          />
          <div className="form-group">
            <Input
              icon={BsCalendar2DateFill}
              name="startDate"
              type="text"
              placeholder="Data de Início"
              isFormGroup
            />
            <Input
              icon={BsCalendar2DateFill}
              name="endDate"
              type="text"
              placeholder="Data de Término"
              isFormGroup
            />
          </div>
          <Input
            icon={FaGithub}
            name="gitHub"
            type="text"
            placeholder="lamiautfpr/GTI01-2020---Site-LAMIA"
          >
            https://github.com/
          </Input>
          <div className="form-group">
            <Select
              name="members"
              icon={MdGroups}
              placeholder="Membros"
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              options={optionsForSelect.members}
              isMulti
            />
            <Select
              name="areaExpertise"
              icon={MdCategory}
              placeholder="Área de atuação"
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              options={optionsForSelect.areaExpertise}
              isMulti
            />
          </div>
          <div className="form-group">
            <Select
              name="categories"
              icon={MdCategory}
              placeholder="Categorias"
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              options={optionsForSelect.categories}
              isMulti
            />
            <Select
              name="types"
              icon={MdCategory}
              placeholder="Tipos"
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              options={optionsForSelect.types}
              isMulti
            />
          </div>
          <Textarea
            icon={BiTargetLock}
            name="objective"
            placeholder="Qual foi o objetivo deste trabalho?"
          />

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
                <strong>{work.title}</strong>
                <p>{work.objective}</p>
              </div>

              <div>
                <span>
                  <strong>Área de Atuação(ões):</strong>
                  {work.areaExpertise.map((a) => ` ${a.name};`)}
                </span>
                <div className="bar" />
                <span>
                  <strong>Categoria(s):</strong>
                  {work.categories.map((c) => ` ${c.name};`)}
                </span>
                <div className="bar" />
                <span>Tipo(s):{work.types.map((t) => ` ${t.name};`)}</span>
                <div className="bar" />
                <span>
                  <strong>Integrantes (Login):</strong>
                  {work.members.map((m) => ` ${m.login};`)}
                </span>
              </div>
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
