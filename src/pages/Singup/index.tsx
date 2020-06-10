import React, { useCallback, useRef } from 'react';

import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiArrowLeft, FiUser, FiMail, FiLock } from 'react-icons/fi';
import getValidationErros from '../../utils/getValidationErrors';

import logo from '../../assets/logo.svg';
import Input from '../../components/input';
import Button from '../../components/button';

import { Container, Content, Background } from './styles';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        email: Yup.string()
          .required('Email é obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'Senha de 6 dígitos'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      const errors = getValidationErros(err);

      formRef.current?.setErrors(errors);
    }
  }, []);
  return (
    <Container>
      <Background />
      <Content>
        <img src={logo} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu cadastro</h1>

          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />

          <Button type="submit">Cadastrar</Button>
        </Form>

        <a href="dasdasdasd">
          <FiArrowLeft />
          Voltar
        </a>
      </Content>
    </Container>
  );
};
export default SignUp;
