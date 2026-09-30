/* =========================
   CONTEÚDO
========================== */

.container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 35px 20px 50px;
}

.page-header {
    margin-bottom: 28px;
}

.page-header h1 {
    font-size: 28px;
    margin-bottom: 8px;
}

.subtitle {
    color: #6b7280;
    font-size: 14px;
    line-height: 1.5;
}

/* =========================
   BUSCA E FILTROS
========================== */

.filtros {
    display: flex;
    gap: 12px;
    margin-bottom: 22px;
    flex-wrap: wrap;
}

#busca-input {
    flex: 1;
    min-width: 220px;
    border: 1px solid #d1d5db;
    border-radius: 9px;
    padding: 11px 14px;
    font-size: 14px;
    outline: none;
    background: white;
}

#busca-input:focus {
    border-color: #2563eb;
}

#filtro-categoria {
    border: 1px solid #d1d5db;
    border-radius: 9px;
    padding: 11px 14px;
    font-size: 14px;
    background: white;
    color: #374151;
    cursor: pointer;
}

/* =========================
   CABEÇALHO DOS PROBLEMAS
========================== */

.problems-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
}

.problems-header h2 {
    font-size: 18px;
}

.new-badge {
    background: #16a34a;
    color: white;
    padding: 7px 13px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: bold;
}

/* =========================
   LISTA DE PROBLEMAS
========================== */

.problems-list {
    display: flex;
    flex-direction: column;
    gap: 14px;
}

/*
   O LINK ENVOLVE O CARD.
   Assim podemos clicar no problema
   e abrir detalhes.html.
*/

.problem-link {
    display: block;
    color: inherit;
    text-decoration: none;
}

.problem {
    background: white;
    border-radius: 15px;
    padding: 20px;
    display: grid;
    grid-template-columns: 58px 1fr auto;
    gap: 17px;
    align-items: start;

    box-shadow:
        0 2px 8px rgba(0, 0, 0, 0.06);
    border: 1px solid #e5e7eb;
    transition: 0.2s;
}

/* EFEITO AO PASSAR O MOUSE */

.problem-link:hover .problem {
    transform: translateY(-2px);

    box-shadow:
        0 5px 14px rgba(0, 0, 0, 0.10);
    border-color: #bfdbfe;
}

/* PROBLEMA NOVO */

.problem.unread {
    border-left: 4px solid #16a34a;
    background: #fcfffc;
}

/* =========================
   ÍCONES
========================== */

.problem-icon {
    width: 58px;
    height: 58px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    color: white;
}

.red {
    background: #ef4444;
}

.yellow {
    background: #f59e0b;
}

.orange {
    background: #f97316;
}

.purple {
    background: #8b5cf6;
}

.blue {
    background: #2563eb;
}

/* =========================
   INFORMAÇÕES
========================== */

.problem-content h3 {
    font-size: 17px;
    margin-bottom: 7px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
}

.category {
    font-size: 11px;
    padding: 4px 8px;
    border-radius: 10px;
    background: #eef2ff;
    color: #4f46e5;
    font-weight: bold;
}

.notification-dot {
    width: 9px;
    height: 9px;
    background: #16a34a;
    border-radius: 50%;
    display: inline-block;
}

.problem-info {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-bottom: 9px;
    color: #6b7280;
    font-size: 12px;
}

.description {
    color: #4b5563;
    font-size: 13px;
    line-height: 1.5;
    max-width: 700px;
}

/* =========================
   DATA
========================== */

.problem-date {
    color: #6b7280;
    font-size: 12px;
    white-space: nowrap;
}

/* =========================
   STATUS
========================== */

.status {
    display: inline-block;
    margin-top: 10px;
    font-size: 11px;
    padding: 5px 9px;
    border-radius: 10px;
    background: #f3f4f6;
    color: #6b7280;
}

.status.new {
    background: #dcfce7;
    color: #15803d;
    font-weight: bold;
}

.status.resolved {
    background: #dbeafe;
    color: #1e40af;
    font-weight: bold;
}

/* =========================
   RODAPÉ
========================== */

.footer-info {
    text-align: center;
    margin-top: 25px;
    color: #9ca3af;
    font-size: 12px;
}

/* =========================
   RESPONSIVIDADE
========================== */

@media (max-width: 750px) {
    .problem {
        grid-template-columns: 50px 1fr;
        gap: 14px;
    }

    .problem-icon {
        width: 50px;
        height: 50px;
        font-size: 21px;
    }

    .problem-date {
        grid-column: 2;
        margin-top: -5px;
    }
}

@media (max-width: 500px) {
    .container {
        padding: 25px 15px 40px;
    }

    .page-header h1 {
        font-size: 23px;
    }

    .problems-header {
        align-items: flex-start;
        gap: 10px;
    }

    .new-badge {
        font-size: 11px;
        padding: 6px 9px;
    }
}
