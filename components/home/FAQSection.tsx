
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQSection() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container px-4 md:px-6 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How do I become a guide?</AccordionTrigger>
            <AccordionContent>
              Simply register an account and select "Guide" as your role. Fill out your profile, listing your expertise and daily rates. Once approved, you can start accepting bookings.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is my payment secure?</AccordionTrigger>
            <AccordionContent>
              Yes, we use industry-standard encryption and secure payment gateways (like Stripe) to ensure your financial information is protected. We hold payments until the tour is completed.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Can I cancel a booking?</AccordionTrigger>
            <AccordionContent>
              Yes, you can cancel bookings according to the cancellation policy set by the guide. Generally, full refunds are available if cancelled at least 48 hours in advance.
            </AccordionContent>
          </AccordionItem>
           <AccordionItem value="item-4">
            <AccordionTrigger>Are the guides verified?</AccordionTrigger>
            <AccordionContent>
              Absolutely. We perform background checks and verify the identity of all our guides to ensure a safe and authentic experience for travelers.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
