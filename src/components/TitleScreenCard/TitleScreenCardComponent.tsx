"use client";

// import { Card } from "flowbite-react";
import ScreenShot from '@/app/assets/ShorTalkSiteScreenShot.png'
import Image, { StaticImageData } from "next/legacy/image"
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const TitleScreenCardComponent = (props: { image: StaticImageData, title: string, link: string }) => {

    const router = useRouter()
    
    const onClick = () => {
        router.push(props.link);
    }

    return (
        <div className=' w-[500px] flex flex-col border rounded-xl overflow-hidden border-black hover:w-[525px]  cursor-pointer' onClick={onClick}>
            <div className=' w-full h-[510px] xl:h-[235px] relative'>
                    <Image src={props.image} alt='Site Screenshot' layout="fill" objectFit="cover" />
            </div>
            <div className=' px-5 py-5 overflow-auto flex justify-center border-black border-t bg-blue-100' >
                <div className=' font-RobotoBold text-2xl md:text-3xl flex text-blue-950'>
                    {props.title}
                </div>
            </div>

        </div>
    )
}

export default TitleScreenCardComponent