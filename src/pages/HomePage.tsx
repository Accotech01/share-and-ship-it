
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Gift, Heart, Package, Truck } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const HomePage = () => {
  const { currentUser } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-brand-green to-emerald-700 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Give What You Don't Need, Find What You Do
              </h1>
              <p className="text-lg md:text-xl mb-6">
                Join our community platform where generosity meets sustainability. 
                Donate items you no longer need or find things you're looking for, 
                all while reducing waste and helping others.
              </p>
              <div className="flex flex-wrap gap-4">
                {currentUser ? (
                  <>
                    <Button asChild size="lg" variant="default" className="bg-white text-brand-green hover:bg-gray-100">
                      <Link to="/donate">Donate Items</Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                      <Link to="/browse">Browse Items</Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild size="lg" variant="default" className="bg-white text-brand-green hover:bg-gray-100">
                      <Link to="/register">Sign Up Free</Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                      <Link to="/login">Login</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
                alt="People sharing items"
                className="rounded-lg shadow-xl w-full h-auto object-cover"
                style={{ maxHeight: '400px' }}
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              ShareCircle connects those with items to spare with those in need,
              covering only the cost of logistics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="rounded-full bg-green-100 p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Gift className="h-8 w-8 text-brand-green" />
                </div>
                <h3 className="text-lg font-bold mb-2">1. Register & Donate</h3>
                <p className="text-gray-600">
                  Sign up and list items you no longer need but that others might find valuable.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="rounded-full bg-green-100 p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Heart className="h-8 w-8 text-brand-green" />
                </div>
                <h3 className="text-lg font-bold mb-2">2. Browse & Request</h3>
                <p className="text-gray-600">
                  Browse available items and request what you need. All items are free.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="rounded-full bg-green-100 p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Package className="h-8 w-8 text-brand-green" />
                </div>
                <h3 className="text-lg font-bold mb-2">3. Connect & Arrange</h3>
                <p className="text-gray-600">
                  Donors approve requests and arrange with recipients for pickup or delivery.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="rounded-full bg-green-100 p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Truck className="h-8 w-8 text-brand-green" />
                </div>
                <h3 className="text-lg font-bold mb-2">4. Pay Logistics Only</h3>
                <p className="text-gray-600">
                  Recipients only pay for shipping or delivery costs, not for the items themselves.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link to="/how-it-works">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Items Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Items</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse these recently added items looking for a new home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Sample Items - In a real app, these would come from an API */}
            <Card className="overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
                alt="Laptop"
                className="h-48 w-full object-cover"
              />
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold">Working Laptop</h3>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Electronics</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Slightly used laptop in good condition. Perfect for students or basic computing needs.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Brooklyn, NY</span>
                  <Button asChild size="sm" variant="outline">
                    <Link to="/item/1">View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1721322800607-8c38375eef04"
                alt="Furniture"
                className="h-48 w-full object-cover"
              />
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold">Sofa Set</h3>
                  <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded">Furniture</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Comfortable three-seater sofa with armchair. Minor wear but in good condition.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Chicago, IL</span>
                  <Button asChild size="sm" variant="outline">
                    <Link to="/item/2">View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
                alt="Books"
                className="h-48 w-full object-cover"
              />
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold">Computer Science Books</h3>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Books</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Collection of programming and computer science textbooks. Great for CS students.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Austin, TX</span>
                  <Button asChild size="sm" variant="outline">
                    <Link to="/item/3">View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link to="/browse">Browse All Items</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Stories from Our Community</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from people who have experienced the joy of giving and receiving through ShareCircle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <p className="italic text-gray-600 mb-4">
                "I had furniture I didn't need after downsizing, and knowing it went to a family who really needed it made me so happy. The process was simple and rewarding."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-brand-green flex items-center justify-center text-white">M</div>
                <div className="ml-4">
                  <h4 className="font-semibold">Maria S.</h4>
                  <p className="text-sm text-gray-500">Donor</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <p className="italic text-gray-600 mb-4">
                "As a college student on a tight budget, finding quality textbooks on ShareCircle helped me tremendously. I only paid for shipping!"
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-brand-orange flex items-center justify-center text-white">J</div>
                <div className="ml-4">
                  <h4 className="font-semibold">James T.</h4>
                  <p className="text-sm text-gray-500">Recipient</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <p className="italic text-gray-600 mb-4">
                "ShareCircle has transformed how I think about my unused items. Now instead of throwing things away, I first see if someone else could use them."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-brand-green flex items-center justify-center text-white">A</div>
                <div className="ml-4">
                  <h4 className="font-semibold">Aisha M.</h4>
                  <p className="text-sm text-gray-500">Regular Donor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-green text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our community today to start giving and receiving, creating a more sustainable and generous world.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {currentUser ? (
              <>
                <Button asChild size="lg" variant="default" className="bg-white text-brand-green hover:bg-gray-100">
                  <Link to="/donate">Donate Now</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link to="/browse">Find Items</Link>
                </Button>
              </>
            ) : (
              <>
                <Button asChild size="lg" variant="default" className="bg-white text-brand-green hover:bg-gray-100">
                  <Link to="/register">Join Now</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link to="/how-it-works">Learn More</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
