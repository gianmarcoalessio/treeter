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
            <jgTreets />
        </div>
    </div>
</template>

<script>

import jgNavTop from "@comp/navTop.vue"
import jgNavBottom from "@comp/navBottom.vue"
import jgTreets from "@comp/treets.vue"

export default {

    components:{
        jgNavTop,
        jgNavBottom,
        jgTreets,
    },

}
</script>

<style>

</style>