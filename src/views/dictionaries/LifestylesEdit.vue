<template>
    <div class="animated fadeIn">
        <b-row>
            <b-col sm="12">
                <b-card>
                    <h4 slot="header" class="mb-0">{{title}}</h4>
                    <b-row>
                        <b-col sm="12">
                            <b-form-group>
                                <label>Name</label>
                                <b-form-input v-model="lifestyle.name" type="text" id="name"
                                              placeholder="Lifestyle name"></b-form-input>
                            </b-form-group>
                            <b-form-group>
                                <label>Description</label>
                                <b-form-textarea v-model="lifestyle.description" type="text" id="description"
                                                 placeholder="Description"></b-form-textarea>
                            </b-form-group>
                            <b-form-group>
                                <label>Image</label>
                                <div class="crop-image">
                                    <b-img class="thumbinal" :src="getImage()" alt="Thumbnail" id="image"
                                           v-on:click="myModal = true"/>
                                </div>
                                <div>
                                    <button v-on:click="revertImage()" class="button btn btn-danger btn-sm mt-2 mb-2" v-if="imagePreview !== ''">
                                        revert image
                                    </button>
                                </div>
                                <p>
                                    <b-form-file id="fileInput" :plain="true" @change="previewImage"
                                                 accept="image/*" v-model="imageFile" ref="imageFile"></b-form-file>
                                </p>
                            </b-form-group>
                            <b-button type="submit" variant="primary" v-on:click="addCategory()">Save changes</b-button>
                            <a class="button btn btn-danger" href="#/dictionaries/lifestyles">Cancel</a>
                        </b-col>
                    </b-row>

                </b-card>
            </b-col>
        </b-row>
        <b-modal :title="lifestyle.name" v-model="myModal" @ok="myModal = false" cancel-variant=" d-none"
                 ok-variant=" d-none">
            <img :src="`${lifestyle.image_url}`" class="img-fluid"/>
        </b-modal>
    </div>
</template>
<script>


  export default {
    name: 'LifestylesEdit',
    created(){
      if (this.$route.params.themeId) {
        // change this to external function
        if (this.$root.lifestyles.length === 0) {
          this.$root.ajax.get('themes')
            .then((response) => {
              for (var i = 0; i < response.data.data.length; i++) {
                var value = response.data.data[i];
                this.$root.lifestyles[value.id] = value;
              }
              this.lifestyle = this.$root.lifestyles[this.$route.params.themeId];
            }).catch(function (error) {
            alert(error);
          });
        }
      }
    },
    data: () => {
      return {
        lifestyle: {},
        title: 'Edit lifestyle',
        imagePreview: '',
        myModal: false,
        imageFile: ''
      }
    },
    methods: {
      getImage(){
        if (this.imagePreview) {
          return this.imagePreview;
        }
        return this.lifestyle.image_url;
      },
      revertImage(){
        this.imagePreview = '';
        this.imageFile = '';
        this.$refs.imageFile.reset();
      },
      addCategory: function () {
        if (this.name !== '') {
          var data = {
            'interest': {
              'themes': [],
              'ownerships': [],
              'name': this.name,
              'category_id': this.catid
            }
          };

          if (this.$route.params.id) {
            this.$root.ajax.put('interests/' + this.$route.params.id, data)
              .then((response) => {
                this.$router.push('/dictionaries/categories/' + this.catid);
              }).catch(function (error) {
              alert(error);
            });
          } else {
            this.$root.ajax.post('interests', data)
              .then((response) => {
                this.$router.push('/dictionaries/categories/' + this.catid);
              }).catch(function (error) {
              alert(error);
            });
          }
        }
      },
      previewImage: function (event) {
        // Reference to the DOM input element
        var input = event.target;
        // Ensure that you have a file before attempting to read it
        if (input.files && input.files[0]) {
          // create a new FileReader to read this image and convert to base64 format
          var reader = new FileReader();
          // Define a callback function to run, when FileReader finishes its job
          reader.onload = (e) => {
            // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
            // Read image as base64 and set to imageData
            this.imagePreview = e.target.result;
          }
          // Start the reader job - read file as a data url (base64 format)
          reader.readAsDataURL(input.files[0]);
        }
      }
    }
  }
</script>
