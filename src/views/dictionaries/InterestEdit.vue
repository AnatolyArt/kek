<template>

    <div class="animated fadeIn">
        <b-row>
            <b-col sm="12">
                <b-card>
                    <div slot="header">
                        <strong>{{title}}</strong>
                    </div>
                    <b-row>
                        <b-col sm="12">
                            <b-form-group>
                                <label for="name">Name</label>
                                <b-form-input v-model="name" type="text" id="name" placeholder="Interest name"></b-form-input>
                            </b-form-group>
                            <b-form-group
                                    label="Category"
                                    label-for="basicSelect">
                                <b-form-select id="basicSelect"
                                               :plain="true"
                                               :options="catList"
                                               v-model="catid">
                                </b-form-select>
                            </b-form-group>
                            <b-button type="submit" variant="primary" v-on:click="addCategory()">Save changes</b-button>
                            <a class="button btn btn-danger" :href="`#/dictionaries/categories/edit/${catid}`">Cancel</a>
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
      if(this.$route.params.id){
        let interest = null;
        this.$root.ajax.get('interests/categories')
          .then((response) => {
            for(let i = 0; i < response.data.data.length; i++){
              let cat = response.data.data[i];
              if(interest === null){
                interest = cat.interests.find(x => parseInt(x.id) === parseInt(this.$route.params.id));
                this.catid = cat.id;
                this.catname = cat.name;
              }
              this.catList.push({
                text: cat.name,
                value: cat.id
              })
            }
            this.name = interest.name;
            this.title += interest.name;
          }).catch(function (error) {
          alert(error);
        });
      }else{
        this.$root.ajax.get('interests/categories')
          .then((response) => {
            for(let i = 0; i < response.data.data.length; i++){
              let cat = response.data.data[i];
              this.catList.push({
                text: cat.name,
                value: cat.id
              })
            }
          }).catch(function (error) {
          alert(error);
        });
        this.title = 'Add new interest';
      }

    },
    data: () => {
      return {
        catid: 0,
        catname: '',
        name: '',
        title: 'Edit interest  ',
        catList: []
      }
    },
    methods: {
      addCategory: function () {
        if(this.name !== ''){
          var data = {
            'interest': {
              'themes': [],
              'ownerships': [],
              'name': this.name,
              'category_id': this.catid
            }
          };

          if(this.$route.params.id){
            this.$root.ajax.put('interests/' + this.$route.params.id, data)
              .then((response) => {
                this.$router.push('/dictionaries/categories/' + this.catid);
              }).catch(function (error) {
              alert(error);
            });
          }else{
            this.$root.ajax.post('interests', data)
              .then((response) => {
                this.$router.push('/dictionaries/categories/' + this.catid);
              }).catch(function (error) {
              alert(error);
            });
          }
        }
      }
    }
  }
</script>
