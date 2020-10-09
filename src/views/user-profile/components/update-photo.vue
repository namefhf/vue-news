<template>
  <div class="update-photo">
    <div>
      <img
        :src="image"
        alt=""
        ref="image"
        style="display: block; max-width: 100%;"
      />
    </div>
    <van-nav-bar
      left-text="取消"
      right-text="确认"
      style="position:fixed;left:0;right:0;bottom:0"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
  </div>
</template>

<script>
import { editUserPhoto } from '@/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
  name: 'UpdatePhoto',
  props: {
    file: {
      type: File,
      required: true
    }
  },
  data () {
    return {
      image: window.URL.createObjectURL(this.file),
      cropper: null // 裁切器实例
    }
  },
  mounted () {
    const image = this.$refs.image
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      // autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    })
  },
  methods: {
    async onConfirm () {
      const file = await this.getCroppedCanvas()
      const fd = new FormData()
      // fd.append('photo', this.file)
      fd.append('photo', file)
      // multipart/form-data
      await editUserPhoto(fd)
      this.$emit('update-photo', window.URL.createObjectURL(file))
      this.$emit('close')
    },
    getCroppedCanvas () {
      return new Promise(resolve => {
        this.cropper.getCroppedCanvas().toBlob(blob => {
          resolve(blob)
        })
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
