<template>
    <div class="app flex-row align-items-center">
        <div class="container">
            <b-row class="justify-content-center">
                <b-col md="8">
                    <b-card-group>
                        <b-card no-body class="p-4">
                            <b-card-body>
                                <h1>Scene admin panel</h1>
                                <form @submit.prevent="auth">
                                    <b-input-group class="mb-3">
                                        <div class="input-group-prepend"><span class="input-group-text"><i
                                                class="icon-user"></i></span></div>
                                        <input type="text" v-model="login" class="form-control" placeholder="Email">
                                    </b-input-group>
                                    <b-input-group class="mb-4">
                                        <div class="input-group-prepend"><span class="input-group-text"><i
                                                class="icon-lock"></i></span></div>
                                        <input type="password" v-model="password" class="form-control"
                                               placeholder="Password">
                                    </b-input-group>
                                    <b-row>
                                        <b-col cols="6">
                                            <button variant="primary" class="px-4">Login</button>
                                        </b-col>
                                    </b-row>
                                </form>
                            </b-card-body>
                        </b-card>
                    </b-card-group>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'Login',
    created(){
      if(this.$store.authState === 1){
        this.$router.push('/');
      }
    },
    data () {
      return {
        login: '',
        password: ''
      }
    },
    methods: {
      auth: function () {
        var data = {
          'user': {
            'email': this.login,
            'password': this.password
          }
        };

        this.$root.ajax.post('login', data)
          .then((response) => {
            this.$store.commit('authUser', response.data);
            this.$router.push('/');
          }).catch(function (error) {
            alert(error);
          });
      }
    }
  }
</script>
