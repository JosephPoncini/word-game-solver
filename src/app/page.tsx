"use client";

import TitleScreenCardComponent from "@/components/TitleScreenCard/TitleScreenCardComponent";
import Image from "next/image";
import wordleImg from "@/assets/WordlePic.png"
import wordHuntImg from "@/assets/wordHunt.jpg"
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter()

  return (
    <div className=" w-screen h-screen overflow-auto bg-teal-100 flex flex-col items-center pt-10 space-y-5">
      <div className=" font-LuckiestGuy text-4xl text-blue-950 ">Word Game Solver!!!</div>
      <div className=" font-RobotoBold text-2xl text-blue-950 tracking-widest">Choose A Game To Solve...</div>
      <div className=" space-y-5 flex flex-col items-center">
        <TitleScreenCardComponent image={wordleImg} title="Wordle Solver" link="/pages/WordleSolver/"  />
        <TitleScreenCardComponent image={wordHuntImg} title="Word Hunt Solver" link="/pages/WordHuntSolver/"  />
      </div>
    </div>
  );
}
