
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import ChallengeCategories from "@/components/home/ChallengeCategories";
import TopUsers from "@/components/home/TopUsers";
import CallToAction from "@/components/home/CallToAction";
import MatrixRain from "@/components/animations/MatrixRain";

const Index = () => {
  return (
    <Layout>
      <MatrixRain />
      <Hero />
      <Features />
      <ChallengeCategories />
      <TopUsers />
      <CallToAction />
    </Layout>
  );
};

export default Index;
