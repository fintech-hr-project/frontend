import type {
  AtualizacaoFuncionario,
  NovoFuncionario,
} from '../types/funcionario';

export function obterCamposAlterados(
  original: NovoFuncionario,
  atual: NovoFuncionario,
): AtualizacaoFuncionario {
  const alteracoes: AtualizacaoFuncionario = {};
  const chaves = Object.keys(original) as Array<keyof NovoFuncionario>;

  for (const chave of chaves) {
    if (original[chave] !== atual[chave]) {
      Object.assign(alteracoes, { [chave]: atual[chave] });
    }
  }

  return alteracoes;
}

export function podeUsarPatch(alteracoes: AtualizacaoFuncionario): boolean {
  const chaves = Object.keys(alteracoes) as Array<keyof AtualizacaoFuncionario>;
  const camposPermitidos: Array<keyof AtualizacaoFuncionario> = [
    'cargo',
    'status',
    'salario',
  ];

  return (
    chaves.length > 0 && chaves.every((chave) => camposPermitidos.includes(chave))
  );
}
