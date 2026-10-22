/*
  Leonardo de Castro Tonon - RA 10426930
  Leonardo Patriani Cardoso - RA 10417188
  Antonio Renilson Bezerra da Silva - RA 10722184
  Bernardo Souza Oliveira - RA 10312871
*/

import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.container}>
      <section className={styles.pageHeader}>
        <h1>Mapa do bairro</h1>
        <p>Veja os problemas registrados pela comunidade.</p>
      </section>

      <section className={styles.mapaCard}>
        <div className={styles.filtroMapa}>
          <label htmlFor="filtro-categoria-mapa">Filtrar por categoria:</label>

          <select id="filtro-categoria-mapa">
            <option value="todas">Todas</option>
            <option value="limpeza">Limpeza</option>
            <option value="iluminacao">Iluminação</option>
            <option value="vias">Vias públicas</option>
            <option value="acessibilidade">Acessibilidade</option>
            <option value="saneamento">Saneamento</option>
          </select>
        </div>

        <div className={styles.mapa}>
          <div className={`${styles.quadra} ${styles.q1}`}></div>
          <div className={`${styles.quadra} ${styles.q2}`}></div>
          <div className={`${styles.quadra} ${styles.q3}`}></div>
          <div className={`${styles.quadra} ${styles.q4}`}></div>
          <div className={`${styles.quadra} ${styles.q5}`}></div>
          <div className={`${styles.quadra} ${styles.q6}`}></div>
          <div className={`${styles.quadra} ${styles.q7}`}></div>
          <div className={`${styles.quadra} ${styles.q8}`}></div>
          <div className={`${styles.quadra} ${styles.q9}`}></div>
          <div className={`${styles.quadra} ${styles.q10}`}></div>
          <div className={`${styles.quadra} ${styles.q11}`}></div>
          <div className={`${styles.quadra} ${styles.q12}`}></div>

          <div className={`${styles.ruaHorizontal} ${styles.rua1}`}>Rua das Flores</div>
          <div className={`${styles.ruaHorizontal} ${styles.rua2}`}>Rua da Educação</div>
          <div className={`${styles.ruaHorizontal} ${styles.rua3}`}>Rua da Paz</div>

          <div className={`${styles.ruaVertical} ${styles.ruav1}`}>Avenida Central</div>
          <div className={`${styles.ruaVertical} ${styles.ruav2}`}>Rua Central</div>
          <div className={`${styles.ruaVertical} ${styles.ruav3}`}>Avenida Principal</div>

          <div className={`${styles.marcador} ${styles.limpeza} ${styles.m1}`} title="Lixo acumulado">🗑️</div>
          <div className={`${styles.marcador} ${styles.iluminacao} ${styles.m2}`} title="Iluminação pública">💡</div>
          <div className={`${styles.marcador} ${styles.vias} ${styles.m3}`} title="Buraco na rua">🕳️</div>
          <div className={`${styles.marcador} ${styles.acessibilidade} ${styles.m4}`} title="Calçada danificada">🚧</div>
          <div className={`${styles.marcador} ${styles.saneamento} ${styles.m5}`} title="Vazamento">💧</div>
        </div>

        <div className={styles.legenda}>
          <h2>Legenda:</h2>

          <div className={styles.legendaItem}>
            <span className={`${styles.legendaCor} ${styles.limpeza}`}></span>
            Limpeza
          </div>

          <div className={styles.legendaItem}>
            <span className={`${styles.legendaCor} ${styles.iluminacao}`}></span>
            Iluminação
          </div>

          <div className={styles.legendaItem}>
            <span className={`${styles.legendaCor} ${styles.vias}`}></span>
            Vias públicas
          </div>

          <div className={styles.legendaItem}>
            <span className={`${styles.legendaCor} ${styles.acessibilidade}`}></span>
            Acessibilidade
          </div>

          <div className={styles.legendaItem}>
            <span className={`${styles.legendaCor} ${styles.saneamento}`}></span>
            Saneamento
          </div>
        </div>

        <div className={styles.mapaInfo}>
          📍 Existem 5 problemas registrados atualmente no bairro.
          Clique em um marcador para visualizar os detalhes do problema.
        </div>
      </section>
    </main>
  );
}
