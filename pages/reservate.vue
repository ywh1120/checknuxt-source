<!-- eslint-disable vue/valid-v-slot -->
<!-- eslint-disable vue/v-slot-style -->
<template>
  <div>

    <v-data-table
      :headers="headers" 
      :items="checkups" 
      :sort-by.sync="sortBy" 
      :sort-desc.sync="sortDesc" 
      :item-class="itemRowBackground" class="elevation-1">

      <template #top>
        <v-toolbar flat>
          <v-toolbar-title>{{ yearText }}년 {{ monthText }}월 {{ dayText }}일 </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-text-field v-model="searchName" label="검색" class="mx-4"></v-text-field>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="1000px">
            <template #activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                검진정보입력
              </v-btn>
            </template>

            <v-card>
              <v-card-title>
                <span class="text-h5">검진정보입력</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="16" sm="2" md="2">
                      <!--v-text-field
                        v-model="editedItem.time" label="예약시간"
                        pattern="^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$" type="time">
                      </v-text-field -->
                      <v-text-field
                        v-model="editedItem.time" 
                        label="예약시간"
                        maxlength="5"
                        type="time"
                        oninput="javascript: this.value = this.value.replace(/[^0-9]/, '').replace(/^(\d{2})(\d{2})$/, `$1:$2`);">
                      </v-text-field>
                    </v-col>
                    <v-col cols="16" sm="2" md="2">
                      <v-text-field v-model="editedItem.name" label="예약자성함"></v-text-field>
                    </v-col>

                    <v-col cols="16" sm="2" md="2">
                      <v-text-field 
                      v-model="editedItem.ssnum" 
                      label="주민번호"
                      maxlength=14
                      oninput="javascript: this.value = this.value.replace(/[^0-9]/, '').replace(/^(\d{6})(\d{7})$/, `$1-$2`);"></v-text-field>
                    </v-col>

                    <v-col cols="16" sm="2" md="2">
                      <v-text-field 
                      v-model="editedItem.telnum" 
                      label="전화번호"
                      maxlength=13
                      oninput="javascript: this.value = this.value.replace(/[^0-9]/, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);">
                      </v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="16" sm="1" md="1">
                      <v-checkbox v-model="editedItem.first" label="1차"></v-checkbox>
                    </v-col>

                    <v-col cols="16" sm="1" md="1">
                      <v-checkbox v-model="editedItem.wi" label="위"></v-checkbox>
                    </v-col>

                    <v-col cols="16" sm="1" md="1">
                      <v-checkbox v-model="editedItem.dae" label="대"></v-checkbox>
                    </v-col>

                    <v-col cols="16" sm="1" md="1">
                      <v-checkbox v-model="editedItem.yu" label="유"></v-checkbox>
                    </v-col>

                    <v-col cols="16" sm="1" md="1">
                      <v-checkbox v-model="editedItem.ja" label="자"></v-checkbox>
                    </v-col>

                    <v-col cols="16" sm="1" md="1">
                      <v-checkbox v-model="editedItem.gan" label="간"></v-checkbox>
                    </v-col>

                    <v-col cols="16" sm="1" md="1">
                      <v-checkbox v-model="editedItem.gfs" label="GFS"></v-checkbox>
                    </v-col>

                    <v-col cols="16" sm="1" md="1">
                      <v-checkbox v-model="editedItem.cfs" label="CFS"></v-checkbox>
                    </v-col>

                    <v-col cols="16" sm="1" md="1">
                      <v-checkbox v-model="editedItem.sleep" label="수면"></v-checkbox>
                    </v-col>

                    <v-col cols="16" sm="1" md="1">
                      <v-checkbox v-model="editedItem.live" label="live"></v-checkbox>
                    </v-col>

                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field v-model="editedItem.memo" label="메모"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>


              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>

                <v-btn color="blue darken-1" text @click="save">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:item.first="{ item }">
        <v-simple-checkbox v-model="item.first" disabled></v-simple-checkbox>
      </template>

      <template v-slot:item.wi="{ item }">
        <v-simple-checkbox v-model="item.wi" disabled></v-simple-checkbox>
      </template>

      <template v-slot:item.dae="{ item }">
        <v-simple-checkbox v-model="item.dae" disabled></v-simple-checkbox>
      </template>

      <template v-slot:item.yu="{ item }">
        <v-simple-checkbox v-model="item.yu" disabled></v-simple-checkbox>
      </template>

      <template v-slot:item.ja="{ item }">
        <v-simple-checkbox v-model="item.ja" disabled></v-simple-checkbox>
      </template>

      <template v-slot:item.gan="{ item }">
        <v-simple-checkbox v-model="item.gan" disabled></v-simple-checkbox>
      </template>

      <template v-slot:item.gfs="{ item }">
        <v-simple-checkbox v-model="item.gfs" disabled></v-simple-checkbox>
      </template>

      <template v-slot:item.cfs="{ item }">
        <v-simple-checkbox v-model="item.cfs" disabled></v-simple-checkbox>
      </template>

      <template v-slot:item.sleep="{ item }">
        <v-simple-checkbox v-model="item.sleep" disabled></v-simple-checkbox>
      </template>

      <template v-slot:item.live="{ item }">
        <v-simple-checkbox v-model="item.live" disabled></v-simple-checkbox>
      </template>

      <template v-slot:item.cancel="{ item }">
        <v-simple-checkbox v-model="item.cancel" @click="cancelupdate(item)"></v-simple-checkbox>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
      </template>

    </v-data-table>

  </div>
