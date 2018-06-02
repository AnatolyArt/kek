<template>
    <div>
        <b-card :header="caption">
            <h4 slot="header"
                class="mb-0">{{caption}}<a type="button" href="#/dictionaries/categories/add" class="btn btn-sm btn-success pull-right m-0">Add new</a></h4>
            <b-form-group label-for="elementsAppendButton">
                <b-input-group>
                    <b-form-input id="elementsAppendButton" type="text" v-model="searchField" placeholder="Search..."></b-form-input>
                    <b-input-group-button class="input-group-append">
                        <b-button @click="getItems()" variant="primary">Find</b-button>
                    </b-input-group-button>
                </b-input-group>
            </b-form-group>
            <b-table responsive="sm" :items="items" :fields="fields" ref="table">
                <template slot="name" slot-scope="data">
                    {{ data.item.name }}
                    <div class="scene-start-end">
                        <span v-if="data.item.start_at">Start: {{data.item.start_at}}</span>
                        <span v-if="data.item.end_at"> End: {{data.item.end_at}}</span>
                    </div>
                </template>
                <template slot="order" slot-scope="row">
                    <i class="fa fa-arrow-down fa-lg" v-on:click="replaceRow(row.index, 0)"></i>
                    <i class="fa fa-arrow-up fa-lg" v-on:click="replaceRow(row.index, 1)"></i>
                </template>
                <template slot="edit" slot-scope="data">
                    <a :href="`#/dictionaries/categories/edit/${data.item.id}`" ><i class="fa fa-pencil fa-lg"></i></a>
                </template>
                <template slot="delete" slot-scope="data">
                    <i class="fa fa-trash-o fa-lg" v-on:click="deleteCategoryPopup(data.item.id)"></i>
                </template>
            </b-table>
            <b-pagination v-if="pagination.total > pagination.perPage" size="sm" @input="getItems()" :total-rows="pagination.total" v-model="pagination.currentPage" :per-page="pagination.perPage"></b-pagination>
        </b-card>
        <b-modal title="Error" class="modal-danger" v-model="errorDelete" @ok="errorDelete = false" cancel-variant=" d-none">
            You can't delete category which contains interests, please delete or move interests first.
         </b-modal>
        <b-modal title="Warning" class="modal-warning" v-model="canDelete" @cancel="canDelete = false" @ok="deleteCategory" ok-variant="warning">
            Are you sure you want to delete this category?
        </b-modal>
    </div>
</template>

<script>


  export default {
    name: 'Scenes',
    created(){
        this.getItems();
    },
    props: {
      caption: {
        type: String,
        default: 'Scenes'
      }
    },
    data: () => {
      return {
        pagination:{
          total: 0,
          perPage: 10,
          currentPage: 1
        },
        items: [],
        fields: [
          {key: 'name', label: 'Event name'},
          {key: 'address', label: 'Address'},
          {key: 'type', label: 'Scene type'},
          {key: 'lifestyles', label: 'Scene lifestyles'},
          {key: 'interests', label: 'Scene Interests'},
          {key: 'owner', label: 'Owner'}
        ],
        delete: 0,
        errorDelete: false,
        canDelete: false,
        searchField: ''
      }
    },
    methods: {
      getItems(){
        var toSend = {
          params:{
            page: this.pagination.currentPage
          }
        };
        if(this.searchField !== ''){
          toSend.params.q = this.searchField;
        }
        this.items = [];
        this.$root.ajax.get('/events', toSend)
          .then((response) => {
            for(var i = 0; i < response.data.data.length; i++){
              var value =  response.data.data[i];
              this.pagination.total = response.data.meta.total;
              this.pagination.perPage = response.data.page.size;
              let lifestyle = value.theme.map(function(elem){
                                return elem.name;
                              }).join(', ');
              let interests = value.interests.map(function(elem){
                                return elem.name;
                              }).join(', ');
              this.items.push(
                {
                  'id': value.id,
                  'name': value.name,
                  'address': value.address,
                  'type': value.type,
                  'lifestyles': lifestyle,
                  'interests': interests,
                  'owner': value.owner,
                  'start_at': value.start_at,
                  'end_at': value.end_at
                })
            }
          }).catch(function (error) {
          console.log(error);
        });
      },
      getRowCount (items) {
        return items.length
      },
      deleteCategoryPopup(catId){
        let category = this.items.find(x => parseInt(x.id) === parseInt(catId));
        this.delete = catId;
        if(category.interests === 0){
          this.canDelete = true;
        }else{
          this.errorDelete = true;
        }
      },
      deleteCategory(){
        if(this.delete !== 0){
          this.$root.ajax.delete('interests/categories/' + this.delete)
            .then((response) => {
              let index = this.items.findIndex(x => parseInt(x.id) === parseInt(this.delete));
              this.$delete(this.items, index);
              this.delete = 0;
            }).catch(function (error) {
            alert(error);
          });
        }
      },
      replaceRow(row, move){
        var t = this.items[row];
        // move up
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
