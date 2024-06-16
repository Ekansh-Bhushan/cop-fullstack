import React from 'react'
import './Dashboard.css';

import Header  from '../components/Header/header'

export default function Dashboard() {


  return (
    <>
<Header/>
    <div className='container'>
        <div className='leftwalbox'>
<div className='box1' ></div>
<div className='box2'></div>
<div className='box3'></div>
<div className='box4'></div>
</div>
<div className='rwalabox'>
<div className='r1'></div>
<div className='r1'></div>
</div>

    </div>

  </>
  )
}