</template>
  
  
<script>
import dayjs from "dayjs";

import { updateDoc,setDoc, doc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
export default {

  data() {
    return {
      dialog: false,
      sortBy: 'time',
      sortDesc: false,
      searchName: '',
      headers: [
        {
          text: '시간',
          align: 'start',
          value: 'time',
        },

        { text: '이름', value: 'name' },
        { text: '주민번호', value: 'ssnum' },
        { text: '전화번호', value: 'telnum' },
        { text: '1차', value: 'first' },
        { text: '위', value: 'wi' },
        { text: '대', value: 'dae' },
        { text: '유', value: 'yu' },
        { text: '자', value: 'ja' },
        { text: '간', value: 'gan' },
        { text: 'GFS', value: 'gfs' },
        { text: 'CFS', value: 'cfs' },
        { text: '수면', value: 'sleep' },
        { text: 'live', value: 'live' },
        { text: '메모', value: 'memo' },
        { text: '취소', value: 'cancel' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],

      editedIndex: -1,
      editedItem:
      {

        time: '',
        name: '',
        ssnum: '',
        telnum: '',
        first: false,
        wi: false,
        dae: false,
        yu: false,
        ja: false,
        gan: false,
        gfs: false,
        cfs: false,
        sleep: false,
        live: false,
        reservated: false,
        memo: ''
      },

      defaultItem:

      {
        time: '',
        name: '',
        ssnum: '',
        telnum: '',
        first: false,
        wi: false,
        dae: false,
        yu: false,
        ja: false,
        gan: false,
        gfs: false,
        cfs: false,
        sleep: false,
        live: false,
        reservated: false,
        memo: ''
      },

      checkups: [],
      yearText:'',
      monthText: '',
      dayText: '',

    }

  },

  computed: {
    getDate() {
      return this.$store.state.loadDate;
    }
  },

  watch: {
    getDate() {
      this.initialize();
      this.yearText = this.$store.state.loadDate.split('-')[0];
      this.monthText = this.$store.state.loadDate.split('-')[1];
      this.dayText = this.$store.state.loadDate.split('-')[2];
    }
  },


  created() {
    onAuthStateChanged(this.$auth, (user) => {
        if (!user) {
          this.$router.push('/');
        } 
      });
    this.initialize();
    this.yearText = dayjs().format('YYYY');
    this.monthText = dayjs().format('MM');
    this.dayText = dayjs().format('DD');
    this.searchName = this.$store.state.searchName; 
  },

  methods: {

    initialize() {
      this.checkups = [
        {
          time: '09:00',
          name: '',
          ssnum: '',
          telnum: '',
          first: false,
          wi: false,
          dae: false,
          yu: false,
          ja: false,
          gan: false,
          gfs: false,
          cfs: false,
          sleep: false,
          live: false,
          memo: '',
          reservated: false,
          cancel: false
        },

        {
          time: '09:30',
          name: '',
          ssnum: '',
          telnum: '',
          first: false,
          wi: false,
          dae: false,
          yu: false,
          ja: false,
          gan: false,
          gfs: false,
          cfs: false,
          sleep: false,
          live: false,
          memo: '',
          reservated: false,
          cancel: false
        },

        {
          time: '10:00',
          name: '',
          ssnum: '',
          telnum: '',
          first: false,
          wi: false,
          dae: false,
          yu: false,
          ja: false,
          gan: false,
          gfs: false,
          cfs: false,
          sleep: false,
          live: false,
          memo: '',
          reservated: false,
          cancel: false
        },

        {
          time: '10:30',
          name: '',
          ssnum: '',
          telnum: '',
          first: false,
          wi: false,
          dae: false,
          yu: false,
          ja: false,
          gan: false,
          gfs: false,
          cfs: false,
          sleep: false,
          live: false,
          memo: '',
          reservated: false,
          cancel: false
        },

        {
          time: '11:00',
          name: '',
          ssnum: '',
          telnum: '',
          first: false,
          wi: false,
          dae: false,
          yu: false,
          ja: false,
          gan: false,
          gfs: false,
          cfs: false,
          sleep: false,
          live: false,
          memo: '',
          reservated: false,
          cancel: false
        },

        {
          time: '11:30',
          name: '',
          ssnum: '',
          telnum: '',
          first: false,
          wi: false,
          dae: false,
          yu: false,
          ja: false,
          gan: false,
          gfs: false,
          cfs: false,
          sleep: false,
          live: false,
          memo: '',
          reservated: false,
          cancel: false
        },

        {
          time: '12:00',
          name: '',
          ssnum: '',
          telnum: '',
          first: false,
          wi: false,
          dae: false,
          yu: false,
          ja: false,
          gan: false,
          gfs: false,
          cfs: false,
          sleep: false,
          live: false,
          memo: '',
          reservated: false,
          cancel: false
        },

        {
          time: '12:30',
          name: '',
          ssnum: '',
          telnum: '',
          first: false,
          wi: false,
          dae: false,
          yu: false,
          ja: false,
          gan: false,
          gfs: false,
          cfs: false,
          sleep: false,
          live: false,
          memo: '',
          reservated: false,
          cancel: false
        },

        {
          time: '13:00',
          name: '',
          ssnum: '',
          telnum: '',
          first: false,
          wi: false,
          dae: false,
          yu: false,
          ja: false,
          gan: false,
          gfs: false,
          cfs: false,
          sleep: false,
          live: false,
          memo: '',
          reservated: false,
          cancel: false
        },

        {
          time: '13:30',
          name: '',
          ssnum: '',
          telnum: '',
          first: false,
          wi: false,
          dae: false,
          yu: false,
          ja: false,
          gan: false,
          gfs: false,
          cfs: false,
          sleep: false,
          live: false,
          memo: '',
          reservated: false,
          cancel: false
        },

        {
          time: '14:00',
          name: '',
          ssnum: '',
          telnum: '',
          first: false,
          wi: false,
          dae: false,
          yu: false,
          ja: false,
          gan: false,
          gfs: false,
          cfs: false,
          sleep: false,
          live: false,
          memo: '',
          reservated: false,
          cancel: false
        },

        {
          time: '14:30',
          name: '',
          ssnum: '',
          telnum: '',
          first: false,
          wi: false,
          dae: false,
          yu: false,
          ja: false,
          gan: false,
          gfs: false,
          cfs: false,
          sleep: false,
          live: false,
          memo: '',
          reservated: false,
          cancel: false
        },
        {
          time: '15:00',
          name: '',
          ssnum: '',
          telnum: '',
          first: false,
          wi: false,
          dae: false,
          yu: false,
          ja: false,
          gan: false,
          gfs: false,
          cfs: false,
          sleep: false,
          live: false,
          memo: '',
          reservated: false,
          cancel: false
        },

        {
          time: '15:30',
          name: '',
          ssnum: '',
          telnum: '',
          first: false,
          wi: false,
          dae: false,
          yu: false,
          ja: false,
          gan: false,
          gfs: false,
          cfs: false,
          sleep: false,
          live: false,
          memo: '',
          reservated: false,
          cancel: false
        },

        {
          time: '16:00',
          name: '',
          ssnum: '',
          telnum: '',
          first: false,
          wi: false,
          dae: false,
          yu: false,
          ja: false,
          gan: false,
          gfs: false,
          cfs: false,
          sleep: false,
          live: false,
          memo: '',
          reservated: false,
          cancel: false
        },

        {
          time: '16:30',
          name: '',
          ssnum: '',
          telnum: '',
          first: false,
          wi: false,
          dae: false,
          yu: false,
          ja: false,
          gan: false,
          gfs: false,
          cfs: false,
          sleep: false,
          live: false,
          memo: '',
          reservated: false,
          cancel: false
        },

        {
          time: '17:00',
          name: '',
          ssnum: '',
          telnum: '',
          first: false,
          wi: false,
          dae: false,
          yu: false,
          ja: false,
          gan: false,
          gfs: false,
          cfs: false,
          sleep: false,
          live: false,
          memo: '',
          reservated: false,
          cancel: false
        },

      ];

      this.load_date();

    },

    load_date() {

      try {

        const date = this.getDate;
        // eslint-disable-next-line no-unused-vars
        const q = onSnapshot(doc(this.$db, "reservate", date), (docSnapshot) => {
          if (docSnapshot.exists) {
            const getData = docSnapshot.data();
            for (const key in getData) {
              let duplData = false;
              this.checkups.forEach((check) => {
                if (getData[key].time === check.time) {
                  check.name = getData[key].name;
                  check.ssnum = this.$decryptstr(getData[key].ssnum);
                  check.telnum = getData[key].telnum;
                  check.first = getData[key].first;
                  check.wi = getData[key].wi;
                  check.dae = getData[key].dae;
                  check.yu = getData[key].yu;
                  check.ja = getData[key].ja;
                  check.gan = getData[key].gan;
                  check.gfs = getData[key].gfs;
                  check.cfs = getData[key].cfs;
                  check.sleep = getData[key].sleep;
                  check.live = getData[key].live;
                  check.memo = getData[key].memo;
                  check.reservated = true;
                  check.cancel = getData[key].cancel;
                  duplData = true;
                }
              });
              if(!duplData){
                getData[key].ssnum = this.$decryptstr(getData[key].ssnum);
                this.checkups.push(getData[key]);
              }
            }

          }

        });

      } catch (e) {


      }

    },

    itemRowBackground: function (item) {
      if ((item.name!=='') && (!item.cancel)) {
        return 'green';
      } else if (item.cancel) {
        return 'red';
      } else {
        return 'white';
      }
    },
    toggleOrder() {
      this.sortDesc = !this.sortDesc
    },
    nextSort() {
      let index = this.headers.findIndex(h => h.value === this.sortBy)
      index = (index + 1) % this.headers.length
      this.sortBy = this.headers[index].value
    },

    async save() {
      
      const sDate = this.getDate;
      // eslint-disable-next-line no-unused-vars
      const reservateData = this.editedItem.time;
      alert(this.editedItem);
      await setDoc(doc(this.$db, "reservate", sDate), {
        [reservateData]: {
          time: this.editedItem.time,
          name: this.editedItem.name,
          ssnum: this.$encryptstr(this.editedItem.ssnum),
          telnum: this.editedItem.telnum,
          first: this.editedItem.first,
          wi: this.editedItem.wi,
          dae: this.editedItem.dae,
          yu: this.editedItem.yu,
          ja: this.editedItem.ja,
          gan: this.editedItem.gan,
          gfs: this.editedItem.gfs,
          cfs: this.editedItem.cfs,
          sleep: this.editedItem.sleep,
          live: this.editedItem.live,
          memo: this.editedItem.memo,
          cancel : this.editedItem.cancel
        }
      }, { merge: true });
      
      if (this.editedIndex > -1) {
        Object.assign(this.checkups[this.editedIndex], this.editedItem)
      } 
      this.close()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    editItem(item) {
      this.editedIndex = this.checkups.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    async cancelupdate(item){
      const sDate = this.getDate;
      const reservateData = item.time;
      const updateData = doc(this.$db, "reservate", sDate);

      // Set the "capital" field of the city 'DC'
      await updateDoc(updateData, {
        [reservateData]:{
          time: item.time,
          name: item.name,
          ssnum: this.$encryptstr(item.ssnum),
          telnum: item.telnum,
          first: item.first,
          wi: item.wi,
          dae: item.dae,
          yu: item.yu,
          ja: item.ja,
          gan: item.gan,
          gfs: item.gfs,
          cfs: item.cfs,
          sleep:item.sleep,
          live: item.live,
          memo: item.memo,
          cancel : item.cancel
        }
      }, { merge: true });
    }
  },
}

</script>
