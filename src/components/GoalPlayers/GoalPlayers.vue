<template>
    <v-card>
      <v-card-title class="text-h6 title-players">
        Artilheiros
      </v-card-title>
  
      <v-data-table
        :headers="headers"
        :items="topScorers"
        class="table-players"
        density="compact"
        :items-per-page="20"
        hide-default-footer
        :loading="loading"
        loading-text="Carregando os Artilheiros"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.position }}</td>
            <td>{{ item.player.name }}</td>
            <td>
              <img :src="item.team.crest" alt="Escudo" class="escudo-players"/>
              {{ item.team.name }}
            </td>
            <td>{{ item.goals }}</td>
            <td>{{ item.assists || 0 }}</td>
            <td>{{ item.penalties || 0 }}</td>
            <td>{{ item.playedMatches }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
</template>
  
<script>
  import { getTopScorers } from '@/services/api';
  
  export default {
    data() {
      return {
        topScorers: [], 
        headers: [
          { title: 'P', value: 'position' },
          { title: 'Jogador', value: 'player.name' },
          { title: 'Time', value: 'team.name' },
          { title: 'Gols', value: 'goals' },
          { title: 'Assistência', value: 'assists' },
          { title: 'Penalty', value: 'penalties' },
          { title: 'Jogos', value: 'playedMatches' },
        ],
        error: null,
        loading: true
      };
    },
  
    mounted() {
      this.fetchTopScorers();
    },
  
    methods: {
      fetchTopScorers() {
        getTopScorers()
          .then(response => {
            const scorers = response.data.scorers;
            this.topScorers = this.addPositions(scorers);
          })
          .catch(error => {
            this.error = 'Erro ao buscar os artilheiros.';
            console.error(error);
          })
          .finally(() => {
            this.loading = false;
          });
      },
  
      addPositions(scorers) {
        // Ordena os artilheiros por gols em ordem decrescente
        scorers.sort((a, b) => b.goals - a.goals);
  
        let position = 1;
        let lastGoals = null;
        let lastPosition = 1;
        
        return scorers.map((scorer) => {
          if (lastGoals === scorer.goals) {
            // Se o número de gols for o mesmo que o anterior, mantém a mesma posição
            scorer.position = lastPosition;           
          } else {
            // Caso contrário, define a nova posição
            scorer.position = position;
            lastPosition = position;            
            position++;
          }
  
          lastGoals = scorer.goals;
          
          return scorer;
        });
      }
    }
  };
</script>

<style scoped>
.title-players{
  background: #10502f; 
  color: white; 
  font-size: 0.8rem;
}

.table-players{
  font-size: 0.8rem;
}

.escudo-players{
  width: 20px; 
  height: 20px; 
  margin-right: 8px;
}
</style>