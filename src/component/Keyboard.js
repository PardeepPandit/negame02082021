import React,{ Fragment } from 'react'

export const Keyboard = ({onClick}) => {
    return (
        <Fragment>
            <ul className="top_ul">
                <li onClick={e => onClick(e)} ><span>Q</span></li>
                <li onClick={e => onClick(e)}><span>W</span></li>
                <li onClick={e => onClick(e)}><span>E</span></li>
                <li onClick={e => onClick(e)}><span>R</span></li>
                <li onClick={e => onClick(e)}><span>T</span></li>
                <li onClick={e => onClick(e)}><span>Y</span></li>
                <li onClick={e => onClick(e)}><span>U</span></li>
                <li onClick={e => onClick(e)}><span>I</span></li>
                <li onClick={e => onClick(e)}><span>O</span></li>
                <li onClick={e => onClick(e)}><span>P</span></li> 
                <div class="clear"></div>
            </ul>
            <ul class="ml_l">
                <li onClick={e => onClick(e)}><span>A</span></li>
                <li onClick={e => onClick(e)}><span>S</span></li>
                <li onClick={e => onClick(e)}><span>D</span></li>
                <li onClick={e => onClick(e)}><span>F</span></li>
                <li onClick={e => onClick(e)}><span>G</span></li>
                <li onClick={e => onClick(e)}><span>H</span></li>
                <li onClick={e => onClick(e)}><span>J</span></li>
                <li onClick={e => onClick(e)}><span>K</span></li>
                <li onClick={e => onClick(e)}><span>L</span></li>

                <div class="clear"></div>
            </ul>
            <ul class="ml_7">
                <li onClick={e => onClick(e)}><span>Z</span></li>
                <li onClick={e => onClick(e)}><span>X</span></li>
                <li onClick={e => onClick(e)}><span>C</span></li>
                <li onClick={e => onClick(e)}><span>V</span></li>
                <li onClick={e => onClick(e)}><span>B</span></li>
                <li onClick={e => onClick(e)}><span>N</span></li>
                <li onClick={e => onClick(e)}><span>M</span></li> 


                <div class="clear"></div>
            </ul>
        </Fragment>
    )
}

export default Keyboard
