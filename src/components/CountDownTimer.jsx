import {useState,useEffect} from 'react'
import Header from './Header'
import Confetti from 'react-confetti'
import Quotes from './Quotes'

const CountDownTimer = () => {
    let targetedTime=new Date('2025-01-14T00:00:00')

    // calculate the time left for the event
    let calculateTimeLeft=()=>{
        let now=new Date()
        let remainingTime=targetedTime-now
        // console.log(remainingTime)

        // checking waether the time is reached
        if(remainingTime<=0){
            return {hours:0,min:0,sec:0}
        }

        // converting the Time in readable format
        let hours=Math.floor(remainingTime/(1000*60*60)%24)
        let min=Math.floor(remainingTime/(1000*60)%60)
        let sec=Math.floor(remainingTime/(1000)%60)
        // console.log(hours,min,sec)

        return {hours,min,sec}
    }
    
    // useState for holding the data
    let [timeLeft,setTimeLeft]=useState(calculateTimeLeft)
    let [showConfetti,setShowConfetti]=useState(false)
    let [isNewFest,setIsNewFest]=useState(false)
    let [quotes,setQuotes]=useState("")

    // useEffect for handling the uiUpdate(sideEffect)
    useEffect(()=>{
        if(timeLeft.hours===0&& timeLeft.min===0 && timeLeft.sec===0){
            setShowConfetti(true)
            setIsNewFest(true)

            // remove the confetti after the 10 min
            let confettiRemovall=setTimeout(()=>{
                setShowConfetti(false)
            },10*60*1000)

            // cleanup
            return () => {clearTimeout(confettiRemovall)}
        }

        // updating the timer Everysec
        let timer=setTimeout(()=>{
            setTimeLeft(calculateTimeLeft())
        },1000)

        return ()=>clearTimeout(timer)

    },[timeLeft])

  return (
    <div className='countdown-timer '>
      <Header isNewFest={isNewFest} timeLeft={timeLeft}/>
      {showConfetti && <Confetti/>} {/* short-circuiting for conditional rendering the ui */}
      <Quotes onNewQuote={setQuotes}/>
    </div>
  )
}

export default CountDownTimer
