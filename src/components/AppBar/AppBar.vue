<template>
    <v-app-bar class="appBarContainer" :style="{ backgroundImage: appBarColor }">    
        <v-toolbar-title class="toolbarTitle">
            <v-row>
                <v-col cols="6" offset="3" class="d-flex align-center justify-center" >
                    <div class="d-flex align-center justify-center" >        
                        <img v-if="appBarLogo" :src="appBarLogo" class="appBarLogo" alt="Escudo" />            
                        <div class="appBarTitle">
                            <span v-if="appBarTitle" class="title-text">
                                {{ appBarTitle }}
                            </span>
                        </div>            
                    </div>
                </v-col>

                <v-col v-if="nextMatch" cols="3" class="text-center colNextMatch">        
                    <small class="nextMatchDay">
                        {{  formatBrazilianDate(nextMatch.utcDate)  }}
                    </small>
                
                    <div class="d-flex align-center justify-space-between nextMatchTeam" >
                        <v-img :src="nextMatch.homeTeam.crest" class="nextMatchLogo" alt="Escudo"/>                
                            <span style="">{{ nextMatch.homeTeam.name }} X {{ nextMatch.awayTeam.name }}</span>
                        <v-img :src="nextMatch.awayTeam.crest" class="nextMatchLogo" alt="Escudo"/>                    
                    </div>   
                </v-col>
            </v-row>
        </v-toolbar-title>   
    </v-app-bar>
</template>
  
<script>
    export default {
        computed: {
            appBarColor() {
                return this.$store.state.appBarColor;
            },
            appBarTitle() {
                return this.$store.state.appBarTitle;
            },
            appBarLogo() {
                return this.$store.state.appBarLogo;
            },

            nextMatch() {
                return this.$store.getters.nextMatchForSelectedTeam;
            },
        },
        methods: {
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
    }
</script>
  
<style scoped>   
    .toolbarTitle{
        display: inline
    }

    .appBarLogo{
        width: 35px; 
        height: 35px; 
        margin-right: 8px;
    }

    .appBarTitle{
        background: white;  
        border-radius: 10px; 
        padding:5px;
    }
        
    .title-text {
        display: flex;
        align-items: center;
        font-size: 1.2rem;
    }
    
    .v-img {
        margin-right: 10px;
    }

    .colNextMatch{
        font-size: 0.8rem;
    }

    .nextMatchDay{
        background: white; 
        border-radius:10px 10px 0 0; 
        padding: 5px;
    }

    .nextMatchTeam{
        background: white; 
        border-radius: 10px 0 0 10px; 
        margin-top: -5px;
    }

    .nextMatchLogo{
        width: 20px; 
        height: 20px;
    }
</style>
  