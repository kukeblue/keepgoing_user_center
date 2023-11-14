import React, { useEffect, useState } from 'react'
import './index.less'
import { useSearchParams, useNavigate } from "react-router-dom";
// import { getProduct } from "@/api"
import { Button, Divider, Modal, Form, Input, Select } from 'antd';


function PayModal({
    isModalOpen,
    setIsModalOpen,
}) {

    const [showQrCode, setShowQrCode] = useState(false)

    const product = {}
    const order = {}
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = () => {
        // setShowForm(false)
        // const values = form.getFieldsValue()
        // const data = {
        //     nickName: values.nickName,
        //     money: values.money,
        //     email: values.email,
        //     testEmail: '',
        //     payType: 'Wechat',
        //     info: values.info,
        //     custom: false,
        //     mobile: false,
        //     device: navigator.userAgent
        // }
        // const formData = objectToFormData(data);
        setShowQrCode(true)
        // addPay(formData).then(res => {
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
        // })
    }
    return (
        <>
            <Modal width={670} title={""} centered={true} footer={false} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                {!showQrCode && <div className='pay-form'>
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
                            <br />
                            <div className='pay-tip flex-center'>
                                支付倒计时-{outTimeValue}
                            </div>
                            <Divider />
                            <div className='pay-finish'>
                                {!isWritePay && <Button
                                    onClick={() => {
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

                {showQrCode == false && <div className='pay-form'>
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
                        <Form.Item name="nickName" label="您的称呼">
                            <Input placeholder="填写您的称呼" />
                        </Form.Item>
                        <Form.Item name="email" label="收货邮箱">
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
                </div>
                }
            </Modal>
        </>
    );


}

function DetailPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [product, setProduct] = useState({
        name: "测试商品名称",
        dec: "商品描述",
        stock: 0,
        pic: 'https://ossweb-img.qq.com/images/clientpop/act/lol_1699618824_uploadnewsImg.jpg'
    });
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id')
    useEffect(() => {
        // getProduct(id).then(res=> {
        //     setProduct(res.data.attributes)
        // })
    }, [])

    const navigate = useNavigate();

    return <div className='detail-page'>
        <PayModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}></PayModal>
        {product && <div className='detail-content'>
            <div className='detail-main'>
                <img src={product.pic} className='detail-good-pic'>

                </img>
                <div className='detail-good-info'>
                    <div className='goods-name'>{product.name}</div>
                    <div className='goods-dec'>{product.dec}</div>
                    <div className='goods-number'>已售： {product.stock}</div>
                    <div className='goods-order'>
                        <Button
                            onClick={() => {
                                setIsModalOpen(true)
                                // navigate('/goods/pay?id=' + id)
                            }}
                            size="large" type='primary'>获取源码</Button>
                    </div>
                </div>
            </div>
            <Divider />
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