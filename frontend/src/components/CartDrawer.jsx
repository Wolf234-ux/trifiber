import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, CheckCircle2, ArrowRight } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/50 backdrop-blur-xs flex justify-end animate-in fade-in">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between p-6 overflow-y-auto animate-fade-in border-l border-slate-200">
        
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-orange-600" />
            <h3 className="font-heading text-2xl font-bold text-slate-900">Your Cart</h3>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 my-6 overflow-y-auto space-y-4">
          {cart.length === 0 && !orderSuccess ? (
            <div className="text-center py-16 text-slate-400 space-y-3">
              <ShoppingBag className="w-12 h-12 mx-auto stroke-1 text-slate-300" />
              <p className="text-sm font-medium">Your metabolic cart is empty.</p>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between gap-4">
                <div className="space-y-1 text-left">
                  <div className="font-heading font-bold text-base text-slate-900">{item.name}</div>
                  <div className="text-xs text-slate-500 font-sans">{item.format || item.flavor}</div>
                  <div className="font-heading font-bold text-sm text-orange-600 mt-1">
                    {symbol}{item.price * item.quantity}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-slate-200 rounded-full bg-white px-2 py-0.5 text-xs shadow-sm">
                    <button onClick={() => updateQuantity(item.id, item.format, -1)} className="px-1 text-base font-bold text-slate-700 hover:text-orange-600">-</button>
                    <span className="px-2 font-mono font-bold text-slate-900">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.format, 1)} className="px-1 text-base font-bold text-slate-700 hover:text-orange-600">+</button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id, item.format)}
                    className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}

          {/* Order Success State */}
          {orderSuccess && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="font-heading text-xl font-bold text-emerald-900">Order Placed Successfully!</h4>
              <p className="text-xs text-emerald-700">
                Order ID: {orderSuccess.order_id || 'TFH-98124'}. A confirmation has been sent to your email.
              </p>
            </div>
          )}
        </div>

        {/* Drawer Footer / Checkout */}
        {cart.length > 0 && (
          <div className="border-t border-slate-200 pt-4 space-y-4 text-left">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Estimated Total:</span>
              <span className="font-heading text-2xl font-bold text-slate-900">
                {symbol}{totalAmount}
              </span>
            </div>

            <div className="bg-emerald-50 rounded-xl p-3 text-xs text-emerald-800 flex items-center justify-between border border-emerald-200">
              <span>Subscription VIP Discount (15% Off):</span>
              <span className="font-mono font-bold text-emerald-700">{symbol}{subscriptionTotal} / mo</span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isSubmitting}
              className="btn btn-primary w-full py-4 text-sm font-bold flex items-center justify-center gap-2 shadow-md"
            >
              {isSubmitting ? (
                <span>Processing Order...</span>
              ) : (
                <>
                  <span>Proceed to Secure Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
