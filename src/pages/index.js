import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Input from "../components/Form/Input";
import { Form } from "@unform/web";
import { Scope } from "@unform/core";

import * as Yup from "yup";

export default function Home() {
  const formRef = useRef(null);
  const [user, setUser] = useState({});

  // O initial data somente é usado quando os dados são estáticos, não vindo de uma requisição.
  const initialData = {
    email: "engwesleybruno@gmail.com",
    address: {
      city: "Porteirinha",
    },
  };

  async function handleSubmit(data, { reset }) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("O nome é obrigatório"),
        email: Yup.string()
          .email("Digite um e-mail válido")
          .required("O e-mail é obrigatório"),
        address: Yup.object().shape({
          city: Yup.string()
            .min(3, "No mínimo 3 caracteres")
            .required("A cidade é obrigatória"),
        }),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
      reset();
      formRef.current.setErrors({});
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });

        formRef.current.setErrors(errorMessages);
      }
    }
  }

  useEffect(() => {
    setTimeout(() => {
      //Preenchendo os valores do formulário a partir da resposta da requisição.
      formRef.current.setData({
        name: "Wesley Bruno",
        email: "engwesleybruno@gmail.com",
        address: {
          city: "Porteirinha",
        },
      });
    }, 2000);
  }, []);

  return (
    <div>
      <Head>
        <title>Form Validation</title>
      </Head>

      {/* <Form ref={formRef} initialData={initialData} onSubmit={handleSubmit}> */}
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="name" />
        <Input name="email" type="email" />
        <Input name="password" type="password" />

        <Scope path="address">
          <Input name="street" />
          <Input name="number" />
          <Input name="city" />
        </Scope>

        <button type="submit">Enviar</button>
      </Form>
    </div>
  );
}
