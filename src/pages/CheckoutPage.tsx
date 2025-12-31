import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  CreditCard,
  Lock,
  Check,
  ChevronRight,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

type Step = 'information' | 'shipping' | 'payment';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotal, shipping, tax, total, clearCart } = useCart();
  const { isAuthenticated } = useAuth();

  const [currentStep, setCurrentStep] = useState<Step>('information');
  const [isProcessing, setIsProcessing] = useState(false);

  // Form states
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('United States');
  const [phone, setPhone] = useState('');
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#F9F6F1] noise-texture">
        <Header />
        <main className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 text-center">
            <h1 className="font-display text-4xl font-bold text-[#2C2420] mb-4">
              Your cart is empty
            </h1>
            <p className="font-body text-[#3A3A3A] mb-8">
              Add some items to your cart before checking out.
            </p>
            <Link to="/shop">
              <Button className="bg-[#2C2420] hover:bg-[#3A3A3A] text-white rounded-full px-8">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const steps = [
    { id: 'information', label: 'Information' },
    { id: 'shipping', label: 'Shipping' },
    { id: 'payment', label: 'Payment' },
  ];

  const handleSubmitOrder = async () => {
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    clearCart();
    navigate('/order-confirmation', {
      state: {
        orderId: `WA-${Date.now()}`,
        total,
      },
    });
  };

  const goToNextStep = () => {
    if (currentStep === 'information') setCurrentStep('shipping');
    else if (currentStep === 'shipping') setCurrentStep('payment');
  };

  const goToPreviousStep = () => {
    if (currentStep === 'payment') setCurrentStep('shipping');
    else if (currentStep === 'shipping') setCurrentStep('information');
  };

  return (
    <div className="min-h-screen bg-[#F9F6F1] noise-texture">
      <Header />

      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm font-body text-[#3A3A3A] mb-8">
            <Link to="/cart" className="hover:text-[#A8C5D1] transition-colors">
              Cart
            </Link>
            {steps.map((step, index) => (
              <span key={step.id} className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4" />
                <span
                  className={
                    currentStep === step.id
                      ? 'text-[#2C2420] font-medium'
                      : ''
                  }
                >
                  {step.label}
                </span>
              </span>
            ))}
          </nav>

          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-4 mb-12">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                    currentStep === step.id
                      ? 'bg-[#D4AF6A] text-[#2C2420]'
                      : steps.findIndex((s) => s.id === currentStep) > index
                      ? 'bg-[#2C2420] text-white'
                      : 'bg-[#E8E3DB] text-[#3A3A3A]'
                  }`}
                >
                  {steps.findIndex((s) => s.id === currentStep) > index ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    index + 1
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-24 h-1 rounded-full transition-colors ${
                      steps.findIndex((s) => s.id === currentStep) > index
                        ? 'bg-[#2C2420]'
                        : 'bg-[#E8E3DB]'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form Section */}
            <div className="lg:col-span-3">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-[#FEFDFB] rounded-2xl p-8 soft-shadow"
              >
                {/* Information Step */}
                {currentStep === 'information' && (
                  <div className="space-y-6">
                    <h2 className="font-display text-2xl font-bold text-[#2C2420]">
                      Contact Information
                    </h2>

                    {!isAuthenticated && (
                      <p className="font-body text-sm text-[#3A3A3A]">
                        Already have an account?{' '}
                        <Link
                          to="/login"
                          state={{ from: '/checkout' }}
                          className="text-[#A8C5D1] hover:text-[#2C2420]"
                        >
                          Log in
                        </Link>
                      </p>
                    )}

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="mt-1 rounded-xl"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="mt-1 rounded-xl"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="mt-1 rounded-xl"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Street address"
                          className="mt-1 rounded-xl"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="mt-1 rounded-xl"
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            className="mt-1 rounded-xl"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="postalCode">Postal Code</Label>
                          <Input
                            id="postalCode"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            className="mt-1 rounded-xl"
                          />
                        </div>
                        <div>
                          <Label htmlFor="country">Country</Label>
                          <Input
                            id="country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="mt-1 rounded-xl"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="(555) 123-4567"
                          className="mt-1 rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Shipping Step */}
                {currentStep === 'shipping' && (
                  <div className="space-y-6">
                    <h2 className="font-display text-2xl font-bold text-[#2C2420]">
                      Shipping Method
                    </h2>

                    <RadioGroup
                      value={shippingMethod}
                      onValueChange={setShippingMethod}
                      className="space-y-4"
                    >
                      <div
                        className={`flex items-center justify-between p-4 rounded-xl border-2 transition-colors cursor-pointer ${
                          shippingMethod === 'standard'
                            ? 'border-[#D4AF6A] bg-[#D4AF6A]/5'
                            : 'border-[#E8E3DB]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="standard" id="standard" />
                          <div>
                            <Label htmlFor="standard" className="cursor-pointer">
                              Standard Shipping
                            </Label>
                            <p className="text-sm text-[#3A3A3A]/60">
                              5-7 business days
                            </p>
                          </div>
                        </div>
                        <span className="font-semibold text-[#2C2420]">
                          {subtotal > 100 ? 'Free' : '$15.00'}
                        </span>
                      </div>

                      <div
                        className={`flex items-center justify-between p-4 rounded-xl border-2 transition-colors cursor-pointer ${
                          shippingMethod === 'express'
                            ? 'border-[#D4AF6A] bg-[#D4AF6A]/5'
                            : 'border-[#E8E3DB]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="express" id="express" />
                          <div>
                            <Label htmlFor="express" className="cursor-pointer">
                              Express Shipping
                            </Label>
                            <p className="text-sm text-[#3A3A3A]/60">
                              2-3 business days
                            </p>
                          </div>
                        </div>
                        <span className="font-semibold text-[#2C2420]">$25.00</span>
                      </div>

                      <div
                        className={`flex items-center justify-between p-4 rounded-xl border-2 transition-colors cursor-pointer ${
                          shippingMethod === 'overnight'
                            ? 'border-[#D4AF6A] bg-[#D4AF6A]/5'
                            : 'border-[#E8E3DB]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="overnight" id="overnight" />
                          <div>
                            <Label htmlFor="overnight" className="cursor-pointer">
                              Overnight Shipping
                            </Label>
                            <p className="text-sm text-[#3A3A3A]/60">
                              Next business day
                            </p>
                          </div>
                        </div>
                        <span className="font-semibold text-[#2C2420]">$45.00</span>
                      </div>
                    </RadioGroup>
                  </div>
                )}

                {/* Payment Step */}
                {currentStep === 'payment' && (
                  <div className="space-y-6">
                    <h2 className="font-display text-2xl font-bold text-[#2C2420]">
                      Payment Method
                    </h2>

                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                      className="space-y-4"
                    >
                      <div
                        className={`p-4 rounded-xl border-2 transition-colors ${
                          paymentMethod === 'card'
                            ? 'border-[#D4AF6A] bg-[#D4AF6A]/5'
                            : 'border-[#E8E3DB]'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <RadioGroupItem value="card" id="card" />
                          <Label htmlFor="card" className="cursor-pointer flex items-center gap-2">
                            <CreditCard className="w-5 h-5" />
                            Credit Card
                          </Label>
                        </div>

                        {paymentMethod === 'card' && (
                          <div className="space-y-4 ml-7">
                            <div>
                              <Label htmlFor="cardNumber">Card Number</Label>
                              <Input
                                id="cardNumber"
                                placeholder="1234 5678 9012 3456"
                                className="mt-1 rounded-xl"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="expiry">Expiry Date</Label>
                                <Input
                                  id="expiry"
                                  placeholder="MM/YY"
                                  className="mt-1 rounded-xl"
                                />
                              </div>
                              <div>
                                <Label htmlFor="cvc">CVC</Label>
                                <Input
                                  id="cvc"
                                  placeholder="123"
                                  className="mt-1 rounded-xl"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-colors cursor-pointer ${
                          paymentMethod === 'paypal'
                            ? 'border-[#D4AF6A] bg-[#D4AF6A]/5'
                            : 'border-[#E8E3DB]'
                        }`}
                      >
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal" className="cursor-pointer">
                          PayPal
                        </Label>
                      </div>
                    </RadioGroup>

                    <div className="flex items-center gap-2 text-sm text-[#3A3A3A]/60">
                      <Lock className="w-4 h-4" />
                      Your payment information is secure and encrypted
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#E8E3DB]">
                  {currentStep !== 'information' ? (
                    <Button
                      variant="ghost"
                      onClick={goToPreviousStep}
                      className="text-[#3A3A3A]"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                  ) : (
                    <Link to="/cart">
                      <Button variant="ghost" className="text-[#3A3A3A]">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Return to Cart
                      </Button>
                    </Link>
                  )}

                  {currentStep !== 'payment' ? (
                    <Button
                      onClick={goToNextStep}
                      className="bg-[#2C2420] hover:bg-[#3A3A3A] text-white rounded-full px-8"
                    >
                      Continue
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmitOrder}
                      disabled={isProcessing}
                      className="bg-[#D4AF6A] hover:bg-[#D4AF6A]/90 text-[#2C2420] rounded-full px-8 font-semibold disabled:opacity-50"
                    >
                      {isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
                    </Button>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-2">
              <div className="bg-[#FEFDFB] rounded-2xl p-6 soft-shadow sticky top-28">
                <h3 className="font-display text-xl font-bold text-[#2C2420] mb-6">
                  Order Summary
                </h3>

                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-4">
                      <div className="relative">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#3A3A3A] text-white text-xs font-semibold rounded-full flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-body text-sm font-semibold text-[#2C2420] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <p className="font-body text-sm text-[#3A3A3A]/60">
                          ${item.product.price} × {item.quantity}
                        </p>
                      </div>
                      <span className="font-body font-semibold text-[#2C2420]">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-6 border-t border-[#E8E3DB]">
                  <div className="flex justify-between font-body text-[#3A3A3A]">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-body text-[#3A3A3A]">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between font-body text-[#3A3A3A]">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between font-display text-xl font-bold text-[#2C2420] pt-6 mt-6 border-t border-[#E8E3DB]">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
