import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { RHFCheckbox, RHFTextField } from 'src/components/hook-form';

export function AgreementStep() {
  return (
    <Box gap={3} display="flex" flexDirection="column">
      <Box
        sx={{
          maxHeight: '400px',
          overflowY: 'auto',
          padding: 2,
          border: '1px solid #e0e0e0',
          borderRadius: 1,
          backgroundColor: '#fff',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#888',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#555',
          },
        }}
      >
        <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
          {`1. Revenue Sharing and Payment Terms
• The Supplier agrees to a revenue-sharing model where Koricha will retain a percentage of each sale.
• Koricha reserves the right to deduct any applicable taxes, service fees, or other charges before revenue distribution to the Supplier.

2. Invoicing and Financial Reporting
• Koricha will generate all customer-facing invoices, which will reflect product details, prices, taxes, and any other applicable charges.
• The Supplier acknowledges that Koricha will provide periodic reports (weekly/monthly) summarizing the sales performance, revenue generated, and payment distributions.
• The Supplier is responsible for keeping a record of these reports for tax or financial reporting purposes.

3. Product Listings and Compliance
• The Supplier is responsible for maintaining accurate product details on the platform, including stock levels, pricing, descriptions, and other relevant information.
• The Supplier agrees that all products listed on the platform must comply with all applicable laws, regulations, and standards, including but not limited to safety standards, consumer protection laws, and import/export regulations.
• Koricha reserves the right to remove or modify any product listings that do not meet these standards.

4. Order Fulfillment
• The Supplier is responsible for timely and accurate order fulfillment. Koricha will assign orders based on criteria such as supplier location and customer needs.
• The Supplier agrees to comply with Koricha's order fulfillment timelines, packaging standards, and quality control policies.
• In case of any issues preventing fulfillment, the Supplier must notify Koricha immediately.

5. Confidentiality and Data Protection
• The Supplier consents to Koricha collecting, processing, and storing data necessary for managing orders, revenue sharing, and performance tracking.
• All customer data is confidential and solely managed by Koricha. The Supplier agrees not to retain, use, or disclose any customer data unless expressly authorized by Koricha.`}
        </Typography>
      </Box>

      <RHFCheckbox name="agreement" label="I agree to the terms and conditions" />
    </Box>
  );
}
