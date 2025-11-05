/*

import texts from "../texts/textsShareBox"
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FaWhatsapp, FaFacebookMessenger, FaLink } from 'react-icons/fa'
import { doc, updateDoc, arrayUnion } from 'firebase/firestore'
import { db } from '@/firebaseConfig';
import Link from "next/link"

interface ToolResultsProps {
    url: string;
}

declare function gtag(...args: any[]): void;


const ToolResults: React.FC<ToolResultsProps> = ({ url }) => {
  const router = useRouter()
  const { locale } = router 
  const [whatsappURL, setWhatsappUrl] = useState<string>("")
  const [showCoppied, setShowCoppied] = useState<boolean>(false)
  

  useEffect(() => {
    setWhatsappUrl(encodeURIComponent(url))
  }, [url])

  const logShare = async (channel: string) => {
    const docRef = doc(db, 'shares', "homepage");

    try {
      await updateDoc(docRef, {
        shares: arrayUnion({
          channel: channel,
          date: new Date(),
          locale: locale
        })
      });
    } catch (error) {
    }

    gtag('event', 'share_button_clicked', {
      'event_category': 'Share',
      'event_label': channel,
      'value': 1
      })
  };

  return (
    <div className="py-2 lg:py-4 px-2 lg:px-4 bg-custom-grey rounded-xl bg-opacity-90 transition-all ease-in duration-700">
        <p className="standard-text font-bold mx-2">{texts.share[locale]}</p>
        <div className=" flex justify-center my-3">
          <Link 
            href={"https://wa.me/?text=" + texts.whatsapp[locale] + " " + whatsappURL}
            className=" mx-2"
            onClick={(e) => {
              e.preventDefault()
              logShare("whatsapp")
              window.location.href = "https://wa.me/?text=" + texts.whatsapp[locale] + " " + whatsappURL
            }}
          >
            <FaWhatsapp size="28" className=" text-dark-blue"/>
          </Link>
          <button 
            onClick={() => {
              navigator.clipboard.writeText(url)
              logShare("link")
              setShowCoppied(true)
            }}
            className="mx-2"
          >
            <FaLink size="28" className=" text-dark-blue"/>
          </button>
        </div>
        {showCoppied && <p className="standard-text mx-2">{texts.linkCopied[locale]}</p>}

    </div>
  ) 
}

export default ToolResults
*/