(() => {
    const elements = document.querySelectorAll(".scroll-animate");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (elements.length) {
        if (reducedMotion || !("IntersectionObserver" in window)) {
            elements.forEach((element) => element.classList.add("visible"));
        } else {
            const observer = new IntersectionObserver(
                (entries, obs) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("visible");
                            obs.unobserve(entry.target);
                        }
                    });
                },
                {
                    root: null,
                    rootMargin: "0px 0px -40px 0px",
                    threshold: 0.12,
                }
            );

            elements.forEach((element) => observer.observe(element));
        }
    }

    const conditions = {
        circulatorio: {
            title: "Doenças do aparato circulatório e cardiovasculares",
            description: "Incluem doenças relacionadas ao coração, vasos sanguíneos e circulação arterial e venosa.",
            examples: [
                "Hipertensão arterial",
                "Insuficiência cardíaca",
                "Infarto agudo do miocárdio",
                "AVC",
                "Aterosclerose",
                "Trombose",
                "Arritmias",
            ],
        },
        respiratorias: {
            title: "Doenças respiratórias",
            description: "Afetam os pulmões, as vias aéreas e o sistema respiratório.",
            examples: ["Asma", "Bronquite", "DPOC", "Pneumonia", "Rinite", "Sinusite", "Apneia do sono"],
        },
        cronicas: {
            title: "Doenças crônicas",
            description: "São doenças de longa duração e progressão lenta.",
            examples: ["Diabetes", "Hipertensão", "Obesidade", "Artrite", "Doenças cardiovasculares", "Doenças autoimunes"],
        },
        ginecologicas: {
            title: "Doenças ginecológicas",
            description: "Afetam o sistema reprodutor feminino.",
            examples: ["Endometriose", "SOP (síndrome dos ovários policísticos)", "Miomas", "Candidíase", "Infertilidade"],
        },
        desenvolvimento: {
            title: "Doenças do desenvolvimento",
            description: "Afetam o crescimento neurológico, cognitivo ou motor.",
            examples: [
                "Transtorno do Espectro Autista",
                "TDAH",
                "Atraso cognitivo",
                "Dificuldades motoras",
                "Transtornos de aprendizagem",
            ],
        },
        osteomusculares: {
            title: "Doenças osteomusculares",
            description: "Relacionadas a ossos, músculos, articulações e tendões.",
            examples: ["Artrose", "Artrite", "Fibromialgia", "Osteoporose", "Lombalgias"],
        },
        depressivos: {
            title: "Distúrbios depressivos e ansiedade",
            description: "São alterações emocionais e neuroquímicas que afetam o humor, o comportamento, a cognição e as emoções.",
            examples: ["Depressão", "Ansiedade generalizada", "Síndrome do pânico", "Transtorno bipolar"],
        },
        inflamatorias: {
            title: "Doenças inflamatórias",
            description: "Caracterizadas por ativação persistente do sistema imunológico.",
            examples: ["Artrite reumatoide", "Lúpus", "Doença de Crohn", "Psoríase", "Colite"],
        },
        gastricas: {
            title: "Doenças gástricas e digestivas",
            description: "Afetam o estômago, o intestino e a digestão.",
            examples: ["Gastrite", "Refluxo", "Úlcera", "Síndrome do intestino irritável", "Doença inflamatória intestinal"],
        },
        urinario: {
            title: "Doenças do aparato urinário",
            description: "Envolvem os rins, a bexiga, os ureteres e a uretra.",
            examples: ["Infecção urinária", "Cálculo renal", "Insuficiência renal", "Incontinência urinária"],
        },
        climaterio: {
            title: "Doenças do climatério",
            description: "Relacionadas à transição hormonal feminina, envolvendo queda estrogênica, metabolismo, saúde óssea e neuroendocrinologia.",
            examples: ["Menopausa", "Osteopenia", "Sintomas vasomotores", "Alterações emocionais", "Insônia"],
        },
        neurologicas: {
            title: "Doenças da cabeça e neurológicas",
            description: "Relacionadas ao cérebro, ao sistema nervoso e à cognição.",
            examples: ["Enxaqueca", "Epilepsia", "AVC", "Alzheimer", "Parkinson"],
        },
        metabolicas: {
            title: "Doenças metabólicas",
            description: "Relacionadas ao metabolismo energético.",
            examples: [
                "Diabetes Mellitus Tipo 2",
                "Obesidade",
                "Resistência insulínica",
                "Síndrome metabólica",
                "Dislipidemia",
            ],
        },
        comportamentais: {
            title: "Distúrbios comportamentais da infância e idade",
            description: "Relacionam-se ao neurodesenvolvimento, ambiente, genética e emoções.",
            examples: [
                "Hiperatividade",
                "Impulsividade",
                "TDAH",
                "Transtornos de conduta",
                "Alterações cognitivas do envelhecimento",
            ],
        },
        obesidade: {
            title: "Obesidade",
            description: "Doença multifatorial associada a inflamação, hormônios, microbiota, comportamento alimentar, genética e emoções.",
            examples: [],
        },
        tireoide: {
            title: "Doenças da tireoide",
            description: "Afetam o metabolismo hormonal.",
            examples: ["Hipotireoidismo", "Hipertireoidismo", "Tireoidite de Hashimoto", "Nódulos tireoidianos"],
        },
        "febre-reumatica": {
            title: "Febre reumática",
            description: "Doença inflamatória autoimune que pode afetar o coração, as articulações e o sistema nervoso.",
            examples: [],
        },
    };

    const modal = document.getElementById("disease-modal");
    if (!modal) return;

    const dialog = modal.querySelector(".disease-modal__dialog");
    const titleEl = document.getElementById("disease-modal-title");
    const descEl = document.getElementById("disease-modal-desc");
    const subtitleEl = document.getElementById("disease-modal-subtitle");
    const examplesEl = document.getElementById("disease-modal-examples");
    const whatsappEl = document.getElementById("disease-modal-whatsapp");
    let lastFocus = null;

    const getFocusable = () =>
        dialog.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');

    const openModal = (key) => {
        const data = conditions[key];
        if (!data) return;

        titleEl.textContent = data.title;
        descEl.textContent = data.description;

        examplesEl.replaceChildren();
        if (data.examples.length) {
            subtitleEl.hidden = false;
            examplesEl.hidden = false;
            data.examples.forEach((item) => {
                const li = document.createElement("li");
                li.textContent = item;
                examplesEl.appendChild(li);
            });
        } else {
            subtitleEl.hidden = true;
            examplesEl.hidden = true;
        }

        const message = `Olá, gostaria de saber mais sobre ${data.title} na MSV Medicina Integrativa.`;
        whatsappEl.href = `https://wa.me/5596991393407?text=${encodeURIComponent(message)}`;

        lastFocus = document.activeElement;
        modal.hidden = false;
        document.body.classList.add("modal-open");
        dialog.focus();
    };

    const closeModal = () => {
        modal.hidden = true;
        document.body.classList.remove("modal-open");
        if (lastFocus && typeof lastFocus.focus === "function") {
            lastFocus.focus();
        }
    };

    document.querySelectorAll(".btn-ver-mais").forEach((button) => {
        button.addEventListener("click", () => openModal(button.dataset.condition));
    });

    modal.querySelectorAll("[data-close-modal]").forEach((el) => {
        el.addEventListener("click", closeModal);
    });

    document.addEventListener("keydown", (event) => {
        if (modal.hidden) return;

        if (event.key === "Escape") {
            closeModal();
            return;
        }

        if (event.key !== "Tab") return;

        const focusable = [...getFocusable()];
        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    });
})();
