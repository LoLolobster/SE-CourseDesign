var wxCharts = require('../../charts/wxcharts.js');
var app = getApp();
var columnChart = null;
var lineChart = null;
var pieChart = null;
Page({
  data: {
    lineChartData : {},
    columnChartData : {},
    pieChartData : {}
  },

  lineTouchHandler: function (e) {
    console.log(lineChart.getCurrentDataIndex(e));
    lineChart.showToolTip(e, {
      
      format: function (item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },   

  onLoad : function(options){

    let that = this
    
    //从缓存拿要显示的社团的ID
    let clubID = wx.getStorageSync("clubReport")._id
    //调用云函数获取报表数据
    wx.cloud.callFunction({
      name : "getClubReport",
      data : {
        clubID : clubID
      }
    }).then(res => {
      console.log(res)
      that.setData({
        lineChartData : res.result.reportData.lineChartData,
        columnChartData : res.result.reportData.columnChartData,
        pieChartData :res.result.reportData.pieChartData
      })
      //获取屏幕宽度
      var windowWidth = 320;
      try {
        var res = wx.getSystemInfoSync();
        windowWidth = res.windowWidth;
      } catch (e) {
        console.error('getSystemInfoSync failed!');
      }
      /**
       * 成员数量曲线图
      */
      lineChart = new wxCharts({
        canvasId: 'lineCanvas',
        type: 'line',
        categories: that.data.lineChartData.year,
        animation: true,
        series: [{
          name: '社团成员数量',
          data: that.data.lineChartData.memberCount,
          format: function (val, name) {
            return val;
          }
        }],
        xAxis: {
          disableGrid: true
        },
        yAxis: {
          title: '',
          format: function (val) {
            return val;
          },
          min: 0
        },
        width: windowWidth,
        height: 200,
        dataLabel: false,
        dataPointShape: true,
        extra: {
          lineStyle: 'curve'
        }
      });
      
      /**
       * 活动参与人数柱状图
      */
    columnChart = new wxCharts({
      canvasId: 'columnCanvas',
      type: 'column',
      animation: true,
      categories: that.data.columnChartData.activityNames,
      series: [{
        name: '活动参与人数',
        data: that.data.columnChartData.activityMemberCount, //数据
        format: function (val, name) { //每个bar上面的数字显示的格式
          return val;
        }
      }],
      yAxis: {
        format: function (val) {
          return val;
        },
        title: '',
        min: 0
      },
      xAxis: {
        disableGrid: false,
        type: 'calibration'
      },
      extra: {
        column: {
          width: 15
        }
      },
      width: windowWidth,
      height: 200,
    });

    /**
     * 男女比例饼状图
    */
      pieChart = new wxCharts({
        animation: true,
        canvasId: 'pieCanvas',
        type: 'pie',
        series: [{
          name: that.data.pieChartData.genderNames[0],
          data: that.data.pieChartData.genderPartition[0],
        }, {
            name: that.data.pieChartData.genderNames[1],
            data: that.data.pieChartData.genderPartition[1],
        }, {
            name: that.data.pieChartData.genderNames[2],
            data: that.data.pieChartData.genderPartition[2],
        }],
        width: windowWidth,
        height: 300,
        dataLabel: true,
      });



    })

  },

});