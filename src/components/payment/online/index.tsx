import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/ui/accordion"

export default function CardPayment() {
  return (
    <Accordion
      type="single"
      //   disabled={loadingState[0]}
      //   defaultValue={(cards ?? [])?.length > 0 ? "saved" : "card"}
      className="w-full border border-black/25 dark:border-white/25"
    >
      <AccordionItem value="card" className="border-black/25 dark:border-white/25">
        <AccordionTrigger className="px-4">Debit/Credit card</AccordionTrigger>
        <AccordionContent className="mx-4">
          {/* <Card {...paymentOptions} setFocus={setFocus} amount={amount} cardDetails={cardDetails} /> */}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="wallet" className="border-black/25 dark:border-white/25">
        <AccordionTrigger className="px-4">Digital wallet</AccordionTrigger>
        <AccordionContent className="mx-4 my-1 grid gap-y-4">
          {/* <GooglePay {...paymentOptions} payRequest={createPaymentRequest({ amount, label })} />
          {canApplePay && <ApplePay {...paymentOptions} payRequest={createPaymentRequest({ amount, label })} />} */}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="saved" className="border-black/25 dark:border-white/25">
        <AccordionTrigger className="px-4">Saved cards</AccordionTrigger>
        <AccordionContent className="mx-4">
          {/* <SavedCards {...paymentOptions} amount={amount} cards={cards ?? []} /> */}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
