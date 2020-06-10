import React, { useRef, useCallback } from 'react';

import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useToast } from '../../hooks/Toast';
import { useAuth } from '../../hooks/AuthContext';
import getValidationErros from '../../utils/getValidationErrors';
import logo from '../../assets/logo.svg';
import Input from '../../components/input';
import Button from '../../components/button';

import { Container, Content, Background } from './styles';

interface SingInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { user, singIn } = useAuth();

  const { addToast } = useToast();
  console.log(user);

  const handleSubmit = useCallback(
    async (data: SingInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email é obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await singIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);

          formRef.current?.setErrors(errors);
        }
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer o login.',
        });
      }
    },
    [singIn, addToast],
  );
  return (
    <Container>
      <Content>
        <img src={logo} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu Logon</h1>

          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />

          <Button type="submit">Entrar</Button>

          <a href="asdas">Esqueci minha senha</a>
        </Form>

        <a href="dasdasdasd">
          <FiLogIn />
          Criar conta
        </a>
      </Content>
      <Background />
    </Container>
  );
};
export default SignIn;
