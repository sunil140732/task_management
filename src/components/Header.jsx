import {useState,useEffect} from 'react'

const Header = ({isNewFest,timeLeft,quote}) => {
    let [currentWord,setCurrentWord]=useState('increadiable')
    let words=["increadiable","fantstatic",'Joy','Abundance','Gratitude','Growth','Adventure','Wellness','Success','Love','Passion','Inspiration',
        'Peace','Confidence','Creativity','Kindness','Celebration','Harmony','Laughter','Optimism']
    
    // useEffect for updating the words after everysecond
    useEffect(()=>{
        let wordChange=setInterval(()=>{
            setCurrentWord(prevword=>{
                let currentIndex=words.indexOf(prevword)
                // console.log(words[(currentIndex+1)% words.length])
                return words[(currentIndex+1)% words.length]
            })
            
        },1000)
        // cleanup
        return ()=>clearInterval(wordChange)
    },[]) // run only once


  return (
    <div className='header-container d-flex justify-content-between align-items-center border p-4'>
        {/* header-display */}
      <div className='text-start'>
        <h1 className='header-title'>{isNewFest?'🌾🌾 Happy pongal 2025🌾🌾':'🌾🌾Advanced Happy pongal 2025🌾🌾'}</h1>
        <p className='fs-3'>make these year <strong className='text-success fs-1'>{currentWord}</strong></p>
        <blockquote className='fs-4 text-muted' style={{fontStyle:"italic"}}>{quote}</blockquote>
      </div>
      {/* countdown-timer */}
      <div className="timer-section">
        <h3 className='border border-danger rounded-pill bg-danger fw-bold p-4 fs-1'>
            {timeLeft.hours<10?`0${timeLeft.hours}`:timeLeft.hours}:
            {timeLeft.min<10?`0${timeLeft.min}`:timeLeft.min}:
            {timeLeft.sec<10?`0${timeLeft.sec}`:timeLeft.sec}
        </h3>
        
      </div>
    </div>
  )
}

export default Header
