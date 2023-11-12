import React, { useEffect, useState } from 'react'
import './index.less'
import {useSearchParams, useNavigate} from "react-router-dom";
import { getProduct } from "@/api"
import { Button, Result } from 'antd';


function ResultPage() {
    const navigate = useNavigate();
    return <div className='result-page'>
        <div className='result-content'>
            <Result
            status="success"
            title="恭喜您支付成功，请等待1 ~ 5分钟系统确认"
            subTitle="总共花费 ￥10.00 元"
            extra={[
            <Button onClick={()=>{
                navigate('/', {replace: true})
            }} type="primary" key="console">
                返回
            </Button>,
            ]}
        />
        </div>
        
    </div>
}

export default ResultPage