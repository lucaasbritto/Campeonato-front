<template>
    <v-card>
      <v-card-title>Classificação do Campeonato</v-card-title>
      <v-data-table :headers="headers" :items="times" class="elevation-1">
        <!-- Usando a sintaxe de slots correta -->
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.posicao }}</td>
            <td>{{ item.time }}</td>
            <td>{{ item.pontos }}</td>
            <td>{{ item.jogos }}</td>
            <td>{{ item.vitorias }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </template>
  
  <script>
  export default {
    data() {
      return {
        headers: [
          { title: 'Posição', value: 'posicao' },
          { title: 'Time', value: 'time' },
          { title: 'Pontos', value: 'pontos' },
          { title: 'Jogos', value: 'jogos' },
          { title: 'Vitórias', value: 'vitorias' }
        ],
        times: [
          { posicao: 1, time: 'Time A', pontos: 38, jogos: 18, vitorias: 12 },
          { posicao: 2, time: 'Time B', pontos: 35, jogos: 18, vitorias: 11 },
        ]
      };
    }
  };
  </script>
  