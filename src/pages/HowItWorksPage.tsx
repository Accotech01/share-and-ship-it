
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Gift, Heart, Package, Truck, 
  Search, User, CheckCircle, 
  MessageSquare, MapPin, CreditCard 
} from 'lucide-react';

const HowItWorksPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">How ShareCircle Works</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Our platform connects generous donors with people in need,
          making it easy to share resources while only covering logistics costs.
        </p>
      </div>

      {/* Main process overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
        <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="rounded-full bg-green-100 p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Gift className="h-8 w-8 text-brand-green" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-center">1. Register & Donate</h3>
            <p className="text-gray-600 text-center">
              Sign up and list items you no longer need but that might be valuable to others.
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="rounded-full bg-green-100 p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Heart className="h-8 w-8 text-brand-green" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-center">2. Browse & Request</h3>
            <p className="text-gray-600 text-center">
              Browse available items and request what you need. All items are free.
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="rounded-full bg-green-100 p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Package className="h-8 w-8 text-brand-green" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-center">3. Connect & Arrange</h3>
            <p className="text-gray-600 text-center">
              Donors approve requests and arrange with recipients for pickup or delivery.
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="rounded-full bg-green-100 p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Truck className="h-8 w-8 text-brand-green" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-center">4. Pay Logistics Only</h3>
            <p className="text-gray-600 text-center">
              Recipients only pay for shipping or delivery costs, not for the items themselves.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* For Donors */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">For Donors</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Share items you no longer need and help others while reducing waste.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col">
            <div className="bg-gray-50 p-6 rounded-lg flex-grow">
              <div className="mb-6 space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 h-8 w-8 bg-brand-green rounded-full flex items-center justify-center text-white">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Create a listing</h3>
                    <p className="text-gray-600">
                      Sign up and list items you're willing to donate. Add photos, a description, 
                      and specify whether your item can be shipped or is pickup-only.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 h-8 w-8 bg-brand-green rounded-full flex items-center justify-center text-white">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Review requests</h3>
                    <p className="text-gray-600">
                      Recipients will send requests for your items. Review their profiles and 
                      messages to decide who should receive your donation.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 h-8 w-8 bg-brand-green rounded-full flex items-center justify-center text-white">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Coordinate and complete</h3>
                    <p className="text-gray-600">
                      Approve a request and arrange logistics. For local pickup, meet at a safe location. 
                      For shipping, prepare the item for the recipient to arrange delivery.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Button asChild>
                  <Link to="/donate">Donate an Item</Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-brand-green rounded-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-6">Benefits for Donors</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 flex-shrink-0" />
                <p>Clear space in your home by giving away items you no longer need</p>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 flex-shrink-0" />
                <p>Reduce waste and environmental impact by extending the life of your belongings</p>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 flex-shrink-0" />
                <p>Support your community and help those who could benefit from your items</p>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 flex-shrink-0" />
                <p>Feel good knowing your donations directly help individuals in need</p>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 flex-shrink-0" />
                <p>Zero hassle with pickup options available for larger items</p>
              </div>
            </div>

            <div className="mt-8 border-t border-white/20 pt-6">
              <div className="italic">
                "Donating through ShareCircle was so rewarding. Knowing my unused laptop went to a student who really needed it made my day."
                <div className="mt-2 font-bold">— Maria S., Brooklyn</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* For Recipients */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">For Recipients</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find items you need without the cost, just pay for delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-brand-orange rounded-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-6">Benefits for Recipients</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 flex-shrink-0" />
                <p>Access quality items for free — you only pay for delivery if needed</p>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 flex-shrink-0" />
                <p>Find everyday necessities, furniture, electronics, clothing, and more</p>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 flex-shrink-0" />
                <p>Support sustainability by reusing items rather than buying new</p>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 flex-shrink-0" />
                <p>Connect with generous community members willing to share</p>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 flex-shrink-0" />
                <p>Simple process with transparent logistics costs</p>
              </div>
            </div>

            <div className="mt-8 border-t border-white/20 pt-6">
              <div className="italic">
                "As a college student on a tight budget, finding quality textbooks on ShareCircle helped me tremendously. I only paid for shipping!"
                <div className="mt-2 font-bold">— James T., Student</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="bg-gray-50 p-6 rounded-lg flex-grow">
              <div className="mb-6 space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 h-8 w-8 bg-brand-orange rounded-full flex items-center justify-center text-white">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Browse available items</h3>
                    <p className="text-gray-600">
                      Search by category, location, or keyword to find items you need. 
                      Apply filters to narrow down results based on your preferences.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 h-8 w-8 bg-brand-orange rounded-full flex items-center justify-center text-white">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Make a request</h3>
                    <p className="text-gray-600">
                      Send a request to the donor explaining why you're interested in the item. 
                      Be clear about your situation and how the item will help you.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 h-8 w-8 bg-brand-orange rounded-full flex items-center justify-center text-white">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Arrange receipt</h3>
                    <p className="text-gray-600">
                      If your request is approved, arrange pickup or pay for shipping. 
                      For local pickup, meet at a safe location. For shipping, cover only the logistics costs.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Button asChild className="bg-brand-orange hover:bg-brand-orange/90">
                  <Link to="/browse">Browse Items</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get answers to common questions about using ShareCircle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-xl mb-4">Is ShareCircle really free?</h3>
            <p className="text-gray-600 mb-6">
              Yes! All items on ShareCircle are donated for free. Recipients only pay for 
              logistics costs (delivery or shipping) if needed. If you pick up the item 
              locally, there's no cost at all.
            </p>
            
            <h3 className="font-bold text-xl mb-4">How do I know if an item is still available?</h3>
            <p className="text-gray-600 mb-6">
              Items listed on the platform are available until marked as claimed. 
              When you request an item, the donor will review your request and 
              confirm if it's still available.
            </p>
            
            <h3 className="font-bold text-xl mb-4">Is my personal information safe?</h3>
            <p className="text-gray-600 mb-6">
              We take privacy seriously. Your contact information is only shared with 
              another user when a donation is confirmed and logistics need to be arranged. 
              All communication before that happens through our platform.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-xl mb-4">What items can be donated?</h3>
            <p className="text-gray-600 mb-6">
              Most household items, electronics, furniture, clothing, books, and more can 
              be donated. We prohibit illegal items, perishables, dangerous materials, 
              medications, and other restricted items. Please check our guidelines before listing.
            </p>
            
            <h3 className="font-bold text-xl mb-4">How are shipping and delivery handled?</h3>
            <p className="text-gray-600 mb-6">
              For local items, donors and recipients can arrange to meet for pickup. 
              For shipped items, recipients pay for the shipping costs directly through 
              our platform's logistics partners or arrange their own shipping service.
            </p>
            
            <h3 className="font-bold text-xl mb-4">What if there's an issue with my donation?</h3>
            <p className="text-gray-600 mb-6">
              We encourage donors to accurately describe items and recipients to ask questions. 
              If there's a significant discrepancy between the listing and the actual item, 
              please contact our support team for assistance.
            </p>
          </div>
        </div>
      </div>

      {/* Community Impact */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Community Impact</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Together, we're making a difference through generosity and sustainable practices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-4xl font-bold text-brand-green text-center mb-2">2,580</div>
              <p className="text-center text-gray-600">Items shared</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-4xl font-bold text-brand-green text-center mb-2">1,450</div>
              <p className="text-center text-gray-600">Kilograms of waste diverted</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-4xl font-bold text-brand-green text-center mb-2">865</div>
              <p className="text-center text-gray-600">Community members helped</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-brand-green text-white p-10 rounded-lg text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join our community today to start giving and receiving, creating a more sustainable and generous world.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" variant="default" className="bg-white text-brand-green hover:bg-gray-100">
            <Link to="/register">Sign Up Free</Link>
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
            <Link to="/browse">Browse Items</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;
