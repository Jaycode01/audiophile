import { Suspense } from "react";
import OrderConfirmation from "./orderConfirmation";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderConfirmation />
    </Suspense>
  );
}
