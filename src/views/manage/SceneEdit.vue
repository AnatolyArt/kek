<template>
    <div class="animated fadeIn">
        <b-row>
            <b-col sm="6" md="12" lg="6">
                <b-card>
                    <h4 slot="header" class="mb-0">{{title}}</h4>
                    <b-row>
                        <b-col sm="12">
                            <b-form-group validated>
                                <!--
                                <GmapMap
                                        :center="{lat:10, lng:10}"
                                        :zoom="7"
                                        map-type-id="terrain"
                                        style="width: 500px; height: 300px"
                                ></GmapMap>
                                !-->
                                <b-form-input v-model="scene.address" type="text" id="name"
                                              placeholder="Scene name" required></b-form-input>
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
                                <b-form-select v-model="scene.ownership" class="mb-3">
                                    <option value="event">Event</option>
                                    <option value="activity">Activity</option>
                                    <option value="attraction">Attraction</option>
                                </b-form-select>
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
                                    <date-picker lang="en" :readonly="true" format="YYYY-MM-DD"
                                                v-model="scene.start_at"></date-picker>
                                </p>
                                <label>End date</label>
                                <p>
                                    <date-picker lang="en" :readonly="true" format="YYYY-MM-DD"
                                                v-model="scene.end_at"></date-picker>
                                </p>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="12">
                            <label>Periodicity</label>
                            <b-form-select v-model="periodicity" class="mb-3">
                                <option value="1">Daily</option>
                                <option value="2">Scheduled</option>
                            </b-form-select>
                        </b-col>
                    </b-row>
                    <b-row v-show="periodicity === '2'">
                        <b-col sm="12">
                            <b-form-group>

                                    <div class="edit-scene days" v-for="(item, index) in daysOfWeek">
                                        <label>{{item}}</label>
                                        <b-form-input v-model="scene.days[index].from" type="text"
                                                      placeholder="From"></b-form-input>
                                        <b-form-input v-model="scene.days[index].to" type="text"
                                                      placeholder="To"></b-form-input>
                                    </div>

                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row v-show="periodicity === '1'">
                        <b-col sm="12">
                            <b-form-group class="edit-scene days">
                                <label>Time</label>
                                <b-form-input v-model="scene.days[0].from" type="text"
                                              placeholder="From"></b-form-input>
                                <b-form-input v-model="scene.days[0].to" type="text"
                                              placeholder="To"></b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>

                    <b-row>
                        <b-col sm="12">
                            <label>Privacy</label>
                            <b-form-select v-model="scene.privacy" class="mb-3">
                                <option value="public">Public</option>
                                <option value="private">Private</option>
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
                                           v-model="scene.lifestyles">
                            </b-form-select>
                        </b-col>
                    </b-row>
                    <b-row class="">
                        <b-col sm="12">
                            <label>Interests</label>
                            <multiselect v-model="scene.interests" :options="interests" :multiple="true" label="label"
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
                            <b-form-input v-model="scene.video_link" type="text" id="video"
                                          placeholder="Video link"></b-form-input>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="12">
                            <label>Author ID</label>
                            <b-form-input v-model="scene.author.id" type="text" id="owner"
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
                                        :items="scene.attachments"
                                        :cellWidth="81"
                                        :cellHeight="81">
                                    <template slot="cell" scope="props">
                                        <div class="bgthb" @click="openPopUp(props.item)" v-bind:style="{ background: 'url(' + props.item.url + ')' }"></div>
                                        <i @click="removeImage(props.item)" class="fa fa-close close-icon-image"></i>
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
            <b-col sm="6" md="12" lg="6">
                <b-card>
                    <h4 slot="header" class="mb-0">Scene stats</h4>
                    Coming soon
                </b-card>
            </b-col>
        </b-row>
        <b-modal v-model="popUpImage" @ok="popUpImage = false" cancel-variant=" d-none"
                 ok-variant=" d-none">
            <img :src="`${popUpImageUrl}`" class="img-fluid"/>
        </b-modal>
    </div>
</template>
<script>

  import VueBase64FileUpload from 'vue-base64-file-upload';
  import VueNotifications from 'vue-notifications'
  import miniToastr from 'mini-toastr'
  import DatePicker from 'vue2-datepicker'
  import Multiselect from 'vue-multiselect'

  export default {
    name: 'SceneEdit',
    components: {
      VueBase64FileUpload,
      DatePicker,
      Multiselect
    },
    created(){
      this.scene.type = 'event';
      this.scene.privacy = '1';
      if(this.$route.params.sceneId){
        this.$root.ajax.get('/events/' + this.$route.params.sceneId)
          .then((response) => {
            this.scene = response.data.data;
            if(this.scene.days.length === 7){
              this.periodicity = '1';
            }else{
              this.periodicity = '2';
            }
            let lifestyles = this.scene.theme.map(function(elem) {
              return elem.id
            });
            this.scene.lifestyles = lifestyles;

            let interests = this.scene.interests.map(function(elem) {
              return {'value': elem.id, 'label': elem.name};
            });
            this.scene.interests = interests;
            console.log(interests);
          }).catch(function (error) {
          alert(error);
        });
      }


      // Get Lifestyles change after to ubermethod
      this.$root.ajax.get('themes')
        .then((response) => {
          for (var i = 0; i < response.data.data.length; i++) {
            var theme = response.data.data[i];
            this.lifestyles.push({
              text: theme.name,
              value: theme.id
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
        periodicity: 1,
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
        popUpImage: false,
        imagesList:[
          'http://s1.1zoom.me/big3/81/Russia_Mountains_Lake_469922.jpg',
          'https://img.fonwall.ru/o/zi/kanchanaburi-tailand-vodopad-kaskad-c4gb.jpg',
          'http://widefon.com/_ld/138/22846116.jpg'
        ],
        daysOfWeek: [
          'Sun',
          'Mon',
          'Tue',
          'Wed',
          'Thu',
          'Fri',
          'Sat'
        ]
      }
    },
    methods: {
      removeImage (img) {
        var index = this.scene.attachments.indexOf(img);
        if (index !== -1) this.scene.attachments.splice(index, 1);
        //ajax to remove image
      },
      openPopUp(item){
        this.popUpImageUrl = item.url;
        this.popUpImage = true;
      },
      getImage(){
        if (this.imagePreview) {
          return this.imagePreview;
        }
        return this.lifestyle.image_url;
      },
      changeFile: function(event) {
        var input = event.target;
        var myFile = input.files[0];
        const reader = new FileReader()
        reader.onload = (e) => {
          this.$root.fileStorage.post('/event', myFile).then((response) => {
            myFile = null;
            input.value = '';
            this.scene.attachments.push({'url': response.data.attachment.url, 'id': response.data.attachment.id});
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
