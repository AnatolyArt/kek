<template>
    <b-card :header="caption">
        <button type="button" class="btn btn-success pull-right m-2">Add new</button>
        <b-table responsive="sm" :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage">
            <template slot="name" slot-scope="data">
                <a :href="`#/dictionaries/interests/${data.item.id}`" >{{ data.item.name }}</a>
            </template>
            <template slot="order" slot-scope="data">
                <i class="fa fa-arrow-down fa-lg"></i>
                <i class="fa fa-arrow-up fa-lg"></i>
            </template>
            <template slot="edit" slot-scope="data">
                <a :href="`#/dictionaries/categories/edit/${data.item.id}`" ><i class="fa fa-pencil fa-lg"></i></a>
            </template>
            <template slot="delete" slot-scope="data">
                <i class="fa fa-trash-o fa-lg"></i>
            </template>
        </b-table>
    </b-card>
</template>

<script>


  export default {
    name: 'Categories',
    created(){
      this.$root.ajax.get('interests/categories', {withCreditinals: true})
        .then((response) => {
            for(var i = 0; i < response.data.data.length; i++){
              var value =  response.data.data[i];
              this.items.push(
                {
                  'id': value.id,
                  'name': value.name,
                  'interests': value.interests.length
                })
            }
        }).catch(function (error) {
            alert(error);
        });

    },
    props: {
      caption: {
        type: String,
        default: 'Categories'
      }
    },
    data: () => {
      return {
        items: [],
        fields: [
          {key: 'id'},
          {key: 'name'},
          {key: 'interests'},
          {key: 'order'},
          {key: 'edit'},
          {key: 'delete'}
        ],
        currentPage: 1,
        perPage: 0,
        totalRows: 0
      }
    },
    methods: {
      getItems(){
        return this.items;
      },
      getRowCount (items) {
        return items.length
      }
    }
  }
</script>
