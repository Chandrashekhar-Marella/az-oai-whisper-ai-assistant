"use client"

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { SettingsIcon } from "lucide-react";

import Header from '@/components/Header';
import Messages from '@/components/Messages';
import Recorder, { mimeType } from '@/components/Recorder';
import VoiceSynthesizer from '@/components/VoiceSynthesizer';
import transcribe from "../actions/Transcribe";

const initialState = {
  sender: "",
  response: "",
  id: "",
};

export type Message = {
  sender: string;
  response: string;
  id: string;
};

export default function Home ()
{
  const [ state, formAction ] = useFormState( transcribe, initialState );
  const fileRef = useRef<HTMLInputElement | null>( null );
  const submitButtonRef = useRef<HTMLButtonElement | null>( null );
  const [ messages, setMessages ] = useState<Message[]>( [] ); 
  const [ displaySettings, setDisplaySettings ] = useState( false );

  // Responsible for updating the messages when the Server Action completes
  useEffect( () =>
  {
    if ( state.response && state.sender )
    {
      setMessages( ( messages ) => [
        {
          sender: state.sender || "",
          response: state.response || "",
          id: state.id || "",
        },
        ...messages,
      ] );
    }
  }, [ state ] );

  const uploadAudio = ( blob: Blob ) =>
  {
    // Create a File object from the Blob
    const file = new File( [ blob ], "audio.webm", { type: mimeType } );

    // Set the file as the value of the file input element
    if ( fileRef.current )
    {
      // Create a DataTransfer object to simulate a file input event
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add( file );
      fileRef.current.files = dataTransfer.files;

      // Submit the form
      if ( submitButtonRef.current )
      {
        submitButtonRef.current.click();
      }
    };

  }

  // console.log(messages);

  return (
    <main className="bg-black h-screen overflow-y-auto">
      {/* <Header/> */}

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

      <form action={ formAction } className="flex flex-col bg-black">
        <div className="flex-1 bg-gradient-to-b from-purple-500 to-black">
          <Messages messages={ messages } />
        </div>

        {/* Hidden Fields */ }
        <input type="file" name="audio" ref={ fileRef } hidden />
        <button type="submit" hidden ref={ submitButtonRef } />

        <div className="fixed bottom-0 w-full overflow-hidden bg-black rounded-t-3xl">
          <Recorder uploadAudio={ uploadAudio } />

          <div className="">
            <VoiceSynthesizer state={ state } displaySettings={ displaySettings } />
          </div>

        </div>

      </form>

    </main>
  );
}
