<template>
  <Image :preview="{ visible: false }" :width="40" :src="firstImg" @click="handlePreview" />
  <div style="display: none">
    <ImagePreviewGroup v-if="shouldShow" :preview="{ visible, onVisibleChange: handleVisibleChange }">
      <Image v-for="(item, index) in imgList" :key="index" :src="getFileAccessHttpUrl(item.screenshot)" />
    </ImagePreviewGroup>
  </div>
</template>
<script lang="ts">
  import { Image, ImagePreviewGroup } from 'ant-design-vue';
  import { computed, defineComponent, ref } from 'vue';
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
      const shouldShow = ref(false);
      
      // 直接使用原始数组，不进行URL转换
      const imgList = computed(() => toRaw(props.value) || []);
      const firstImg = computed(() => {
        const firstItem = imgList.value[0] || {};
        return getFileAccessHttpUrl(firstItem?.screenshot || '');
      });

      const handlePreview = () => {
        shouldShow.value = true;
        visible.value = true;
      };

      const handleVisibleChange = (vis: boolean) => {
        visible.value = vis;
        if (!vis) {
          setTimeout(() => {
            shouldShow.value = false;
          }, 100);
        }
      };

      return {
        visible,
        shouldShow,
        firstImg,
        imgList,
        handlePreview,
        handleVisibleChange,
        getFileAccessHttpUrl,
      };
    },
  });
</script>
