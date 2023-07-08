import React from "react"
import FadeLoader from "react-spinners/FadeLoader"
import { animated, useSpring } from "react-spring"
import PocketmintLogoMini from "src/assets/common/logos/Logo_Mini.svg"


export const ScreenSpinner = () => {

  const bounce = useSpring({
    loop: true,
    from: { transform: 'translateY(-20px) rotate3d(0, 1, 0, 0deg)' },
    to: [
      { transform: 'translateY(0px) rotate3d(0, 1, 0, 180deg)' },
      { transform: 'translateY(-20px) rotate3d(0, 1, 0, 0deg)' },
    ],
    config: { tension: 150, friction: 20 },
  });

  return <div className="flex flex-col items-center justify-center h-full w-full">
    <animated.img src={PocketmintLogoMini} className="w-[5%] h-[5%]" style={bounce} />
    <div className="flex flex-row items-center justify-center">
      <FadeLoader />
      <p className="font-medium text-2xl">Logging in to <span className='text-primary-500 text-3xl font-bold'>Pocketmint!</span></p>
    </div>
  </div>
}