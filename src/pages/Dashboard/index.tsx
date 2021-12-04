import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { ChangeEvent, useCallback, useRef } from 'react';
import {
  FaCamera,
  FaGithub,
  FaLinkedinIn,
  FaUserGraduate,
  FaUserNinja,
  FaUserTie,
} from 'react-icons/fa';
import { MdLock, MdMail } from 'react-icons/md';
import * as Yup from 'yup';
import imgMemberDefault from '../../assets/imgDefault/member.jpg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Textarea from '../../components/Input/Textarea';
import NavBarDashboard from '../../components/NavBarDashboard';
import { IMembersProps, useAuth } from '../../hooks/Auth';
import { useToast } from '../../hooks/Toast';
import { newApi } from '../../services/api';
import AppError from '../../utils/AppError';
import getValidationErrors from '../../utils/getValidationErrors';
import { Container, Content, HeaderSection } from './styles';

interface IMemberFormProps extends Omit<IMembersProps, 'avatar'> {
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

const Dashboard: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { member, token, updateMember } = useAuth();
  const { addToast } = useToast();

  // TODO: Add login on the update
  const handleSubmit = useCallback(
    async (data: IMemberFormProps) => {
      try {
        formRef.current?.setErrors({});

        const shema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-maio valido'),
          linkedin: Yup.string(),
          gitHub: Yup.string(),
          lattes: Yup.string(),
          quoteName: Yup.string().required('Nome de citação obrigatório'),
          description: Yup.string(),
          oldPassword: Yup.string(),
          newPassword: Yup.string().when('oldPassword', {
            is: (val) => !!val.length,
            then: Yup.string().min(
              8,
              'A senha deve conter no mínimo 8 caracteres',
            ),
            otherwise: Yup.string(),
          }),
          confirmPassword: Yup.string()
            .when('oldPassword', {
              is: (val) => !!val.length,
              then: Yup.string().min(
                8,
                'A senha deve conter no mínimo 8 caracteres',
              ),
              otherwise: Yup.string(),
            })
            .oneOf(
              [Yup.ref('newPassword'), ''],
              'Duas senhas diferentes, qual devo salvar?',
            ),
        });

        await shema.validate(data, {
          abortEarly: false,
        });

        if (
          data.oldPassword?.length === 0 &&
          (data.newPassword?.length !== 0 || data.confirmPassword?.length !== 0)
        ) {
          throw new AppError(
            'Para atualizar a senha é preciso confirmar a senha atual!',
          );
        }

        // TODO Refatorar
        Object.keys(data).forEach((key) => {
          if (data[key]?.length === 0) {
            // eslint-disable-next-line no-param-reassign
            delete data[key];
          }
        });

        const response = await newApi.put('/members', data, {
          headers: { authorization: `Bearer ${token}` },
        });

        updateMember(response.data);
        addToast({
          type: 'success',
          title: 'Perfil Atualizando!',
        });

        formRef.current?.clearField('oldPassword');
        formRef.current?.clearField('newPassword');
        formRef.current?.clearField('confirmPassword');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }

        if (err instanceof AppError) {
          addToast({
            type: 'error',
            title: 'Erro na atualização',
            description: err.mensagem,
          });
          return;
        }

        if (err.response.status === 401) {
          addToast({
            type: 'error',
            title: 'Dados inválidos',
            description: err.response.data.error,
          });
          return;
        }

        if (err.response.status === 400) {
          console.log(err.response.data);

          addToast({
            type: 'error',
            title: 'Dados inválidos',
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
    [addToast, token, updateMember],
  );

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('avatar', e.target.files[0]);

        newApi
          .patch('/members/avatar', data, {
            headers: { authorization: `Bearer ${token}` },
          })
          .then((response) => {
            updateMember(response.data);
            addToast({
              type: 'success',
              title: 'Avatar atualizado!',
            });
          })
          .catch((response) => {
            addToast({
              type: 'error',
              title: 'Erro ao atualizar avatar!',
            });
          });
      }
    },
    [addToast, token, updateMember],
  );

  return (
    <Container>
      <NavBarDashboard />
      <Content>
        <HeaderSection>
          <h2>Meu Perfil </h2>
          <div className="bar" />
        </HeaderSection>
        <Form ref={formRef} initialData={member} onSubmit={handleSubmit}>
          <section>
            <div className="img">
              <img
                src={member.avatar ? member.avatar : imgMemberDefault}
                alt="Json Doe"
              />
              <label htmlFor="avatar">
                <FaCamera />
                <input type="file" id="avatar" onChange={handleAvatarChange} />
              </label>
            </div>
            <div className="form">
              <div className="form-group">
                <Input
                  icon={FaUserNinja}
                  name="name"
                  type="text"
                  placeholder="Como você prefere ser chamado?"
                  isFormGroup
                />
                <Input
                  icon={FaUserTie}
                  name="quoteName"
                  type="text"
                  placeholder="Como você deve ser citado nos artigos?"
                  isFormGroup
                />
              </div>

              <Textarea name="description" placeholder="Bioo" />
            </div>
          </section>
          <Input icon={MdMail} name="email" type="text" placeholder="E-mail" />
          <Input
            icon={FaGithub}
            name="gitHub"
            type="text"
            placeholder="DoeJonh"
          >
            https://github.com/
          </Input>
          <Input
            icon={FaLinkedinIn}
            name="linkedin"
            type="text"
            placeholder="john-doe"
          >
            https://br.linkedin.com/public-profile/in/
          </Input>
          <Input
            icon={FaUserGraduate}
            name="lattes"
            type="text"
            placeholder="1289293936077853"
          >
            http://lattes.cnpq.br/
          </Input>

          {/* TODO: ATAULIZAR Layload - area de senha */}
          <div className="form-group password">
            <Input
              icon={MdLock}
              name="oldPassword"
              type="password"
              placeholder="Senha Atual"
              isFormGroup
            />
            <Input
              icon={MdLock}
              name="newPassword"
              type="password"
              placeholder="Nova Senha"
              isFormGroup
            />
            <Input
              icon={MdLock}
              name="confirmPassword"
              type="password"
              placeholder="Confirmar Nova Senha"
              isFormGroup
            />
          </div>
          <Button width="250px" type="submit">
            Atualizar Perfil
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Dashboard;
