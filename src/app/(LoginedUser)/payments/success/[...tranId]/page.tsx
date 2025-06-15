
import { CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NextButton from "@/components/shared/NextButton";
import Link from "next/link";

export default function PaymentSuccessPage() {

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4">
      <Card className="w-full max-w-md shadow-xl border-blue-100">
        <CardHeader className="text-center">
          <CheckCircle className="mx-auto text-green-600 w-16 h-16 mb-4" />
          <CardTitle className="text-2xl font-semibold text-green-700">
            Payment Successful
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            Thank you! Your payment has been processed successfully.
          </p>
          <Link href="/profile/payments-history" >
          <NextButton
            name="Go to Payment History"
          />
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
