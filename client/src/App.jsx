import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSpinner } from "react-icons/fa";

import Home from "./pages/general/Home";
import Signup from "./pages/general/Signup";
import Signin from "./pages/general/Signin";
import Support from "./pages/general/Support";
import PrivateRoutes from "./PrivateRoutes";
import Dashboard from "./pages/dashboard/Dashboard";
import Editor from "./pages/dashboard/Editor";
import Pricing from "./pages/general/Pricing";
import StripeElements from "./pages/general/StripeElements";
import Discaimer from "./pages/general/Disclaimer";
import UpdatePaymentMethod from "./pages/general/UpdatePaymentMethod";
import Success from "./pages/general/Success";
import Error from "./pages/general/Error";

function App() {
  return (
    <section className="bg-primary-light min-h-screen">
      <Suspense
        fallback={
          <div className="flex justify-center items-center min-h-screen bg-light-2 text-center text-4xl font-bold">
            <FaSpinner className="text-primary-dark" />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/support" element={<Support />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/disclaimer" element={<Discaimer />} />

          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/editor/template" element={<Editor />} />
            <Route path="/payment" element={<StripeElements />} />
            <Route path="/payment-method"  element={<UpdatePaymentMethod/>}/>
            <Route path="/success" element={<Success/>}/>
            <Route path="/error" element={<Error/>}/>
            
          </Route>
        </Routes>
      </Suspense>
      <ToastContainer />
    </section>
  );
}

export default App;
