// emails/OrderConfirmation.tsx
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Row,
  Column,
} from "@react-email/components";

interface OrderConfirmationEmailProps {
  customerName: string;
  orderData: {
    orderNumber: string;
    items: Array<{
      name: string;
      price: number;
      quantity: number;
      image: string;
    }>;
    shippingAddress: string;
    shippingCity: string;
    shippingZipCode: string;
    shippingCountry: string;
    subtotal: number;
    shipping: number;
    vat: number;
    grandTotal: number;
  };
}

export default function OrderConfirmationEmail({
  customerName,
  orderData,
}: OrderConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your order has been confirmed - {orderData.orderNumber}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={logo}>audiophile</Heading>
          </Section>

          {/* Greeting */}
          <Section style={content}>
            <Heading style={title}>Thank you for your order!</Heading>
            <Text style={paragraph}>Hi {customerName},</Text>
            <Text style={paragraph}>
              We're excited to let you know that your order has been received
              and is being processed.
            </Text>
          </Section>

          {/* Order Details */}
          <Section style={orderBox}>
            <Text style={orderNumber}>
              Order Number: {orderData.orderNumber}
            </Text>
          </Section>

          {/* Order Items */}
          <Section style={itemsSection}>
            <Heading style={sectionTitle}>Order Summary</Heading>
            {orderData.items.map((item, index) => (
              <Row key={index} style={itemRow}>
                <Column style={itemImageCol}>
                  <Img
                    src={item.image}
                    alt={item.name}
                    width="64"
                    height="64"
                    style={itemImage}
                  />
                </Column>
                <Column style={itemDetailsCol}>
                  <Text style={itemName}>{item.name}</Text>
                  <Text style={itemPrice}>$ {item.price.toLocaleString()}</Text>
                </Column>
                <Column style={itemQuantityCol}>
                  <Text style={itemQuantity}>x{item.quantity}</Text>
                </Column>
              </Row>
            ))}
          </Section>

          {/* Totals */}
          <Section style={totalsSection}>
            <Row style={totalRow}>
              <Column>
                <Text style={totalLabel}>Subtotal</Text>
              </Column>
              <Column>
                <Text style={totalValue}>
                  $ {orderData.subtotal.toLocaleString()}
                </Text>
              </Column>
            </Row>
            <Row style={totalRow}>
              <Column>
                <Text style={totalLabel}>Shipping</Text>
              </Column>
              <Column>
                <Text style={totalValue}>$ {orderData.shipping}</Text>
              </Column>
            </Row>
            <Row style={totalRow}>
              <Column>
                <Text style={totalLabel}>VAT (Included)</Text>
              </Column>
              <Column>
                <Text style={totalValue}>
                  $ {orderData.vat.toLocaleString()}
                </Text>
              </Column>
            </Row>
            <Row style={grandTotalRow}>
              <Column>
                <Text style={grandTotalLabel}>Grand Total</Text>
              </Column>
              <Column>
                <Text style={grandTotalValue}>
                  $ {orderData.grandTotal.toLocaleString()}
                </Text>
              </Column>
            </Row>
          </Section>

          {/* Shipping Address */}
          <Section style={shippingSection}>
            <Heading style={sectionTitle}>Shipping Address</Heading>
            <Text style={address}>
              {orderData.shippingAddress}
              <br />
              {orderData.shippingCity}, {orderData.shippingZipCode}
              <br />
              {orderData.shippingCountry}
            </Text>
          </Section>

          {/* CTA Button */}
          <Section style={ctaSection}>
            <Link
              href={`${process.env.NEXT_PUBLIC_APP_URL}/orders/${orderData.orderNumber}`}
              style={button}
            >
              View Your Order
            </Link>
          </Section>

          {/* Support */}
          <Section style={supportSection}>
            <Text style={supportText}>
              Need help? Contact our support team at{" "}
              <Link href="mailto:support@audiophile.com" style={link}>
                support@audiophile.com
              </Link>
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              © 2025 Audiophile. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: "#f6f6f6",
  fontFamily:
    'Manrope, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0",
  maxWidth: "600px",
};

const header = {
  backgroundColor: "#000000",
  padding: "20px 40px",
};

const logo = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0",
  textTransform: "lowercase" as const,
};

const content = {
  padding: "40px 40px 20px",
};

const title = {
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0 0 20px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0 0 16px",
  color: "#666666",
};

const orderBox = {
  backgroundColor: "#f1f1f1",
  padding: "16px",
  margin: "0 40px 30px",
  borderRadius: "8px",
};

const orderNumber = {
  fontSize: "14px",
  fontWeight: "bold",
  margin: "0",
  textAlign: "center" as const,
};

const itemsSection = {
  padding: "0 40px 20px",
};

const sectionTitle = {
  fontSize: "18px",
  fontWeight: "bold",
  margin: "0 0 20px",
};

const itemRow = {
  marginBottom: "16px",
  borderBottom: "1px solid #eeeeee",
  paddingBottom: "16px",
};

const itemImageCol = {
  width: "64px",
};

const itemImage = {
  borderRadius: "8px",
};

const itemDetailsCol = {
  paddingLeft: "16px",
};

const itemName = {
  fontSize: "14px",
  fontWeight: "bold",
  margin: "0 0 4px",
};

const itemPrice = {
  fontSize: "14px",
  color: "#666666",
  margin: "0",
};

const itemQuantityCol = {
  textAlign: "right" as const,
  verticalAlign: "middle" as const,
};

const itemQuantity = {
  fontSize: "14px",
  fontWeight: "bold",
  color: "#666666",
  margin: "0",
};

const totalsSection = {
  padding: "20px 40px",
  backgroundColor: "#f9f9f9",
};

const totalRow = {
  marginBottom: "8px",
};

const totalLabel = {
  fontSize: "14px",
  color: "#666666",
  margin: "0",
};

const totalValue = {
  fontSize: "14px",
  fontWeight: "bold",
  textAlign: "right" as const,
  margin: "0",
};

const grandTotalRow = {
  marginTop: "16px",
  paddingTop: "16px",
  borderTop: "2px solid #dddddd",
};

const grandTotalLabel = {
  fontSize: "16px",
  fontWeight: "bold",
  margin: "0",
};

const grandTotalValue = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#d87d4a",
  textAlign: "right" as const,
  margin: "0",
};

const shippingSection = {
  padding: "20px 40px",
};

const address = {
  fontSize: "14px",
  lineHeight: "20px",
  color: "#666666",
  margin: "0",
};

const ctaSection = {
  padding: "30px 40px",
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#d87d4a",
  borderRadius: "4px",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 32px",
  textTransform: "uppercase" as const,
  letterSpacing: "1px",
};

const supportSection = {
  padding: "20px 40px",
  borderTop: "1px solid #eeeeee",
};

const supportText = {
  fontSize: "14px",
  color: "#666666",
  margin: "0",
  textAlign: "center" as const,
};

const link = {
  color: "#d87d4a",
  textDecoration: "underline",
};

const footer = {
  padding: "20px 40px",
  backgroundColor: "#f9f9f9",
};

const footerText = {
  fontSize: "12px",
  color: "#999999",
  margin: "0",
  textAlign: "center" as const,
};
