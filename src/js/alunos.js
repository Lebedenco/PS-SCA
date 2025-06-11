// --- Classes ---
class Student {
  /**
   * @readonly
   * @type {string} Identificador (RA) do aluno.
   */
  id;

  /** @type {string} Nome do aluno. */
  name;

  /** @type {string} CPF do aluno. */
  cpf;

  /** @type {Date} Data de nascimento do aluno. */
  birthday;

  /** @type {string} Endereço do aluno. */
  address;

  /** @type {string} Número de telefone do aluno. */
  tel;

  /** @type {string} E-mail do aluno. */
  email;

  /**
   * @param {string} id Identificador (RA) do aluno.
   *
   * @param {string} name Nome do aluno.
   *
   * @param {string} cpf CPF do aluno.
   *
   * @param {Date}   birthday Data de Nascimento do aluno.
   *
   * @param {string} address Endereço do aluno.
   *
   * @param {string} tel Número de telefone do aluno.
   *
   * @param {string} email E-mail do aluno.
   *
   * @returns {Student} Novo aluno.
   */
  constructor(id, name, cpf, birthday, address, tel, email) {
    this.id = id ? id : studentModalLabel.value;

    this.name = name ? name : studentModalNameInput.value;

    this.cpf = cpf ? cpf : studentModalCpfInput.value;

    this.birthday = birthday
      ? birthday
      : new Date(studentModalBirthdayInput.valueAsDate);

    this.address = address ? address : studentModalAddressInput.value;

    this.tel = tel ? tel : studentModalTelInput.value;

    this.email = email ? email : studentModalEmailInput.value;
  }
}

class State {
  /**
   * @private
   * @type {Array<Student> | null} Array de alunos cadastrados.
   */
  studentState;

  /**
   * @private
   * @type {string | null} Identificador (RA) do aluno que está selecionado.
   */
  selectedStudent;

  /**
   * @private @readonly
   * @type {HTMLElement | null} Elemento HTML do modal de aluno.
   */
  studentModal;

  /**
   * @private @readonly
   * @type {HTMLElement | null} Elemento HTML do título do modal de aluno.
   */
  studentModalLabel;

  /**
   * @private @readonly
   * @type {HTMLElement | null} Elemento HTML do grupo de botões de controle do modal de aluno.
   */
  studentModalControlButtonGroup;

  /**
   * @private @readonly
   * @type {HTMLElement | null} Elemento HTML do botão de habilitar edição no modal de aluno.
   */
  studentModalControlEditButton;

  /**
   * @private @readonly
   * @type {HTMLElement | null} Elemento HTML do botão de habilitar remoção no modal de aluno.
   */
  studentModalControlDeleteButton;

  /**
   * @private @readonly
   * @type {HTMLElement | null} Elemento HTML do botão de salvar alterações no modal de aluno.
   */
  studentModalSaveButton;

  /**
   * @private @readonly
   * @type {HTMLElement | null} Elemento HTML do campo de nome do modal de aluno.
   */
  studentModalNameInput;

  /**
   * @private @readonly
   * @type {HTMLElement | null} Elemento HTML do campo de CPF do modal de aluno.
   */
  studentModalCpfInput;

  /**
   * @private @readonly
   * @type {HTMLElement | null} Elemento HTML do campo de data de nascimento do modal de aluno.
   */
  studentModalBirthdayInput;

  /**
   * @private @readonly
   * @type {HTMLElement | null} Elemento HTML do campo de endereço do modal de aluno.
   */
  studentModalAddressInput;

  /**
   * @private @readonly
   * @type {HTMLElement | null} Elemento HTML do campo de número de telefone do modal de aluno.
   */
  studentModalTelInput;

  /**
   * @private @readonly
   * @type {HTMLElement | null} Elemento HTML do campo de e-mail do modal de aluno.
   */
  studentModalEmailInput;

  /**
   * @private @readonly
   * @type {Array<HTMLElement> | null} Array de elementos HTML referentes aos campos do formulário no modal de aluno.
   */
  studentModalInputs;

  /**
   * @private @readonly
   * @type {HTMLElement | null} Elemento HTML do corpo da tabela de alunos.
   */
  studentsTableBody;

  /**
   * Inicia o estado vazio.
   *
   * @returns {State} Estado vazio.
   */
  constructor() {
    this.studentState = null;
    this.studentModal = null;
    this.studentModalSaveButton = null;
    this.studentModalControlButtonGroup = null;
    this.studentModalControlEditButton = null;
    this.studentModalControlDeleteButton = null;
    this.studentModalNameInput = null;
    this.studentModalCpfInput = null;
    this.studentModalBirthdayInput = null;
    this.studentModalAddressInput = null;
    this.studentModalTelInput = null;
    this.studentModalEmailInput = null;
    this.studentsTableBody = null;
    this.studentModalInputs = null;
  }

