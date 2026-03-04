exports.handler = async (event) => {
  try {
    const { valor, nome, cpf } = JSON.parse(event.body);

    const response = await fetch(
      "https://api.misticpay.com/api/transactions/create",
      {
        method: "POST",
        headers: {
          "ci": process.env.MISTIC_CLIENT_ID,
          "cs": process.env.MISTIC_CLIENT_SECRET,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          amount: Number(valor),
          payerName: nome,
          payerDocument: cpf,
          transactionId: "TX-" + Date.now(),
          description: "Pagamento via site"
        })
      }
    );

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        qrCodeBase64: data.data.qrCodeBase64,
        copiaECola: data.data.copyPaste
      })
    };

  } catch (error) {
    console.log(error);

    return {
      statusCode: 500,
      body: JSON.stringify({ erro: "Erro ao criar transação Pix" })
    };
  }
};