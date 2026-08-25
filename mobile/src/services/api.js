import axios from 'axios';

// Em desenvolvimento local, use o IP da sua máquina em vez de localhost
// (o emulador/celular não enxerga "localhost" do seu computador)
export const api = axios.create({
  baseURL: 'http://192.168.0.10:3333/api',
});
