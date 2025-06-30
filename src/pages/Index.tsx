
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Trophy, BookOpen, Zap } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [gameStats, setGameStats] = useState({ correct: 0, total: 0 });

  const topics = [
    { name: 'Science', icon: '🔬', keywords: ['Science', 'Physics', 'Chemistry', 'Biology'] },
    { name: 'History', icon: '🏛️', keywords: ['History', 'Ancient history', 'World War', 'Renaissance'] },
    { name: 'Geography', icon: '🌍', keywords: ['Geography', 'Country', 'Mountain', 'River'] },
    { name: 'Technology', icon: '💻', keywords: ['Technology', 'Computer', 'Internet', 'Software'] },
    { name: 'Literature', icon: '📚', keywords: ['Literature', 'Novel', 'Poetry', 'Writer'] },
    { name: 'Sports', icon: '⚽', keywords: ['Sports', 'Football', 'Olympics', 'Basketball'] }
  ];

  const fetchWikipediaQuestion = async (topic: string) => {
    setLoading(true);
    try {
      const topicData = topics.find(t => t.name === topic);
      const randomKeyword = topicData?.keywords[Math.floor(Math.random() * topicData.keywords.length)] || topic;
      
      // Search for articles related to the topic
      const searchResponse = await fetch(
        `https://en.wikipedia.org/w/api.php?action=opensearch&search=${randomKeyword}&limit=5&namespace=0&format=json&origin=*`
      );
      const searchData = await searchResponse.json();
      const titles = searchData[1];
      
      if (titles.length === 0) {
        throw new Error('No articles found');
      }
      
      const randomTitle = titles[Math.floor(Math.random() * titles.length)];
      
      // Get the article content
      const contentResponse = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&format=json&titles=${randomTitle}&prop=extracts&exintro=&explaintext=&origin=*`
      );
      const contentData = await contentResponse.json();
      const pages = contentData.query.pages;
      const page = Object.values(pages)[0] as any;
      
      if (!page.extract) {
        throw new Error('No content found');
      }
      
      const extract = page.extract.substring(0, 400) + '...';
      
      // Generate question and options
      const questionText = `What topic does this description refer to?\n\n"${extract}"`;
      const correctAns = randomTitle;
      
      // Generate wrong options from other search results
      const wrongOptions = titles
        .filter((title: string) => title !== correctAns)
        .slice(0, 3);
      
      // If we don't have enough wrong options, add some generic ones
      const additionalOptions = ['Unknown Topic', 'General Knowledge', 'Mixed Content'];
      while (wrongOptions.length < 3) {
        const option = additionalOptions[wrongOptions.length];
        if (!wrongOptions.includes(option)) {
          wrongOptions.push(option);
        }
      }
      
      const allOptions = [correctAns, ...wrongOptions.slice(0, 3)];
      const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);
      
      setQuestion(questionText);
      setOptions(shuffledOptions);
      setCorrectAnswer(correctAns);
      setCurrentScreen('quiz');
    } catch (error) {
      console.error('Error fetching Wikipedia data:', error);
      toast.error('Failed to load question. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (selectedOption: string) => {
    const isCorrect = selectedOption === correctAnswer;
    setGameStats(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));
    
    if (isCorrect) {
      setScore(prev => prev + 10);
      toast.success('Correct! +10 points');
    } else {
      toast.error(`Wrong! The correct answer was: ${correctAnswer}`);
    }
    
    setQuestionCount(prev => prev + 1);
    
    if (questionCount >= 4) {
      setCurrentScreen('results');
    } else {
      setTimeout(() => {
        fetchWikipediaQuestion(selectedTopic);
      }, 2000);
    }
  };

  const resetGame = () => {
    setScore(0);
    setQuestionCount(0);
    setGameStats({ correct: 0, total: 0 });
    setCurrentScreen('home');
  };

  const startQuiz = (topic: string) => {
    setSelectedTopic(topic);
    fetchWikipediaQuestion(topic);
  };

  if (currentScreen === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Brain className="h-16 w-16 text-white mr-4" />
              <h1 className="text-6xl font-bold text-white">WikiWhiz</h1>
            </div>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Learn Smarter with Wikipedia-Powered Quizzes! Transform your knowledge into an interactive adventure.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-8">Choose Your Topic</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topics.map((topic) => (
                <Card key={topic.name} className="bg-white/10 backdrop-blur-md border-0 hover:bg-white/20 transition-all duration-300 cursor-pointer transform hover:scale-105" onClick={() => startQuiz(topic.name)}>
                  <CardHeader className="text-center">
                    <div className="text-4xl mb-2">{topic.icon}</div>
                    <CardTitle className="text-white text-xl">{topic.name}</CardTitle>
                    <CardDescription className="text-blue-100">
                      Test your knowledge about {topic.name.toLowerCase()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-white/20 hover:bg-white/30 text-white border-0">
                      Start Quiz <Zap className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="text-center mt-12">
            <div className="flex items-center justify-center space-x-8 text-blue-100">
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                <span>Wikipedia Powered</span>
              </div>
              <div className="flex items-center">
                <Trophy className="h-5 w-5 mr-2" />
                <span>Score & Compete</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentScreen === 'quiz') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8 text-white">
              <div className="flex items-center space-x-4">
                <Brain className="h-8 w-8" />
                <span className="text-2xl font-bold">WikiWhiz</span>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-sm text-blue-200">Score</div>
                  <div className="text-2xl font-bold">{score}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-blue-200">Question</div>
                  <div className="text-2xl font-bold">{questionCount + 1}/5</div>
                </div>
              </div>
            </div>
            
            {loading ? (
              <Card className="bg-white/10 backdrop-blur-md border-0">
                <CardContent className="p-12 text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
                  <p className="text-white text-xl">Fetching your question from Wikipedia...</p>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-white/10 backdrop-blur-md border-0">
                <CardHeader>
                  <CardTitle className="text-white text-xl mb-4">
                    Topic: {selectedTopic}
                  </CardTitle>
                  <CardDescription className="text-blue-100 text-lg leading-relaxed whitespace-pre-line">
                    {question}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {options.map((option, index) => (
                      <Button
                        key={index}
                        onClick={() => handleAnswer(option)}
                        className="bg-white/20 hover:bg-white/30 text-white border-0 p-4 text-left h-auto min-h-[60px] transition-all duration-300 transform hover:scale-105"
                      >
                        <span className="font-semibold mr-2">{String.fromCharCode(65 + index)}.</span>
                        {option}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (currentScreen === 'results') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <Trophy className="h-24 w-24 text-yellow-400 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-white mb-4">Quiz Complete!</h1>
            
            <Card className="bg-white/10 backdrop-blur-md border-0 mb-8">
              <CardContent className="p-8">
                <div className="text-6xl font-bold text-white mb-4">{score}</div>
                <div className="text-xl text-blue-100 mb-6">Final Score</div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-400">{gameStats.correct}</div>
                    <div className="text-blue-200">Correct</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-400">{gameStats.total - gameStats.correct}</div>
                    <div className="text-blue-200">Wrong</div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="text-lg text-blue-100">
                    Accuracy: {Math.round((gameStats.correct / gameStats.total) * 100)}%
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-4">
              <Button 
                onClick={resetGame}
                className="bg-white/20 hover:bg-white/30 text-white border-0 px-8 py-3 text-lg"
              >
                Play Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Index;
