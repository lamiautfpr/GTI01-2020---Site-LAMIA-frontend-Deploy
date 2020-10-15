import React, { useRef, useCallback, useState, useEffect } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import {
  MdMail,
  MdKeyboardArrowLeft,
  MdKeyboardArrowDown,
} from 'react-icons/md';
import {
  FaUserNinja,
  FaMedal,
  FaMailBulk,
  FaChevronRight,
} from 'react-icons/fa';
import { GiNinjaHead } from 'react-icons/gi';
import { OptionTypeBase } from 'react-select';
import { Link } from 'react-router-dom';
import { useAuth, IMembersProps } from '../../../hooks/Auth';
import { useToast } from '../../../hooks/Toast';
import getValidationErrors from '../../../utils/getValidationErrors';
import NavBarDashboard from '../../../components/NavBarDashboard';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import api from '../../../services/api';

import Select from '../../../components/Select';

// import imgMemberDefault from '../../../assets/imgDefault/member.jpg';

import { Container, Content, HeaderSection, Section, Projects } from './styles';
import AppError from '../../../utils/AppError';
import imgMemberDefault from '../../../assets/imgDefault/member.jpg';
import { ImageProps } from '../../../../myTypes/Images';

interface IMemberFormProps extends IMembersProps {
  oldPassword?: string;
  password?: string;
  confirmPassword?: string;
}

interface MembersListProps {
  id: number;
  login: string;
  name: string;
  email: string;
  description: string;
  avatar?: ImageProps;
}

interface OfficesProps extends OptionTypeBase {
  isOpen?: boolean;
  description: string | null;
  members: MembersListProps[];
}

const DashboardMembers: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { member, token, updateMember } = useAuth();
  const { addToast } = useToast();

  const [offices, setOffices] = useState<OfficesProps[]>([]);

  const handleSubmit = useCallback(
    async (data: IMemberFormProps) => {
      try {
        console.log(data);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          login: Yup.string().required('Login obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-maio valido'),
          // eslint-disable-next-line @typescript-eslint/camelcase
          office_id: Yup.number().required('Patente obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const response = await api.post('/members', data, {
          headers: { authorization: `Bearer ${token}` },
        });

        setOffices((old) => {
          const office = old.find(
            (state) => state.id === response.data.office_id,
          );

          if (office) {
            office.members = [...office.members, response.data];

            return [...old, office];
          }

          return old;
        });

        addToast({
          type: 'success',
          title: 'Membro cadastro com sucesso!',
        });

        formRef.current?.reset();
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
        if (err.response.status === 400) {
          addToast({
            type: 'error',
            title: 'Dados inválidos',
            description: err.response.data.error,
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

  const handleOffice = useCallback(
    (index) => {
      const office = offices[index];

      office.isOpen = !office.isOpen;
      setOffices([...offices, (offices[index] = office)]);
      setOffices(offices.filter((_, i) => i !== offices.length));
    },
    [offices],
  );

  useEffect(() => {
    api.get(`members/`).then((response) => {
      setOffices(response.data);
    });
  }, []);

  return (
    <Container>
      <NavBarDashboard page="members" />
      <Content>
        <HeaderSection>
          <h2>Integrantes </h2>
          <div className="bar" />
        </HeaderSection>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <header>
            Novo Integrante
            <div className="bar" />
          </header>
          <div className="form-group">
            <Input
              icon={FaUserNinja}
              name="name"
              type="text"
              placeholder="Nome do novo integrante"
              isFormGroup
            />

            <Input
              icon={FaUserNinja}
              name="login"
              type="text"
              placeholder="Login do novo integrante"
              isFormGroup
            />
          </div>
          <Input
            icon={MdMail}
            name="email"
            type="mail"
            placeholder="Email do novo integrante"
          />
          <Select
            name="office_id"
            icon={FaMedal}
            placeholder="Selecione a Patente!"
            options={offices}
            value={null}
          />
          <Button width="320px" type="submit">
            Cadastrar Integrante
            <GiNinjaHead size={24} />
          </Button>
        </Form>

        {offices.map((office, index) => (
          <Section
            key={office.value}
            isOpen={!!office.isOpen}
            height={office.members.length}
          >
            <header onClick={() => handleOffice(index)}>
              <div>
                <FaMedal size={28} />
                <h2>{office.label}</h2>
                <div className="bar" />
                {office.isOpen ? (
                  <MdKeyboardArrowDown size={28} />
                ) : (
                  <MdKeyboardArrowLeft size={28} />
                )}
              </div>
              <p>{office.description}</p>
            </header>
            <Projects>
              {office.members.map((member) => (
                <Link to={`/${member.login}`}>
                  <img
                    src={member.avatar ? member.avatar.src : imgMemberDefault}
                    alt={member.name}
                  />

                  <strong>
                    {member.name}
                    <span>
                      <FaMailBulk size={14} />
                      {member.email}
                    </span>
                  </strong>
                  <p>{member.description}</p>
                  <div>
                    <FaChevronRight size={20} />
                  </div>
                </Link>
              ))}
            </Projects>
          </Section>
        ))}
      </Content>
    </Container>
  );
};

export default DashboardMembers;
