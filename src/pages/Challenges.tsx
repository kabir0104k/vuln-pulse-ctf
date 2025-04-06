
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { SectionHeading } from "@/components/ui/section-heading";
import { CtfCard, CtfChallenge } from "@/components/ui/ctf-card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/context/AuthContext";
import { useChallenges } from "@/context/ChallengeContext";
import { Search } from "lucide-react";

const Challenges = () => {
  const { challenges, isLoading, getUserSolvedChallenges } = useChallenges();
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get("category")
  );
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [filteredChallenges, setFilteredChallenges] = useState<CtfChallenge[]>([]);

  // Get user's solved challenges
  const userSolvedChallengesIds = user ? getUserSolvedChallenges(user.id) : [];

  // Prepare challenges with solved status
  const challengesWithSolveStatus = challenges.map((challenge) => ({
    ...challenge,
    isSolved: userSolvedChallengesIds.includes(challenge.id),
  }));

  // Get unique categories
  const categories = Array.from(
    new Set(challenges.map((challenge) => challenge.category))
  );

  // Calculate progress if user is logged in
  const totalChallenges = challenges.length;
  const solvedChallenges = userSolvedChallengesIds.length;
  const progressPercentage = totalChallenges > 0
    ? Math.round((solvedChallenges / totalChallenges) * 100)
    : 0;

  useEffect(() => {
    // Apply filters
    let filtered = [...challengesWithSolveStatus];

    // Apply search filter
    if (searchInput) {
      const searchLower = searchInput.toLowerCase();
      filtered = filtered.filter(
        (challenge) =>
          challenge.title.toLowerCase().includes(searchLower) ||
          challenge.description.toLowerCase().includes(searchLower) ||
          challenge.category.toLowerCase().includes(searchLower)
      );
    }

    // Apply difficulty filter
    if (selectedDifficulty) {
      filtered = filtered.filter(
        (challenge) => challenge.difficulty === selectedDifficulty
      );
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(
        (challenge) => challenge.category === selectedCategory
      );
    }

    // Apply type filter
    if (selectedType) {
      filtered = filtered.filter(
        (challenge) => challenge.type === selectedType
      );
    }

    setFilteredChallenges(filtered);
  }, [
    challengesWithSolveStatus,
    searchInput,
    selectedDifficulty,
    selectedCategory,
    selectedType,
  ]);

  // Handle category selection from URL params
  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  const clearFilters = () => {
    setSearchInput("");
    setSelectedDifficulty(null);
    setSelectedCategory(null);
    setSelectedType(null);
    setSearchParams({});
  };

  return (
    <Layout>
      <div className="container py-8">
        <SectionHeading
          title="Challenges"
          description="Test your skills and capture the flags"
        />

        {/* Progress bar for logged-in users */}
        {user && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Your Progress</span>
              <span className="text-sm text-muted-foreground">
                {solvedChallenges}/{totalChallenges} challenges solved
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        )}

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search challenges..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-10"
              />
            </div>
            {(searchInput || selectedDifficulty || selectedCategory || selectedType) && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="text-sm"
              >
                Clear filters
              </Button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <Tabs
              value={selectedDifficulty || ""}
              onValueChange={(value) => setSelectedDifficulty(value || null)}
            >
              <TabsList className="h-8 bg-muted/50">
                <TabsTrigger
                  value=""
                  className="text-xs h-6 px-2"
                >
                  All Difficulties
                </TabsTrigger>
                <TabsTrigger
                  value="Easy"
                  className="text-xs h-6 px-2"
                >
                  Easy
                </TabsTrigger>
                <TabsTrigger
                  value="Medium"
                  className="text-xs h-6 px-2"
                >
                  Medium
                </TabsTrigger>
                <TabsTrigger
                  value="Hard"
                  className="text-xs h-6 px-2"
                >
                  Hard
                </TabsTrigger>
                <TabsTrigger
                  value="Insane"
                  className="text-xs h-6 px-2"
                >
                  Insane
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <Tabs
              value={selectedType || ""}
              onValueChange={(value) => setSelectedType(value || null)}
            >
              <TabsList className="h-8 bg-muted/50">
                <TabsTrigger
                  value=""
                  className="text-xs h-6 px-2"
                >
                  All Types
                </TabsTrigger>
                <TabsTrigger
                  value="VM"
                  className="text-xs h-6 px-2"
                >
                  VM
                </TabsTrigger>
                <TabsTrigger
                  value="File"
                  className="text-xs h-6 px-2"
                >
                  File
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Category badges */}
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={!selectedCategory ? "default" : "outline"}
              className="cursor-pointer bg-cyber-green/20 hover:bg-cyber-green/30 text-cyber-green hover:text-cyber-green border-transparent"
              onClick={() => {
                setSelectedCategory(null);
                setSearchParams({});
              }}
            >
              All Categories
            </Badge>
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`cursor-pointer ${
                  selectedCategory === category
                    ? "bg-cyber-green/20 hover:bg-cyber-green/30 text-cyber-green hover:text-cyber-green"
                    : "hover:bg-muted"
                }`}
                onClick={() => {
                  setSelectedCategory(category);
                  setSearchParams({ category });
                }}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Challenge grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="border border-border rounded-lg p-6 animate-pulse">
                <div className="h-7 bg-muted rounded mb-2 w-3/4"></div>
                <div className="h-4 bg-muted rounded mb-4 w-1/2"></div>
                <div className="h-16 bg-muted rounded mb-4"></div>
                <div className="flex justify-between items-center">
                  <div className="h-6 bg-muted rounded w-1/3"></div>
                  <div className="h-8 bg-muted rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredChallenges.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No challenges found matching your filters.</p>
            <Button 
              variant="link" 
              onClick={clearFilters}
              className="mt-2 text-cyber-green"
            >
              Clear all filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChallenges.map((challenge) => (
              <CtfCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Challenges;
