<template>
    <div class="animated fadeIn">
        <b-row>
            <b-col sm="12">
                <b-card>
                    <h4 slot="header" class="mb-0">{{title}}</h4>
                    <b-row>
                        <b-col sm="12">
                            <b-form-group validated>
                                <label>Name</label>
                                <b-form-input v-model="lifestyle.name" type="text" id="name"
                                              placeholder="Lifestyle name" required></b-form-input>
                                <label>Description</label>
                                <b-form-textarea v-model="lifestyle.description" type="text" id="description"
                                                 placeholder="Description" required></b-form-textarea>
                            </b-form-group>
                            <b-form-group>
                                <label>Image</label>
                                <div class="crop-image">
                                    <vue-base64-file-upload
                                            class="v1"
                                            accept="image/png,image/jpeg"
                                            image-class="thumbinal"
                                            :default-preview="this.lifestyle.image_url"
                                            input-class="v1-input"
                                            @load="getImageJson"
                                            placeholder="Select image" />
                                </div>
                            </b-form-group>
                            <b-button type="submit" variant="primary" v-on:click="save()">Save changes</b-button>
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

  import VueBase64FileUpload from 'vue-base64-file-upload';
  import VueNotifications from 'vue-notifications'
  import miniToastr from 'mini-toastr'

  export default {
    name: 'LifestylesEdit',
    components: {
      VueBase64FileUpload
    },
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
        }else{
          this.lifestyle = this.$root.lifestyles[this.$route.params.themeId];
        }
      }
    },
    data: () => {
      return {
        lifestyle: {},
        title: 'Lifestyle form',
        imagePreview: '',
        myModal: false,
        newImage: false,
        valide: true,
        fileLink: '',
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
      getImageJson(data){
        this.fileLink = data;
        this.newImage = true;
      },
      save(){
        if(this.lifestyle.name && this.lifestyle.description){
          // /themes/129

          var data = {
            'theme': {
              'name': this.lifestyle.name,
              'description': this.lifestyle.description,
              'image': this.fileLink.split(',')[1]
            }
          };

          this.$root.ajax.put('themes/' + this.$route.params.themeId, data)
            .then((response) => {
              miniToastr.success('Lifestyle saved', 'Success');
            }).catch(function (error) {
            miniToastr.error(error, 'Error');
          });


        }
      },
      previewImage: function (event) {
        // To FUTURE! MB
        this.fileLink = event.target.files[0];
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
