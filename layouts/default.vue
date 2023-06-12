<!-- eslint-disable spaced-comment -->
<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-row justify="center">
        <v-col>
          <v-date-picker v-model="picker" locale="ko-kr" full-width class="mt-4"></v-date-picker>
        </v-col>
      </v-row>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
      <v-row v-if="loginuser">
        <v-col>
          <v-autocomplete
          v-model="nameSearch"
          :autosearch="autosearch"
          :loading="loading"
          :items="storeId"
          class="mx-4"
          density="comfortable"
          hide-no-data
          hide-details
          label="환자명 입력"
          style="max-width: 300px;"
          return-object
        ></v-autocomplete>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col>
          <v-text-field  v-model="email" label="이메일" class="mx-4" ></v-text-field>
          
        </v-col>
        <v-col>
          
          <v-text-field  v-model="password" type="password" label="비밀번호" class="mx-4" @keyup.enter="login()"></v-text-field>
        </v-col>
      </v-row>
      <v-spacer />
      <v-row v-if="loginuser">
        <v-col>
          <v-btn  @click="search()">
            <v-icon>검색</v-icon>
          </v-btn>
       </v-col>
       <v-col>
          <v-btn  @click="logout()">
            <v-icon>로그아웃</v-icon>
          </v-btn>
       </v-col>
      </v-row>
      <v-row v-else>
        <v-col>
          <v-btn  @click="login()">
            <v-icon>로그인</v-icon>
          </v-btn>
       </v-col>
      </v-row>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { collection, query, getDocs } from "firebase/firestore";
import { signInWithEmailAndPassword,onAuthStateChanged,signOut } from "firebase/auth";
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      loginuser:'',
      email:'',
      password:'',
      picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        
        
        
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
      nameSearch: null,
      autosearch:null,
      loading:false,
      storeId:[]
    }
  },
  
  watch: {
    autosearch (val) {
        val && val !== this.nameSearch && this.search(val)
      },
    picker() {
      this.$store.state.loadDate = this.picker;
    }

  },
  created(){
    onAuthStateChanged(this.$auth, (user) => {
        if (user) {
          this.loginuser = this.$auth.currentUser;
          if(this.$auth.currentUser){
            this.items.push({
                icon: 'mdi-chart-bubble',
                title: 'Reservate',
                to: '/reservate',
              })
          }
          
        } else {
          
          this.loginuser = false;
        }
      });

  },
  mounted() {
    this.$store.state.loadDate = this.picker;

    
  },

  methods: {
    search(v) {
      this.loading = true;
      setTimeout(async () => {
        const q = query(collection(this.$db, "reservate"));
        const querySnapshot = await getDocs(q);
        let count = 0;
        // eslint-disable-next-line prefer-const
        
        querySnapshot.forEach((docs) => {
          const getData = docs.data();
          
          for (const key in getData) {
            if(getData[key].name === v){
              count = count+1;
              this.storeId.push(docs.id);
            }
          }
          
        });
         
        this.loading = false
      }, 500)
      
      
        // eslint-disable-next-line spaced-comment
        //this.$store.state.loadDate = this.storeId[0];
        // eslint-disable-next-line spaced-comment
        //this.$store.state.searchName = this.nameSearch;
      

    },

    login(){
      signInWithEmailAndPassword(this.$auth, this.email, this.password)
      .then((userCredential) => {
         this.email=''; 
         this.password='';
         this.$router.push('/');
      })
      
    },
    logout(){
      signOut(this.$auth).then(() => {
        // Sign-out successful.
        this.loginuser = false;
        this.items.splice(1);
        this.$router.push('/');
        
      })
    }

  }
}
</script>
