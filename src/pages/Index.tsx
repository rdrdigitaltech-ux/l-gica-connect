import { lazy, Suspense } from "react";
import HeroSection from "@/components/home/HeroSection";
import WhoWeAreSection from "@/components/home/WhoWeAreSection";
import SegmentsSection from "@/components/home/SegmentsSection";
import AnimatedSection from "@/components/AnimatedSection";

const ImpactNumbers = lazy(() => import("@/components/home/ImpactNumbers"));
const TestimonialsSection = lazy(() => import("@/components/home/TestimonialsSection"));
const SolutionsSection = lazy(() => import("@/components/home/SolutionsSection"));
const CertificationsSection = lazy(() => import("@/components/home/CertificationsSection"));
const LocationSection = lazy(() => import("@/components/home/LocationSection"));

const Index = () => {
  return (
    <>
      <HeroSection />
      <WhoWeAreSection />
      <SegmentsSection />
      <Suspense fallback={<div />}>
        <ImpactNumbers />
      </Suspense>
      <Suspense fallback={<div />}>
        <AnimatedSection direction="up" duration={0.6}>
          <TestimonialsSection />
        </AnimatedSection>
      </Suspense>
      <Suspense fallback={<div />}>
        <AnimatedSection direction="up" duration={0.6}>
          <SolutionsSection />
        </AnimatedSection>
      </Suspense>
      <Suspense fallback={<div />}>
        <AnimatedSection direction="up" duration={0.6}>
          <CertificationsSection />
        </AnimatedSection>
      </Suspense>
      <Suspense fallback={<div />}>
        <AnimatedSection direction="up" duration={0.6}>
          <LocationSection />
        </AnimatedSection>
      </Suspense>
    </>
  );
};

export default Index;
