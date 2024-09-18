<template>
    <v-card>
      <v-card-title class="text-h6">
         {{ currentMatchday }}° Rodada
      </v-card-title>      
      
      
      <v-row class="d-flex justify-center">
        <!-- Botão para Rodada Anterior -->
        <v-btn @click="previousMatchday" :disabled="currentMatchday === 1">
          Anterior
        </v-btn>
        
        <!-- Botão para Próxima Rodada -->
        <v-btn @click="nextMatchday" :disabled="currentMatchday === maxMatchday">
          Próxima
        </v-btn>
      </v-row>
  
      <!-- Exibindo as partidas -->
      <v-data-table :headers="headers" :items="currentMatches" class="elevation-1" hide-default-footer>
        <template v-slot:item="{ item }">
          <tr>
            <td class="text-right">
                {{ getFullTeamName(item.homeTeam.shortName) }}
                <img :src="item.homeTeam.crest" alt="Escudo" style="width: 20px; height: 20px; margin-right: 8px;" />
            </td>
            <td class="text-center" >{{ item.score.fullTime.home }} - {{ item.score.fullTime.away }}</td>
            <td class="text-left">
                <img :src="item.awayTeam.crest" alt="Escudo" style="width: 20px; height: 20px; margin-right: 8px;" />
                {{ getFullTeamName(item.awayTeam.shortName) }}
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </template>
  
  <script>
  import { getMatches } from '@/services/api';
  
  export default {
    data() {
      return {
        matchDay: [],
        allMatches: [], 
        currentMatchday: 1,
        loading: true,
        error: null,
        headers: [
          { title: 'Time da Casa', value: 'homeTeam.shortName' },
          { title: 'Placar', value: 'score.fullTime' },
          { title: 'Time Visitante', value: 'awayTeam.shortName' }
        ]
      };
    },
  
    computed: {
      // Filtra os jogos da rodada atual
      currentMatches() {
        return this.allMatches.filter(match => match.matchday === this.currentMatchday);
      },
      maxMatchday() {
        return Math.max(...this.allMatches.map(match => match.matchday));
      }
    },
  
    mounted() {
      this.fetchAllMatches();
    },
  
    methods: {
        fetchAllMatches() {
            getMatches()
            .then(response => {
                this.matchDay = response.data.original.matchDay; //Armazena ultima rodada
                this.allMatches = response.data.original.allMatches; //Armazena todos os jogos            
                this.currentMatchday = this.matchDay[0].matchday; // Numero da rodada

                this.$store.dispatch('updateAllMatches', this.allMatches);
                this.$store.dispatch('updateCurrentMatchday', this.currentMatchday);
            
            })
            .catch(error => {
                this.error = 'Erro ao buscar os jogos.';
                console.error(error);
            })
            .finally(() => {
                this.loading = false;
            });
        },
    
        nextMatchday() {
            if (this.currentMatchday < this.maxMatchday) {
            this.currentMatchday += 1;
            }
        },
    
        previousMatchday() {
            if (this.currentMatchday > 1) {
            this.currentMatchday -= 1;
            }
        },

        getFullTeamName(shortName) {
            const teamNames = {
                'Mineiro': 'Atlético Mineiro',
                'Paranaense': 'Athletico Paranaense'
            };
            return teamNames[shortName] || shortName;
        }
    }
  };
  </script>