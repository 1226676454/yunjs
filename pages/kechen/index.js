// pages/kechen/index.js
import {
    config
} from '../../config.js';
import {
    VenueModel
} from '../../models/venue.js';

let venueModel = new VenueModel();

let app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgUrl: config.base_img_url,
        typeList: [],
        venueList: [],
        sportTypeId: "",
        sortPriceKey: false,
        sortDistanceKey: false,
        total:0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
        
    },
    //选择运动项目
    onShow(){
        let sportTypeId = app.globalData.hotCourse || '';
    
        this.setData({
            venueList: [],
            sportTypeId //默认为(综合)
        })
        this._getSportType(sportTypeId)
        this._getNowData(sportTypeId)
    },
    onHide(){
        app.globalData.hotCourse = null;
        this.setData({
            venueList: [],
            typeList: []
        })
    },
    onLoadMore() {
        let id = this.data.sportTypeId;
        let start = this.data.venueList.length;
        let total = this.data.total;
        if (start >= total) {
            return
        }

        this._getNowData(id)
    },
    onSelectType(e) {
        let id = e.currentTarget.dataset.id; //运动类型Id
        this.setData({
            sportTypeId: id,
            venueList: []
        })
        this._addClass(id);
        this._getNowData(id);
    },
    //搜索
    onSearch(e) {
        let keyWords = e.detail.value.trim();
        if (!keyWords) return;
        console.log(keyWords)
        this.setData({ venueList: [] })
        this._addClass();
        this._getNowData('', '', keyWords)
    },
    onGodetails(e) {
        console.log(e.currentTarget.dataset.item);
        let { id } = e.currentTarget.dataset.item;
        
            wx.navigateTo({
                url: './kechenDetails/index?id=' + id,
            })
        
    },
    //价格排序
    onSortPrice() {
        let { sportTypeId, sortPriceKey } = this.data;
        this.setData({
            sortPriceKey: !sortPriceKey
        })
        if (sortPriceKey) {
            console.log(1)
            this._getNowData(sportTypeId, 1);
        } else {
            console.log(2)
            this._getNowData(sportTypeId, 2);
        }

    },
    //距离排序
    onSortDistance() {
        let { sportTypeId, sortDistanceKey } = this.data;
        this.setData({
            sortDistanceKey: !sortDistanceKey
        })
        if (sortDistanceKey) {
            this._getNowData(sportTypeId, 3);
        } else {
            this._getNowData(sportTypeId, 4);
        }
    },
    //获取运动类型
    _getSportType(id) {
        venueModel.getVenuetype().then(res => {
            let data = res.data.items;
            data.unshift({
                sort: 0,
                sport_type_id:'',
                type: 0,
                typeName: "全部"
            })
            data.forEach(item => {
                if (item.sport_type_id == id){
                    item.isOn = true
                    //this._getNowData(id)
                }else{
                    item.isOn = false
                }               
            })
            this.setData({
                typeList: data
            })
        })
    },
    //获取当前运动项目的场馆
    _getNowData(id = '', num = '', venueName = '') {
        wx.showLoading({
            title: '拼命加载中...',
        })
        let nodecode = wx.getStorageSync('city').nodecode;
        let currentLocation = wx.getStorageSync('currentLocation');
        venueModel.getVenueCourserList({
            lon: currentLocation.longitude,
            lat: currentLocation.latitude,
            sportId: id,
            city: nodecode,
            start: 0,
            limit: 10.,
            types: num,
            venueName
        }).then(res => {
            wx.hideLoading();
            let temArr = this.data.venueList.concat(res.data.items)
            this.setData({
                venueList: temArr,
                total: res.data.total
            })
        })
    },
    //添加选择样式
    _addClass(id) {
        this.data.typeList.forEach(item => {
            if (item.sport_type_id == id) {
                item.isOn = true;
            } else {
                item.isOn = false;
            }
        })
        this.setData({
            typeList: this.data.typeList
        })
    },
})