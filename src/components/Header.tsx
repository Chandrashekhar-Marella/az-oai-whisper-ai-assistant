"use client"

import React, { useState } from 'react'
import Image from "next/image";
import { SettingsIcon } from "lucide-react";

const Header = () =>
{
    const [ displaySettings, setDisplaySettings ] = useState( false );

    return (
        <header className="flex fixed top-0 justify-between text-white w-full p-5">
            <Image
                src="/images/Floating_Robot.png"
                alt="Logo"
                width={ 80 }
                height={ 80 }
                className=""
            />

            <SettingsIcon
                className="p-2 m-2 rounded-full cursor-pointer bg-purple-600 text-black transition-all ease-in-out duration-150 hover:bg-purple-700 hover:text-white"
                onClick={ () => setDisplaySettings( !displaySettings ) }
                size={ 40 }
            />
        </header>
    )
}

export default Header