  /**
   * Inicia o estado global.
   *
   * @returns {State} Estado global.
   */
  init = () => {
    const studentStateAsJSON = localStorage.getItem("@sca:alunos-1.0.0");

    this.studentState = studentStateAsJSON
      ? JSON.parse(studentStateAsJSON)
      : [];

    this.studentModal = document.getElementById("studentModal");
    this.studentModalLabel = document.getElementById("studentModalLabel");

    this.studentModalSaveButton = document.getElementById(
      "studentModalSaveButton"
    );

    this.studentModalControlButtonGroup = document.getElementById(
      "studentModalControlButtonGroup"
    );

    this.studentModalControlEditButton = document.getElementById(
      "studentModalControlEditButton"
    );

    this.studentModalControlDeleteButton = document.getElementById(
      "studentModalControlDeleteButton"
    );

    this.studentModalNameInput = document.getElementById(
      "studentModalNameInput"
    );
    this.studentModalCpfInput = document.getElementById("studentModalCpfInput");

    this.studentModalBirthdayInput = document.getElementById(
      "studentModalBirthdayInput"
    );

    this.studentModalAddressInput = document.getElementById(
      "studentModalAddressInput"
    );

    this.studentModalTelInput = document.getElementById("studentModalTelInput");

    this.studentModalEmailInput = document.getElementById(
      "studentModalEmailInput"
    );

    this.studentsTableBody = document.getElementById("studentsTableBody");

    this.studentModalInputs = document.getElementsByClassName(
      "studentModalFormInput"
    );

    return this;
  };

  /**
   * Retorna o estado atual do identificador (RA) de aluno selecionado.
   *
   * @returns {string | null} Estado atual do identificador (RA) de aluno selecionado.
   */
  getSelectedStudent = () => {
    return this.selectedStudent;
  };

  /**
   * Altera o estado de identificador (RA) do aluno selecionado.
   *
   * @param selectedStudent Novo estado de identificador (RA) do aluno selecionado.
   */
  setSelectedStudent = (selectedStudent) => {
    this.selectedStudent = selectedStudent;
  };

  /**
   * Retorna o estado atual do título do modal de aluno.
   *
   * @returns {HTMLElement | null} Estado atual do título do modal de aluno.
   */
  getModalLabel = () => {
    return this.studentModalLabel;
  };

  /**
   * Retorna o estado do botão de salvar alterações.
   *
   * @returns {HTMLElement | null} Estado atual do botão de salvar alterações.
   */
  getSaveButton = () => {
    return this.studentModalSaveButton;
  };

  /**
   * Altera o estado do botão de salvar alterações.
   *
   * Estiliza de acordo com o botão de controle selecionado.
   */
  setSaveButton = () => {
    this.resetSaveButton(false);

    // Verificar qual opção e executar sua ação
    if (this.studentModalControlEditButton.checked) {
      // Habilitar inputs e botão Salvar, para edição
      this.resetInputs(false, false);

      this.studentModalSaveButton.innerHTML = "Atualizar";
    } else if (this.studentModalControlDeleteButton.checked) {
      // Desabilitar inputs, no caso de estarem habilitados
      this.resetInputs(true, false);

      this.studentModalSaveButton.innerHTML = "EXCLUIR";
      this.studentModalSaveButton.classList.add("btn-danger");
    }
  };

  /**
   * Altera o valor do estado atual dos campos do modal de aluno.
   *
   * @param {Student} student Novo valor para o estado atual dos campos do modal de aluno.
   */
  setInputsValues = (student) => {
    this.studentModalLabel.innerHTML = student.id;
    this.studentModalNameInput.value = student.name;
    this.studentModalCpfInput.value = student.cpf;
    this.studentModalBirthdayInput.valueAsDate = new Date(student.birthday);
    this.studentModalAddressInput.value = student.address;
    this.studentModalTelInput.value = student.tel;
    this.studentModalEmailInput.value = student.email;
  };

  /**
   * Busca o aluno com o RA informado.
   *
   * @param {string | null} id Identificador (RA) do Aluno.
   *
   * @returns {Student | undefined} Retorna o aluno ou `undefined` se não existir.
   */
  getStudentById = (id) => {
    return this.studentState.find((student) => student.id.toString() === id);
  };

