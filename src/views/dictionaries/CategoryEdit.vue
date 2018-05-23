<template>
    <div class="animated fadeIn">
        <b-row>
            <b-col sm="12">
                <b-card>
                    <div slot="header">
                        <strong>Edit Category {{name}}</strong>
                    </div>
                    <b-row>
                        <b-col sm="12">
                            <b-form-group>
                                <label for="name">Name</label>
                                <b-form-input v-model="name" type="text" id="name" placeholder="Category name"></b-form-input>
                            </b-form-group>
                            <b-button type="submit" variant="primary">Save changes</b-button>
                            <b-button type="button" variant="secondary">Cancel</b-button>
                        </b-col>
                    </b-row>

                </b-card>
            </b-col>
        </b-row>
    </div>
</template>
<script>


  export default {
    name: 'CategoryEdit',
    created(){
      this.$root.ajax.get('interests/categories', {withCreditinals: true})
        .then((response) => {

          var category = response.data.data.find(x => parseInt(x.id) === parseInt(this.$route.params.catid));
          this.catid = parseInt(this.$route.params.catid);
          this.name = category.name;

        }).catch(function (error) {
        alert(error);
      });

    },
    data: () => {
      return {
        catid: 0,
        name: ''
      }
    }
  }
</script>
