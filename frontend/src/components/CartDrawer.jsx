import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, CheckCircle2 } from 'lucide-react';

export default function CartDrawer({ isOpen, setIsOpen, cart, setCart, currency }) {
  const currencySymbols = { INR: '₹', USD: '$', AED: 'AED ' };
  const symbol = currencySymbols[currency] || '₹';

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  if (!isOpen) return null;

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const subscriptionTotal = Math.round(totalAmount * 0.85);

  const removeItem = (id, format) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.format === format)));
  };

  const updateQuantity = (id, format, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id && item.format === format) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleCheckout = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart,
          currency: currency,
          is_subscription: true,
          customer_email: 'customer@example.com',
          shipping_address: { city: 'Mumbai', country: 'India' }
        })
      });
      const data = await res.json();
      setOrderSuccess(data);
      setCart([]);
    } catch (err) {
      console.error('Checkout error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-[#f5ead8] h-full shadow-2xl flex flex-col justify-between p-6 overflow-y-auto animate-fade-in border-l border-[#201e1d]/15">
        
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-[#201e1d]/10 pb-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#c67139]" />
            <h3 className="font-serif text-2xl text-[#201e1d]">Your Cart</h3>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-full hover:bg-[#ebddc5] transition-colors"
          >
            <X className="w-5 h-5 text-[#201e1d]" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 my-6 overflow-y-auto space-y-4">
          {cart.length === 0 && !orderSuccess ? (
            <div className="text-center py-12 text-[#201e1d]/60 space-y-3">
              <ShoppingBag className="w-10 h-10 mx-auto stroke-1 text-[#201e1d]/40" />
              <p className="text-sm">Your metabolic cart is empty.</p>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div key={idx} className="bg-[#ebddc5] border border-[#201e1d]/10 rounded-2xl p-4 flex items-center justify-between gap-4">
                <div className="space-y-1 text-left">
                  <div className="font-serif font-bold text-base text-[#201e1d]">{item.name}</div>
                  <div className="text-xs text-[#201e1d]/60 font-sans">{item.format || item.flavor}</div>
                  <div className="font-serif font-bold text-sm text-[#c67139] mt-1">
                    {symbol}{item.price * item.quantity}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-[#201e1d]/20 rounded-full bg-[#f5ead8] px-2 py-0.5 text-xs">
                    <button onClick={() => updateQuantity(item.id, item.format, -1)} className="px-1 text-lg font-bold text-[#201e1d]">-</button>
                    <span className="px-2 font-mono font-bold text-[#201e1d]">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.format, 1)} className="px-1 text-lg font-bold text-[#201e1d]">+</button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id, item.format)}
                    className="text-[#201e1d]/40 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}

          {orderSuccess && (
            <div className="bg-[#e1eecc] border border-[#7a8a5e]/30 rounded-2xl p-6 text-left space-y-3">
              <div className="flex items-center gap-2 text-[#3d472b] font-bold text-base">
                <CheckCircle2 className="w-5 h-5 text-[#7a8a5e]" />
                <span>Order Confirmed!</span>
              </div>
              <div className="text-xs text-[#3d472b] space-y-1 font-mono">
                <div>Order ID: {orderSuccess.order_id}</div>
                <div>Total Amount: {symbol}{orderSuccess.total_amount}</div>
                <div>Estimated Delivery: {orderSuccess.estimated_delivery}</div>
              </div>
              <p className="text-xs text-[#3d472b]/80 pt-2 border-t border-[#7a8a5e]/20">
                {orderSuccess.message}
              </p>
            </div>
          )}
        </div>

        {/* Drawer Footer & Checkout */}
        {cart.length > 0 && (
          <div className="border-t border-[#201e1d]/10 pt-4 space-y-4 text-left">
            <div className="flex items-center justify-between text-base font-bold text-[#201e1d]">
              <span>Total (15% Subscription Discount):</span>
              <span className="font-serif text-2xl text-[#c67139]">{symbol}{subscriptionTotal}</span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isSubmitting}
              className="btn btn-primary w-full py-3.5 text-base"
            >
              {isSubmitting ? "Processing Order..." : "Complete Order Simulation"}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