  /**
   * Habilita os botões de controle do modal de aluno.
   */
  enableControlButtonGroup = () => {
    this.studentModalControlButtonGroup.style.display = "flex";
  };

  /**
   * Apaga os filhos do elemento HTML.
   *
   * @param {HTMLElement} element Elemento HTML.
   */
  deleteChildren = (element) => {
    let child = element.lastElementChild;

    while (child) {
      element.removeChild(child);

      child = element.lastElementChild;
    }
  };

  /**
   * Preenche a tabela com os alunos.
   *
   * Limpa a tabela, cria os elementos, recebe os alunos pelo estado global e os insere.
   */
  loadStudentsTable = () => {
    // Deletar os filhos da tabela (limpar)
    this.deleteChildren(studentsTableBody);

    // Percorrer estado e inserir na tabela
    // Exibir mensagem se estiver vazio
    if (this.studentState.length > 0) {
      this.studentState.forEach((student) => {
        const row = document.createElement("tr");
        const birthday = new Date(student.birthday);

        row.innerHTML =
          `
          <th class="studentId" scope="row">${student.id}</th>
          <td class="studentName">${student.name}</td>
          <td class="studentCpf">${student.cpf}</td>
          <td class="studentBirthday">
            ${birthday.getUTCDate().toString().padStart(2, "0")}/` +
          `${(birthday.getMonth() + 1).toString().padStart(2, "0")}/` +
          `${birthday.getUTCFullYear()}
          </td>
          <td class="studentAddress">${student.address}</td>
          <td class="studentTel">${student.tel}</td>
          <td class="studentEmail">${student.email}</td>
        `;

        row.setAttribute("data-bs-toggle", "modal");
        row.setAttribute("data-bs-target", "#studentModal");
        row.setAttribute("onclick", "handleSelectStudent(this)");

        this.studentsTableBody.appendChild(row);
      });
    } else {
      const noStudents = document.createElement("td");

      noStudents.innerHTML = "Nenhum aluno cadastrado.";
      noStudents.colSpan = "7";
      noStudents.style = "font-size: 2.5rem; font-weight: 500;";

      this.studentsTableBody.appendChild(noStudents);
    }
  };

  /**
   * Reseta o botão "Salvar".
   *
   * Remove estilos alternativos, altera seu texto e o habilita/desabilita.
   *
   * @param {boolean} isDisabled Define se deve desabilitar (`true`) ou não (`false`).
   */
  resetSaveButton = (isDisabled) => {
    this.studentModalSaveButton.classList.remove("btn-danger");
    this.studentModalSaveButton.innerHTML = "Salvar";
    this.studentModalSaveButton.disabled = isDisabled;
  };

  /**
   * Reseta os campos do formulário.
   *
   * Percorre e habilita/desabilita cada um. Se necessário, "limpa" o formulário.
   *
   * @param {boolean} areDisabled Define se os campos devem estar desabilitados (`true`) ou não (`false`).
   *
   * @param {boolean} needsCleaning Define se deve limpar o formulário.
   */
  resetInputs = (areDisabled, needsCleaning) => {
    Array.from(this.studentModalInputs).forEach((input) => {
      input.disabled = areDisabled;

      needsCleaning && (input.value = "");
    });
  };

  /**
   * Reseta o botão "Salvar", desabilita os campos, desmarca e desabilita botões "Editar" e "Deletar".
   */
  closeModal = () => {
    // Resetar
    this.resetSaveButton(true);
    this.resetInputs(true, true);

    // Desmarcar
    this.studentModalControlEditButton.checked = false;
    this.studentModalControlDeleteButton.checked = false;

    // Desabilitar
    this.studentModalControlButtonGroup.style.display = "none";
    this.selectedStudent = null;
  };

  /**
   * Salva o estado global no localStorage.
   */
  saveState = () => {
    localStorage.setItem(
      "@sca:alunos-1.0.0",
      JSON.stringify(this.studentState)
    );

    state.loadStudentsTable();
  };

  /**
   * Cria um novo aluno e o adiciona ao estado global.
   */
  createNewStudent = () => {
    // Simular identificador
    const ra =
      this.studentState.length > 0
        ? parseInt(this.studentState[this.studentState.length - 1].id) + 1
        : 20250100;

    this.studentState.push(new Student(ra));
  };

  /**
   * Deleta o aluno selecionado (`selectedStudent`).
   */
  deleteStudent = () => {
    const studentState = this.studentState.filter(
      (student) => student.id.toString() !== this.selectedStudent
    );

    this.studentState = studentState;
  };

