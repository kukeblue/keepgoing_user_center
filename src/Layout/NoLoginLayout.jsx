import { Children, useEffect, useState, useMemo } from 'react'
import './DefaultLayout.less'
import { Outlet } from 'react-router-dom';



function NoLoginLayout(props) {
    return <div className='app-layout'> 
        <Outlet />
    </div>
}

export default NoLoginLayout;