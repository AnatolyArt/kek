<template>
      <b-nav-item-dropdown right no-caret>
        <template slot="button-content">
          <img src="static/img/avatars/6.jpg" class="img-avatar">
        </template>
        <b-dropdown-item @click="logout()"><i class="fa fa-lock"></i> Logout</b-dropdown-item>
      </b-nav-item-dropdown>
</template>
<script>
  export default {
    name: 'header-dropdown-accnt',
    data: () => {
      return { itemsCount: 42 }
    },
    methods: {
      logout() {
        this.$store.commit('logout');
        this.$router.push('/pages/login');
      }
    }
  }
</script>
