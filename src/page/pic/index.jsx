import React, { useEffect, useState } from 'react'
import './index.less'
import { useNavigate } from "react-router-dom";
import { getProducts } from "@/api";


function PicPage() {

    const [products, setProducts] = useState([])

    useEffect(()=>{
        getProducts().then(res=>{
            setProducts(res.data)
        })
    }, [])

    const navigate = useNavigate();
    return <div className='goods-page'>
        <div className='page-content'>
        <div className='goods-wrap'>
            {
                products.map(item=>{
                    return <div key={item.id} className='goods-item'>
                    <img 
                    src={item.attributes.pic}
                    onClick={()=>{
                        navigate('/goods/detail?id=' + item.id)
                    }} className='goods-pic'></img>
                    <div className='goods-name'>{item.attributes.name}</div>
                    <div className='goods-number'>库存：{item.attributes.stock}</div>
                    <div className='goods-dec'>{item.attributes.dec}</div>
                </div>
                })
            }
        </div>
        </div>
    </div>
}

export default PicPage