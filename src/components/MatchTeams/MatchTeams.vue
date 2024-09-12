<template>
    <v-card>
      <v-card-title>Próximos Jogos</v-card-title>
      <v-list>
        <v-list-item v-for="jogo in jogos" :key="jogo.id">
          <v-list-item-content>
            <v-list-item-title>{{ jogo.timeCasa }} vs {{ jogo.timeFora }}</v-list-item-title>
            <v-list-item-subtitle>{{ jogo.data }} - {{ jogo.horario }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </template>
  
  <script>
  export default {
    data() {
      return {
        jogos: [
          { id: 1, timeCasa: 'Time A', timeFora: 'Time B', data: '2024-09-15', horario: '16:00' },
          { id: 2, timeCasa: 'Time C', timeFora: 'Time D', data: '2024-09-16', horario: '18:00' },
          
        ]
      };
    }
  };
  </script>