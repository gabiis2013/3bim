import { supabase } from "../lib/supabase";

export async function listarRecados() {
  const { data, error } = await supabase
    .from("recados")
    .select("id, autor, mensagem, data_criacao")
    .order("data_criacao", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function criarRecado(autor, mensagem) {
  const { data, error } = await supabase
    .from("recados")
    .insert({
      autor: autor.trim(),
      mensagem: mensagem.trim(),
    })
    .select("id, autor, mensagem, data_criacao")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}