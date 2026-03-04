document.addEventListener('DOMContentLoaded', () => {

/* ===================================================
   6. CHECKOUT FORM — NETLIFY + MISTIC PAY
=================================================== */

const formContainer = document.getElementById('checkout-form-container');
const pixContainer = document.getElementById('pix-payment-container');
const pixCodeInput = document.getElementById('pix-code-input');
const pixQrCode = document.getElementById('pix-qrcode');
const checkoutForm = document.getElementById('checkout-form');
const submitBtn = document.getElementById('generate-pix-btn');
const customInput = document.getElementById('custom-value');

if (checkoutForm) {

checkoutForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('donor-name').value;
    const cpf = document.getElementById('donor-document').value;
    const valor = parseFloat(customInput ? customInput.value : 50) || 50;

    submitBtn.innerHTML = 'Gerando PIX...';
    submitBtn.disabled = true;

    try {

        const response = await fetch('/.netlify/functions/criar-pix', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                valor,
                nome,
                cpf
            })
        });

        const data = await response.json();

        if (response.ok && data.qrCodeBase64) {

            pixQrCode.src = data.qrCodeBase64.startsWith('data:image')
                ? data.qrCodeBase64
                : 'data:image/png;base64,' + data.qrCodeBase64;

            pixCodeInput.value = data.copiaECola || '';

            formContainer.style.display = 'none';
            pixContainer.style.display = 'block';

        } else {
            console.error(data);
            alert('Erro ao gerar PIX.');
        }

    } catch (error) {
        console.error(error);
        alert('Erro ao contatar o servidor.');
    }

    submitBtn.innerHTML = 'Gerar PIX';
    submitBtn.disabled = false;
});

}

/* ===================================================
   COPY PIX BUTTON
=================================================== */

const copyPixBtn = document.getElementById('copy-pix-btn');

if (copyPixBtn) {
    copyPixBtn.addEventListener('click', () => {
        if (pixCodeInput) {
            navigator.clipboard.writeText(pixCodeInput.value).catch(() => {
                pixCodeInput.select();
                document.execCommand('copy');
            });
        }

        copyPixBtn.innerHTML = 'Copiado!';
        setTimeout(() => {
            copyPixBtn.innerHTML = 'Copiar';
        }, 3000);
    });
}

});
