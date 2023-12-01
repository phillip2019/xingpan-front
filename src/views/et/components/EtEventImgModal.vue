<template>
  <Image :preview="{ visible: false }" :width="40" :src="firstImg" @click="visible = true" />
  <div style="display: none">
    <ImagePreviewGroup :preview="{ visible, onVisibleChange: (vis) => (visible = vis) }">
      <Image v-for="(item, index) in imgList" :key="index" :src="item" @click="showImgPreview(index)" />
    </ImagePreviewGroup>
  </div>
</template>
<script lang="ts">
  import { Image, ImagePreviewGroup } from 'ant-design-vue';
  import { defineComponent, ref } from 'vue';
  import { propTypes } from '/@/utils/propTypes';
  import { getFileAccessHttpUrl } from '/@/utils/common/compUtils';
  //第一种获取target值的方式，通过vue中的响应式对象可使用toRaw()方法获取原始对象
  import { toRaw } from '@vue/reactivity';
  const currentImgIndex = ref(0);
  const visible = ref(false);
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
      let imgs: Array<string> = [];
      const sourceImgArr = toRaw(props.value);
      let item: any;
      for (let index in sourceImgArr) {
        item = sourceImgArr[index];
        imgs.push(getFileAccessHttpUrl(item.screenshot));
      }
      return {
        visible: visible,
        firstImg: imgs[0],
        imgList: imgs,
        getFileAccessHttpUrl,
        showImgPreview: function (index: number) {
          currentImgIndex.value = index;
        },
      };
    },
  });
</script>
