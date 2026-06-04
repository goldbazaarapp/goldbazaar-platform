import React, { useState } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  Users,
  TrendingUp,
  Target,
  Lock,
  Upload,
  MapPin,
  Phone,
  Building,
  Award,
  Zap,
  Eye,
  User,
  Mail,
  Heart,
  BarChart3,
  PieChart,
} from 'lucide-react';
import {
  LineChart,
  Line,
  PieChart as RechartsChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const VendorOnboardingPortal = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    mobile: '',
    otp: '',
    businessName: '',
    ownerName: '',
    gstNumber: '',
    businessCategory: '',
    yearsInBusiness: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    services: [],
    schemeName: '',
    schemeDescription: '',
    benefits: '',
    validity: '',
  });

  const steps = [
    'Mobile Verification',
    'Business Info',
    'Address',
    'Services',
    'Branding',
    'Scheme Setup',
    'Review & Submit',
  ];

  const serviceOptions = [
    { id: 'gold-loan', label: 'Gold Loan' },
    { id: 'gold-sell', label: 'Gold Sell' },
    { id: 'gold-exchange', label: 'Gold Exchange' },
    { id: 'jewellery', label: 'Jewellery Purchase' },
    { id: 'savings', label: 'Gold Savings Scheme' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceToggle = (serviceId) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter((id) => id !== serviceId)
        : [...prev.services, serviceId],
    }));
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    alert('Vendor registration submitted for verification!');
  };

  // Analytics data
  const trendData = [
    { week: 'Week 1', reach: 450, visits: 100 },
    { week: 'Week 2', reach: 580, visits: 140 },
    { week: 'Week 3', reach: 920, visits: 240 },
    { week: 'Week 4', reach: 1248, visits: 356 },
  ];

  const discoveryData = [
    { name: 'Gold Loan', value: 35 },
    { name: 'Gold Sell', value: 25 },
    { name: 'Featured', value: 20 },
    { name: 'Search', value: 15 },
    { name: 'Ads', value: 5 },
  ];

  const COLORS = ['#D4AF37', '#F4B860', '#E5A74D', '#C49D38', '#A67C2E'];
  const locationInsights = [
    { area: 'Whitefield', count: 324 },
    { area: 'Marathahalli', count: 287 },
    { area: 'HSR Layout', count: 256 },
    { area: 'Indiranagar', count: 198 },
    { area: 'Electronic City', count: 183 },
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 0: // Mobile OTP
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">
                Mobile Number
              </label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:border-yellow-500 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">
                OTP
              </label>
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleInputChange}
                placeholder="Enter 6-digit OTP"
                maxLength="6"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:border-yellow-500 focus:outline-none transition"
              />
              <p className="text-xs text-gray-400 mt-2">
                Didn't receive? <span className="text-yellow-500 cursor-pointer">Resend OTP</span>
              </p>
            </div>
          </div>
        );
      case 1: // Business Info
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">
                Business Name
              </label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleInputChange}
                placeholder="Your Business Name"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:border-yellow-500 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">
                Owner Name
              </label>
              <input
                type="text"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleInputChange}
                placeholder="Full Name"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:border-yellow-500 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">
                GST Number
              </label>
              <input
                type="text"
                name="gstNumber"
                value={formData.gstNumber}
                onChange={handleInputChange}
                placeholder="15 Character GST Number"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:border-yellow-500 focus:outline-none transition"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-2">
                  Category
                </label>
                <select
                  name="businessCategory"
                  value={formData.businessCategory}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:border-yellow-500 focus:outline-none transition"
                >
                  <option value="">Select Category</option>
                  <option value="gold-dealer">Gold Dealer</option>
                  <option value="jeweler">Jeweler</option>
                  <option value="pawn">Pawn Shop</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-2">
                  Years in Business
                </label>
                <input
                  type="number"
                  name="yearsInBusiness"
                  value={formData.yearsInBusiness}
                  onChange={handleInputChange}
                  placeholder="5"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:border-yellow-500 focus:outline-none transition"
                />
              </div>
            </div>
          </div>
        );
      case 2: // Address
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Street Address"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:border-yellow-500 focus:outline-none transition"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-2">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Bangalore"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:border-yellow-500 focus:outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-2">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="Karnataka"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:border-yellow-500 focus:outline-none transition"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">
                Pincode
              </label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                placeholder="560001"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:border-yellow-500 focus:outline-none transition"
              />
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-center py-8">
              <MapPin className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-sm text-gray-300">
                📍 Click to mark location on Google Maps
              </p>
            </div>
          </div>
        );
      case 3: // Services
        return (
          <div className="space-y-4">
            <p className="text-sm text-gray-400">
              Select all services you offer:
            </p>
            <div className="space-y-3">
              {serviceOptions.map((service) => (
                <label
                  key={service.id}
                  className="flex items-center p-4 bg-gray-800 border border-gray-700 rounded-lg cursor-pointer hover:border-yellow-500 transition"
                >
                  <input
                    type="checkbox"
                    checked={formData.services.includes(service.id)}
                    onChange={() => handleServiceToggle(service.id)}
                    className="w-4 h-4 rounded accent-yellow-500"
                  />
                  <span className="ml-3 text-white font-medium">
                    {service.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        );
      case 4: // Branding
        return (
          <div className="space-y-4">
            {['Logo', 'Store Images', 'Banner Images', 'Promotional Images'].map(
              (item) => (
                <div
                  key={item}
                  className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center cursor-pointer hover:border-yellow-500 transition"
                >
                  <Upload className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <p className="text-sm font-medium text-white">{item}</p>
                  <p className="text-xs text-gray-400">
                    Click to upload or drag & drop
                  </p>
                </div>
              )
            )}
          </div>
        );
      case 5: // Scheme Setup
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">
                Scheme Name
              </label>
              <input
                type="text"
                name="schemeName"
                value={formData.schemeName}
                onChange={handleInputChange}
                placeholder="e.g., Gold Savings Plus"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:border-yellow-500 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">
                Description
              </label>
              <textarea
                name="schemeDescription"
                value={formData.schemeDescription}
                onChange={handleInputChange}
                placeholder="Describe your scheme..."
                rows="3"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:border-yellow-500 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">
                Key Benefits
              </label>
              <input
                type="text"
                name="benefits"
                value={formData.benefits}
                onChange={handleInputChange}
                placeholder="e.g., Low interest, Fast approval"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:border-yellow-500 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">
                Validity (in months)
              </label>
              <input
                type="number"
                name="validity"
                value={formData.validity}
                onChange={handleInputChange}
                placeholder="12"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:border-yellow-500 focus:outline-none transition"
              />
            </div>
          </div>
        );
      case 6: // Review
        return (
          <div className="space-y-4">
            <div className="bg-green-900/20 border border-green-800 rounded-lg p-4 mb-4">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                <p className="text-green-400 text-sm font-medium">
                  All information looks good!
                </p>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center border-b border-gray-700 pb-3">
                <span className="text-gray-400">Mobile</span>
                <span className="text-white font-medium">{formData.mobile}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-700 pb-3">
                <span className="text-gray-400">Business</span>
                <span className="text-white font-medium">
                  {formData.businessName}
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-700 pb-3">
                <span className="text-gray-400">Owner</span>
                <span className="text-white font-medium">{formData.ownerName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Services</span>
                <span className="text-white font-medium">
                  {formData.services.length} selected
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-400 text-center mt-4">
              By submitting, you agree to GoldBazaar's Terms of Service
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Vendor Self-Care Onboarding
            </h1>
            <p className="text-gray-400">
              Join India's Trusted Gold Services Marketplace
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT SECTION - Wizard Form */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-8">
              {/* Step Progress */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  {steps.map((step, index) => (
                    <div
                      key={index}
                      className={`flex items-center ${
                        index < steps.length - 1 ? 'flex-1' : ''
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition ${
                          index <= currentStep
                            ? 'bg-yellow-500 text-black'
                            : 'bg-gray-700 text-gray-400'
                        }`}
                      >
                        {index + 1}
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className={`flex-1 h-1 mx-2 transition ${
                            index < currentStep
                              ? 'bg-yellow-500'
                              : 'bg-gray-700'
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-center text-yellow-500 font-semibold text-sm">
                  Step {currentStep + 1} of {steps.length}: {steps[currentStep]}
                </p>
              </div>

              {/* Form Content */}
              <div className="min-h-96">{renderStep()}</div>

              {/* Navigation Buttons */}
              <div className="flex gap-3 mt-8">
                <button
                  onClick={handlePrevStep}
                  disabled={currentStep === 0}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
                    currentStep === 0
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-700 text-white hover:bg-gray-600'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                {currentStep === steps.length - 1 ? (
                  <button
                    onClick={handleSubmit}
                    className="flex-1 py-3 px-4 bg-yellow-500 text-black rounded-lg font-semibold hover:bg-yellow-400 transition flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" /> Submit
                  </button>
                ) : (
                  <button
                    onClick={handleNextStep}
                    className="flex-1 py-3 px-4 bg-yellow-500 text-black rounded-lg font-semibold hover:bg-yellow-400 transition flex items-center justify-center gap-2"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Security Badge */}
              <div className="mt-6 pt-6 border-t border-gray-700 flex items-center justify-center gap-2 text-xs text-gray-400">
                <Lock className="w-3 h-3" /> Bank-level encryption
              </div>
            </div>
          </div>

          {/* RIGHT SECTION - Analytics Dashboard */}
          <div className="lg:col-span-2 space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  label: 'Profile Reach',
                  value: '1,248',
                  subtext: 'Users discovered',
                  icon: Users,
                  color: 'text-yellow-500',
                },
                {
                  label: 'Vendor Visits',
                  value: '356',
                  subtext: 'Profile views',
                  icon: Eye,
                  color: 'text-yellow-400',
                },
                {
                  label: 'Leads Generated',
                  value: '48',
                  subtext: 'Opportunities',
                  icon: Target,
                  color: 'text-yellow-500',
                },
                {
                  label: 'Business Value',
                  value: '₹4.8L',
                  subtext: 'Potential',
                  icon: TrendingUp,
                  color: 'text-yellow-400',
                },
              ].map((kpi, idx) => {
                const Icon = kpi.icon;
                return (
                  <div
                    key={idx}
                    className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-4 hover:border-yellow-500 transition"
                  >
                    <Icon className={`w-5 h-5 ${kpi.color} mb-2`} />
                    <p className="text-xs text-gray-400">{kpi.label}</p>
                    <p className="text-2xl font-bold text-white mt-1">
                      {kpi.value}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{kpi.subtext}</p>
                  </div>
                );
              })}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Profile Reach Trend */}
              <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-yellow-500" /> Profile
                  Reach Trend
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="week" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1f2937',
                        border: '1px solid #4b5563',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="reach"
                      stroke="#D4AF37"
                      strokeWidth={2}
                      dot={{ fill: '#D4AF37' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Customer Discovery Sources */}
              <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-yellow-500" /> Discovery
                  Sources
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <RechartsChart data={discoveryData}>
                    <Pie
                      data={discoveryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) =>
                        `${name}: ${value}%`
                      }
                      outerRadius={60}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {COLORS.map((color, index) => (
                        <Cell key={`cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                  </RechartsChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Lead Funnel & Location Insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Lead Funnel */}
              <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">
                  Lead Funnel
                </h3>
                <div className="space-y-3">
                  {[
                    { stage: 'Profile Views', count: 1248, width: '100%' },
                    { stage: 'Vendor Visits', count: 356, width: '29%' },
                    { stage: 'Enquiries', count: 89, width: '7%' },
                    {
                      stage: 'Appointments',
                      count: 48,
                      width: '4%',
                    },
                    { stage: 'Conversions', count: 12, width: '1%' },
                  ].map((item, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-300">
                          {item.stage}
                        </span>
                        <span className="text-xs font-bold text-yellow-500">
                          {item.count}
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-yellow-500 to-yellow-400 h-2 rounded-full transition-all"
                          style={{ width: item.width }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location Insights */}
              <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-yellow-500" /> Top Locations
                </h3>
                <div className="space-y-3">
                  {locationInsights.map((location, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                        <span className="text-sm text-gray-300">
                          {location.area}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-yellow-500">
                        {location.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Plans Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Free Plan */}
              <div className="bg-gradient-to-br from-yellow-900/20 to-gray-800 border border-yellow-700/50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" /> Free Starter
                </h3>
                <p className="text-xs text-gray-400 mb-4">
                  Included for first 90 days
                </p>
                <ul className="space-y-2">
                  {[
                    'Vendor Profile',
                    'Scheme Listings',
                    'Basic Analytics',
                    'Lead Visibility',
                    'Customer Reach Metrics',
                    'Performance Dashboard',
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-yellow-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Premium Preview */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-500" /> Premium
                </h3>
                <p className="text-xs text-gray-400 mb-4">
                  Unlock after 90 days
                </p>
                <ul className="space-y-2">
                  {[
                    'Customer Demand Trends',
                    'Conversion Analytics',
                    'Area-wise Demand',
                    'Competitor Benchmarking',
                    'ROI Intelligence',
                    'Lead Quality Insights',
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-yellow-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Success Message */}
            <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-400/10 border border-yellow-700/50 rounded-xl p-6 text-center">
              <Heart className="w-6 h-6 text-yellow-500 mx-auto mb-3" />
              <p className="text-white font-semibold mb-1">
                Join GoldBazaar & Scale Your Business
              </p>
              <p className="text-sm text-gray-400">
                Start reaching high-intent customers looking for trusted gold
                services. Complete your onboarding to get activated!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorOnboardingPortal;