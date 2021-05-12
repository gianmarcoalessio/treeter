<template>
  <div class="flex container h-screen w-full">
    <!-- side nav -->
    <div class="lg:w-1/5 border-r border-lighter px-2 lg:px-6 py-2 flex flex-col justify-between">
      <div>
        <button class="h-12 w-12 hover:bg-lightgreen text-3xl rounded-full text-green">
          <i class="fab fa-pagelines"></i>
        </button>
        <div>
          <button v-for="(tab,i) in tabs" :key="i" @click="id = tab.id" :class="`focus:outline-none hover:text-darkgreen flex items-center py-2 px-4 hover:bg-lightgreen rounded-full mr-auto mb-3 ${ id === tab.id ? 'text-darkgreen' : ''}`">
            <i :class="`${ tab.icon } text-2xl mr-4 text-left`"></i>
            <p class="text-lg font-semibold text-left hidden lg:block"> {{ tab.title }} </p>
          </button>
        </div>          
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            id:"home",
        tabs: [
            {icon: 'fas fa-home', title: 'Home', id:'home'},
            {icon: 'fas fa-hashtag', title: 'Explore', id: 'explore'},
            {icon: 'far fa-bell', title: 'Notifications', id: 'notifications'},
            {icon: 'far fa-envelope', title: 'Messages', id: 'messages'},
            {icon: 'far fa-bookmark', title: 'Bookmarks', id: 'bookmarks'},
            {icon: 'fas fa-clipboard-list', title: 'Lists', id: 'lists'},
            {icon: 'far fa-user', title: 'Profile', id: 'profile'},
            {icon: 'fas fa-ellipsis-h', title: 'More', id: 'more'}
        ],
        }
    }
};
</script>

<style>
</style>