<template>
  <div class="user-profile">
    <van-nav-bar
      title="个人信息"
      left-arrow
      class="app-nav-bar"
      @click-left="$router.back()"
    />
    <input
      type="file"
      hidden
      ref="file"
      accept="image/*"
      @change="onFileChange"
    />
    <van-cell title="头像" is-link center @click="$refs.file.click()">
      <van-image width="30" height="30" round :src="user.photo" fit="cover" />
    </van-cell>
    <van-cell
      title="昵称"
      :value="user.name"
      is-link
      @click="isEditNameShow = true"
    />
    <van-cell
      title="性别"
      :value="user.gender === 1 ? '女' : '男'"
      is-link
      @click="isEditGenderShow = true"
    />
    <van-cell
      title="生日"
      :value="user.birthday"
      is-link
      @click="isEditBirthdayShow = true"
    />
    <!-- 编辑昵称 -->
    <van-popup
      v-model="isEditNameShow"
      :style="{ height: '100%' }"
      position="bottom"
    >
      <update-name
        v-if="isEditNameShow"
        @close="isEditNameShow = false"
        :name="user.name"
        @update-name="onUpdateName"
    /></van-popup>
    <!-- 编辑性别 -->
    <van-popup v-model="isEditGenderShow" position="bottom">
      <update-gender
        @close="isEditGenderShow = false"
        @update-gender="onUpdateGender"
      />
    </van-popup>
    <!-- 编辑生日 -->
    <van-popup v-model="isEditBirthdayShow" position="bottom">
      <!-- v-model="user.birthday"
            :value
            @input
        -->
      <update-birthday
        v-if="isEditBirthdayShow"
        @close="isEditBirthdayShow = false"
        v-model="user.birthday"
      />
    </van-popup>
    <!-- 修改头像 -->
    <van-popup
      v-model="isEditPhotoShow"
      position="bottom"
      :style="{ height: '100%', display: 'flex', alignItems: 'center' }"
    >
      <update-photo
        :file="previewImage"
        @close="isEditPhotoShow = false"
        @update-photo="user.photo = $event"
        v-if="isEditPhotoShow"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/update-name'
import UpdateGender from './components/update-gender'
import UpdateBirthday from './components/update-birthday'
import UpdatePhoto from './components/update-photo'
export default {
  name: 'UserProfile',
  data () {
    return {
      user: {},
      previewImage: null, // 上传预览图片
      isEditNameShow: false,
      isEditGenderShow: false,
      isEditBirthdayShow: false,
      isEditPhotoShow: false
    }
  },
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile () {
      const { data } = await getUserProfile()
      console.log(' data: ', data)
      this.user = data.data
    },
    onUpdateName (name) {
      this.user.name = name
      this.isEditNameShow = false
    },
    onUpdateGender (index) {
      this.user.gender = index
      this.isEditGenderShow = false
    },
    onFileChange () {
      //   console.log('onfilechange')
      this.isEditPhotoShow = true
      const file = this.$refs.file.files[0]
      //   console.log(blob)
      this.previewImage = file
      // 清空file的value解决选择相同文件不触发chang事件
      this.$refs.file.value = ''
    }
  }
}
</script>

<style lang="less" scoped>
.van-popup {
  background-color: #eee;
}
</style>
