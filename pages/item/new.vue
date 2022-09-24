<template>
  <div class="max-w-md mx-auto">
    <nuxt-link class="btn btn-primary btn-outline" to="/item">{{$t('item.back')}}</nuxt-link>
    <input type="text" :placeholder="$t('item.name')" class="input input-bordered w-full mt-[35%]" v-model="name" />
    <input type="text" :placeholder="$t('item.brand')" class="input input-bordered w-full mt-4" v-model="brand" />
    <input type="text" :placeholder="$t('item.quantity')" class="input input-bordered w-full mt-4" v-model="quantity" />
    <client-only>
      <date-picker v-model="date">
        <template v-slot="{ inputValue, inputEvents }">
          <input
            :placeholder="$t('item.dlc')"
            class="input input-bordered w-full mt-4"
            :value="inputValue"
            v-on="inputEvents"
          />
        </template>
      </date-picker>
      <div class="mt-6 relative min-h-12">
        <img v-if="pictureDataUrl" class="rounded-md w-full h-48 object-cover" :src="pictureDataUrl">
        <button class="btn btn-primary btn-outline rounded-full absolute bottom-1 left-1/2 -translate-x-1/2" @click="showCamera = true">
          {{ $t('item.take-picture') }}
        </button>
      </div>
      <easy-camera
        output="blob"
        v-show="showCamera"
        @close="showCamera = false"
        :fullscreen="showCamera"
        v-model="picture">
      </easy-camera>
    </client-only>
    <div v-if="imageError">{{item.image-error}}</div>
    <div v-if="uploadError">{{item.upload-error}}</div>
    <button class="btn btn-primary mt-4" :class="{loading: loading}" @click="addItem">
      {{$t('item.add-item')}}
    </button>
  </div>
</template>

<script>
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import { required, maxLength, integer, minValue } from 'vuelidate/lib/validators'
Vue.use(Vuelidate)

export default {
  name: 'NewItem',
  validations: {
    name: {
      required,
      maxLength: maxLength(516)
    },
    brand: {
      maxLength: maxLength(255)
    },
    quantity: {
      integer,
      minValue: minValue(0)
    }
  },
  data () {
    return {
      name: '',
      brand: '',
      quantity: '',
      date: null,
      picture: null,
      pictureDataUrl: null,
      showCamera: false,
      imageError: false,
      uploadError: false,
      loading: false
    }
  },
  watch: {
    picture () {
      if (this.picture == null) {
        return null
      }
      var a = new FileReader()
      a.onload = (e) => {
        this.pictureDataUrl = e.target.result
      }
      a.readAsDataURL(this.picture)
    }
  },
  methods: {
    async addItem () {
      this.loading = true
      let lot = null
      try {
        lot = await this.$appwrite.storage.createFile('632f01a53edd8d79dc8e','unique()', new File([this.picture], 'item-picture.png'))
        this.imageError = false
      } catch (e) {
        this.imageError = true
        this.loading = false
        console.log(e)
        return
      }
      
      try {
        await this.$appwrite.database.createDocument('632c838c59c24d8d18d0', '632c839eaf3d4acc89b0', 'unique()', {
          name: this.name,
          brand: this.brand,
          quantity: Number.parseInt(this.quantity),
          dlc: this.date,
          lot: lot.$id,
          finished: false
        })
        this.uploadError = false
        this.loading = false
        this.$router.push('/item')
      } catch (e) {
        this.uploadError = true
        this.loading = false
        console.log(e)
      }
      
    }
  }
}
</script>