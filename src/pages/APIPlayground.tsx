import React from "react"
import { ButtonFilled } from "@/components/general/buttons/ButtonFilled"
import { loginUserAPI } from "@/api/auth";

export const APIPlayground = () => {
  const handleClick = async () => {
    console.log("Calling API");
    const res = await loginUserAPI("test")
    console.log(res)
  }
  return <div className="w-[100vw] h-[100vh] bg-containerBackground">
    <ButtonFilled onClick={handleClick}>Make API Call</ButtonFilled>
  </div>
}