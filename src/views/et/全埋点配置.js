is_track_single_page: function () {
      return {
        $title: document.title,
      }
    }, // 单页面配置，默认开启，若页面中有锚点设计，需要将该配置删除，否则触发锚点会多触发 $pageview 事件
    use_client_time: true,
    send_type: 'beacon',
    show_log: true,
    heatmap: {
      track_attr: ['cgBtnModel1', 'cgBtnModel2', 'cgBtn', 'cgData', 'cgUrl'],
      //是否开启点击图，default 表示开启，自动采集 $WebClick 事件，可以设置 'not_collect' 表示关闭。
      clickmap: 'default',
      collect_tags: {
        div: {
            // 默认是 1，即只支持叶子 div。可配置范围是 [1, 2, 3],非该范围配置值，会被当作 1 处理。
            max_level: 3
        },
        li: true,
        img: true,
        svg: true
      },
      get_vtrack_config: true,
      loadTimeout: 4 * 1000,
      //是否开启触达注意力图，not_collect 表示关闭，不会自动采集 $WebStay 事件，可以设置 'default' 表示开启。
      scroll_notice_map: 'default',
      scroll_delay_time: 4 * 1000,
      scroll_event_duration: 18 * 1000, //单位秒，预置属性停留时长 event_duration 的最大值。默认5个小时，也就是300分钟，18000秒。
      custom_property: function (element_target) {
        return {
          $element_id: element_target.id,
          $element_content: element_target.innerText,
          $element_name: element_target.nodeName,
          $element_class_name: element_target.className,
          $element_type: element_target.nodeType,
          $element_selector: '', // 元素选择器
          $element_target_url: element_target.getAttribute('target'),
          $url: location.href,
          $title: document.title,
          $url_path: location.pathname,
          $viewport_width: element_target.clientWidth
        }
      },
      device_id
    }
  })
  sensors.registerPage({
    platform_type: 'pc',
    platform_lang: 'zh',
    platform_site: 'china',
  })