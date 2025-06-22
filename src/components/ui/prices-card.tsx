"use client";

import { useState } from "react";

interface PricesCardProps {
  prices: {
    type: string;
    price: number;
    discount?: string;
    link?: string | null;
    selected: boolean;
  }[];
}

export default function PricesCard({ prices }: PricesCardProps) {
  const [subscriptions, setSubscriptions] = useState(prices)
  
  const toggleOnClick = () => {
    setSubscriptions(subscriptions.map(subscription => {
      return {
        ...subscription,
        selected: !subscription.selected
      }
    }))
  }

  return (
    <div className="shadow-md relative flex flex-col h-full gap-5 lg:gap-8 z-10 bg-base-100 p-8 rounded-xl">
      <div className="form-control w-full flex flex-row justify-between">
        <div className="flex gap-2">
            <p
                className={`text-5xl tracking-tight font-extrabold`}
            >
                {subscriptions.find(elem => elem.selected)?.price}€
            </p>
            <div className="flex flex-col justify-end mb-[4px]">
              <p className="text-sm tracking-wide text-base-content/80 uppercase font-semibold">
                1 {subscriptions.find(elem => elem.selected)?.type == 'Monthly' ? 'month' : 'year'}
                {subscriptions.find(elem => elem.selected)?.discount && <span className="text-primary text-opacity-65">{` ${subscriptions.find(elem => elem.selected)?.discount}`}</span>}
              </p>
            </div>
        </div>
        <label className="label cursor-pointer" onClick={toggleOnClick}>
          <span className="label-text mr-2">Pay {subscriptions.find(elem => elem.selected)?.type}</span> 
          <input type="checkbox" className="toggle" defaultChecked={subscriptions.findIndex(elem => elem.selected) != 0}/>
        </label>
      </div>
      <ul className="space-y-2.5 leading-relaxed text-base flex-1">
            {[
                { name: 'Generate outfits with AI'},
                { name: 'Generate outfits with your available wardrobe' },
                { name: 'Manage your wardrobe' },
                { name: 'Save your outfits' }
            ].map((feature, i) => (
              <li
                  key={i}
                  className="flex items-center gap-2"
              >
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-[18px] h-[18px] opacity-80 shrink-0"
                  >
                      <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                      />
                  </svg>

                  <span>{feature.name} </span>
              </li>
            ))}
        </ul>
        <div className="space-y-2">
            <a
                className="btn btn-primary btn-block "
                target="_blank"
                href={subscriptions.find(elem => elem.selected)?.link || '#'}
            >
                Subscribe
            </a>
        </div>
    </div>
  );
}