  /**
   * Atualiza o aluno selecionado (`selectedStudent`).
   */
  updateStudent = () => {
    this.studentState = this.studentState.map((student) => {
      if (student.id.toString() === this.selectedStudent) {
        student = new Student(this.selectedStudent);
      }

      return student;
    });
  };

  /**
   * Valida os campos do formulário.
   *
   * @returns {string | null} Indica o erro no formulário. Se for `null`, é válido.
   */
  hasInvalidData = () => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const cpf = this.studentModalCpfInput.value;
    const studentWithSameCpf = this.studentState.find(
      (student) => student.cpf === cpf
    );

    if (
      cpf.length < 14 ||
      (studentWithSameCpf && this.selectedStudent !== studentWithSameCpf.id)
    ) {
      return "CPF inválido";
    }

    if (this.studentModalBirthdayInput.valueAsDate >= new Date()) {
      return "Data de Nascimento inválida";
    }

    if (this.studentModalTelInput.value.length < 15) {
      return "Número de Telefone inválido";
    }

    if (!this.studentModalEmailInput.value.match(emailRegex)) {
      return "E-mail inválido";
    }

    return null;
  };
}

/**
 * @type {State} Estado global
 */
let state = new State();

/**
 * Executada ao clicar em uma linha da tabela de alunos.
 *
 * Estado de aluno selecionado recebe o RA da linha selecionada.
 *
 * Habilita os botões "Editar" e "Deletar".
 *
 * @param {HTMLElement} target Elemento HTML selecionado.
 */
const handleSelectStudent = (target) => {
  // Aluno selecionado recebe valor do elemento filho com a classe `studentId`
  state.setSelectedStudent(
    Array.from(target.children)
      .find((child) => child.className === "studentId")
      .innerHTML.trim()
  );

  // Procurar aluno no estado e carregar os campos
  const selectedId = state.getSelectedStudent();
  const student = state.getStudentById(selectedId);

  state.setInputsValues(student);

  // Habilitar botões
  state.enableControlButtonGroup();
};

/**
 * Executada ao clicar nos botões "Editar" ou "Deletar".
 */
const handleStudentControl = () => {
  state.setSaveButton();
};

/**
 * Executada ao clicar no botão "Novo Aluno".
 *
 * Altera o cabeçalho do modal, ativa os campos e botão "Salvar".
 */
const handleNewStudent = () => {
  state.getModalLabel().innerHTML = "Cadastrar Aluno";

  state.resetInputs(false, true);
  state.resetSaveButton(false);
};

/**
 * Executada ao clicar no botão "Salvar".
 *
 * @param {Event} event Evento
 *
 */
const handleSubmit = (event) => {
  let success = false;

  // Validação Bootstrap
  const forms = document.querySelectorAll(".needs-validation");

  Array.from(forms).forEach((form) => {
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();

      alert("Preencha todos os campos!");
    } else {
      const check = state.hasInvalidData();

      // Executar ação de acordo com o texto no botão "Salvar"
      let action = state.getSaveButton().innerHTML;

      switch (action) {
        case "Salvar":
          if (check) {
            alert(`ERRO! ${check}.`);

            return;
          } else {
            state.createNewStudent();

            action = "criado";
          }

          break;
        case "Atualizar":
          if (check) {
            alert(`ERRO! ${check}.`);

            return;
          } else {
            state.updateStudent();

            action = "atualizado";
          }

          break;
        case "EXCLUIR":
          const selectedId = state.getSelectedStudent();
          const student = state.getStudentById(selectedId);

          if (
            !confirm(
              `CUIDADO!\n\n` +
                `Deseja mesmo excluir o aluno\n` +
                `${student.name} (${student.id}) ?`
            )
          ) {
            return;
          }

          state.deleteStudent();

          action = "removido";

          break;
        default:
          break;
      }

      action !== "removido" ? alert(`Aluno ${action} com sucesso!`) : "";
      state.saveState();

      success = true;
    }

    success
      ? bootstrap.Modal.getInstance(studentModal).hide()
      : form.classList.add("was-validated");
  });
};

// --- Eventos ---
// Acionado ao carregar a página
window.addEventListener("load", () => {
  // Carregar estado
  state = state.init();

  if (!state) {
    console.error("Erro! O estado é nulo.");

    return;
  }

  // Carregar elementos e preencher tabela
  state.loadStudentsTable();

  // Ao fechar modal
  studentModal.addEventListener("hidden.bs.modal", state.closeModal);
});
