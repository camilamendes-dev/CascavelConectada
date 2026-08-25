import { useEffect, useState } from 'react';
import { api } from '../services/api';

// RF10 — painel geral | RF16 — indicadores (KPIs)
export default function Dashboard() {
  const [solicitacoes, setSolicitacoes] = useState([]);

  useEffect(() => {
    api.get('/solicitacoes').then((res) => setSolicitacoes(res.data));
  }, []);

  return (
    <div>
      <h1>Painel de Solicitações</h1>
      {/* TODO: KPIs (abertas, em andamento, concluídas, tempo médio) — RF16 */}
      {/* TODO: mapa com pins por status — RF10 */}
      <ul>
        {solicitacoes.map((s) => (
          <li key={s.id}>{s.titulo} — {s.status}</li>
        ))}
      </ul>
    </div>
  );
}
