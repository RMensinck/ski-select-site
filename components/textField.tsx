/*

import React from 'react'
import Link from 'next/link'
import FeedbackForm from './feedbackForm';

interface LinkItem {
  href: string;
  text: string;
}

interface TextInputs {
  texts: string[];
  links: LinkItem[];
  feedbackBox?: boolean;
}

const TextField: React.FC<TextInputs> = ({ texts, links, feedbackBox=false }) => {
  return (
    <div className="rounded-xl py-4 bg-opacity-50 bg-custom-grey max-w-3xl mx-3 shadow-lg lg:min-w-[48rem]">
      {texts.map((text, index) => (
        <p key={index} className="mb-6 mt-6 text-dark-blue font-bold text-center px-3">
          {text}
        </p>
      ))}
      {links.map((link, index) => (
        <Link href={link.href} key={index}>
          <p className="mb-6 underline text-dark-blue font-bold text-center">{link.text}</p>
        </Link>
      ))}
    {feedbackBox === true && 
      <FeedbackForm />
    }
    </div>

  ) 
}

export default TextField
*/