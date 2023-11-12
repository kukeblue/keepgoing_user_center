import { Children, useEffect, useState, useMemo } from 'react'
import './DefaultLayout.less'
import { getIsWechat } from '../utils/index'
import useAuthStore from '@/store/authStore'
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Outlet } from 'react-router-dom';
import { Modal, Breadcrumb, Button } from 'antd';

import {
    BehanceOutlined,
    IdcardOutlined,
    AppstoreOutlined,
    EditOutlined,
    FormOutlined,
    HeartOutlined,
    CodeSandboxOutlined,
    ReadOutlined
    
  } from '@ant-design/icons';

const TabPic = {
    chatActive: "https://upload.cyuandao.com/2023060414530959065.png",
    chat: "https://upload.cyuandao.com/2023060414540270365.png",
    application: "https://upload.cyuandao.com/2023060415045618748.png",
    applicationActive: "https://upload.cyuandao.com/2023060415034687154.png",
    pic: "https://upload.cyuandao.com/2023060509091025094.png",
    picActive: "https://upload.cyuandao.com/2023060509103559980.png",
    creation: "https://upload.cyuandao.com/2023060509120974252.png",
    creationActive: "https://upload.cyuandao.com/2023060509121992859.png",
    my: "https://upload.cyuandao.com/2023060509123210046.png",
    myActive: "https://upload.cyuandao.com/2023060509124225729.png"
}

const pageData = ["index", "course", "about",  "creation", 'draw', "my"]

function BottomTab() {
    const href = location.href
    const index = pageData.findIndex(item => {
        return href.includes(item)
    })
    const navigate = useNavigate();
    return index > -1 && <div className='bottom-tab'>
        <div
            onClick={() => navigate("/")}
            className='bottom-tab-item'>
            <CodeSandboxOutlined style={{marginTop: 4, fontSize: 19, color: index == 0? '#007aff':'#ccc'}} className='navigation-menu-item-img'/>
            {/* <img src={index == 0 ? TabPic.chatActive : TabPic.chat} className='bottom-tab-item-pic' /> */}
            <div className={index == 0 ? 'bottom-tab-item-text_active' : 'bottom-tab-item-text'} >聊天</div>
        </div>
        <div 
            onClick={() => navigate("/bing")}
            className='bottom-tab-item'>
            <BehanceOutlined style={{fontSize: 23, color: index == 1? '#007aff':'#ccc'}} className='navigation-menu-item-img'/>
            {/* <img src={index == 1 ? TabPic.chatActive : TabPic.chat} className='bottom-tab-item-pic' /> */}
            <div className={index == 1 ? 'bottom-tab-item-text_active' : 'bottom-tab-item-text'}>必应</div>
        </div>
        <div 
            onClick={() => navigate("/application")}
            className='bottom-tab-item'>
            <AppstoreOutlined style={{marginTop: 2, fontSize: 22, color: index == 2? '#007aff':'#ccc'}} className='navigation-menu-item-img'/>
            <div className={index == 2 ? 'bottom-tab-item-text_active' : 'bottom-tab-item-text'}>应用</div>
        </div>
        <div 
            onClick={() => navigate("/creation")}
            className='bottom-tab-item'>
            <FormOutlined style={{marginTop: 2,fontSize: 21, color: index == 3? '#007aff':'#ccc'}} className='navigation-menu-item-img'/>
            {/* <img src={index == 3 ? TabPic.creationActive : TabPic.creation} className='bottom-tab-item-pic' /> */}
            <div className={index == 3 ? 'bottom-tab-item-text_active' : 'bottom-tab-item-text'}>写作</div>
        </div>
        <div 
            onClick={() => navigate("/draw")}
            className='bottom-tab-item'>
            <img src={index == 4 ? TabPic.picActive : TabPic.pic} className='bottom-tab-item-pic' />
            <div className={index == 4 ? 'bottom-tab-item-text_active' : 'bottom-tab-item-text'}>绘图</div>
        </div>
        <div
            onClick={() => navigate("/my")}
            className='bottom-tab-item'>
            <img src={index == 5 ? TabPic.myActive : TabPic.my} className='bottom-tab-item-pic' />
            <div className={index == 5 ? 'bottom-tab-item-text_active' : 'bottom-tab-item-text'}>我的</div>
        </div>
    </div>
}

let interval = null

