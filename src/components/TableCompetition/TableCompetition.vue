<template>
  <v-card>
    <v-card-title class="title-competition">
        <img 
            v-if="competition.emblem" 
            :src="competition.emblem" 
            alt="Escudo Campeonato"
        />
        Classificação - {{ competition.name }} - {{ year }}
    </v-card-title>
    <v-data-table 
        :headers="headers" 
        :items="classification" 
        class="table-classification" 
        density="compact"  
        :items-per-page="20" 
        hide-default-footer
        :loading="loading"
        loading-text="Carregando a Classificação"
    >
    
      <template v-slot:item="{ item }">
        <tr>
          <td :style="colorClassification(item.position)">{{ item.position }}</td>
          <td>
            <img :src="item.team.crest" class="table-escudo" alt="Escudo" />
            {{ item.team.shortName }}
          </td>
        <td>{{ item.points }}</td>
        <td>{{ item.playedGames }}</td>
        <td>{{ item.won }}</td>
        <td>{{ item.draw }}</td>
        <td>{{ item.lost }}</td>
        <td>{{ item.goalsFor }}</td>
        <td>{{ item.goalsAgainst }}</td>
        <td>{{ item.goalDifference }}</td>
        <td>{{ calculateEfficiency(item.points, item.playedGames) }}%</td>
        </tr>            
      </template>
    </v-data-table>
      <table>
        <tr class="footer-competition">          
          <td class="footer-classificacao">
            <div class='footer-classificacaoColor' style="background: green"></div>
              Libertadores
          </td>
          <td class="footer-classificacao">
            <div class='footer-classificacaoColor' style="background: orange"></div>
              Pre Libertadores
          </td>
          <td class="footer-classificacao">
            <div class='footer-classificacaoColor' style="background: blue"></div>
              Sul-Americana
          </td>
          <td class="footer-classificacao">
            <div class='footer-classificacaoColor' style="background: red"></div>
              Rebaixamento
          </td>
        </tr>  
        
        <tr class="footer-competition">
          <td class="footer-descricao"><span>P</span> <small>pontos</small> </td>
          <td class="footer-descricao"><span>J</span> <small>jogos</small> </td>
          <td class="footer-descricao"><span>V</span> <small>vitória</small> </td>
          <td class="footer-descricao"><span>E</span> <small>empate</small> </td>
          <td class="footer-descricao"><span>D</span> <small>derrota</small> </td>
          <td class="footer-descricao"><span>GP</span> <small>gols pro</small> </td>
          <td class="footer-descricao"><span>GC</span> <small>gols contra</small> </td>
          <td class="footer-descricao"><span>SG</span> <small>saldo de gols</small> </td>
          <td class="footer-descricao"><span>%</span> <small>aproveitamento</small> </td>          
        </tr>
      </table>
  </v-card>
</template>
  
<script>
  import { getClassification } from '@/services/api'

  export default {
    data() {
      return {
        classification: [],
        competition: {},
        year: null,
        loading: true,
        error: null,    
        headers: [
            { title: 'P', value: 'position' },
            { title: 'Time', value: 'team.shortName' },
            { title: 'P', value: 'points' },
            { title: 'J', value: 'playedGames' },
            { title: 'V', value: 'won' },
            { title: 'E', value: 'draw' },
            { title: 'D', value: 'lost' },
            { title: 'GP', value: 'goalsFor' },
            { title: 'GC', value: 'goalsAgainst' },
            { title: 'SG', value: 'goalDifference' },
            { title: '%', value: 'porcentagem' },
        ],        
      };
    },

    mounted() {
        this.fetchClassificationData();
    },

    methods: {
    fetchClassificationData() {
      getClassification()
        .then((response) => {
          this.classification = response.data.standings[0].table;
          this.competition = response.data.competition;
          this.year = response.data.filters.season;

          this.classification.forEach(team => {
            if (team.team.shortName === 'Mineiro') {
              team.team.shortName = 'Atlético Mineiro';
            } else if (team.team.shortName === 'Paranaense') {
              team.team.shortName = 'Athletico Paranaense';
            }
          });
          
        })
        .catch((error) => {
          this.error = 'Erro ao buscar a Classificação';
          console.error(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    
    colorClassification(position) {
      if (position >= 1 && position <= 4) {
        return 'width:10px; border-left: 5px solid green; color: green';
      } else if (position >= 5 && position <= 6) {
        return 'width:10px; border-left: 5px solid orange; color: orange';
      } else if (position >= 7 && position <= 12) {
        return 'width:10px; border-left: 5px solid blue; color: blue';
      } else if (position >= 13 && position <= 16) {
        return 'width:10px; border-left: 5px solid black; color: black';
      } else if (position >= 17 && position <= 20) {
        return 'width:10px; border-left: 5px solid red; color: red';
      }
      return '';
    },
    calculateEfficiency(points, playedGames) {
      if (playedGames === 0) return '0';
      return Math.floor((points / (playedGames * 3)) * 100);
    },
  },

  };
</script>

<style scoped>

.title-competition{
  background: #10502f; 
  color: white; 
  font-size: 0.8rem;
}

.title-competition img{
  width: 40px; 
  height: 40px; 
  margin-right: 10px;
}

.table-classification{
  font-size: 0.8rem;
}

.table-escudo{
  width: 20px; 
  height: 20px; 
  margin-right: 8px;
}

.footer-competition{
  display: flex; 
  align-items: center;
}

.footer-classificacao {
  display: flex; 
  align-items: center; 
  padding: 5px;
  font-size: 0.8rem;
}

.footer-classificacaoColor{
  width: 10px; 
  height: 10px; 
  margin-right: 5px;
}

.footer-descricao{
  padding: 5px;
  font-size: 0.8rem;
}

.footer-descricao span{
  font-weight: bold;
}
</style>
  