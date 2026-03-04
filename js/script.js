document.addEventListener('DOMContentLoaded', () => {

    /* ===================================================
       1. TABS
    =================================================== */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = {
        'sobre': document.getElementById('tab-sobre'),
        'atualizacoes': document.getElementById('tab-atualizacoes'),
        'quem-ajudou': document.getElementById('tab-quem-ajudou'),
        'vakinha-premiada': document.getElementById('tab-vakinha-premiada'),
        'selos': document.getElementById('tab-selos'),
    };

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const target = btn.dataset.tab;
            Object.values(tabContents).forEach(el => {
                if (el) el.style.display = 'none';
            });
            if (tabContents[target]) {
                tabContents[target].style.display = 'block';
            }
        });
    });

    /* ===================================================
       2. ACCORDION
    =================================================== */
    window.toggleAccordion = (id) => {
        const acc = document.getElementById(id);
        if (!acc) return;
        const isOpen = acc.classList.contains('open');
        // Close all
        document.querySelectorAll('.accordion').forEach(a => a.classList.remove('open'));
        // Open clicked if was closed
        if (!isOpen) acc.classList.add('open');
    };

    /* ===================================================
       3. DONATIONS MOCK DATA (Live feed in "Quem Ajudou")
    =================================================== */
    const donationsMock = [
        { name: 'Anônimo', msg: 'Que Deus abençoe e proteja as famílias de Minas.', amount: 'R$ 50,00', time: 'Há 2 minutos' },
        { name: 'Maria S.', msg: 'Força Zona da Mata! O Brasil inteiro está com vocês.', amount: 'R$ 100,00', time: 'Há 5 minutos' },
        { name: 'João Paulo', msg: '', amount: 'R$ 25,00', time: 'Há 12 minutos' },
        { name: 'Ricardo T.', msg: 'Doando o pouco que posso. Boa sorte a todos.', amount: 'R$ 20,00', time: 'Há 15 minutos' },
        { name: 'Carlos E.', msg: 'Estamos juntos nessa. Minas vai superar!', amount: 'R$ 500,00', time: 'Há 18 minutos' },
        { name: 'Anônimo', msg: 'A solidariedade é a nossa maior força', amount: 'R$ 150,00', time: 'Há 22 minutos' },
        { name: 'Ana Clara M.', msg: 'Orando muito pelas pessoas desabrigadas 🙏🏻', amount: 'R$ 40,00', time: 'Há 26 minutos' },
        { name: 'Família Souza', msg: 'Nossos corações doem. Força à Defesa Civil.', amount: 'R$ 300,00', time: 'Há 32 minutos' },
        { name: 'Gabriel S.', msg: '', amount: 'R$ 15,00', time: 'Há 35 minutos' },
        { name: 'Júlia N.', msg: 'Pra ajudar a comprar muita água potável!', amount: 'R$ 80,00', time: 'Há 41 minutos' },
        { name: 'Pedro L.', msg: 'Tristeza imensa. Vai passar logo 🙏', amount: 'R$ 60,00', time: 'Há 45 minutos' },
        { name: 'Amanda J.', msg: 'Peço a Deus por vocês e por mais empatia de todos nós.', amount: 'R$ 120,00', time: 'Há 52 minutos' },
        { name: 'Anônimo', msg: '', amount: 'R$ 35,00', time: 'Há 1 hora' },
        { name: 'Roberto F.', msg: 'Ajudando os conterrâneos de MG.', amount: 'R$ 200,00', time: 'Há 1 hora' },
        { name: 'Empresa Solidária', msg: 'Esperamos que isso alivie o sofrimento.', amount: 'R$ 1.000,00', time: 'Há 1 hora' },
        { name: 'Anônimo', msg: 'Meu singelo apoio', amount: 'R$ 50,00', time: 'Há 2 horas' },
        { name: 'Rafael D.', msg: 'Uai sô, juntos somos mais fortes! Abraço do RS.', amount: 'R$ 150,00', time: 'Há 2 horas' },
        { name: 'Luiza B.', msg: 'Não é muito, mas é de coração ❤️', amount: 'R$ 25,00', time: 'Há 3 horas' },
        { name: 'Fernando G.', msg: 'Vamos reconstruir. Coragem!', amount: 'R$ 400,00', time: 'Há 3 horas' },
        { name: 'Lucas A.', msg: '', amount: 'R$ 75,00', time: 'Há 4 horas' },
        { name: 'Anônimo', msg: 'Todo apoio à região da Zona da Mata e Juiz de Fora', amount: 'R$ 200,00', time: 'Há 5 horas' },
        { name: 'Cláudia R.', msg: 'Eu choro vendo o noticiário. Sigam firmes.', amount: 'R$ 90,00', time: 'Há 5 horas' },
        { name: 'Bárbara', msg: '', amount: 'R$ 65,00', time: 'Há 6 horas' },
        { name: 'Anônimo', msg: 'Por um recomeço seguro.', amount: 'R$ 500,00', time: 'Há 8 horas' },
        { name: 'Vitor Hugo', msg: 'Para comprar colchões e mantimentos.', amount: 'R$ 110,00', time: 'Há 9 horas' }
    ];

    const listElement = document.getElementById('donation-list');
    const paginationContainer = document.getElementById('pagination-container');
    const itemsPerPage = 5;
    let currentPage = 1;
    const totalPages = Math.ceil(donationsMock.length / itemsPerPage);

    function getInitial(name) {
        if (!name || name === 'Anônimo') return '?';
        return name.trim()[0].toUpperCase();
    }

    const avatarColors = ['#00B27A', '#e74c3c', '#3498db', '#9b59b6', '#e67e22', '#1abc9c'];

    function renderDonations(page) {
        if (!listElement) return;
        listElement.innerHTML = '';
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageItems = donationsMock.slice(start, end);

        pageItems.forEach((donation, idx) => {
            const item = document.createElement('div');
            item.className = 'donation-item';
            const color = avatarColors[(start + idx) % avatarColors.length];
            const msgHtml = donation.msg ? `<p class="donation-msg">"${donation.msg}"</p>` : '';

            item.innerHTML = `
                <div class="donation-avatar-mini" style="background:${color}; color:#fff">${getInitial(donation.name)}</div>
                <div class="donation-item-body">
                    <div style="display:flex;justify-content:space-between;align-items:baseline;gap:0.5rem">
                        <span class="donor-name">${donation.name}</span>
                        <span class="donation-amount">${donation.amount}</span>
                    </div>
                    ${msgHtml}
                    <div class="donation-time">${donation.time}</div>
                </div>
            `;
            listElement.appendChild(item);
        });
        renderPagination();
    }

    function renderPagination() {
        if (!paginationContainer) return;
        paginationContainer.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('button');
            btn.className = 'page-btn' + (i === currentPage ? ' active' : '');
            btn.textContent = i;
            btn.addEventListener('click', () => {
                currentPage = i;
                renderDonations(currentPage);
            });
            paginationContainer.appendChild(btn);
        }
    }

    renderDonations(currentPage);

    /* ===================================================
       4. LIVE DONATION COUNTER (Amount growing)
    =================================================== */
    let currentAmount = 5653181.03;
    let currentHearts = 64743;
    let currentBackers = 77506;

    const amountEl = document.getElementById('raised-amount');
    const heartsEl = document.getElementById('backers-hearts');
    const backersEl = document.getElementById('backers-number');
    const progressBar = document.getElementById('progress-bar');
    const goal = 6000000.00;

    const liveNames = ['Nikolas Ferreira', 'Maria C.', 'José A.', 'Anônimo', 'Carolina B.', 'Rodrigo S.', 'Familie Lima'];
    const lastDonorBox = document.getElementById('last-donor-box');
    const lastDonorTime = document.getElementById('last-donor-time');

    setInterval(() => {
        const donation = Math.floor(Math.random() * 150) + 20;
        currentAmount += donation;
        currentHearts += 1;
        currentBackers += 1;

        // Animate amount
        if (amountEl) {
            amountEl.style.transform = 'scale(1.04)';
            amountEl.style.color = '#009968';
            setTimeout(() => {
                amountEl.style.transform = 'scale(1)';
                amountEl.style.color = 'var(--primary)';
            }, 350);
            amountEl.textContent = 'R$ ' + currentAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }

        if (heartsEl) heartsEl.textContent = currentHearts.toLocaleString('pt-BR');
        if (backersEl) backersEl.textContent = currentBackers.toLocaleString('pt-BR');

        if (progressBar) {
            const pct = Math.min((currentAmount / goal) * 100, 100);
            progressBar.style.width = pct + '%';
        }
    }, 3500);

    /* ===================================================
       5. MODAL CHECKOUT
    =================================================== */
    const modal = document.getElementById('checkout-modal');
    const openBtn = document.getElementById('open-checkout-btn');
    const closeBtn = document.getElementById('close-modal');
    const amountDisplay = document.getElementById('modal-amount-display');
    const customInput = document.getElementById('custom-value');

    const formContainer = document.getElementById('checkout-form-container');
    const pixContainer = document.getElementById('pix-payment-container');
    const pixCodeInput = document.getElementById('pix-code-input');
    const pixQrCode = document.getElementById('pix-qrcode');
    const copyPixBtn = document.getElementById('copy-pix-btn');
    const checkoutForm = document.getElementById('checkout-form');
    const submitBtn = document.getElementById('generate-pix-btn');

    // Value buttons inside modal
    const valueBtns = document.querySelectorAll('.value-btn');

    valueBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            valueBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const val = btn.dataset.val;
            if (customInput) customInput.value = val;
            updateModalAmount(val);
        });
    });

    if (customInput) {
        customInput.addEventListener('input', (e) => {
            const val = e.target.value;
            valueBtns.forEach(btn => {
                btn.classList.toggle('active', btn.dataset.val === val);
            });
            updateModalAmount(val);
        });
    }

    function updateModalAmount(val) {
        if (!amountDisplay) return;
        const num = parseFloat(val) || 50;
        amountDisplay.textContent = 'R$ ' + num.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    if (openBtn) {
        openBtn.addEventListener('click', () => {
            const amount = parseFloat(customInput ? customInput.value : 50) || 50;
            updateModalAmount(amount);
            modal.style.display = 'flex';
        });
    }

    const closeModalCallback = () => {
        modal.style.display = 'none';
        clearTimeout(modal._paymentTimeout);
        if (modal._paymentInterval) clearInterval(modal._paymentInterval);
        setTimeout(() => {
            if (formContainer && pixContainer) {
                const modalValueGrid = document.getElementById('modal-value-grid');
                if (modalValueGrid) modalValueGrid.style.display = 'block';
                formContainer.style.display = 'block';
                pixContainer.style.display = 'none';
                const successEl = document.getElementById('success-payment-container');
                if (successEl) successEl.style.display = 'none';
                const titleEl = document.querySelector('.modal-title');
                const subtitleEl = document.querySelector('.modal-subtitle');
                if (titleEl) titleEl.style.display = 'block';
                if (subtitleEl) subtitleEl.style.display = 'block';
            }
        }, 300);
    };

    if (closeBtn) {
        closeBtn.replaceWith(closeBtn.cloneNode(true));
        document.getElementById('close-modal').addEventListener('click', closeModalCallback);
    }

    const finishBtn = document.getElementById('finish-btn');
    if (finishBtn) {
        finishBtn.addEventListener('click', closeModalCallback);
    }

    /* ===================================================
       6. CHECKOUT FORM — SigiloPay API PIX
    =================================================== */
    const generateId = () => Math.random().toString(36).substring(2, 12);

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
                alert('Erro ao gerar PIX');
                console.error(data);
            }

        } catch (error) {
            console.error(error);
            alert('Erro ao contatar o servidor.');
        } finally {
            submitBtn.innerHTML = 'Gerar PIX';
            submitBtn.disabled = false;
        }
    });
}
       

                const data = await response.json();

                if (response.ok && data.transactionId && data.pix) {
                    const pixCodeString = data.pix.code;
                    if (pixCodeInput) pixCodeInput.value = pixCodeString;

                    if (data.pix.base64) {
                        pixQrCode.src = data.pix.base64.startsWith('data:image') ? data.pix.base64 : 'data:image/png;base64,' + data.pix.base64;
                    } else if (data.pix.image) {
                        pixQrCode.src = data.pix.image;
                    } else {
                        pixQrCode.src = 'https://api.qrserver.com/v1/create-qr-code/?size=230x230&data=' + encodeURIComponent(pixCodeString);
                    }

                    const transactionId = data.transactionId || data.id || '';

                    const modalValueGrid = document.getElementById('modal-value-grid');
                    if (modalValueGrid) modalValueGrid.style.display = 'none';
                    formContainer.style.display = 'none';
                    pixContainer.style.display = 'block';

                    let attempts = 0;
                    const maxAttempts = 60;

                    const checkPaymentStatus = async () => {
                        try {
                            const statusRes = await fetch('/api/sigilopay/gateway/transactions?id=' + transactionId, {
                                method: 'GET',
                                headers: {
                                    'x-public-key': 'economicoscortes054_zo28deer0mgbu7ve',
                                    'x-secret-key': '2ylypq0ooy7cx751vknfmfrv2eea2sds3e1whs1j4rxjk1rcm1o1nhx7zefjit7j'
                                }
                            });
                            const statusData = await statusRes.json();

                            if (statusData.status === 'COMPLETED') {
                                clearInterval(modal._paymentInterval);
                                pixContainer.style.display = 'none';
                                document.querySelector('.modal-title').style.display = 'none';
                                document.querySelector('.modal-subtitle').style.display = 'none';
                                document.getElementById('success-payment-container').style.display = 'block';
                            } else if (statusData.status === 'FAILED') {
                                clearInterval(modal._paymentInterval);
                                const waitEl = document.getElementById('waiting-payment');
                                if (waitEl) {
                                    waitEl.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Pagamento recusado ou falhou.';
                                    waitEl.style.color = '#e74c3c';
                                }
                            } else {
                                attempts++;
                                if (attempts >= maxAttempts) {
                                    clearInterval(modal._paymentInterval);
                                    const waitEl = document.getElementById('waiting-payment');
                                    if (waitEl) {
                                        waitEl.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Tempo de pagamento expirado.';
                                        waitEl.style.color = 'var(--text-muted)';
                                    }
                                }
                            }
                        } catch (err) {
                            console.error('Erro ao verificar status:', err);
                        }
                    };

                    modal._paymentInterval = setInterval(checkPaymentStatus, 5000);

                } else {
                    alert('Erro ao gerar doação PIX. Por favor, tente novamente!');
                    console.error('Erro da API:', data);
                }
            } catch (error) {
                console.error('Falha de Comunicação:', error);
                alert('Erro ao contatar o servidor. Verifique sua conexão e tente novamente.');
            } finally {
                submitBtn.innerHTML = 'Gerar PIX <i class="fa-brands fa-pix"></i>';
                submitBtn.disabled = false;
            }
        });
    }

    if (copyPixBtn) {
        copyPixBtn.addEventListener('click', () => {
            if (pixCodeInput) {
                navigator.clipboard.writeText(pixCodeInput.value).catch(() => {
                    pixCodeInput.select();
                    document.execCommand('copy');
                });
            }
            copyPixBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copiado!';
            setTimeout(() => {
                copyPixBtn.innerHTML = '<i class="fa-solid fa-copy"></i> Copiar';
            }, 3000);
        });
    }

    /* ===================================================
       7. SHARE MODAL
    =================================================== */
    const shareModal = document.getElementById('share-modal');
    const shareMainBtn = document.getElementById('share-main-btn');
    const closeShareBtn = document.getElementById('close-share-modal');

    if (shareMainBtn && shareModal) {
        shareMainBtn.addEventListener('click', () => {
            shareModal.style.display = 'flex';
        });
    }

    if (closeShareBtn) {
        closeShareBtn.addEventListener('click', () => {
            shareModal.style.display = 'none';
        });
    }

    const pageUrl = encodeURIComponent('https://vakinha-ajuda-humanitaria.netlify.app');
    const pageTitle = encodeURIComponent('AJUDA HUMANITÁRIA | ZONA DA MATA - MG - Vakinha');

    const shareWhatsapp = document.getElementById('share-whatsapp');
    const shareFacebook = document.getElementById('share-facebook');
    const shareTwitter = document.getElementById('share-twitter');
    const shareCopy = document.getElementById('share-copy');

    if (shareWhatsapp) shareWhatsapp.addEventListener('click', () => window.open(`https://wa.me/?text=${pageTitle}%20${pageUrl}`, '_blank'));
    if (shareFacebook) shareFacebook.addEventListener('click', () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`, '_blank'));
    if (shareTwitter) shareTwitter.addEventListener('click', () => window.open(`https://twitter.com/intent/tweet?text=${pageTitle}&url=${pageUrl}`, '_blank'));
    if (shareCopy) {
        shareCopy.addEventListener('click', () => {
            navigator.clipboard.writeText('https://vakinha-ajuda-humanitaria.netlify.app').catch(() => { });
            shareCopy.innerHTML = '<i class="fa-solid fa-check"></i> Copiado!';
            setTimeout(() => { shareCopy.innerHTML = '<i class="fa-solid fa-link"></i> Copiar Link'; }, 3000);
        });
    }

    // Close modals on overlay click
    [modal, shareModal].forEach(m => {
        if (m) {
            m.addEventListener('click', (e) => {
                if (e.target === m) {
                    if (m === modal) closeModalCallback();
                    else m.style.display = 'none';
                }
            });
        }
    });

    /* ===================================================
       8. IMAGE CAROUSEL
    =================================================== */
    const carouselInner = document.getElementById('hero-carousel');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');

    if (carouselInner) {
        let currentSlideIndex = 0;
        const totalSlidesCount = 2;

        const updateDots = (index) => {
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        };

        const scrollToSlide = (index) => {
            const slideWidth = carouselInner.clientWidth;
            carouselInner.scrollTo({ left: slideWidth * index, behavior: 'smooth' });
            updateDots(index);
        };

        const nextSlide = () => {
            currentSlideIndex = (currentSlideIndex + 1) % totalSlidesCount;
            scrollToSlide(currentSlideIndex);
        };

        const prevSlide = () => {
            currentSlideIndex = (currentSlideIndex - 1 + totalSlidesCount) % totalSlidesCount;
            scrollToSlide(currentSlideIndex);
        };

        if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetInterval(); });
        if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetInterval(); });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlideIndex = index;
                scrollToSlide(index);
                resetInterval();
            });
        });

        let autoSlideInterval = setInterval(nextSlide, 5000);

        const resetInterval = () => {
            clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(nextSlide, 5000);
        };

        carouselInner.addEventListener('scroll', () => {
            clearTimeout(carouselInner.scrollTimeout);
            carouselInner.scrollTimeout = setTimeout(() => {
                const index = Math.round(carouselInner.scrollLeft / carouselInner.clientWidth);
                if (index !== currentSlideIndex) {
                    currentSlideIndex = index;
                    updateDots(index);
                    resetInterval();
                }
            }, 100);
        });
    }

});

