export async function createVivenuCheckout(eventId: string) {
  // Simulate Vivenu Headless Checkout API call
  // In reality: 
  // const res = await fetch(`https://api.vivenu.com/v1/checkouts`, { ... })
  
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
  
  return {
    checkoutId: `viv_${Math.random().toString(36).substr(2, 9)}`,
    eventId,
    total: 45.00,
    status: "created"
  };
}

export async function processVivenuPayment(checkoutId: string, paymentData: any) {
  await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate payment processing
  
  return {
    success: true,
    transactionId: `tx_${Math.random().toString(36).substr(2, 9)}`,
    orderNumber: `FAT-${Math.floor(10000 + Math.random() * 90000)}`
  };
}
