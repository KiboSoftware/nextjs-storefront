import type { CrOrder } from '@/lib/gql/types'

export const createOrderPaymentActionMock: { createOrderPaymentAction: CrOrder } = {
  createOrderPaymentAction: {
    id: '13eaad5a5526f20001d2fab9000074e7',
    email: 'chandradeepta.laha@kibocommerce.com',
    continuityOrderOrdinal: 1,
    totalCollected: 0,
    amountAvailableForRefund: 0,
    amountRemainingForPayment: 0,
    amountRefunded: 0,
    total: 220,
    shippingTotal: 0,
    discountTotal: 0,
    subtotal: 220,
    taxTotal: 0,
    orderNumber: 1217,
    orderDiscounts: [],
    billingInfo: {
      billingContact: {
        id: null,
        email: 'chandradeepta.laha@kibocommerce.com',
        firstName: 'John',
        middleNameOrInitial: null,
        lastNameOrSurname: 'Doe',
        companyOrOrganization: null,
        phoneNumbers: {
          home: '9898495849',
          mobile: null,
          work: null,
        },
        address: {
          address1: 'Lamar Street',
          address2: '23/1',
          address3: null,
          address4: null,
          cityOrTown: 'Austin',
          stateOrProvince: 'TX',
          postalOrZipCode: '87878',
          countryCode: 'US',
          addressType: null,
          isValidated: false,
        },
      },
    },
    fulfillmentInfo: {
      shippingMethodCode: '46be3c2a4f17412ca1daacb801232b0c',
      shippingMethodName: 'Flat Rate',
      fulfillmentContact: {
        email: 'chandradeepta.laha@kibocommerce.com',
        firstName: 'John',
        middleNameOrInitial: null,
        lastNameOrSurname: 'Doe',
        companyOrOrganization: null,
        phoneNumbers: {
          home: '9898495849',
          mobile: null,
          work: null,
        },
        address: {
          address1: 'Lamar Street',
          address2: '23/1',
          address3: null,
          address4: null,
          cityOrTown: 'Austin',
          stateOrProvince: 'TX',
          postalOrZipCode: '87878',
          countryCode: 'US',
          addressType: null,
          isValidated: false,
        },
        id: null,
      },
    },
    items: [
      {
        fulfillmentMethod: 'Ship',
        id: '96a8072dcf3542f2a7f1aee600ae6fb9',
        total: 100,
        subtotal: 100,
        discountTotal: 0,
        quantity: 1,
        product: {
          productCode: 'BackP_024',
          name: 'Katahdin 50 Pack',
          description:
            'The JanSport Katahdin 50 pack for weekend trips has adjustable torso, vented back panel, great organization and plenty of straps, so you can wrangle your load while keeping the gear accessible.',
          imageUrl:
            '//cdn-sb.mozu.com/29927-49696/cms/49696/files/1b6b9ecd-912a-412f-8d11-c2660d265aff',
          options: [],
          properties: [
            {
              attributeFQN: 'tenant~availability',
              name: 'Availability',
              values: [
                {
                  value: '24-48hrs',
                },
              ],
            },
            {
              attributeFQN: 'tenant~product-crosssell',
              name: 'Product Cross-Sells',
              values: [
                {
                  value: '30055',
                },
                {
                  value: '464648',
                },
                {
                  value: '171129',
                },
              ],
            },
            {
              attributeFQN: 'tenant~popularity',
              name: 'Popularity',
              values: [
                {
                  value: 3,
                },
              ],
            },
            {
              attributeFQN: 'tenant~rating',
              name: 'Rating',
              values: [
                {
                  value: 4,
                },
              ],
            },
            {
              attributeFQN: 'tenant~best-use',
              name: 'Best Use',
              values: [
                {
                  value: 'Backpacking',
                },
              ],
            },
            {
              attributeFQN: 'tenant~brand',
              name: 'Brand',
              values: [
                {
                  value: 'JanSport',
                },
              ],
            },
            {
              attributeFQN: 'tenant~role',
              name: 'role',
              values: [
                {
                  value: 'Unapproved',
                },
              ],
            },
            {
              attributeFQN: 'tenant~hot-item',
              name: 'Hot Item',
              values: [
                {
                  value: false,
                },
              ],
            },
            {
              attributeFQN: 'tenant~top-seller',
              name: 'Top Seller',
              values: [
                {
                  value: false,
                },
              ],
            },
            {
              attributeFQN: 'tenant~mystic-tested',
              name: 'Mystic Tested',
              values: [
                {
                  value: false,
                },
              ],
            },
            {
              attributeFQN: 'tenant~specifications',
              name: 'Specifications',
              values: [
                {
                  value: '• 4-point side compression straps \n• Hydration sle',
                },
              ],
            },
            {
              attributeFQN: 'tenant~materials',
              name: 'Materials',
              values: [
                {
                  value: '• 50% nylon\n• 25% cotton\n• 25% spandex ',
                },
              ],
            },
            {
              attributeFQN: 'tenant~other-details',
              name: 'Other Details',
              values: [
                {
                  value: 'This is a great use backpack',
                },
              ],
            },
            {
              attributeFQN: 'tenant~loyalty-point-value',
              name: 'LoyaltyPointValue',
              values: [
                {
                  value: 100,
                },
              ],
            },
            {
              attributeFQN: 'tenant~bag-style',
              name: 'Bag Style',
              values: [
                {
                  value: 'Backpack',
                },
              ],
            },
            {
              attributeFQN: 'tenant~brand-colors',
              name: 'Color',
              values: [
                {
                  value: 'Grey-Tar/Forge-Grey',
                },
              ],
            },
            {
              attributeFQN: 'tenant~faset-color',
              name: 'Color',
              values: [
                {
                  value: 'Grey',
                },
              ],
            },
            {
              attributeFQN: 'tenant~frame-type',
              name: 'Frame Type',
              values: [
                {
                  value: 'Internal-Frame',
                },
              ],
            },
            {
              attributeFQN: 'tenant~gender',
              name: 'Gender',
              values: [
                {
                  value: 'Unisex',
                },
              ],
            },
            {
              attributeFQN: 'tenant~hydration-compatible',
              name: 'Hydration Compatible',
              values: [
                {
                  value: true,
                },
              ],
            },
            {
              attributeFQN: 'tenant~material',
              name: 'Material',
              values: [
                {
                  value: '600-denier-polyester',
                },
              ],
            },
            {
              attributeFQN: 'tenant~number-of-exterior-pockets',
              name: 'Number of Exterior Pockets',
              values: [
                {
                  value: '5---main-compartment',
                },
              ],
            },
            {
              attributeFQN: 'tenant~pack-loading',
              name: 'Pack Loading',
              values: [
                {
                  value: 'Top',
                },
              ],
            },
            {
              attributeFQN: 'tenant~size',
              name: 'Size',
              values: [
                {
                  value: 'One-Size',
                },
              ],
            },
            {
              attributeFQN: 'tenant~sleeping-bag-compartment',
              name: 'Sleeping Bag Compartment',
              values: [
                {
                  value: false,
                },
              ],
            },
            {
              attributeFQN: 'tenant~trip-length-capacity',
              name: 'Trip Length / Capacity',
              values: [
                {
                  value: 'Wekend--35-50L-',
                },
              ],
            },
          ],
          sku: null,
          price: {
            price: 100,
            salePrice: null,
          },
          categories: [
            {
              id: 19,
            },
            {
              id: 36,
            },
          ],
        },
      },
      {
        fulfillmentMethod: 'Ship',
        id: 'c5a2a3fbe5c84b39b910aee600ae6fb9',
        total: 120,
        subtotal: 120,
        discountTotal: 0,
        quantity: 1,
        product: {
          productCode: '171129',
          name: 'JBL Flip 5 Portable Waterproof Speaker',
          description:
            '<div>Take your tunes anywhere with the JBL Flip 5 portable waterproof speaker. It features convenient Bluetooth® wireless connectivity and a built-in rechargeable battery to keep the music playing longer.<br></div>',
          imageUrl:
            '//cdn-sb.mozu.com/29927-49696/cms/49696/files/79829a3c-e1d4-4438-a417-af9a3c57effa',
          options: [
            {
              attributeFQN: 'tenant~brand-colors',
              name: 'Color',
              value: 'Black',
            },
          ],
          properties: [
            {
              attributeFQN: 'tenant~availability',
              name: 'Availability',
              values: [
                {
                  value: '1-2days',
                },
              ],
            },
            {
              attributeFQN: 'tenant~product-crosssell',
              name: 'Product Cross-Sells',
              values: [
                {
                  value: '464646',
                },
                {
                  value: '30055',
                },
                {
                  value: '0-0-22',
                },
                {
                  value: 'AH-001',
                },
              ],
            },
            {
              attributeFQN: 'tenant~popularity',
              name: 'Popularity',
              values: [
                {
                  value: 6,
                },
              ],
            },
            {
              attributeFQN: 'tenant~rating',
              name: 'Rating',
              values: [
                {
                  value: 4.25,
                },
              ],
            },
            {
              attributeFQN: 'tenant~best-use',
              name: 'Best Use',
              values: [
                {
                  value: 'Travel',
                },
              ],
            },
            {
              attributeFQN: 'tenant~gps-satellite-detectable',
              name: 'GPS/Satellite Detectable',
              values: [
                {
                  value: false,
                },
              ],
            },
            {
              attributeFQN: 'tenant~interval-training',
              name: 'Interval Training',
              values: [
                {
                  value: false,
                },
              ],
            },
            {
              attributeFQN: 'tenant~pace-alert',
              name: 'Pace Alert',
              values: [
                {
                  value: false,
                },
              ],
            },
            {
              attributeFQN: 'tenant~track-steps',
              name: 'Track Steps',
              values: [
                {
                  value: false,
                },
              ],
            },
            {
              attributeFQN: 'tenant~tracks-calories-burned',
              name: 'Tracks Calories Burned',
              values: [
                {
                  value: false,
                },
              ],
            },
            {
              attributeFQN: 'tenant~sleep-tracking',
              name: 'Sleep Tracking',
              values: [
                {
                  value: false,
                },
              ],
            },
            {
              attributeFQN: 'tenant~hrm-included-integrated',
              name: 'HRM Included/Integrated',
              values: [
                {
                  value: false,
                },
              ],
            },
            {
              attributeFQN: 'tenant~pool-lap-recognition',
              name: 'Pool Lap Recognition',
              values: [
                {
                  value: false,
                },
              ],
            },
            {
              attributeFQN: 'tenant~stroke-recognition',
              name: 'Stroke Recognition',
              values: [
                {
                  value: false,
                },
              ],
            },
            {
              attributeFQN: 'tenant~v02-max-estimate',
              name: 'V02 Max Estimate',
              values: [
                {
                  value: false,
                },
              ],
            },
            {
              attributeFQN: 'tenant~recovery-advising',
              name: 'Recovery Advising',
              values: [
                {
                  value: false,
                },
              ],
            },
            {
              attributeFQN: 'tenant~compass',
              name: 'Compass',
              values: [
                {
                  value: false,
                },
              ],
            },
            {
              attributeFQN: 'tenant~programmable-routes',
              name: 'Programmable Routes',
              values: [
                {
                  value: false,
                },
              ],
            },
            {
              attributeFQN: 'tenant~visual-map-display',
              name: 'Visual Map Display',
              values: [
                {
                  value: false,
                },
              ],
            },
            {
              attributeFQN: 'tenant~alarm',
              name: 'Alarm',
              values: [
                {
                  value: false,
                },
              ],
            },
            {
              attributeFQN: 'tenant~stopwatch',
              name: 'Stopwatch',
              values: [
                {
                  value: false,
                },
              ],
            },
            {
              attributeFQN: 'tenant~time-display',
              name: 'Time Display',
              values: [
                {
                  value: false,
                },
              ],
            },
            {
              attributeFQN: 'tenant~smart-device-notifications',
              name: 'Smart Device Notifications',
              values: [
                {
                  value: false,
                },
              ],
            },
            {
              attributeFQN: 'tenant~average-heart-rate',
              name: 'Average Heart Rate',
              values: [
                {
                  value: false,
                },
              ],
            },
            {
              attributeFQN: 'tenant~waterproof',
              name: 'Waterproof',
              values: [
                {
                  value: false,
                },
              ],
            },
            {
              attributeFQN: 'tenant~heart-rate-target-zone-s-',
              name: 'Heart Rate Target Zone(s)',
              values: [
                {
                  value: false,
                },
              ],
            },
            {
              attributeFQN: 'tenant~hot-item',
              name: 'Hot Item',
              values: [
                {
                  value: false,
                },
              ],
            },
            {
              attributeFQN: 'tenant~top-seller',
              name: 'Top Seller',
              values: [
                {
                  value: false,
                },
              ],
            },
            {
              attributeFQN: 'tenant~mystic-tested',
              name: 'Mystic Tested',
              values: [
                {
                  value: false,
                },
              ],
            },
          ],
          sku: null,
          price: {
            price: 120,
            salePrice: null,
          },
          categories: [
            {
              id: 2,
            },
            {
              id: 7,
            },
          ],
        },
      },
    ],
    payments: [
      {
        id: '46029e95731e40d4896baee600b01002',
        paymentType: 'CreditCard',
        status: 'New',
        paymentWorkflow: 'Mozu',
        amountCollected: 0,
        amountCredited: 0,
        amountRequested: 220,
        billingInfo: {
          billingContact: {
            id: null,
            firstName: 'John',
            middleNameOrInitial: null,
            lastNameOrSurname: 'Doe',
            email: 'chandradeepta.laha@kibocommerce.com',
            address: {
              address1: 'Lamar Street',
              address2: '23/1',
              address3: null,
              addressType: null,
              stateOrProvince: 'TX',
              postalOrZipCode: '87878',
              cityOrTown: 'Austin',
              countryCode: 'US',
              isValidated: false,
            },
            phoneNumbers: {
              home: '9898495849',
            },
          },
          isSameBillingShippingAddress: false,
          card: {
            paymentServiceCardId: '91ee65434560404488c382a9295526ae',
            isTokenized: true,
            paymentOrCardType: 'VISA',
            cardNumberPartOrMask: '************1111',
            expireMonth: 1,
            expireYear: 2026,
          },
        },
      },
    ],
  },
}
