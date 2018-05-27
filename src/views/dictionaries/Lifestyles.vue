<template>
    <div>
        <b-card :header="caption">
            <h4 slot="header" class="mb-0">{{caption}}</h4>
            <b-table responsive="sm" :items="items" :fields="fields" ref="table">
                <template slot="name" slot-scope="data">
                    {{ data.item.name }}
                </template>
                <template slot="order" slot-scope="row">
                    <i class="fa fa-arrow-down fa-lg" v-on:click="replaceRow(row.index, 0)"></i>
                    <i class="fa fa-arrow-up fa-lg" v-on:click="replaceRow(row.index, 1)"></i>
                </template>
                <template slot="edit" slot-scope="data">
                    <a :href="`#/dictionaries/interests/edit/${data.item.id}`" ><i class="fa fa-pencil fa-lg"></i></a>
                </template>
            </b-table>
        </b-card>
    </div>
</template>

<script>


  export default {
    name: 'Lifestyles',
    created(){
      this.$root.ajax.get('themes')
        .then((response) => {
          for(var i = 0; i < response.data.data.length; i++){
            var value =  response.data.data[i];
            this.items.push(
              {
                'id': value.id,
                'name': value.name,
                'description': value.description
              })
          }
        }).catch(function (error) {
        alert(error);
      });

    },
    props: {
      caption: {
        type: String,
        default: 'Lifestyles'
      }
    },
    data: () => {
      return {
        items: [],
        fields: [
          {key: 'id'},
          {key: 'name'},
          {key: 'description'},
          {key: 'edit'}
        ],
        delete: 0,
        errorDelete: false,
        canDelete: false
      }
    },
    methods: {

    }
  }
</script>
