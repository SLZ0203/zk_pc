/*
* 定义接口请求函数的模块
* */
import ajax from './ajax'
//获取轮播图
export const reqNavs = () => ajax('http://yixin.581vv.com/api/get_navs');
//获取网站基本配置信息
export const reqConfig = () => ajax('http://yixin.581vv.com/api/config');

