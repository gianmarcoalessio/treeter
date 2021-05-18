<template>
  <div class="flex container h-screen w-full">
        <!-- side nav -->
        <div class="lg:w-1/5 border-r border-lighter px-2 lg:px-6 py-2 flex flex-col justify-between">
            <jgNavTop />
            <jgNavBottom> 
                <!-- <template v-slot:utente>altri dati utente</template>    
                <template v-slot:bottone> aggiungi nuovo utente </template> -->
            </jgNavBottom>   
        </div>
        <!-- Treets -->
        <div class="w-full md:w-1/2 h-full overflow-y-scroll">
            <jgTritta @treets="tritta($event)" />
            <jgTreets :treets="treets" />
        </div>
        <!-- Trending -->    
        <div class="md:block hidden w-1/3 h-full border-l border-lighter py-2 px-6 overflow-y-scroll relative">
            <jgTrending />
        </div>


    </div>
</template>

<script>

import jgNavTop from "@comp/navTop.vue"
import jgNavBottom from "@comp/navBottom.vue"
import jgTreets from "@comp/treets.vue"
import jgTritta from "@comp/tritta.vue"
import jgTrending from "@comp/trending.vue"

export default {
    data(){
        return {treets:[]}
    },
    components:{
        jgNavTop,
        jgNavBottom,
        jgTreets,
        jgTritta,
        jgTrending,
    },
    methods:{
        tritta(x){
            this.treets=x;
        }
    }

}
</script>

<style>

</style>