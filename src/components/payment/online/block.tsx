import OnlinePaymentForm from "~/components/payment/online"
import { api } from "~/trpc/server"

export default async function OnlinePaymentBlock({
  afterPayment,
}: {
  afterPayment?: (paymentID: string) => Promise<void>
}) {
  const cards = await api.payment.getCards.query()

  return <OnlinePaymentForm cards={cards} afterPayment={afterPayment} />
}
