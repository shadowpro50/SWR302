import React from 'react';
import { Link } from 'react-router-dom';
import { Droplet, Calendar, Heart, Zap, Users, Info } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import BloodTypeCard from '../components/BloodTypeCard';

const HomePage: React.FC = () => {
  const { bloodInventory } = useAppContext();
  
  // Calculate which blood types are critically low (less than 5 units)
  const criticalBloodTypes = Object.entries(bloodInventory)
    .filter(([_, amount]) => amount < 5)
    .map(([type]) => type);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="hero-gradient py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Your Donation <span className="text-red-600">Saves Lives</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-xl">
                Every drop counts. Join our community of donors and help those in need. 
                One donation can save up to three lives.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/register"
                  className="btn-donate inline-flex items-center justify-center rounded-lg bg-red-600 px-6 py-3 text-base font-medium text-white shadow-lg hover:bg-red-700 transition-all duration-300"
                >
                  <Droplet className="mr-2 h-5 w-5" />
                  Become a Donor
                </Link>
                <Link
                  to="/appointments"
                  className="inline-flex items-center justify-center rounded-lg bg-white border border-red-200 px-6 py-3 text-base font-medium text-red-600 shadow-sm hover:bg-red-50 transition-all duration-300"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Donation
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <img
                src="https://images.pexels.com/photos/6823562/pexels-photo-6823562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Blood donation"
                className="rounded-lg shadow-xl max-w-full h-auto"
                style={{ maxHeight: '400px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blood Inventory Status
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Current Blood Inventory</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our current blood supply levels. Critical needs are highlighted.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {Object.entries(bloodInventory).map(([type, amount]) => (
              <BloodTypeCard
                key={type}
                type={type as any}
                amount={amount}
                isCritical={amount < 5}
              />
            ))}
          </div>
          
          {criticalBloodTypes.length > 0 && (
            <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-4 max-w-3xl mx-auto">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Zap className="h-5 w-5 text-red-500" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Critical Need Alert</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>
                      We urgently need donors with blood types: {criticalBloodTypes.join(', ')}. 
                      Please consider donating if you are eligible.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-10 text-center">
            <Link
              to="/inventory"
              className="inline-flex items-center text-red-600 hover:text-red-800 font-medium"
            >
              View detailed inventory
              <svg className="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section> */}
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How LifeDrop Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform connects donors with those in need, making the blood donation process simple and effective.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 donor-card">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <Droplet className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Register as a Donor</h3>
              <p className="text-gray-600 mb-4">
                Create your donor profile with your blood type and contact information to join our life-saving community.
              </p>
              <Link to="/register" className="text-red-600 font-medium hover:text-red-800 inline-flex items-center">
                Register Now
                <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 donor-card">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Schedule a Donation</h3>
              <p className="text-gray-600 mb-4">
                Book an appointment at a donation center near you at a time that's convenient for your schedule.
              </p>
              <Link to="/appointments" className="text-red-600 font-medium hover:text-red-800 inline-flex items-center">
                Schedule Now
                <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 donor-card">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Save Lives</h3>
              <p className="text-gray-600 mb-4">
                Your donation helps patients in emergency situations, surgeries, cancer treatments, and chronic illnesses.
              </p>
              <Link to="/resources" className="text-red-600 font-medium hover:text-red-800 inline-flex items-center">
                Learn More
                <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-12 bg-red-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">10,000+</div>
              <div className="text-red-200">Lives Saved</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">5,000+</div>
              <div className="text-red-200">Active Donors</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">30+</div>
              <div className="text-red-200">Donation Centers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">24/7</div>
              <div className="text-red-200">Emergency Support</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Testimonials</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from donors and recipients about their experiences with LifeDrop.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <img
                  className="h-12 w-12 rounded-full object-cover"
                  src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Sarah J."
                />
                <div className="ml-4">
                  <h4 className="text-lg font-semibold">Sarah J.</h4>
                  <p className="text-gray-500">Regular Donor</p>
                </div>
              </div>
              <p className="text-gray-600">
                "I've been donating blood every 3 months for the past 2 years. The process is always smooth
                and the staff are so friendly. It feels great knowing I'm helping save lives."
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <img
                  className="h-12 w-12 rounded-full object-cover"
                  src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Michael T."
                />
                <div className="ml-4">
                  <h4 className="text-lg font-semibold">Michael T.</h4>
                  <p className="text-gray-500">Blood Recipient</p>
                </div>
              </div>
              <p className="text-gray-600">
                "After my accident, I needed multiple blood transfusions. I'm forever grateful to the 
                donors who made my recovery possible. Now I'm a donor myself!"
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <img
                  className="h-12 w-12 rounded-full object-cover"
                  src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Emma R."
                />
                <div className="ml-4">
                  <h4 className="text-lg font-semibold">Emma R.</h4>
                  <p className="text-gray-500">Medical Professional</p>
                </div>
              </div>
              <p className="text-gray-600">
                "As an ER nurse, I see firsthand how critical blood donations are. This platform has made it
                so much easier for us to connect with donors when we need blood urgently."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about blood donation.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                  <Info className="h-5 w-5 text-red-500 mr-2" />
                  How often can I donate blood?
                </h3>
                <p className="text-gray-600">
                  Whole blood donations can be made every 56 days (8 weeks). Plasma donations can be made more frequently,
                  typically every 28 days. Platelet donations can be made every 7 days, up to 24 times per year.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                  <Info className="h-5 w-5 text-red-500 mr-2" />
                  Who can donate blood?
                </h3>
                <p className="text-gray-600">
                  Most healthy adults who are at least 17 years old (16 in some states with parental consent) 
                  and weigh at least 110 pounds can donate blood. Check our eligibility requirements for more specific information.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                  <Info className="h-5 w-5 text-red-500 mr-2" />
                  How long does the donation process take?
                </h3>
                <p className="text-gray-600">
                  The entire blood donation process takes about one hour, though the actual donation only takes 
                  8-10 minutes. This includes registration, a brief health screening, the donation, and refreshments afterward.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                  <Info className="h-5 w-5 text-red-500 mr-2" />
                  Is donating blood safe?
                </h3>
                <p className="text-gray-600">
                  Yes, donating blood is very safe. All equipment used is sterile and disposable, used only once.
                  Donors are carefully screened and monitored throughout the process by trained professionals.
                </p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <Link
                to="/resources"
                className="inline-flex items-center text-red-600 hover:text-red-800 font-medium"
              >
                View all FAQs
                <svg className="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-red-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Save Lives?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join our community of donors today and help make a difference.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-base font-medium text-red-600 shadow-lg hover:bg-gray-100 transition-all duration-300"
              >
                <Users className="mr-2 h-5 w-5" />
                Become a Donor
              </Link>
              <Link
                to="/appointments"
                className="inline-flex items-center justify-center rounded-lg bg-red-700 border border-red-500 px-6 py-3 text-base font-medium text-white shadow-lg hover:bg-red-800 transition-all duration-300"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Donation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;