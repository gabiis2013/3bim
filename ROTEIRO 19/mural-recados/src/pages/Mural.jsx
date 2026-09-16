import { useEffect, useState } from "react";
import FormularioRecado from "../components/FormularioRecado";
import ListaRecados from "../components/ListaRecados";
import { criarRecado, listarRecados } from "../services/recadosService";

export default function Mural() {
  const [recados, setRecados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erroCarregamento, setErroCarregamento] = useState("");

  useEffect(() => {
    async function carregarRecados() {
      try {
        const dados = await listarRecados();
        setRecados(dados);
      } catch (erro) {
        setErroCarregamento("Não foi possível carregar os recados.");
        console.error(erro);
      } finally {
        setCarregando(false);
      }
    }

    carregarRecados();
  }, []);

  async function adicionarRecado(autor, mensagem) {
    const novoRecado = await criarRecado(autor, mensagem);
    setRecados((recadosAtuais) => [novoRecado, ...recadosAtuais]);
  }

  if (carregando) {
    return (
      <main className="container">
        <h1>Mural de Recados</h1>
        <p>Buscando mensagens no Supabase...</p>
      </main>
    );
  }

  if (erroCarregamento) {
    return (
      <main className="container">
        <h1>Mural de Recados</h1>
        <p className="erro" role="alert">
          {erroCarregamento}
        </p>
      </main>
    );
  }

  return (
    <main className="container">
      <h1>Mural de Recados</h1>

      <FormularioRecado aoPublicar={adicionarRecado} />

      <ListaRecados recados={recados} />
    </main>
  );
}