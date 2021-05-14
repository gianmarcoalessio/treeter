<template>
 <button @click="emit(id)" :class="evidenziato" class="focus:outline-none hover:text-darkgreen flex items-center py-2 px-4 hover:bg-lightgreen rounded-full mr-auto mb-3 ">
            <i :class="icon"  class="text-2xl mr-4 text-left"></i>
            <p class="text-lg font-semibold text-left hidden lg:block"> {{ title }} </p>
</button>
  
</template>

<script>
export default {
    //variabili locali al componenti le posso usare in export default con il this come i props
    data(){
        return{}
    },
    //funzione che viene chiamata quando il componente viene chiamato per la prima volta, serve per impostare dei valori di default 
    created(){
        return{}
    },
    //funzione che viene chiamata prima della distruzione del componente
    beforeDestroy(){
        return{}
    },
    methods: {
        emit(id){
            this.$emit("premi",{id,title: this.title, callback:()=>{
                console.log("callback")
            }})
        }
    },
    //i parametri che possiamo usare quando usiamo l'oggetto 
    props: {
        id: String,
        title: String,
        icon: {type: String, default: ""},
        selezionato: String,
    },
    computed: {
        evidenziato(){
            return this.id === this.selezionato ? 'text-darkgreen' : ''
        },
    }
}
</script>

<style>

</style>