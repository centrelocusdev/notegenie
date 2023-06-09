import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BsCheck2Circle } from "react-icons/bs"

const Pricing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status");

  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (status == "completed") setIsCompleted(true);
  }, [isCompleted]);

  const handleClick = (price, plan) => {
    navigate(`/payment?price=${price}&plan=${plan}`)
  }

  return (
    <div className="py-16 md:px-0 px-8 text-center">
      {isCompleted ? (
        <div className="md:w-2/5 px-8 py-16 mx-auto bg-white flex flex-col items-center text-theme-primary">
          <BsCheck2Circle className="text-6xl"/>
        <h3 className="text-5xl font-medium text-center">
          Completed!
        </h3>
      </div>
      ) : (
        <div className="md:w-4/5 m-auto flex md:flex-row flex-col justify-center items-center gap-8">
          {plans.map((plan, key) => (
            <div className="md:w-2/5 bg-white flex flex-col gap-8 justify-between text-center">
              <p className="bg-primary-dark text-white w-full text-center py-2 uppercase">
                {plan.tag}
              </p>
              <p className="font-bold uppercase text-2xl">{plan.name}</p>
              <p className="font-bold uppercase text-[4rem]">${plan.price}</p>
              <p className="text-gray-500 px-8">{plan.desc}</p>
              <button onClick={(e) => handleClick(plan.price, plan.name)} className="py-3 px-6 bg-theme-primary font-semibold w-full md:mt-0 mt-3 hover:bg-[#ffebb3]">
                Buy Now!
              </button>
            </div>
          ))}
        </div>
      )}
      <button
        onClick={(e) => navigate("/")}
        className="text-gray-500 mt-5 underline hover:text-primary-dark"
      >
        Go Back
      </button>
    </div>
  );
};

const plans = [
  {
    tag: "zero cost",
    name: "free",
    price: "0",
    desc: "Free 1 days trial to get an awesome experience about NoteGenie. You can create notes and see the magic happen. After 1 day, you would need to upgrade to paid plan to continue using NoteGenie.",
    url: "#",
  },
  {
    tag: "most popular",
    name: "basic",
    price: "10",
    desc: "In this plan you get 100 Notes for $10.99. If your note taking requirement is not more then subscribe to this plan. ",
    url: "#",
  },
  {
    tag: "best value",
    name: "premium",
    price: "15",
    desc: "This plan lets you create 500 Magic notes for only $14.99. Ideal for professionals in the field of Legal, Healthcare, Social workers or Therapists.",
    url: "#",
  },
];

export default Pricing;
