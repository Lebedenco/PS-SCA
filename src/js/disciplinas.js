let disciplinas = [];
let indexEditando = null;

function exibirMensagem(msg, cor = 'green') {
  const msgDiv = document.getElementById('mensagem');
  msgDiv.innerText = msg;
  msgDiv.style.color = cor;
  setTimeout(() => msgDiv.innerText = '', 3000);
}

function limparCampos() {
  document.getElementById('nome').value = '';
  document.getElementById('codigo').value = '';
  document.getElementById('carga').value = '';
  document.getElementById('pre').value = '';
  document.getElementById('limite').value = '';
  document.getElementById('btnSalvar').classList.remove('d-none');
  document.getElementById('btnAtualizar').classList.add('d-none');
}

function atualizarTabela() {
  const corpo = document.querySelector('#tabela tbody');
  corpo.innerHTML = '';

  disciplinas.forEach((d, index) => {
    const linha = `
      <tr>
        <td>${d.nome}</td>
        <td>${d.codigo}</td>
        <td>${d.carga}</td>
        <td>${d.pre}</td>
        <td>${d.limite}</td>
        <td>
          <button class="btn btn-sm btn-primary" onclick="editar(${index})">Editar</button>
          <button class="btn btn-sm btn-danger" onclick="excluir(${index})">Excluir</button>
        </td>
      </tr>`;
    corpo.innerHTML += linha;
  });
}

function salvar() {
  const nome = document.getElementById('nome').value.trim();
  const codigo = document.getElementById('codigo').value.trim().toUpperCase();
  const carga = parseInt(document.getElementById('carga').value);
  const pre = document.getElementById('pre').value.trim();
  const limite = parseInt(document.getElementById('limite').value);

  if (!nome || !codigo || isNaN(carga) || isNaN(limite)) {
    return exibirMensagem('Preencha todos os campos obrigatórios!', 'red');
  }

  if (disciplinas.some(d => d.codigo === codigo)) {
    return exibirMensagem('Código já cadastrado!', 'red');
  }

  if (pre.split(',').map(p => p.trim().toUpperCase()).includes(codigo)) {
    return exibirMensagem('Pré-requisito não pode ser a própria disciplina!', 'red');
  }

  disciplinas.push({ nome, codigo, carga, pre, limite });
  atualizarTabela();
  limparCampos();
  exibirMensagem('Disciplina cadastrada com sucesso!');
}

function editar(index) {
  const d = disciplinas[index];
  document.getElementById('nome').value = d.nome;
  document.getElementById('codigo').value = d.codigo;
  document.getElementById('codigo').disabled = true;
  document.getElementById('carga').value = d.carga;
  document.getElementById('pre').value = d.pre;
  document.getElementById('limite').value = d.limite;

  indexEditando = index;
  document.getElementById('btnSalvar').classList.add('d-none');
  document.getElementById('btnAtualizar').classList.remove('d-none');
}

function atualizar() {
  const nome = document.getElementById('nome').value.trim();
  const carga = parseInt(document.getElementById('carga').value);
  const pre = document.getElementById('pre').value.trim();
  const limite = parseInt(document.getElementById('limite').value);

  if (!nome || isNaN(carga) || isNaN(limite)) {
    return exibirMensagem('Campos obrigatórios não podem estar vazios!', 'red');
  }

  disciplinas[indexEditando].nome = nome;
  disciplinas[indexEditando].carga = carga;
  disciplinas[indexEditando].pre = pre;
  disciplinas[indexEditando].limite = limite;

  atualizarTabela();
  limparCampos();
  document.getElementById('codigo').disabled = false;
  exibirMensagem('Disciplina atualizada com sucesso!');
}

function excluir(index) {
  if (confirm('Deseja excluir esta disciplina?')) {
    disciplinas.splice(index, 1);
    atualizarTabela();
    exibirMensagem('Disciplina excluída!');
  }
}

document.getElementById('btnSalvar').addEventListener('click', salvar);
document.getElementById('btnAtualizar').addEventListener('click', atualizar);