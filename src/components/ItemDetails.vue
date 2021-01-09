<template>
    <v-dialog v-model="show" max-width="500px">
        <v-card>
            <div class="float-right">
                <v-btn text small @click.stop="show=false"><i class="fa fa-times" aria-hidden="true"></i></v-btn>
            </div>
            <v-row no-gutters>
                <v-col
                    cols="12"
                    sm="12"
                    md="12"
                    class=""
                >
                <v-card-title class="text-center d-block
                mt-2">
                    Fulfilled Order Details
                </v-card-title>
                    <v-card-text>
                        <p>Order No. {{order_id}}</p>
                        <p>Order Date: {{order_date | formatDate}}</p>
                        <p v-if="message">Message: {{message}}</p>
                        <p>Shipped Date: {{dispatched_date | formatDate}}</p>
                    </v-card-text>
                    <v-card-actions class="mb-3 text-center d-block">
                        <v-btn small @click.stop="show=false">Close</v-btn>
                    </v-card-actions>
                
                </v-col>
            </v-row>
        </v-card>
        
        
    </v-dialog>
</template>

<script>


export default {
    props: {
        value: Boolean,
        order_id: Number,
        message: String,
        dispatched_date: String,
        order_date: String
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
        showItemDetails() {
            this.$emit('showItemDetails')
        }
    },
}
</script>
<style>
</style>