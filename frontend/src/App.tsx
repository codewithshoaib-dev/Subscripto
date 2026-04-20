import { BrowserRouter, Routes, Route } from "react-router-dom";
import BillingDemo from "@pages/BillingDemo";
import { DemoSuccess } from "./pages/DemoSuccess";



function App() {
 return (
   <BrowserRouter>
     <Routes>
       <Route path="/" element={<BillingDemo />} />
       <Route
         path="/demo/success"
         element={<DemoSuccess />}
       />
     </Routes>
   </BrowserRouter>
 );
}

export default App
