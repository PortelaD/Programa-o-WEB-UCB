class Despesa {
  constructor(categoria, descricao, quantidade, valor) {
      this.categoria = categoria;
      this.descricao = descricao;
      this.quantidade = quantidade;
      this.valor = valor;
  }
}

let despesas = [];

let indiceExclusao = -1;

function exibirModalExclusao(index) {
  indiceExclusao = index;
  const modalExcluir = new bootstrap.Modal(document.getElementById('modalExcluir'));
  modalExcluir.show();
}

function searchExpense() {
  atualizarLista();
}

function confirmarExclusao() {
  if (indiceExclusao !== -1) {
      excluirDespesa(indiceExclusao);
      indiceExclusao = -1;
  }
  const modalExcluir = bootstrap.Modal.getInstance(document.getElementById('modalExcluir'));
  modalExcluir.hide();
}

let indiceEdicao = -1;

function exibirModalEdicao(index) {
  indiceEdicao = index;
  const despesa = despesas[index];
  document.getElementById('editCategoria').value = despesa.categoria;
  document.getElementById('editDescricao').value = despesa.descricao;
  document.getElementById('editQuantidade').value = despesa.quantidade.toString(); // Converter para string
  document.getElementById('editValor').value = despesa.valor;
  const modalEditar = new bootstrap.Modal(document.getElementById('modalEditar'));
  modalEditar.show();
}

function salvarEdicao() {
  if (indiceEdicao !== -1) {
      const categoria = document.getElementById('editCategoria').value;
      const descricao = document.getElementById('editDescricao').value;
      const quantidade = parseFloat(document.getElementById('editQuantidade').value);
      const valor = parseFloat(document.getElementById('editValor').value);

      if (!categoria || !descricao || isNaN(quantidade) || isNaN(valor)) {
          alert('Por favor, preencha todos os campos corretamente.');
          return;
      }

      despesas[indiceEdicao].categoria = categoria;
      despesas[indiceEdicao].descricao = descricao;
      despesas[indiceEdicao].quantidade = quantidade;
      despesas[indiceEdicao].valor = valor;

      atualizarLista();

      // Resetar indiceEdicao após salvar
      indiceEdicao = -1;
  }
  const modalEditar = bootstrap.Modal.getInstance(document.getElementById('modalEditar'));
  modalEditar.hide();
}

function adicionarOuAtualizarDespesa() {
  if (indiceEdicao === -1) {
      adicionarDespesa();
  } else {
      salvarEdicao();
  }
}

function adicionarDespesa() {
  const categoria = document.getElementById('categoria').value;
  const descricao = document.getElementById('descricao').value;
  const quantidade = parseFloat(document.getElementById('quantidade').value);
  const valor = parseFloat(document.getElementById('valor').value);

  if (!categoria || !descricao || isNaN(quantidade) || isNaN(valor)) {
      alert('Favor preencher os campos corretamente.');
      return;
  }

  const despesa = new Despesa(categoria, descricao, quantidade, valor);
  despesas.push(despesa);

  atualizarLista();

  // Resetar campos do formulário
  document.getElementById('categoria').value = '';
  document.getElementById('descricao').value = '';
  document.getElementById('quantidade').value = '';
  document.getElementById('valor').value = '';
}

function excluirDespesa(index) {
  despesas.splice(index, 1);
  atualizarLista();
}

function atualizarLista() {
  const busca = document.getElementById('busca').value.toLowerCase();
  const despesasFiltradas = despesas.filter(despesa =>
      despesa.categoria.toLowerCase().includes(busca) ||
      despesa.descricao.toLowerCase().includes(busca) ||
      despesa.quantidade.toString().includes(busca) ||
      despesa.valor.toString().includes(busca)
  );

  const listaDespesas = document.getElementById('listaDespesas');
  listaDespesas.innerHTML = '';

  despesasFiltradas.forEach((despesa, index) => {
      const row = `
          <tr>
              <td>${despesa.categoria}</td>
              <td>${despesa.descricao}</td>
              <td>${despesa.quantidade}</td>
              <td>${despesa.valor}</td>
              <td>
                  <button class="btn btn-primary" onclick="exibirModalEdicao(${index})">Editar</button>
                  <button class="btn btn-danger" onclick="exibirModalExclusao(${index})">Excluir</button>
              </td>
          </tr>
      `;
      listaDespesas.innerHTML += row;
  });
}

function buscarDespesa() {
  atualizarLista();
}