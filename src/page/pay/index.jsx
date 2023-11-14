import React, { useEffect, useState } from 'react'
import './index.less'
import { useSearchParams, useNavigate } from "react-router-dom";
// import { getProduct, addPay, getQrcodeResult } from "@/api"
import { Button, Descriptions, Divider, Form, Input, Select, message, Modal } from 'antd';
import { objectToFormData } from '@/utils/index'

let interval = null

function formatTime(seconds) {
    // 计算分钟和秒数
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = seconds % 60;
  
    // 格式化输出字符串
    var result = '';
  
    // 补零，如果分钟数小于10，则添加一个零
    if (minutes < 10) {
      result += '0';
    }
    result += minutes + '分';
  
    // 补零，如果秒数小于10，则添加一个零
    if (remainingSeconds < 10) {
      result += '0';
    }
    result += remainingSeconds + '秒';
  
    return result;
  }
  


function PayPage() {
    const [qrCodeData, setQrCodeData] = useState({})
    const [expired, setExpired] = useState(false)
    const [showForm, setShowForm] = useState(true);
    const [payId, setPayId] = useState()
    const [payNum, setPayNum] = useState()
    const [codeUrl, setCodeUrl] = useState()
    const [order, setOrder] = useState({})
    const [outTimeValue, setOutTimeValue] = useState()
    const [isWritePay, setIsWritePay] = useState(true)
    
    const [product, setProduct] = useState({});
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id')

    const navigate = useNavigate();
    useEffect(() => {
        // getProduct(id).then(res => {
        //     setProduct(res.data.attributes)
        // })
    }, [])
    const [form] = Form.useForm();

    const handleSubmit = () => {
        // setShowForm(false)
        const values = form.getFieldsValue()
        const data = {
            nickName: values.nickName,
            money: values.money,
            email: values.email,
            testEmail: '',
            payType: 'Wechat',
            info: values.info,
            custom: false,
            mobile: false,
            device: navigator.userAgent
        }
        const formData = objectToFormData(data);
        addPay(formData).then(res=> {
            // setOrder(data)
            // if(res.code == 200) {
            //     setShowForm(false)
            //     const {
            //         id,
            //         payNum
            //     } = res.result
            //     setPayId(id)
            //     setPayNum(payNum)
            //     setCodeUrl(`http://localhost:8888/assets/qr/wechat/${values.money}/${payNum}.png`)
            //     getWeiXinScranCode(id)
            // }else {
            //     message.warning(res.message)
            // }
        })
    }

    const getWeiXinScranCode = (id)=>{
        setIsWritePay(true)
        let outTime = 0
        interval = setInterval(()=>{
            if(outTime == 120) {
                clearInterval(interval)
                setExpired(true)
                return
            }if(outTime == 30) {
                setIsWritePay(false)  
            }
            outTime = outTime + 1
            setOutTimeValue(formatTime(120 - outTime))
            // getQrcodeResult(id).then(res=>{
            //     console.log(res)
            //     if(res.result == 1) {
            //         clearInterval(interval)
            //         navigate('/goods/result')
            //     }
            // })
            }, 1000)
    }

    return <div className='pay-page'>
        <div className='pay-content'>
            {/* 表单填写 */}
            {showForm && <div className='pay-form'>
                <div className='pay-form-title'>
                    填写邮箱自动发送源码
                </div>
                {/* <div className='flex-center'> */}
                {/* <div className='pay-name'>您的源码</div> */}
                {/* </div> */}
                {/* <div>填写您的名称</div>
                <div>填写邮箱发送</div>
                <div>备注</div>
                <div>支付方式</div> */}
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    form={form}
                // initialValues={{ layout: formLayout }}
                // onValuesChange={onFormLayoutChange}
                >
                    {/* <Form.Item label="Form Layout" name="layout">
                        <Radio.Group >
                            <Radio.Button value="horizontal">Horizontal</Radio.Button>
                            <Radio.Button value="vertical">Vertical</Radio.Button>
                            <Radio.Button value="inline">Inline</Radio.Button>
                        </Radio.Group>
                    </Form.Item> */}
                    <Form.Item label="源码">
                        <div className='flex'>
                            <img src={product.pic} className='pay-pic'>
                            </img>
                            <div>{product.name}</div>
                        </div>
                    </Form.Item>
                    <Form.Item  name="nickName" label="您的称呼">
                        <Input placeholder="填写您的称呼" />
                    </Form.Item>
                    <Form.Item  name="email" label="收货邮箱">
                        <Input placeholder="填写您的名称" />
                    </Form.Item>
                    <Form.Item
                        name="info"
                        label="备注">
                        <Input placeholder="请输入备注" />
                    </Form.Item>
                    <Form.Item
                        name="money"
                        label="捐赠金额">
                        <Select
                            placeholder="请选择捐赠金额"
                            allowClear
                        >
                            <Option value="10.00">10.00</Option>
                            <Option value="20.00">20.00</Option>
                            <Option value="50.00">50.00</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="支付方式">
                        <img src="https://upload.cyuandao.com/2023071216183348928.png" className='wei-pay' />
                    </Form.Item>
                    <div className='flex-center'>
                        <Button onClick={() => { handleSubmit() }} size='large' type='primary'>提交</Button>

                    </div>
                </Form>

            </div>}
            {!showForm && <div className='pay-form'>
                <div>
                    <Descriptions title="微信扫码支付">
                        <Descriptions.Item label="用户">{order.nickName}</Descriptions.Item>
                        <Descriptions.Item label="邮箱">{order.email}</Descriptions.Item>
                        <Descriptions.Item label="源码">{product.name}</Descriptions.Item>
                        <Descriptions.Item label="捐赠金额">{order.money}</Descriptions.Item>
                        <Descriptions.Item label="备注">{order.info}</Descriptions.Item>
                        <Descriptions.Item label="订单号">{payId}</Descriptions.Item>
                    </Descriptions>
                    <div className='pay-info'>
                        <div className='flex-center'>
                            <img src="https://upload.cyuandao.com/2023071216183348928.png" className='wei-pay_res' />
                            
                        </div>
                        <div className='flex-center'>
                            <div className='scran-tip'>&nbsp;&nbsp;&nbsp;扫一扫付款（元）</div>
                        </div>
                        <div className='flex-center'>
                            <div className='scran-money'>{order.money || '10.00'}</div>
                        </div>
                        <div className='flex-center'>
                            <div className='pay-code-wrap'>
                                <img src={codeUrl} className='pay-code' />
                                {expired && <div className='overtime-item'>
                                    <span>二维码已失效</span>
                                </div>}
                            </div>
                        </div>
                        <div className='flex-center'>
                            <img src='https://upload.cyuandao.com/2023071308324680308.png' className='pay-scran' />
                        </div>
                        <br/>
                        <div className='pay-tip flex-center'>
                            支付倒计时-{outTimeValue}
                        </div>
                        <Divider/>
                        <div className='pay-finish'>
                            {!isWritePay && <Button
                            onClick={()=>{
                                navigate('/goods/result')
                            }}
                            disabled={expired}
                            type='primary'>{
                                    expired ? '二维码过期' : '支付完成'
                            }</Button>}
                            {isWritePay && <Button
                            disabled={true}
                            type='primary'>
                                等待支付...
                            </Button>}
                        </div>
                    </div>
                </div>
            </div>}
        </div>

    </div>
}

export default PayPage