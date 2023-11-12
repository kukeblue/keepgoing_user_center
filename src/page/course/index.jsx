import React, { useEffect, useState } from 'react'
import './index.less'
import { Divider, List, Typography } from 'antd';
import { useNavigate } from "react-router-dom";


const data = [
    '【Python梦幻西游】(一)环境搭建·工具类封装',
    '【Python梦幻西游】(二)游戏窗口类封装',
    '【Python梦幻西游】(三)游戏窗口类高级操作封装',
    '【Python梦幻西游】(四)游戏方法封装-全地图导航',
    '【Python梦幻西游】(五)游戏方法封装-战斗相关',
];

function CoursePage() {

    useEffect(() => {

    }, [])

    const navigate = useNavigate();


    return <div className='course-page'>
        <div className='page-content'>
            <List
                header={<div>课程列表</div>}
                footer={<div>作者：kuke</div>}
                bordered
                dataSource={data}
                renderItem={(item, index) => (
                    <List.Item>
                        <div className='flex'>
                            <Typography.Text mark>[基础]</Typography.Text>
                            <div onClick={() => {
                                navigate('/course/course-detail?id=' + (index+1))
                            }} className='page-link'>{item}</div>
                        </div>
                    </List.Item>
                )}
            />
        </div>
    </div>
}

export default CoursePage