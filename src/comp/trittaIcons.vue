<template>
  <div v-for="(icon,k) in listIcon" :key="k" class="flex  items-center">
      <i :class="icon"></i>
  </div>
</template>

<script>
export default {
    props:{
        icons: {default:[], type:Array},
    },
    computed: {
        listIcon(){
            let tmp=[];
            for (var i of this.icons) {
                tmp.push("text-lg text-darkgreen mr-4 "+i)
            }
            return tmp; 
        }

    }

}
</script>

<style>

</style>