function Header() {
    const navigate = useNavigate();
    const routerLocation = useLocation();
    let indexPage = {title:<div className='link' onClick={()=>navigate('/', { replace: true })}>首页</div>}
    let detailPage = {title:<div className='link'>商品详情</div>}
    let payPage = {title:<div className='link'>支付页面</div>}
    let aboutPage = {title:<div className='link'>关于</div>}
    let coursePage = {title:<div className='link'>教程</div>}
    let courseDetailPage = {title:<div className='link'>教程详情</div>}

    let breadcrumbs = []
    let arr = location.pathname.split('/')
    let lastPath = arr[arr.length - 1];
    if(lastPath == 'pay') {
        breadcrumbs = [indexPage, detailPage, payPage]
    }else if(lastPath == 'detail') {
        breadcrumbs = [indexPage, detailPage]
    }else if(lastPath == 'about') {
        breadcrumbs = [aboutPage]
    }else if(lastPath == 'course') {
        breadcrumbs = [coursePage]
    }else if(lastPath == 'course-detail') {
        breadcrumbs = [coursePage, courseDetailPage]
    }
    
    else {
        breadcrumbs = [indexPage]
    }



    useEffect(() => {
        console.log('Location changed!', location.pathname);
    }, [routerLocation]);
    const userInfo = useAuthStore((state) => state.userInfo)
    const getIsVip = useAuthStore((state) => state.getIsVip)
    return <div className='layout-header'>
        <div className='layout-left'>
            <Breadcrumb
                items={breadcrumbs}
            />
        </div>
        <div className='layout-right'>
            <div 
            onClick={()=>{
                navigate("/login")
            }}
            className='login-button' type='link'>登录</div>
            <div 
            onClick={()=>{
                navigate("/register")
            }}
            className='register-button' type='link'>注册</div>
        </div>
    </div>

}

function Navigation() {
    const href = location.href
    const navigationIndex = pageData.findIndex(item => {
        return href.includes(item)
    })
    const navigate = useNavigate();
    return <div className='navigation_left'>
        <img src='https://upload.cyuandao.com/2023072000320494658.png' className='app-log'></img>
        <div className='app-name'>kuke的虚拟店铺</div>
        <div className='navigation-menu'>
            <div 
            onClick={() => navigate("/index")}
            className={'navigation-menu-item ' + (navigationIndex == 0 ? 'navigation-menu-item_active' : '')}>
                <CodeSandboxOutlined style={{fontSize: 23}} className='navigation-menu-item-img'/>
                <div className='navigation-menu-item-text'>
                    首页
                </div>
            </div>
            <div 
            onClick={() => navigate("/course")}
            
            className={'navigation-menu-item ' + (navigationIndex == 1 ? 'navigation-menu-item_active' : '')}>
                <ReadOutlined style={{fontSize: 23}} className='navigation-menu-item-img'/>
                <div className='navigation-menu-item-text'>
                    教程
                </div>
            </div>
            <div 
            onClick={() => navigate("/about")}
            className={'navigation-menu-item ' + (navigationIndex == 2 ? 'navigation-menu-item_active' : '')}>
                <IdcardOutlined style={{fontSize: 23}} className='navigation-menu-item-img'/>
                <div className='navigation-menu-item-text'>
                    作者
                </div>
            </div>
        </div>
       
        <div className='menu-line'></div>
        <div 
        onClick={()=>{
            // navigate('/vip')
        }}
        className='vip-update-menu'>
            <img className='vip-update-menu-icon' src='
            https://upload.cyuandao.com/_nuxt/black-update-vip-plus7.svg
            '></img>
            欢迎光临
        </div>
    </div>
}

let notLayoutPages = ['appliction-detail', 'about', 'clear']
let isInit = false
function DefaultLayout(props) {
    const isAuthPage = location.href.includes('login') || location.href.includes('register')
    const isWechat = getIsWechat()
    const setUser = useAuthStore((state) => state.setUser)
    const setUserInfo = useAuthStore((state) => state.setUserInfo)
    const isNotLayout = !!notLayoutPages.find(item=>location.href.includes(item))
    
    return isAuthPage ? <div className='app-layout'> <Outlet /> </div> : <div className='app-layout'>
        {!isNotLayout && <Navigation></Navigation>}
        <div className='app-layout-right'>
            {!isNotLayout && <Header></Header>}
            <Outlet />
        </div>
        <BottomTab></BottomTab>
    </div>
}

export default DefaultLayout;