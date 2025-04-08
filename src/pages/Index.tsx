
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import ChallengeTypes from "@/components/home/ChallengeTypes";
import LatestChallenges from "@/components/home/LatestChallenges";
import LeaderboardPreview from "@/components/home/LeaderboardPreview";
import CallToAction from "@/components/home/CallToAction";
import Statistics from "@/components/home/Statistics";
import MatrixRain from "@/components/animations/MatrixRain";

const Index = () => {
  return (
    <Layout>
      <MatrixRain />
      <Hero />
      <Statistics />
      <ChallengeTypes />
      <LatestChallenges />
      <LeaderboardPreview />
      <CallToAction />
    </Layout>
  );
};

export default Index;
