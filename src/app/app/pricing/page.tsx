import React from "react";

import PricesCard from "@/components/ui/prices-card";
import { getPrices } from "@/lib/services/stripe-service";

export default async function PricingPage() {
  const prices = await getPrices()

  return (
    <>
      <div className="py-14 px-8 max-w-5xl mx-auto min-h-screen">
        <div className="flex flex-col w-full text-center mb-12 gap-4">
          <h1 className="text-5xl	font-extrabold">Subscriptions</h1>
          <div className="w-full flex justify-center">
            <p className="w-2/3 text-xl text-base-content/80 mt-2">
              In order to use this software, you need to subscribe to one of the following plans. This will help us maintain the software, build new features, and provide you with the best experience possible.
            </p>
          </div>
        </div>
        <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
          <div className="w-full max-w-lg">
            <PricesCard prices={prices} /> 
          </div>
        </div>
      </div>
    </>
  );
}