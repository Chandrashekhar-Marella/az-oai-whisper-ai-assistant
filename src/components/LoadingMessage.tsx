"use client";

import { useFormStatus } from "react-dom";
import { BeatLoader } from "react-spinners";

const LoadingMessage = () =>
{
    const { pending } = useFormStatus();

    return (
        pending && (
            <p className="message ml-auto text-white">
                <BeatLoader color="white"/>
            </p>
        )
    );

}

export default LoadingMessage