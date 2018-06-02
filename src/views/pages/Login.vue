<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <h1>Scene admin panel</h1>
                <form @submit.prevent="login">
                  <b-input-group class="mb-3">
                    <div class="input-group-prepend"><span class="input-group-text"><i class="icon-user"></i></span></div>
                    <input type="text" v-model="login" class="form-control" placeholder="Username">
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <div class="input-group-prepend"><span class="input-group-text"><i class="icon-lock"></i></span></div>
                    <input type="password" v-model="password" class="form-control" placeholder="Password">
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
  created () {
    console.log('KEK')
  },
  data: {
    login: '',
    password: ''
  },
  methods: {
    login: function () {
      if (login === 'admin' && password === '123123') {
          console.log('KEK')
      } else {
        console.log('WRONG')
      }
    }
  }
}
</script>
