<template>
<v-dialog v-model="show" max-width="800px">
    <v-card>
        <div class="float-right">
            <v-btn text small @click.stop="show=false"><i class="fa fa-times" aria-hidden="true"></i></v-btn>
        </div>
        <v-row no-gutters>
            <v-col
                cols="12"
                sm="12"
                md="12"
                class="pl-4"
            > 
                <v-card-title class="font-weight-black text-center d-block">
                    Enter Shipping details: <br><br>
                </v-card-title>
                <v-textarea
                        outlined
                        name="input-7-4"
                        v-model="message"
                        ></v-textarea>
                <v-card-actions class="mt-5 mb-3 text-center d-block">
                     <v-btn 
                        :loading="sending"
                        :disabled="sending" 
                        color="success"
                        class="white--text"  
                      @click="sendMessage">Save</v-btn>
                </v-card-actions>
               
            </v-col>
        </v-row>
    </v-card>
    
     
</v-dialog>
</template>

<script>


export default {
    data() {
        return {
            message: null,
            sending: false,
        }
    },
    props: {
        message_type: String,
        value: Boolean,
        order_id: Number,
        user_id: Number,
        user_type: String

    },
    computed: {
        show: {
            get () {
                return this.value
            },
            set (value) {
                this.$emit('input', value)
            }
        }
    },
    methods: {
        showSendMessage() {
            this.$emit('showSendMessage')
        },
        sendMessage() {
            console.log(this.user_id)
            if(this.message == null)
                return false;
            this.sending = true;
            let data = {
                message_type:this.message_type,
                message: this.message,
                seller_id: this.user_id,
                order_id: this.order_id,
                user_type: this.user_type
            }
            this.$store.dispatch('sendMessage', data)
            .then((res) => {
                switch (res.data.status) {
                    case 2:
                        this.$emit('update_orders')
                        this.sending = false;
                        this.show= false
                        this.$swal({
                            icon: 'success',
                            title: 'Congrats',
                            text: 'Item shipped successfully',
                        });
                        break;
                    case 6:
                        this.sending = false;
                        this.$swal({
                            icon: 'error',
                            title: 'Oops...',
                            text: res.data.message,
                        });
                        break;
                    default:
                    break;
                }

                //this.$router.push('/')
            })
            .catch(err => {
                console.log(err)
                this.sending = false;
                this.$swal({
                    icon: 'error',
                    title: 'Oops...',
                    text: err,
                });
            })
        }
  }
}
</script>
<style>
.divider-right {
    border-left:1px solid #000;
}
/* If the screen size is 600px wide or less */
  @media screen and (max-width: 600px) {
    .divider-right {
    border-left:none;
}
  }
</style>