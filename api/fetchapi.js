const API_URL = "http://192.168.1.66:3322";

const buscarVendas = async (filtro, pesquisa) => {
  if (filtro == undefined && pesquisa == undefined) {
    const vendas = await fetch(`${API_URL}/listarVendas`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
    const data = await vendas.json();
    return data;
  }
};

const buscarCliente = async (p) => {
  if (p === "") {
    const clientes = await fetch(`${API_URL}/clientes/all`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
    const data = await clientes.json();
    return data;
  } else {
    const clientes = await fetch(`${API_URL}/clientes/${p}`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
    const data = await clientes.json();
    return data;
  }
};

const buscarProdutos = async (p) => {
  if (p === "") {
    const produtos = await fetch(`${API_URL}/produtos/all`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
    const data = await produtos.json();
    return data;
  } else {
    const produtos = await fetch(`${API_URL}/produtos/${p}`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
    const data = await produtos.json();
    return data;
  }
};

const buscarImagensProduto = async (id) => {
  const imagens = await fetch(`${API_URL}/imageProdutoId/${id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
  const data = await imagens.json();
  return data;
};

const buscarProdutosVenda = async (id) => {
  const produtos = await fetch(`${API_URL}/procurarProdutosVenda/${id}`)
    .then((response) => {
      return response;
    })
    .catch((erro) => {
      return erro;
    });

  const dados = await produtos.json();
  return dados;
};

const buscarRelatoriosBasicos = async () => {
  const buscarRelatoriosBasicos = await fetch(`${API_URL}/faturamentoMes`);
  const dados = await buscarRelatoriosBasicos.json();
  return dados;
};

export default {
  buscarVendas,
  buscarCliente,
  buscarProdutos,
  buscarImagensProduto,
  buscarProdutosVenda,
  buscarRelatoriosBasicos
};
