import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef } from 'react';
import { MdLock, MdMail } from 'react-icons/md';
import { RiArrowLeftLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import imgLogo from '../../assets/logo.jpg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuth } from '../../hooks/Auth';
import { tertiaryColor } from '../../styles/paletsColorers';
import getValidationErrors from '../../utils/getValidationErrors';
import { Container, Content, Header } from './styles';

interface ISingInFormData {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();

  const handleSubmit = useCallback(
    async (data: ISingInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          username: Yup.string().required(
            'Como deseja logar sem email ou Login? ',
          ),
          password: Yup.string().required('Como deseja logar sem senha? '),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { username, password } = data;
        signIn({ username, password });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [signIn],
  );

  return (
    <Container>
      <Header>
        <Link to="/">
          <RiArrowLeftLine size={40} />
          Voltar
        </Link>
      </Header>

      <Content>
        <img src={imgLogo} alt="LAMIA" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            icon={MdMail}
            name="username"
            type="text"
            placeholder="E-mail ou Login"
            activeColor={tertiaryColor}
          />
          <Input
            icon={MdLock}
            name="password"
            type="password"
            placeholder="Senha"
            activeColor={tertiaryColor}
          />

          <Button width="50%" type="submit">
            Entrar
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Login;
