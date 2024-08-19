

export { };

declare global {
  interface PlaidInfo {
    linkToken?: string;
    hostedLinkURL?: string
    publicToken?: string
    itemId?: string
    accessToken?: string
    accountId?: string
  }
  interface Bill {
    id: string,
    userId: string,
    createdAt: string,
    description: string,
    amount: string
    originalAmount: string,
    paidTotalAmount: string
    pendingTotalAmount: string
    status: string
  }
}
