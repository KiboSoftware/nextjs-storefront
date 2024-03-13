export const externalPayment = {
  credentials: [
    {
      displayName: 'Environment',
      apiName: 'environment',
      value: 'sandbox',
      inputType: 'RadioButton',
      vocabularyValues: [
        {
          key: 'production',
          contents: [
            {
              localeCode: 'en-US',
              value: 'Production',
            },
          ],
        },
        {
          key: 'sandbox',
          contents: [
            {
              localeCode: 'en-US',
              value: 'Sandbox',
            },
          ],
        },
      ],
    },
    {
      displayName: 'Merchant account ID',
      apiName: 'merchantAccountId',
      value: '93JVPWZMKZ2KQ',
      inputType: 'TextBox',
      vocabularyValues: [],
    },
    {
      displayName: 'Order Processing',
      apiName: 'orderProcessing',
      value: 'AuthAndCaptureOnOrderPlacement',
      inputType: 'RadioButton',
      vocabularyValues: [
        {
          key: 'AuthAndCaptureOnOrderPlacement',
          contents: [
            {
              localeCode: 'en-US',
              value: 'Authorize and Capture on Order Placement',
            },
          ],
        },
        {
          key: 'AuthOnOrderPlacementAndCaptureOnOrderShipment',
          contents: [
            {
              localeCode: 'en-US',
              value: 'Authorize on Order Placement and Capture on Order Shipment',
            },
          ],
        },
      ],
    },
  ],
  fullyQualifiedName: 'mozuadmin~PayPalExpress2',
  isEnabled: true,
  name: 'PayPalExpress2',
  namespace: 'mozuadmin',
}
