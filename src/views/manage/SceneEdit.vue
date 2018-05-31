<template>
    <div class="animated fadeIn">
        <b-row>
            <b-col sm="6">
                <b-card>
                    <h4 slot="header" class="mb-0">{{title}}</h4>
                    <b-row>
                        <b-col sm="12">
                            <b-form-group validated>
                                <label>Name</label>
                                <b-form-input v-model="scene.name" type="text" id="name"
                                              placeholder="Scene name" required></b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="12">
                            <label>Type</label>
                            <b-form-group>
                                <b-form-select v-model="scene.type" class="mb-3">
                                    <option value="event">Event</option>
                                    <option value="activity">Activity</option>
                                    <option value="attraction">Attraction</option>
                                </b-form-select>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="12">
                            <b-form-group validated>
                                <label>Addess</label>



                            </b-form-group>
                        </b-col>
                    </b-row>

                    <b-row>
                        <b-col sm="12">
                            <b-form-group>
                                <label>Description</label>
                                <b-form-textarea v-model="scene.description" :rows="5" type="text" id="description"
                                                 placeholder="Description" required></b-form-textarea>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="12">
                            <b-form-group>
                                <label>Start date</label>
                                <p>
                                    <datepicker :readonly="true" format="YYYY-MM-DD"
                                                v-model="scene.dateFrom"></datepicker>
                                </p>
                                <label>End date</label>
                                <p>
                                    <datepicker :readonly="true" format="YYYY-MM-DD"
                                                v-model="scene.dateTo"></datepicker>
                                </p>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="12">
                            <label>Periodicity</label>
                            <b-form-select v-model="scene.periodicity" class="mb-3">
                                <option value="daily">Daily</option>
                                <option value="scheduled">Scheduled</option>
                            </b-form-select>
                        </b-col>
                    </b-row>
                    <b-row v-if="scene.periodicity === 'scheduled'">
                        <b-col sm="12">
                            <b-form-group
                                    label="Days"
                                    label-for="basicInlineCustomCheckboxes"
                                    :label-cols="3"
                                    :horizontal="true">
                                <b-form-checkbox-group id="basicInlineCheckboxes" name="InlineCheckboxes" :plain="true"
                                                       :checked="[1,3]">
                                    <b-form-checkbox :plain="true" value="0">Sun</b-form-checkbox>
                                    <b-form-checkbox :plain="true" value="1">Mon</b-form-checkbox>
                                    <b-form-checkbox :plain="true" value="2">Tue</b-form-checkbox>
                                    <b-form-checkbox :plain="true" value="3">Wed</b-form-checkbox>
                                    <b-form-checkbox :plain="true" value="4">Thu</b-form-checkbox>
                                    <b-form-checkbox :plain="true" value="5">Fri</b-form-checkbox>
                                    <b-form-checkbox :plain="true" value="6">Sat</b-form-checkbox>
                                </b-form-checkbox-group>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="12">
                            <label>Privacy</label>
                            <b-form-select v-model="scene.privacy" class="mb-3">
                                <option value="1">Public</option>
                                <option value="0">Private</option>
                            </b-form-select>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="12">
                            <label>Lifestyles</label>
                            <b-form-select id="basicSelect"
                                           :plain="true"
                                           :multiple="true"
                                           :options="lifestyles"
                                           v-model="scene.lifestyle">
                            </b-form-select>
                        </b-col>
                    </b-row>
                    <b-row class="multiselect-margin">
                        <b-col sm="12">
                            <label>Interests</label>
                            <multiselect v-model="scene.interest" :options="interests" :multiple="true" label="label"
                                         track-by="label"></multiselect>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="12">
                            <label>Email</label>
                            <b-form-input v-model="scene.email" type="text" id="email"
                                          placeholder="Email" required></b-form-input>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="12">
                            <label>Phone</label>
                            <b-form-input v-model="scene.phone" type="text" id="phone"
                                          placeholder="Phone" required></b-form-input>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="12">
                            <label>Website link</label>
                            <b-form-input v-model="scene.website" type="text" id="site"
                                          placeholder="Website"></b-form-input>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="12">
                            <label>Video link</label>
                            <b-form-input v-model="scene.video" type="text" id="video"
                                          placeholder="Video link"></b-form-input>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="12">
                            <label>Owner</label>
                            <b-form-input v-model="scene.owner" type="text" id="owner"
                                          placeholder="Owner ID"></b-form-input>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="12">
                            <label>Images</label>
                            <p>
                                <input @change="changeFile" class="Image-input__input" name="thumbnail" type="file">
                            </p>
                            <div  style="width:300px;">
                                <grid
                                        :draggable="true"
                                        :sortable="true"
                                        :items="imagesList"
                                        :cellWidth="81"
                                        :cellHeight="81">
                                    <template slot="cell" scope="props">
                                        <div class="bgthb" v-bind:style="{ background: 'url(' + props.item + ')' }"></div>
                                    </template>
                                </grid>
                            </div>
                        </b-col>
                    </b-row>
                    <b-row class="mt10 mb10">
                        <b-col sm="12">
                            <b-form-group>
                                <b-button type="submit" variant="primary" v-on:click="save()">Save changes</b-button>
                                <a class="button btn btn-danger" href="#/dictionaries/lifestyles">Cancel</a>
                            </b-form-group>
                        </b-col>
                    </b-row>

                </b-card>
            </b-col>
            <b-col sm="6">
                <b-card>
                    <h4 slot="header" class="mb-0">Scene stats</h4>
                    Coming soon



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
  import datepicker from 'vue-date-picker';
  import Multiselect from 'vue-multiselect'

  export default {
    name: 'SceneEdit',
    components: {
      VueBase64FileUpload,
      datepicker,
      Multiselect
    },
    created(){
      this.scene.type = 'event';
      this.scene.privacy = '1';
      // Get Lifestyles change after to ubermethod
      this.$root.ajax.get('themes')
        .then((response) => {
          for (var i = 0; i < response.data.data.length; i++) {
            var theme = response.data.data[i];
            this.lifestyles.push({
              text: theme.name,
              label: theme.id
            })
          }
          console.log(this.lifestyles);
        }).catch(function (error) {
        alert(error);
      });

      this.$root.ajax.get('interests/categories')
        .then((response) => {
          for (var i = 0; i < response.data.data.length; i++) {

            var cat = response.data.data[i];

            this.interests.push({
              value: cat.id,
              label: cat.name,
              $isDisabled: true
            });

            for(var j = 0; j < cat.interests.length; j++){
              var interest = cat.interests[j];
              this.interests.push({
                value: interest.id,
                label: interest.name
              });
            }

          }
        }).catch(function (error) {
        alert(error);
      });

      if (this.$route.params.sceneId) {

      }
    },
    data: () => {
      return {
        scene: {},
        lifestyle: {},
        lifestyles: [],
        interests: [],
        title: 'Scene form',
        imagePreview: '',
        myModal: false,
        newImage: false,
        valide: true,
        fileLink: '',
        imageFile: '',
        imagesList:[
          'http://s1.1zoom.me/big3/81/Russia_Mountains_Lake_469922.jpg',
          'https://img.fonwall.ru/o/zi/kanchanaburi-tailand-vodopad-kaskad-c4gb.jpg',
          'http://widefon.com/_ld/138/22846116.jpg'
        ]
      }
    },
    methods: {
      getImage(){
        if (this.imagePreview) {
          return this.imagePreview;
        }
        return this.lifestyle.image_url;
      },
      changeFile: function(event) {
        var input = event.target;
        const myFile = input.files[0];
        const reader = new FileReader()
        reader.onload = (e) => {
          this.$root.fileStorage.post('event', myFile).then((response) => {
            console.log(response);
          }).catch(function (error) {
            console.log(error);
          });
        }
        reader.readAsArrayBuffer(input.files[0]);
      },
      save(){
        if (this.lifestyle.name && this.lifestyle.description) {
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
      }
    }
  }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
