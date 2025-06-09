const turmas = [];

const tbodyTurmas = document.getElementById('tbodyTurmas');
const formTurma = document.getElementById('formTurma');
const modalTurmaEl = document.getElementById('modalTurma');
const modalTurma = new bootstrap.Modal(modalTurmaEl);
const modalTitle = document.getElementById('modalTurmaLabel');
const turmaIndexInput = document.getElementById('turmaIndex');

function atualizarTabela() {
  tbodyTurmas.innerHTML = '';
  turmas.forEach((turma, index) => {
    const vagasDisponiveis = turma.limiteVagas - turma.vagasOcupadas;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${turma.nome}</td>
      <td>${turma.disciplina}</td>
      <td>${turma.professor}</td>
      <td>${turma.turno}</td>
      <td>${turma.limiteVagas}</td>
      <td>${turma.vagasOcupadas}</td>
      <td>${vagasDisponiveis}</td>
      <td>
        <button class="btn btn-sm btn-warning me-2" onclick="editarTurma(${index})">Editar</button>
        <button class="btn btn-sm btn-danger" onclick="excluirTurma(${index})">Excluir</button>
      </td>
    `;
    tbodyTurmas.appendChild(tr);
  });
}

function resetForm() {
  formTurma.reset();
  turmaIndexInput.value = '';
  modalTitle.textContent = 'Nova Turma';
  document.getElementById('vagasOcupadas').value = 0;
}

function editarTurma(index) {
  const turma = turmas[index];
  turmaIndexInput.value = index;
  document.getElementById('nomeTurma').value = turma.nome;
  document.getElementById('disciplina').value = turma.disciplina;
  document.getElementById('professor').value = turma.professor;
  document.getElementById('turno').value = turma.turno;
  document.getElementById('limiteVagas').value = turma.limiteVagas;
  document.getElementById('vagasOcupadas').value = turma.vagasOcupadas;
  modalTitle.textContent = 'Editar Turma';
  modalTurma.show();
}

function excluirTurma(index) {
  if (confirm('Tem certeza que deseja excluir esta turma?')) {
    turmas.splice(index, 1);
    atualizarTabela();
  }
}

formTurma.addEventListener('submit', (e) => {
  e.preventDefault();

  const index = turmaIndexInput.value;
  const nome = document.getElementById('nomeTurma').value.trim();
  const disciplina = document.getElementById('disciplina').value.trim();
  const professor = document.getElementById('professor').value.trim();
  const turno = document.getElementById('turno').value;
  const limiteVagas = parseInt(document.getElementById('limiteVagas').value);
  const vagasOcupadas = parseInt(document.getElementById('vagasOcupadas').value);

  if (vagasOcupadas > limiteVagas) {
    alert('Vagas ocupadas não podem ser maiores que o limite de vagas.');
    return;
  }

  const turmaData = {
    nome,
    disciplina,
    professor,
    turno,
    limiteVagas,
    vagasOcupadas,
  };

  if (index === '') {
    turmas.push(turmaData);
  } else {
    turmas[index] = turmaData;
  }

  atualizarTabela();
  modalTurma.hide();
  resetForm();
});

// Limpa o formulário toda vez que abrir o modal para nova turma
document.getElementById('btnAddTurma').addEventListener('click', () => {
  resetForm();
});

atualizarTabela();
