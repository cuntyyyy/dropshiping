import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const from = (location.state as { from?: string })?.from || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const result = await login(email, password);
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F6F1] noise-texture">
      <Header />

      <main className="pt-24 pb-16">
        <div className="max-w-md mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-[#FEFDFB] rounded-3xl p-8 soft-shadow-lg"
          >
            <div className="text-center mb-8">
              <h1 className="font-display text-3xl font-bold text-[#2C2420] mb-2">
                Welcome Back
              </h1>
              <p className="font-body text-[#3A3A3A]">
                Sign in to your account to continue
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#E8C4C4]/20 border border-[#E8C4C4] text-[#2C2420] px-4 py-3 rounded-xl text-sm"
                >
                  {error}
                </motion.div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#2C2420]">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#3A3A3A]/40" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="pl-12 py-6 rounded-xl border-[#E8E3DB] focus:border-[#A8C5D1] focus:ring-[#A8C5D1]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-[#2C2420]">
                    Password
                  </Label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-[#A8C5D1] hover:text-[#2C2420] transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#3A3A3A]/40" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-12 pr-12 py-6 rounded-xl border-[#E8E3DB] focus:border-[#A8C5D1] focus:ring-[#A8C5D1]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#3A3A3A]/40 hover:text-[#3A3A3A] transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#2C2420] hover:bg-[#3A3A3A] text-white font-semibold rounded-full py-6 soft-shadow transition-all duration-300 hover:scale-[1.02] disabled:opacity-50"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="font-body text-[#3A3A3A]">
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className="text-[#A8C5D1] hover:text-[#2C2420] font-semibold transition-colors"
                >
                  Sign up
                </Link>
              </p>
            </div>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-[#F9F6F1] rounded-xl">
              <p className="text-xs text-[#3A3A3A]/60 text-center mb-2">
                Demo Credentials
              </p>
              <div className="text-xs text-[#3A3A3A] space-y-1">
                <p>
                  <strong>Customer:</strong> demo@wisharea.com / demo123
                </p>
                <p>
                  <strong>Admin:</strong> admin@wisharea.com / admin123
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
