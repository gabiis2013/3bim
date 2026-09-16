import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import "./App.css";

export default function App() {
  // 1. Estados: Três "caixas" para controlar nossa tela
  const [recados, setRecados] = useState([]);         // Guarda os dados reais do banco
  const [carregando, setCarregando] = useState(true); // Controla o "Buscando..."
  const [erro, setErro] = useState("");               // Guarda erros de internet

  // 2. Efeito: Busca os dados na nuvem assim que a tela abre
  useEffect(() => {
    async function buscarRecados() {
      try {
        // EXERCÍCIO 2: Para testar a ordenação, você pode trocar 'false' por 'true' abaixo.
        // EXERCÍCIO 3: Para testar o tratamento de erro, mude "recados" para "tabela-que-nao-existe".
        const { data, error } = await supabase
          .from("recados")
          .select("*")
          .order("data_criacao", { ascending: false });

        if (error) {
          throw new Error(error.message);
        }

        setRecados(data); // Guarda os dados que vieram da nuvem
      } catch (e) {
        setErro("Não foi possível conectar ao banco de dados.");
        console.error(e);
      } finally {
        setCarregando(false); // A fase de espera acabou
      }
    }

    buscarRecados();
  }, []);

  // 3. A Tela (Visual):
  return (
    <main className="container">
      <h1>Mural de Recados</h1>

      {/* EXERCÍCIO 1: Contador Dinâmico de Mensagens */}
      {!carregando && !erro && (
        <p className="subtitulo">
          {recados.length === 0
            ? "Nenhuma mensagem cadastrada"
            : `Mostrando ${recados.length} ${
                recados.length === 1 ? "recado cadastrado" : "recados cadastrados"
              }`}
        </p>
      )}

      {/* Mostramos mensagens de status dependendo do que está acontecendo */}
      {carregando && <p>Buscando mensagens no Supabase...</p>}
      {erro && <p className="erro">{erro}</p>}
      {!carregando && !erro && recados.length === 0 && (
        <p>O mural está vazio no momento. Seja o primeiro a postar!</p>
      )}

      {/* A nossa lista original, mas agora usando a variável 'recados' (os dados reais) */}
      {!carregando && !erro && recados.length > 0 && (
        <ul className="lista-recados">
          {recados.map((recado) => (
            <li key={recado.id} className="cartao-recado">
              <strong>{recado.autor} diz:</strong>
              <p>{recado.mensagem}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}