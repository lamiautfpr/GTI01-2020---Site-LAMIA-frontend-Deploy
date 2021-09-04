/* eslint-disable react/jsx-curly-newline */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
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
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { useAuth } from '../../../hooks/Auth';
import { useToast } from '../../../hooks/Toast';
import getValidationErrors from '../../../utils/getValidationErrors';
import NavBarDashboard from '../../../components/NavBarDashboard';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import api from '../../../services/api';

import Select from '../../../components/Select';

// import imgMemberDefault from '../../../assets/imgDefault/member.jpg';

import {
  Container,
  Content,
  HeaderSection,
  Section,
  Projects,
  ModalResetPassowrd,
} from './styles';
import AppError from '../../../utils/AppError';
import imgMemberDefault from '../../../assets/imgDefault/member.jpg';
import { ImageProps } from '../../../../myTypes/Images';

interface MemberFormProps {
  login: string;
  name: string;
  email: string;
  office_id: number;
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

interface MembersParams {
  login: string;
}

interface MemberEditableProps {
  login: string;
  name: string;
  email: string;
  office_id: OfficesProps;
  office: string;
}

interface MemberResetPassword {
  id: string;
  name: string;
}

const DashboardMembers: React.FC = () => {
  const { params } = useRouteMatch<MembersParams>();
  const history = useHistory();

  const formRef = useRef<FormHandles>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { token } = useAuth();
  const { addToast } = useToast();

  const [offices, setOffices] = useState<OfficesProps[]>([]);
  const [editable, setEditable] = useState(false);
  const [isvisibleModal, setIsvisibleModal] = useState(false);
  const [
    memberResetPassword,
    setMemberResetPassword,
  ] = useState<MemberResetPassword | null>(null);
  const [member, setMember] = useState<MemberEditableProps | undefined>(
    undefined,
  );

  const handleSubmit = useCallback(
    async (data: MemberFormProps) => {
      formRef.current?.setErrors({});
      if (!editable) {
        setEditable(true);
        return;
      }

      try {
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

        if (params.login) {
          if (data.office_id === member?.office_id.value) {
            return;
          }

          const response = await api.patch('/members/office', data, {
            headers: { authorization: `Bearer ${token}` },
          });

          setOffices((old) => {
            const officeRemoveMember = old.find(
              (state) => state.id === member?.office_id.value,
            );

            if (officeRemoveMember) {
              officeRemoveMember.members = officeRemoveMember.members.filter(
                (m) => m.login !== member?.login,
              );

              const officeAddMember = old.find(
                (state) => state.id === response.data.office_id,
              );

              if (officeAddMember) {
                officeAddMember.members = [
                  ...officeAddMember.members,
                  response.data,
                ];

                return [...old, officeRemoveMember, officeAddMember].filter(
                  (_, i) => i !== old.length && i !== old.length - 1,
                );
              }
            }

            return old;
          });

          addToast({
            type: 'success',
            title: 'Membro atualizado com sucesso!',
          });

          setMember({
            name: response.data.name,
            email: response.data.email,
            login: params.login,
            // eslint-disable-next-line @typescript-eslint/camelcase
            office_id: response.data.office,
            office: response.data.office.label,
          });

          setEditable(false);
        } else {
          const response = await api.post('/members', data, {
            headers: { authorization: `Bearer ${token}` },
          });

          setOffices((old) => {
            const office = old.find(
              (state) => state.id === response.data.office_id,
            );

            if (office) {
              office.members = [...office.members, response.data];

              return [...old, office].filter((_, i) => i !== old.length);
            }

            return old;
          });

          addToast({
            type: 'success',
            title: 'Membro cadastro com sucesso!',
          });

          history.push(`/dashboard/members`);
        }
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
    [addToast, editable, history, member, params.login, token],
  );

  const handleOffice = useCallback(
    (index) => {
      const office = offices[index];

      office.isOpen = !office.isOpen;
      setOffices(
        [...offices, (offices[index] = office)].filter(
          (_, i) => i !== offices.length,
        ),
      );
    },
    [offices],
  );

  const openModal = useCallback((data: MemberResetPassword) => {
    setMemberResetPassword(data);
    setIsvisibleModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setMemberResetPassword(null);
    setIsvisibleModal(false);
  }, []);

  const handleResetPassword = useCallback(
    (id?: string) => {
      if (!id) {
        setMemberResetPassword(null);
        setIsvisibleModal(false);
        return;
      }

      api
        .patch(
          `/members/reset-password/${id}`,
          {},
          {
            headers: { authorization: `Bearer ${token}` },
          },
        )
        .then(() => {
          addToast({
            type: 'success',
            title: 'Senha resetada!',
          });
        })
        .catch(() => {
          addToast({
            type: 'error',
            title: 'Erro ao resetar a senha!',
          });
        });

      setMemberResetPassword(null);
      setIsvisibleModal(false);
    },
    [addToast, token],
  );

  useEffect(() => {
    api.get(`members/`).then((response) => {
      setOffices(response.data);
    });
  }, []);

  useEffect(() => {
    formRef.current?.setErrors({});

    if (params.login) {
      api.get(`${params.login}`).then((response) => {
        setMember({
          name: response.data.name,
          email: response.data.email,
          login: params.login,
          // eslint-disable-next-line @typescript-eslint/camelcase
          office_id: response.data.office,
          office: response.data.office.label,
        });
      });
      setEditable(false);
    } else {
      formRef.current?.reset();
      setMember(undefined);
      setEditable(true);
    }
  }, [params]);

  return (
    <Container>
      <NavBarDashboard page="members" />
      <Content>
        <HeaderSection>
          <h2>Integrantes </h2>
          <div className="bar" />
        </HeaderSection>
        <Form ref={formRef} onSubmit={handleSubmit} initialData={member}>
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
              disabled={!!member}
              value={member?.name}
            />

            <Input
              icon={FaUserNinja}
              name="login"
              type="text"
              placeholder="Login do novo integrante"
              isFormGroup
              disabled={!!member}
              value={member?.login}
            />
          </div>
          <Input
            icon={MdMail}
            name="email"
            type="mail"
            placeholder="Email do novo integrante"
            disabled={!!member}
            value={member?.email}
          />
          {!editable ? (
            <Input
              icon={FaMedal}
              name="office"
              type="text"
              placeholder="Selecione a Patente!"
              disabled
              value={member?.office}
            />
          ) : (
            <Select
              name="office_id"
              icon={FaMedal}
              placeholder="Selecione a Patente!"
              options={offices}
              defaultValue={member?.office_id || null}
            />
          )}

          <Button width="320px" type="submit">
            {!editable ? 'Editar Integrante' : 'Salvar Integrante'}
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
              {office.members.map((memberList) => (
                <Link
                  key={memberList.login}
                  to={`/dashboard/members/${memberList.login}`}
                >
                  <img
                    src={
                      memberList.avatar
                        ? memberList.avatar.src
                        : imgMemberDefault
                    }
                    alt={memberList.name}
                  />

                  <strong>
                    {memberList.name}
                    <span>
                      <FaMailBulk size={14} />
                      {memberList.email}
                    </span>
                  </strong>
                  <div>
                    <Button
                      onClick={() =>
                        openModal({
                          id: `${memberList.id}`,
                          name: memberList.name,
                        })
                      }
                    >
                      Resetar senha
                    </Button>
                    <p>{memberList.description}</p>
                  </div>
                  <div>
                    <FaChevronRight size={20} />
                  </div>
                </Link>
              ))}
            </Projects>
          </Section>
        ))}
      </Content>
      {isvisibleModal && (
        <ModalResetPassowrd>
          <div>
            <header>Tem certeza deseja resetar a senha ?</header>
            <main>
              <p>
                Essa ação irá alterar a senha do usuário:
                <strong>{` ${memberResetPassword?.name}.`}</strong>
              </p>
            </main>
            <footer>
              <Button
                type="button"
                background="#ac3030"
                onClick={() => closeModal()}
              >
                NÃO
              </Button>
              <Button
                type="button"
                background="#2e656a"
                onClick={() => handleResetPassword(memberResetPassword?.id)}
              >
                SIM
              </Button>
            </footer>
          </div>
        </ModalResetPassowrd>
      )}
    </Container>
  );
};

export default DashboardMembers;
