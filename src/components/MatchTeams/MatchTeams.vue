<template>
  <v-card>
      <v-card-title class="text-h6 title-match">
          <v-btn @click="previousMatchday" :disabled="currentMatchday === 1" icon>
              <v-icon class="icon-match">mdi-arrow-left</v-icon>
          </v-btn>
          <span>{{ currentMatchday }}° Rodada</span>
          <v-btn @click="nextMatchday" :disabled="currentMatchday === maxMatchday" icon>
              <v-icon class="icon-match">mdi-arrow-right</v-icon>
          </v-btn>
      </v-card-title>

      <!-- Exibindo as partidas -->
      <v-data-table 
          :headers="headers" 
          :items="currentMatches" 
          class="table-match text-center"
          hide-default-footer
          :loading="loading"
          loading-text="Carregando os jogos"
      >
          <template v-slot:item="{ item }">            
              <tr>                               
                  <td class="text-right match-team">                      
                      {{ getFullTeamName(item.homeTeam.shortName) }}
                      <img :src="item.homeTeam.crest" alt="Escudo" class="match-escudo"/>
                  </td>
                  <td class="text-center match-placar">
                    <small>{{ formatBrazilianDate(item.utcDate) }} </small><br>
                    <span>{{ item.score.fullTime.home }} - {{ item.score.fullTime.away }}</span>
                  </td>
                  <td class="text-left match-team">
                      <img :src="item.awayTeam.crest" alt="Escudo" class="match-escudo" />
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
              { title: 'Time da Casa', value: 'homeTeam.shortName', align: 'end' },
              { title: 'Placar', value: 'score.fullTime', align: 'center' },
              { title: 'Time Visitante', value: 'awayTeam.shortName', align: 'start' }
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
                    this.matchDay = response.data.original.matchDay; // Armazena ultima rodada
                    this.allMatches = response.data.original.allMatches; // Armazena todos os jogos            
                    this.currentMatchday = this.matchDay[0].matchday; // Número da rodada

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
        },

        formatBrazilianDate(dateString) {
            const date = new Date(dateString);
            date.setHours(date.getHours());

            const formattedDate = date.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
            });

            const dayOfWeek = date.toLocaleDateString('pt-BR', {
                weekday: 'long'
            });

            const formattedTime = date.toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });

            return `${formattedDate} - ${dayOfWeek}  - ${formattedTime}`;
        }
  }
};
</script>

<style scoped>
.v-card-title {
  display: flex;
  justify-content: center;
  align-items: center;
}
.title-match{
    background: #10502f; 
    color: white; 
    font-size: 0.8rem; 
    display: flex; 
    justify-content: center; 
    align-items: center;
}

.title-match span{
    margin: 0 10px;
}

.icon-match{
    color: #10502f;
}

.table-match{
    font-size: 0.8rem;
}

.match-escudo{
    width: 20px; 
    height: 20px;
}

.match-team{
    width: 42.5%;
}
.match-placar{
    width: 15%; 
    font-size: 1rem;
}

.match-placar small{
    font-size: 0.6rem;
}

.match-placar span{
    font-weight: bold;
}
</style>
