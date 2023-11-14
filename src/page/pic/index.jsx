import React, { useEffect, useState } from 'react'
import './index.less'
import { useNavigate } from "react-router-dom";
// import { getProducts } from "@/api";


function PicPage() {

    const [products, setProducts] = useState([
        {
            id: 1,
            pic: 'https://ossweb-img.qq.com/images/clientpop/act/lol_1699618824_uploadnewsImg.jpg',
            name: '测试商品',
            stock: '20',
            dec:'商品描述',
        }
    ])

    useEffect(()=>{
        // getProducts().then(res=>{
        //     setProducts(res.data)
        // })
    }, [])

    const navigate = useNavigate();
    return <div className='goods-page'>
        <div className='page-content'>
        <div className='goods-wrap'>
            {
                products.map(item=>{
                    return <div key={item.id} className='goods-item'>
                    <div
                     onClick={()=>{
                        navigate('/goods/detail?id=' + item.id)
                    }} 
                    className='goods-hover'>
                        点击进入详情
                    </div>
                    <img 
                    src={item.pic}
                    onClick={()=>{
                        navigate('/goods/detail?id=' + item.id)
                    }} className='goods-pic'></img>
                    <div className='goods-name'>{item.name}</div>
                    <div className='goods-number'>已售：{item.stock}</div>
                    <div className='goods-dec'>{item.dec}</div>
                </div>
                })
            }
        </div>
        </div>
    </div>
}

export default PicPage