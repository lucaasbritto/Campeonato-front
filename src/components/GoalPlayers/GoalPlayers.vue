<template>
    <v-card>
      <v-card-title>Artilharia</v-card-title>
      <v-list>
        <v-list-item v-for="artilheiro in artilheiros" :key="artilheiro.id">
          <v-list-item-content>
            <v-list-item-title>{{ artilheiro.nome }} - {{ artilheiro.time }}</v-list-item-title>
            <v-list-item-subtitle>{{ artilheiro.gols }} gols</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </template>
  
  <script>
  export default {
    data() {
      return {
        artilheiros: [
          { id: 1, nome: 'Jogador A', time: 'Time A', gols: 10 },
          { id: 2, nome: 'Jogador B', time: 'Time B', gols: 8 },
          // Adicione mais artilheiros
        ]
      };
    }
  };
  </script>