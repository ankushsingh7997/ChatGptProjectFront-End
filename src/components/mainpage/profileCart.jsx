import React from "react"
import style from '../../componentcss/Mainpage.module.css'
import LogoutIcon from '@mui/icons-material/Logout';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { Icon } from "@mui/material";

function Profile()
{
    return (
        <div className={style.profileCard}>
            
            <div className={style.imageBox}>
                <div className={style.image}>image</div>
                <div className={style.userName}>username</div>
            </div>

            <div className={style.restBox}>
            <div className={style.logout}><Icon><LogoutIcon></LogoutIcon></Icon> <label>Logout</label></div>
            <div className={style.optional}><Icon><AcUnitIcon></AcUnitIcon></Icon> <label>Optional</label></div>

            </div>
            
        </div>
    )
}

export default Profile