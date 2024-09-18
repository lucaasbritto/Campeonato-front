<template>
    <v-navigation-drawer
      app
      permanent
      width="180"
      :style="drawerStyle" 
      class="navigationContainer"
    >
        <v-card-title class="text-center navigationTitle" style="">
            Escolha seu time:
        </v-card-title>

        <v-container fluid>
            <v-row>         
                <v-col
                    v-for="team in sortedTeams"
                    :key="team.id"
                    cols="3"
                    class="d-flex align-center justify-center"
                    :class="{ 'selected-team': selectedTeam === team.id }"
                    @click="selectTeam(team)"
                >
                    <v-img
                    :src="team.crest"
                    contain
                    max-height="80"
                    ></v-img>
                </v-col>
            </v-row>
        </v-container>
    </v-navigation-drawer>
</template>
<script>
import { getTeams } from '@/services/api';

export default {
    data() {
        return {
        teams: [],
        loading: true,
        error: null,
        selectedTeam: null, 
        selectedColor: '#DCDCDC' // Cor inicial do drawer
        };
    },

    mounted() {
        this.fetchTeamsData();
    },

    computed: {
        drawerStyle() {
            const color = this.selectedColor.length === 2 
            ? `linear-gradient(135deg, ${this.selectedColor[0]}, ${this.selectedColor[1]})` 
            : `linear-gradient(135deg, ${this.selectedColor[0]}, ${this.selectedColor[1]}, ${this.selectedColor[2]})`;

            // Atualiza a cor no Vuex store
            this.$store.dispatch('updateAppBarColor', color);

            return {
                backgroundImage: color
            };  
                                
        },

        sortedTeams() {
            return this.teams.slice().sort((a, b) => a.shortName.localeCompare(b.shortName));
        },
    },

    methods: {
        fetchTeamsData() {
            getTeams()
                .then((response) => {
                this.teams = response.data.teams;
                this.teams.forEach((team) => {
                    if (team.shortName === 'Mineiro') {
                    team.shortName = 'Atlético Mineiro';
                    } else if (team.shortName === 'Paranaense') {
                    team.shortName = 'Athletico Paranaense';
                    }
                });
            })
                .catch((error) => {
                    this.error = 'Erro ao buscar os times';
                    console.error(error);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
    
        selectTeam(team) {
            this.$store.dispatch('updateAppBarTitle', team.shortName);
            this.$store.dispatch('updateAppBarLogo', team.crest);
            this.$store.dispatch('updateSelectedTeam', team.name);
            
            let colorsArray = team.clubColors.split('/');        
            this.selectedColor = colorsArray;  
        }        
    }
};
</script>

<style>
.navigationTitle{
    font-size: 0.8rem !important; 
    background: white;
}
</style>