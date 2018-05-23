<template>
    <b-card :header="catName">
        <button type="button" class="btn btn-success pull-right m-2">Add new</button>
        <b-table responsive="sm" :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage">

            <template slot="order" slot-scope="data">
                <i class="fa fa-arrow-down fa-lg"></i>
                <i class="fa fa-arrow-up fa-lg"></i>
            </template>
            <template slot="edit" slot-scope="data">
                <i class="fa fa-pencil fa-lg"></i>
            </template>
            <template slot="delete" slot-scope="data">
                <i class="fa fa-trash-o fa-lg"></i>
            </template>
        </b-table>
    </b-card>
</template>

<script>


  export default {
    name: 'Interests',
    created(){
      this.$root.ajax.get('interests/categories', {withCreditinals: true})
        .then((response) => {
          // TODO change FOR to FIND
          var category = response.data.data.find(x => parseInt(x.id) === parseInt(this.$route.params.catid));
          this.catName = 'Interest for category: <b>' + category.name + '</b>';
          for(var j = 0; j < category.interests.length; j++){
            this.items.push(
            {
                'id': category.interests[j].id,
                'name': category.interests[j].name
            })
          }
        }).catch(function (error) {
        alert(error);
      });

    },
    props: {
      caption: {
        type: String,
        default: this.catName
      }
    },
    data: () => {
      return {
        catName: '',
        items: [],
        fields: [
          {key: 'id'},
          {key: 'name'},
          {key: 'order'},
          {key: 'edit'},
          {key: 'delete'}
        ],
        currentPage: 1,
        perPage: 100,
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
