export default function ListaRecados({ recados }) {
  if (recados.length === 0) {
    return (
      <p>
        O mural está vazio no momento. Seja o primeiro a postar!
      </p>
    );
  }

  return (
    <ul className="lista-recados">
      {recados.map((recado) => (
        <li key={recado.id} className="cartao-recado">
          <strong>{recado.autor} diz:</strong>
          <p>{recado.mensagem}</p>
        </li>
      ))}
    </ul>
  );
}