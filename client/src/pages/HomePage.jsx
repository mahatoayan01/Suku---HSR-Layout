import React from 'react';
import HeroSection from '../components/home/HeroSection';
import AboutSection from '../components/home/AboutSection';
import SignatureDishes from '../components/home/SignatureDishes';
import WhyChooseUs from '../components/home/WhyChooseUs';
import GallerySection from '../components/home/GallerySection';
import ReviewsSection from '../components/home/ReviewsSection';
import InstagramSection from '../components/home/InstagramSection';
import HoursAndLocationBlock from '../components/home/HoursAndLocationBlock';
import AggregatorsSection from '../components/home/AggregatorsSection';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <SignatureDishes />
      <WhyChooseUs />
      <GallerySection />
      <ReviewsSection />
      <InstagramSection />
      <HoursAndLocationBlock />
      <AggregatorsSection />
    </div>
  );
}
