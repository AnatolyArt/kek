<template>
    <b-card :header="caption">
        <h4 slot="header"
            class="mb-0">{{caption}}<a type="button" href="#/dictionaries/categories/add" class="btn btn-sm btn-success pull-right m-0">Add new</a></h4>
        <b-table responsive="sm" :items="items" :fields="fields" ref="table">
            <template slot="name" slot-scope="data">
                {{ data.item.name }}
            </template>
            <template slot="order" slot-scope="row">
                <i class="fa fa-arrow-down fa-lg" v-on:click="replaceRow(row.index, 0)"></i>
                <i class="fa fa-arrow-up fa-lg" v-on:click="replaceRow(row.index, 1)"></i>
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
      this.$root.ajax.get('interests/categories')
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
      },
      replaceRow(row, move){
        var t = this.items[row];
        // move up
        console.log(row);
        if(move === 1){
          if(row !== 0){
            this.$set(this.items, row, this.items[row - 1]);
            this.$set(this.items, row - 1, t);
          }
        }else{
          if(row !== this.items.length - 1){
            this.$set(this.items, row, this.items[row + 1]);
            this.$set(this.items, row + 1, t);
          }
        }

        var data = {
          'ids': this.items.map(item => item.id)
        }
        this.$root.ajax.post('interests/categories/reoder', data)
          .then((response) => {
          }).catch(function (error) {
          alert(error);
        });
      }
    }
  }
</script>
