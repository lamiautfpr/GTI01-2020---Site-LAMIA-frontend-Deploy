/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FaListUl, FaMailBulk } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { imageCategories as imageDefault } from '../../../assets/dataStatistic';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Textarea from '../../../components/Input/Textarea';
import NavBarDashboard from '../../../components/NavBarDashboard';
import { useAuth } from '../../../hooks/Auth';
import { useToast } from '../../../hooks/Toast';
import { newApi } from '../../../services/api';
import AppError from '../../../utils/AppError';
import getValidationErrors from '../../../utils/getValidationErrors';
import imgDefault from '../../../assets/imgDefault/work2.png';
import { Container, Content, HeaderSection, Main } from './styles';

interface ICategoryProps {
  id: number;
  name: string;
  description?: string | null;
  quantityWorks: number;
}

const Page = {
  title: 'Categoria',
  Icon: FaListUl,
  pathRequest: '/categories',
  page: 'categories',
};

const DashboardCategory: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { token } = useAuth();
  const { addToast } = useToast();

  const [categories, setCategories] = useState<ICategoryProps[]>([]);

  const handleSubmit = useCallback(
    async (data: Omit<ICategoryProps, 'id' | 'quantityWorks'>) => {
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          description: Yup.string().required('Descrição obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await newApi.post(`works${Page.pathRequest}`, data, {
          headers: { authorization: `Bearer ${token}` },
        });

        setCategories((oldState) => [
          ...oldState,
          {
            name: data.name,
            description: data.description,
            quantityWorks: 0,
          } as ICategoryProps,
        ]);
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
    newApi
      .get(`works${Page.pathRequest}`, {
        params: {
          orderBy: 'createAt',
        },
      })
      .then((response) => {
        return setCategories(
          response.data.map((area) => ({
            ...area,
            quantityWorks: area.works ? area.works.length : 0,
          })),
        );
      });
  }, []);

  return (
    <Container>
      <NavBarDashboard page={Page.page} />
      <Content>
        <HeaderSection>
          <h2>{Page.title} </h2>
          <div className="bar" />
        </HeaderSection>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <header>
            Casdastrar Nova {Page.title}
            <div className="bar" />
          </header>
          <Input
            icon={Page.Icon}
            name="name"
            type="text"
            placeholder="Nome da nova Área de Atuação"
            isFormGroup
          />
          <Textarea
            name="description"
            placeholder={`O que essa ${Page.title} engloba?`}
          />

          <Button width="320px" type="submit">
            Salvar {Page.title}
            <Page.Icon size={24} />
          </Button>
        </Form>

        <Main>
          <header>
            Lista de {Page.title}
            <div className="bar" />
          </header>
          {categories?.map((category, index) => (
            <Link
              key={index}
              to={`/dashboard/expertise-areas/:${category.name}`}
            >
              <div>
                <img
                  src={imageDefault[index] || imgDefault}
                  alt={category.name}
                />
                <strong>
                  {category.name}
                  <span>
                    <FaMailBulk size={14} />
                    Total de Trabalhos: {category.quantityWorks}
                  </span>
                </strong>
              </div>
              <p>{category.description}</p>
            </Link>
          ))}
        </Main>
      </Content>
    </Container>
  );
};

export default DashboardCategory;
