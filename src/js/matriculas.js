let matriculas = [];

function exibirMensagem(texto, cor = 'green') {
  const msg = document.getElementById('mensagem');
  msg.innerText = texto;
  msg.style.color = cor;
  setTimeout(() => msg.innerText = '', 3000);
}

function limparCampos() {
  document.getElementById('idAluno').value = '';
  document.getElementById('nomeAluno').value = '';
  document.getElementById('disciplina').value = '';
}

function atualizarTabela(lista = matriculas) {
  const tabela = document.getElementById('tabelaMatriculas');
  tabela.innerHTML = '';

  lista.forEach((mat, index) => {
    tabela.innerHTML += `
      <tr>
        <td>${mat.id}</td>
        <td>${mat.nome}</td>
        <td>${mat.disciplina}</td>
        <td>${mat.data}</td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="cancelarMatricula(${index})">Cancelar</button>
        </td>
      </tr>`;
  });
}

function efetuarMatricula() {
  const id = parseInt(document.getElementById('idAluno').value);
  const nome = document.getElementById('nomeAluno').value.trim();
  const disciplina = document.getElementById('disciplina').value.trim();

  if (!id || !nome || !disciplina) {
    return exibirMensagem('Preencha todos os campos!', 'red');
  }

  const jaMatriculado = matriculas.some(m => m.id === id && m.disciplina === disciplina);
  if (jaMatriculado) {
    return exibirMensagem('Aluno já matriculado nessa disciplina!', 'red');
  }

  const dataHora = new Date().toLocaleString();
  matriculas.push({ id, nome, disciplina, data: dataHora });

  atualizarTabela();
  limparCampos();
  exibirMensagem('Matrícula realizada com sucesso!');
}

function cancelarMatricula(index) {
  if (confirm('Deseja cancelar esta matrícula?')) {
    matriculas.splice(index, 1);
    atualizarTabela();
    exibirMensagem('Matrícula cancelada!');
  }
}

function ordenarPorNome() {
  matriculas.sort((a, b) => a.nome.localeCompare(b.nome));
  atualizarTabela();
}

document.getElementById('btnMatricular').addEventListener('click', efetuarMatricula);

document.getElementById('buscaNome').addEventListener('input', () => {
  const filtro = document.getElementById('buscaNome').value.toLowerCase();
  const filtradas = matriculas.filter(m => m.nome.toLowerCase().includes(filtro));
  atualizarTabela(filtradas);
});