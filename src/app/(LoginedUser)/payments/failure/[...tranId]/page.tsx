import { AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import NextButton from "@/components/shared/NextButton"
import Link from "next/link"

export default function PaymentFailurePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 px-4">
      <Card className="w-full max-w-md shadow-xl border-yellow-100">
        <CardHeader className="text-center">
          <AlertTriangle className="mx-auto text-yellow-600 w-16 h-16 mb-4" />
          <CardTitle className="text-2xl font-semibold text-yellow-700">
            Payment Failed
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            Something went wrong and your payment could not be processed. Please try again or check your payment history.
          </p>
          <Link href="/profile/payments-history">
            <NextButton name="View Payment History" />
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
