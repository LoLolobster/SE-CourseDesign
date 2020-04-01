Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabTxt: ['社团类型', '社团人数', '评分'],//分类
    tab: [true, true, true],
    typeList: [{ 'id': '1', 'title': '运动类社团' }, { 'id': '1', 'title': '文艺类社团' }],
    type_id: 0,//类型
    type_txt: '',
    number_id: 0,//人数
    number_txt: '',
    score_id: 0,//评分
    score_txt: '',
    details: [
      {
        img: '/images/文学社.jpg',
        number: '73',
        score: '98',
        title: '文学社',
        world: [
          {
            message: '热门社团',
          },
          {
            message: '好评社团'
          }
        ]
      },
      {
        img: '/images/电竞社.jpg',
        number: '58',
        score: '95',
        title: '电竞社',
        world: [
          {
            message: '热门社团',
          },
          {
            message: '好评社团'
          }
        ]
      },
      {
        img: '/images/音乐社.jpg',
        number: '185',
        score: '99',
        title: '音乐社',
        world: [
          {
            message: '热门社团',
          },
          {
            message: '好评社团'
          }
        ]
      },
      {
        img: '/images/家里蹲社.jpg',
        number: '1',
        score: '60',
        title: '家里蹲社',
        
      }

    ],
  },

  // 选项卡
  filterTab: function (e) {
    var data = [true, true, true], index = e.currentTarget.dataset.index;
    data[index] = !this.data.tab[index];
    this.setData({
      tab: data
    })
  },

  //筛选项点击操作
  filter: function (e) {
    var self = this, id = e.currentTarget.dataset.id, txt = e.currentTarget.dataset.txt, tabTxt = this.data.tabTxt;
    switch (e.currentTarget.dataset.index) {
      case '0':
        tabTxt[0] = txt;
        self.setData({
          tab: [true, true, true],
          tabTxt: tabTxt,
          type_id: id,
          type_txt: txt
        });
        break;
      case '1':
        tabTxt[1] = txt;
        self.setData({
          tab: [true, true, true],
          tabTxt: tabTxt,
          number_id: id,
          number_txt: txt
        });
        break;
      case '2':
        tabTxt[2] = txt;
        self.setData({
          tab: [true, true, true],
          tabTxt: tabTxt,
          score_id: id,
          score_txt: txt
        });
        break;
    }
    //数据筛选
    self.getDataList();
  },

  //加载数据
  getDataList: function () {
    //调用数据接口，获取数据


  }

})
