import React, { useEffect, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import InputPrimary from "./InputPrimary";
import { getUserByToken, updateSubsStatus } from "../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { countries } from 'countries-list';

const CheckoutForm = ({ plan }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState("");
  const [isPaymentLoading, setPaymentLoading] = useState(false);
  const [address, setAddress] = useState({
    line1: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
  });
  const [clientSecret] = useState(
    window.sessionStorage.getItem("clientSecret")
  );
  const [subsId] = useState(
    window.sessionStorage.getItem("subsId")
  );
    const [paymentIntent, setPaymentIntent] = useState();

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserByToken();
      setUser(user);
    };

    fetchUser();
  }, []);

  if (!stripe || !elements) {
    return;
  }

  const handleAddressChange = (e) => {
    setAddress((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCountryChange = (selectedCode) => {
    setAddress({ ...address, country: selectedCode });
  };

  const countryList = Object.keys(countries).map((code) => ({
    code,
    name: countries[code].name,
  }));



  const handleSubmit = async (e) => {
    e.preventDefault()

    setPaymentLoading(true)
    const cardElement = elements.getElement(CardElement)
    let { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: user.name,
          email: user.email,
          address
        }
      }
    })

    if(error) {
      if(error.type == 'invalid_request_error')
        toast.error('Unknown country. Please try using a 2-character country code, such as "us", "in", "eg" etc. ')
      else 
        toast.error(error.message)
        setPaymentLoading(false)
      return
    }

    setPaymentIntent(paymentIntent);
    setPaymentLoading(false)
  }

  if(paymentIntent && paymentIntent.status === 'succeeded') {
    navigate('/dashboard')
    updateSubsStatus({userId: user._id, plan, subsId})
  } 

  return (
    <div className="flex justify-center items-center py-10">
    <form
      onSubmit={handleSubmit}
      className="md:w-2/5 bg-white p-8 rounded-2xl"
    >
      <div className="flex justify-between items-end mb-2">
        <h2 className="text-2xl text-primary-dark underline decoration-theme-primary decoration-4 underline-offset-4 font-semibold uppercase">
          NoteGenie Pro
        </h2>
      </div>
      <h2 className="text-xl mt-5 text-gray-500 font-semibold border-b">
        Please enter your address{" "}
        <span className="text-red-500" title="required">
          *
        </span>
      </h2>
      <div onChange={handleAddressChange}>
        <div className="flex flex-col sm:flex-row gap-2">
          <InputPrimary name="line1" placeholder={"123 Main St"} />
          <InputPrimary name="postal_code" placeholder={"10001"} />
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <InputPrimary name="city" placeholder={"New York"} />
          <InputPrimary name="state" placeholder={"NY"} />
        </div>
        <div className=" sm:flex-row gap-2 mt-3  text-gray-600">
          <label className="capitalize text-lg block font-medium">
          Country
          </label>
          <select
            name="country"
            value={address.country}
            onChange={(e) => handleCountryChange(e.target.value)}
            className="w-full bg-gray-100 py-2 px-4 mt-1 rounded-full focus:outline-none hover:bg-white border border-gray-100"
          >
            <option value="">Select a country</option>
            {countryList.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <h2 className="text-xl mt-5 text-gray-500 font-semibold border-b">
        Please enter your card details{" "}
        <span className="text-red-500" title="required">
          *
        </span>
      </h2>
      <CardElement className="w-full my-5 bg-[#D1D1D147] py-3 px-6 rounded-3xl" />
      <button
        disabled={isPaymentLoading}
        className="bg-theme-primary px-6 py-2 rounded-2xl w-full font-medium"
      >
        {isPaymentLoading ? "Loading..." : "Pay"}
      </button>
    </form>

    
  </div>
  )
};

export default CheckoutForm;
