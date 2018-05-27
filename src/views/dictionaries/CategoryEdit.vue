<template>
    <div class="animated fadeIn">
        <b-row>
            <b-col sm="12">
                <b-card>
                    <h4 slot="header"
                        class="mb-0">{{title}}<a type="button" href="#/dictionaries/interests/add"
                                                   class="btn btn-sm btn-danger pull-right m-0">Delete category</a></h4>
                    <b-row>
                        <b-col sm="12">
                            <b-form-group>
                                <label for="name">Name</label>
                                <b-form-input v-model="name" type="text" id="name"
                                              placeholder="Category name"></b-form-input>
                            </b-form-group>
                            <b-button type="submit" variant="primary" v-on:click="addCategory()">Save changes</b-button>
                            <a href="#/dictionaries/categories" class="btn btn-danger" variant="secondary">Cancel</a>
                        </b-col>
                    </b-row>

                </b-card>
            </b-col>
        </b-row>
        <b-card :header="catName" v-if="catid !== 0">
            <h4 slot="header"
                class="mb-0">{{catName}}<a type="button" href="#/dictionaries/interests/add"
                                           class="btn btn-sm btn-success pull-right m-0">Add new</a></h4>
            <b-table responsive="sm" :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage">
                <template slot="name" slot-scope="data">
                    {{ data.item.name }}

                </template>
                <template slot="order" slot-scope="row">
                    <i class="fa fa-arrow-down fa-lg" v-on:click="replaceRow(row.index, 0)"></i>
                    <i class="fa fa-arrow-up fa-lg" v-on:click="replaceRow(row.index, 1)"></i>
                </template>
                <template slot="edit" slot-scope="data">
                    <a :href="`#/dictionaries/interests/edit/${data.item.id}`"><i class="fa fa-pencil fa-lg"></i></a>
                </template>
                <template slot="delete" slot-scope="data">
                    <i class="fa fa-trash-o fa-lg" v-on:click="deleteInterestPopup(data.item.id)"></i>
                </template>
            </b-table>
        </b-card>
        <b-modal title="Warning" class="modal-warning" v-model="canDelete" @cancel="canDelete = false" @ok="deleteInterest" ok-variant="warning">
            Are you sure you want to delete this interest? It will be removed from all scenes also.
        </b-modal>

        <b-modal title="Error" class="modal-danger" v-model="errorDeleteCat" @ok="errorDeleteCat = false" cancel-variant=" d-none">
            You can't delete category which contains interests, please delete or move interests first.
         </b-modal>
        <b-modal title="Warning" class="modal-warning" v-model="canDeleteCat" @cancel="errorDeleteCat = false" @ok="deleteCategory" ok-variant="warning">
            Are you sure you want to delete this category?
        </b-modal>
    </div>
</template>
<script>


  export default {
    name: 'CategoryEdit',
    created(){
      if (this.$route.params.catid) {
        this.$root.ajax.get('interests/categories')
          .then((response) => {
            let category = response.data.data.find(x => parseInt(x.id) === parseInt(this.$route.params.catid));
            this.catid = parseInt(this.$route.params.catid);
            this.name = category.name;
            this.title += category.name;
          }).catch(function (error) {
          alert(error);
        });

        this.$root.ajax.get('interests/categories')
          .then((response) => {
            let category = response.data.data.find(x => parseInt(x.id) === parseInt(this.$route.params.catid));
            this.catName = 'Interest for category: ' + category.name;
            for (let j = 0; j < category.interests.length; j++) {
              this.items.push(
                {
                  'id': category.interests[j].id,
                  'name': category.interests[j].name
                })
            }
          }).catch(function (error) {
          alert(error);
        });

      } else {
        this.title = 'Add new category';
      }

    },
    data: () => {
      return {
        catid: 0,
        name: '',
        title: 'Edit category ',
        catName: '',
        items: [],
        fields: [
          {key: 'id'},
          {key: 'name'},
          {key: 'order'},
          {key: 'edit'},
          {key: 'delete'}
        ],
        delete: 0,
        canDelete: 0
      }
    },
    methods: {
      addCategory: function () {
        if (this.name !== '') {
          var data = {
            'category': {
              'name': this.name
            }
          };

          if (this.$route.params.catid) {
            this.$root.ajax.put('interests/categories/' + this.catid, data)
              .then((response) => {
                this.$router.push('/dictionaries/categories');
              }).catch(function (error) {
              alert(error);
            });
          } else {
            this.$root.ajax.post('interests/categories', data)
              .then((response) => {
                this.$router.push('/dictionaries/categories');
              }).catch(function (error) {
              alert(error);
            });
          }
        }
      },
      deleteInterestPopup(interest){
        this.delete = interest;
        this.canDelete = true;
        console.log(this.canDelete);
      },
      deleteInterest(){
        if (this.delete !== 0) {
          this.$root.ajax.delete('interests/' + this.delete)
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
        console.log(row);
        if (move === 1) {
          if (row !== 0) {
            this.$set(this.items, row, this.items[row - 1]);
            this.$set(this.items, row - 1, t);
          }
        } else {
          if (row !== this.items.length - 1) {
            this.$set(this.items, row, this.items[row + 1]);
            this.$set(this.items, row + 1, t);
          }
        }

        var data = {
          'ids': this.items.map(item => item.id)
        }

        this.$root.ajax.post('interests/categories/' + this.$route.params.catid + '/reoder', data)
          .then((response) => {
          }).catch(function (error) {
          alert(error);
        });
      }
    }
  }
</script>
