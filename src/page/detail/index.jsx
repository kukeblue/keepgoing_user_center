import React, { useEffect, useState } from 'react'
import './index.less'
import {useSearchParams, useNavigate} from "react-router-dom";
import { getProduct } from "@/api"
import { Button, Divider } from 'antd';

function DetailPage() {
    const [product, setProduct] = useState();
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id')
    useEffect(()=>{
        getProduct(id).then(res=> {
            setProduct(res.data.attributes)
        })
    }, [])

    const navigate = useNavigate();

    return <div className='detail-page'>
        { product && <div className='detail-content'>
            <div className='detail-main'>
                <img src={product.pic} className='detail-good-pic'>
                    
                </img>
                <div className='detail-good-info'>
                    <div className='goods-name'>{product.name}</div>
                    <div className='goods-dec'>{product.dec}</div>
                    <div className='goods-number'>库存： {product.stock}</div>
                    <div className='goods-order'>
                        <Button
                        onClick={()=>{
                            navigate('/goods/pay?id=' + id)
                        }}
                        size="large" type='primary'>获取源码</Button>
                    </div>
                </div>
            </div>
            <Divider/>
            <div className='product-detail'>
                <div className='title'>
                    商品详情
                </div>
                <div>
                    {
                        product.detail
                    }
                </div>
            </div>
        </div>}
    </div>
}

export default DetailPage