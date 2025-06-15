import { XCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import NextButton from "@/components/shared/NextButton"
import Link from "next/link"

export default function PaymentCancelPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 px-4">
      <Card className="w-full max-w-md shadow-xl border-red-100">
        <CardHeader className="text-center">
          <XCircle className="mx-auto text-red-600 w-16 h-16 mb-4" />
          <CardTitle className="text-2xl font-semibold text-red-700">
            Payment Cancelled
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            Your payment was not completed. You can try again or view your payment history for details.
          </p>
          <Link href="/profile/payments-history">
            <NextButton name="View Payment History" />
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
