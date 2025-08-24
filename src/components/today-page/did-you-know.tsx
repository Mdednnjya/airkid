import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from "@/components/ui/accordion";

export default function DidYouKnow() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Did You Know?</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is PM2.5?</AccordionTrigger>
            <AccordionContent>
              PM2.5 refers to fine particulate matter that is 2.5 micrometers or smaller in diameter. These particles
              are so small they can penetrate deep into the lungs and even enter the bloodstream. For children, exposure
              to PM2.5 can affect lung development and increase the risk of respiratory infections.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How does air pollution affect children&apos;s health?</AccordionTrigger>
            <AccordionContent>
              Children are more vulnerable to air pollution because they breathe faster than adults, their lungs are
              still developing, and they spend more time outdoors. Poor air quality can trigger asthma attacks, reduce
              lung function, and impact cognitive development. That&apos;s why it&apos;s important to monitor air quality and
              adjust activities accordingly.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}