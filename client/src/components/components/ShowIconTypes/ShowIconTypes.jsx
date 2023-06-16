import React from 'react'
import icon_img_bug from '../../../assets/svg/icons/type-bug.svg';
import icon_img_dark from '../../../assets/svg/icons/type-dark.svg';
import icon_img_dragon from '../../../assets/svg/icons/type-dragon.svg';
import icon_img_electric from '../../../assets/svg/icons/type-electric.svg';
import icon_img_fairy from '../../../assets/svg/icons/type-fairy.svg';
import icon_img_figthing from '../../../assets/svg/icons/type-figthing.svg';
import icon_img_fire from '../../../assets/svg/icons/type-fire.svg';
import icon_img_flying from '../../../assets/svg/icons/type-fliying.svg';
import icon_img_ghost from '../../../assets/svg/icons/type-ghost.svg';
import icon_img_grass from '../../../assets/svg/icons/type-grass.svg';
import icon_img_ground from '../../../assets/svg/icons/type-ground.svg';
import icon_img_ice from '../../../assets/svg/icons/type-ice.svg';
import icon_img_normal from '../../../assets/svg/icons/type-normal.svg';
import icon_img_poison from '../../../assets/svg/icons/type-poison.svg';
import icon_img_psychic from '../../../assets/svg/icons/type-psychic.svg';
import icon_img_rock from '../../../assets/svg/icons/type-rock.svg';
import icon_img_steel from '../../../assets/svg/icons/type-steel.svg';
import icon_img_water from '../../../assets/svg/icons/type-water.svg';
//! IconTypes


import { variables } from '../../../assets/variables';


function ShowIconTypes({ infoPokemon, color }) {

    const types = infoPokemon.types.split(",");
    const type = variables.types[types[0]];
    const type2 = variables.types[types[1]] || variables.types[types[0]];

    console.log(type, type2)

    console.log("types", types, type, type2)
    return (
        <div className='content-show-icon-selector'>

            <div className="type-icon-show">
                { type && (
                    <div className="box">
                        {type === variables.types[1] && (<img className='img-type-icon' src={icon_img_bug} alt="" />)}
                        {type === variables.types[2] && (<img className='img-type-icon' src={icon_img_dark} alt="" />)}
                        {type === variables.types[3] && (<img className='img-type-icon' src={icon_img_dragon} alt="" />)}
                        {type === variables.types[4] && (<img className='img-type-icon' src={icon_img_electric} alt="" />)}
                        {type === variables.types[5] && (<img className='img-type-icon' src={icon_img_fairy} alt="" />)}
                        {type === variables.types[6] && (<img className='img-type-icon' src={icon_img_figthing} alt="" />)}
                        {type === variables.types[7] && (<img className='img-type-icon' src={icon_img_fire} alt="" />)}
                        {type === variables.types[8] && (<img className='img-type-icon' src={icon_img_flying} alt="" />)}
                        {type === variables.types[9] && (<img className='img-type-icon' src={icon_img_ghost} alt="" />)}
                        {type === variables.types[10] && (<img className='img-type-icon' src={icon_img_grass} alt="" />)}
                        {type === variables.types[11] && (<img className='img-type-icon' src={icon_img_ground} alt="" />)}
                        {type === variables.types[12] && (<img className='img-type-icon' src={icon_img_ice} alt="" />)}
                        {type === variables.types[13] && (<img className='img-type-icon' src={icon_img_normal} alt="" />)}
                        {type === variables.types[14] && (<img className='img-type-icon' src={icon_img_poison} alt="" />)}
                        {type === variables.types[15] && (<img className='img-type-icon' src={icon_img_psychic} alt="" />)}
                        {type === variables.types[16] && (<img className='img-type-icon' src={icon_img_rock} alt="" />)}
                        {type === variables.types[17] && (<img className='img-type-icon' src={icon_img_steel} alt="" />)}
                        {type === variables.types[18] && (<img className='img-type-icon' src={icon_img_water} alt="" />)}
                    </div>
                )}



                {type2 !== type && (
                    <div className="box">
                        {type2 === variables.types[1] && (<img className='img-type-icon' src={icon_img_bug} alt="" />)}
                        {type2 === variables.types[2] && (<img className='img-type-icon' src={icon_img_dark} alt="" />)}
                        {type2 === variables.types[3] && (<img className='img-type-icon' src={icon_img_dragon} alt="" />)}
                        {type2 === variables.types[4] && (<img className='img-type-icon' src={icon_img_electric} alt="" />)}
                        {type2 === variables.types[5] && (<img className='img-type-icon' src={icon_img_fairy} alt="" />)}
                        {type2 === variables.types[6] && (<img className='img-type-icon' src={icon_img_figthing} alt="" />)}
                        {type2 === variables.types[7] && (<img className='img-type-icon' src={icon_img_fire} alt="" />)}
                        {type2 === variables.types[8] && (<img className='img-type-icon' src={icon_img_flying} alt="" />)}
                        {type2 === variables.types[9] && (<img className='img-type-icon' src={icon_img_ghost} alt="" />)}
                        {type2 === variables.types[10] && (<img className='img-type-icon' src={icon_img_grass} alt="" />)}
                        {type2 === variables.types[11] && (<img className='img-type-icon' src={icon_img_ground} alt="" />)}
                        {type2 === variables.types[12] && (<img className='img-type-icon' src={icon_img_ice} alt="" />)}
                        {type2 === variables.types[13] && (<img className='img-type-icon' src={icon_img_normal} alt="" />)}
                        {type2 === variables.types[14] && (<img className='img-type-icon' src={icon_img_poison} alt="" />)}
                        {type2 === variables.types[15] && (<img className='img-type-icon' src={icon_img_psychic} alt="" />)}
                        {type2 === variables.types[16] && (<img className='img-type-icon' src={icon_img_rock} alt="" />)}
                        {type2 === variables.types[17] && (<img className='img-type-icon' src={icon_img_steel} alt="" />)}
                        {type2 === variables.types[18] && (<img className='img-type-icon' src={icon_img_water} alt="" />)}
                    </div>
                )}

            </div>

        </div>
    )
}

export default ShowIconTypes