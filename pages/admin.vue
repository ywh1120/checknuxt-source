<template>
    <v-container> 
        <v-row class='mb-6'> 
            <v-col> 
                <v-card class="pa-2" outlined tile > 사용자등록하기 </v-card> 
            </v-col> 
            <v-col> 
                <v-card class="pa-2" outlined tile > 
                    <v-btn @click="user_dialog = true">등록</v-btn> 
                </v-card> 
            </v-col>
            
        </v-row>
        
        
        
<v-row justify="center">
    <v-dialog v-model="user_dialog" persistent max-width="600px" > 
        
        <v-card>
            <v-card-title>
            Auth test
            </v-card-title>
            <v-card-text>
            <v-form>
                <v-text-field v-model="form.email" label="email"></v-text-field>
                <v-text-field
                v-model="form.password"
                label="password"
                type="password"
                ></v-text-field>
            </v-form>
            </v-card-text>
            <v-card-text>
            {{ msg }}
            </v-card-text>
            <v-card-actions>
            <v-btn @click="signUp">
                signUp
            </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

</v-row> 
</v-container>
</template>
<script>
import { createUserWithEmailAndPassword } from "firebase/auth";

export default {
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      msg: '',
      user_dialog:false
    }
  },
  mounted() {},
  methods: {
    signUp() {
      try {

        createUserWithEmailAndPassword(this.$auth, this.form.email, this.form.password)
        .then((userCredential) => {this.user_dialog = false;})
        
      } catch (e) {
        console.error(e.message)
      }
    }
  }
}
</script>