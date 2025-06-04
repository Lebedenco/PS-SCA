
  //  CONTROLE DE VAGAS
  const vagasCurso = {
    "Engenharia de Software": 40,
    "Análise e Desenvolvimento de Sistemas": 35,
    "Ciência da Computação": 30
  };

  const vagasMateria = {
    "Processos de Software": 3,
    "Banco de Dados": 5,
    "Estrutura de Dados": 5
  };

  // CAPTURAR O FORM    
  const form = document.getElementById('form-cadastro');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const cursoSelecionado = document.getElementById('curso').value;
    const materiaSelecionada = document.getElementById('materiaAluno').value;

    if (!cursoSelecionado || !materiaSelecionada) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    // VALIDADOR DE NUMERO DE VAGAS CONFORME CONDICIONAL
    if (vagasCurso[cursoSelecionado] > 0 && vagasMateria[materiaSelecionada] > 0) {
      vagasCurso[cursoSelecionado]--;
      vagasMateria[materiaSelecionada]--;

      alert(`Aluno cadastrado com sucesso!\nVagas restantes:\nCurso: ${vagasCurso[cursoSelecionado]}\nMatéria: ${vagasMateria[materiaSelecionada]}`);
      form.reset();
    } else {
      alert(`Não há vagas disponíveis para:\n${vagasCurso[cursoSelecionado] === 0 ? "Curso selecionado" : ""}\n${vagasMateria[materiaSelecionada] === 0 ? "Matéria selecionada" : ""}`);
    }
  });

  const btnToggleTheme = document.getElementById('btn-toggle-theme');
  const iconTheme = document.getElementById('icon-theme');
  const html = document.documentElement;

  // Carregar tema salvo anteriormente
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    html.setAttribute('data-bs-theme', savedTheme);
    iconTheme.className = savedTheme === 'dark' ? 'bi bi-moon-fill' : 'bi bi-sun-fill';
  }

  btnToggleTheme.addEventListener('click', () => {
    const isDark = html.getAttribute('data-bs-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';

    html.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    iconTheme.className = newTheme === 'dark' ? 'bi bi-moon-fill' : 'bi bi-sun-fill';
  });
