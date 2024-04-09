export const paypalCheckoutSettingsMock = {
  paymentSettings: {
    externalPaymentWorkflowDefinitions: [
      {
        name: 'PayPalExpress2',
        namespace: 'mozuadmin',
        fullyQualifiedName: 'mozuadmin~PayPalExpress2',
        description:
          "<div style='font-size:13px;font-style:italic'>Please review our <a style='color:blue;' target='mozupaypalhelp' href='http://mozu.github.io/IntegrationDocuments/PayPalExpress/Mozu-PayPalExpress-App.htm'>Help</a> documentation to configure Paypal Express</div>",
        isEnabled: true,
        isLegacy: true,
        credentials: [
          {
            displayName: 'Environment',
            apiName: 'environment',
            value: 'sandbox',
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
            inputType: 'RadioButton',
            isSensitive: false,
          },
          {
            displayName: 'User Name',
            apiName: 'username',
            value: 'userName',
            vocabularyValues: [],
            inputType: 'TextBox',
            isSensitive: true,
          },
          {
            displayName: 'Password',
            apiName: 'password',
            value: 'password',
            vocabularyValues: [],
            inputType: 'TextBox',
            isSensitive: true,
          },
          {
            displayName: 'Signature',
            apiName: 'signature',
            value: 'AFcWxV21C7fd0v3bYYYRCpSSRl31Ap69TZ0zGzOgodZ--H-KgVyikW8O',
            vocabularyValues: [],
            inputType: 'TextBox',
            isSensitive: true,
          },
          {
            displayName: 'Merchant account ID',
            apiName: 'merchantAccountId',
            value: '93JVPWZMKZ2KQ',
            vocabularyValues: [],
            inputType: 'TextBox',
            isSensitive: false,
          },
          {
            displayName: 'Order Processing',
            apiName: 'orderProcessing',
            value: 'AuthAndCaptureOnOrderPlacement',
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
            inputType: 'RadioButton',
            isSensitive: false,
          },
        ],
      },
    ],
  },
}
