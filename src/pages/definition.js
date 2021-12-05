import { useRef } from "react";
import Head from "next/head";

//Controlled components
//São componentes controlados pelo estado do React (useState).

//Uncontroleed Components
//São formas de acessar o valor do input somente no momento que precisarmos (refs)

export default function Home() {
  const searchRef = useRef(null);

  //Visualizando valor do elemento
  console.log(searchRef.current?.value);

  //setando foco no elemento
  searchRef.current?.focus();

  return (
    <div>
      <Head>
        <title>Form Validation</title>
      </Head>

      <main>
        <input placeholder="Digite um nome" ref={searchRef} />
        <button onClick={() => alert(searchRef.current.value)}>Clique</button>
      </main>
    </div>
  );
}
