import React from 'react'

//! IconTypes
import IconBug from './iconsTypes/IconBug'
import IconDark from './iconsTypes/IconDark'
import IconDragon from './iconsTypes/IconDragon'
import IconElectric from './iconsTypes/IconElectric'
import IconFairy from './iconsTypes/IconFairy'
import IconFigthing from './iconsTypes/IconFigthing'
import IconFire from './iconsTypes/iconFire'
import IconFlying from './iconsTypes/IconFliying'
import IconGhost from './iconsTypes/IconGhost'
import IconGrass from './iconsTypes/IconGrass'
import IconGround from './iconsTypes/IconGround'
import IconIce from './iconsTypes/IconIce'
import IconNormal from './iconsTypes/IconNormal'
import IconPoison from './iconsTypes/IconPoison'
import IconPsychic from './iconsTypes/IconPsychic'
import IconRock from './iconsTypes/IconRock'
import IconSteel from './iconsTypes/IconSteel'
import IconWater from './iconsTypes/IconWater'
import { variables } from '../../../assets/variables'

function SelectorIconTypeMini({type,color}) {
  return (
    <div className='content-icon-selector-mini'>
        {type===variables.types[1]&&(<IconBug fill={color}/>)}
        {type===variables.types[2]&&(<IconDark fill={color}/>)}
        {type===variables.types[3]&&(<IconDragon fill={color}/>)}
        {type===variables.types[4]&&(<IconElectric fill={color}/>)}
        {type===variables.types[5]&&(<IconFairy fill={color}/>)}
        {type===variables.types[6]&&(<IconFigthing fill={color}/>)}
        {type===variables.types[7]&&(<IconFire fill={color}/>)}
        {type===variables.types[8]&&(<IconFlying fill={color}/>)}
        {type===variables.types[9]&&(<IconGhost fill={color}/>)}
        {type===variables.types[10]&&(<IconGrass fill={color}/>)}
        {type===variables.types[11]&&(<IconGround fill={color}/>)}
        {type===variables.types[12]&&(<IconIce fill={color}/>)}
        {type===variables.types[13]&&(<IconNormal fill={color}/>)}
        {type===variables.types[14]&&(<IconPoison fill={color}/>)}
        {type===variables.types[15]&&(<IconPsychic fill={color}/>)}
        {type===variables.types[16]&&(<IconRock fill={color}/>)}
        {type===variables.types[17]&&(<IconSteel fill={color}/>)}
        {type===variables.types[18]&&(<IconWater fill={color}/>)}
    </div>
  )
}

export default SelectorIconTypeMini