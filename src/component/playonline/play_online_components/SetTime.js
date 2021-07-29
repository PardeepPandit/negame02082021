import React,{useState,useEffect} from 'react'

export const SetTime = ({time}) => {
    const [seconds, setSeconds] = useState(time);
    let myVar=''
    console.log("timeing=",time)
    useEffect(() => {
     
          console.log("Now setisActive==",time)
          if (seconds > 0) {
                myVar = setTimeout(() => setSeconds(seconds - 1), 1000);
              } 
        
        return () => clearTimeout(myVar); 
      }, [seconds,time]);
    return (
        <div>
            <h1>Hello</h1>
            <h1>{seconds}</h1>
        </div>
    )
}

export default SetTime
