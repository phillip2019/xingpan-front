<template>
  <Image :preview="{ visible: false }" :width="40" :src="firstImg" @click="handlePreview" />
  <div style="display: none">
    <ImagePreviewGroup :preview="{ visible, onVisibleChange: handleVisibleChange, current: currentIndex }">
      <Image v-for="(item, index) in imgList" :key="index" :src="item" />
    </ImagePreviewGroup>
  </div>
</template>
<script lang="ts">
  import { Image, ImagePreviewGroup } from 'ant-design-vue';
  import { defineComponent, ref } from 'vue';
  import { propTypes } from '/@/utils/propTypes';
  import { getFileAccessHttpUrl } from '/@/utils/common/compUtils';
  import { toRaw } from '@vue/reactivity';

  export default defineComponent({
    name: 'EtEventImgModal',
    components: {
      Image,
      ImagePreviewGroup,
    },
    props: {
      value: propTypes.oneOfType([propTypes.array]),
    },
    setup(props) {
      const visible = ref(false);
      const currentIndex = ref(0);
      let imgs: Array<string> = [];
      const sourceImgArr = toRaw(props.value);
      for (let index in sourceImgArr) {
        const item = sourceImgArr[index];
        imgs.push(getFileAccessHttpUrl(item.screenshot));
      }

      const handlePreview = () => {
        currentIndex.value = 0;
        visible.value = true;
      };

      const handleVisibleChange = (vis: boolean) => {
        visible.value = vis;
      };

      return {
        visible,
        currentIndex,
        firstImg: imgs[0],
        imgList: imgs,
        handlePreview,
        handleVisibleChange,
      };
    },
  });
</script>
