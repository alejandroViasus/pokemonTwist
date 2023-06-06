import React from 'react'
import { dataBaseImages } from '../../../assets/variables';

function InfoCard({info,index}) {

    let horizontal="0%";
    let vertical="7.5%";
    let left= "6%";
    
    if(index%2==1){
        horizontal="61%";
        vertical="17.5%";
        left= "46%";
    }

    console.log("index", index%2)

  return (
    <div className='content-infoCard'>
        <div className="base-card" style={{top:`${vertical}`}}>
           <div className="info-text"  style={{left:`${left}`}}>
            <div className="title">{info.title}</div>
            <div className="text">{info.text}</div>
           </div>
        </div>
        <img src={info.image} alt="" style={{right:`${horizontal}`}}/>
        <img src={dataBaseImages.official.default(info.pokemon)} alt="" style={{right:`${horizontal}`}}/>
    </div>
  )
}

export default InfoCard