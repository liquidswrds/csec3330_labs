import { useState } from 'react';
import {
  Paper,
  Title,
  Text,
  Stack,
  Group,
  Button,
  Badge,
  Progress,
  Alert,
  Radio,
  Divider,
  ScrollArea,
  ThemeIcon
} from '@mantine/core';
import {
  IconCheck,
  IconX,
  IconRefresh,
  IconEye,
  IconTrophy
} from '@tabler/icons-react';
import { ConnectionValidation, LabProgress, SystemNode, SystemConnection } from '../types';

interface AssessmentQuestion {
  id: string;
  type: 'multiple_choice' | 'true_false' | 'matching' | 'scenario';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  points: number;
}

interface AssessmentPanelProps {
  progress: LabProgress;
  validationResults: Map<string, ConnectionValidation>;
  systems: SystemNode[];
  connections: SystemConnection[];
  onValidateConnections: () => void;
  onExportResults: () => void;
}

const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: 'q1',
    type: 'multiple_choice',
    question: 'What type of connection would you expect between a temperature sensor and an oven controller?',
    options: ['Physical connection', 'Logical connection', 'Wireless connection', 'No connection needed'],
    correctAnswer: 'Physical connection',
    explanation: 'Temperature sensors typically use physical connections (wired) to oven controllers for reliable, real-time temperature monitoring in industrial environments.',
    difficulty: 'beginner',
    points: 10
  },
  {
    id: 'q2',
    type: 'multiple_choice',
    question: 'What is the primary security benefit of network segmentation between IT and OT networks?',
    options: [
      'Improved network performance',
      'Reduced hardware costs', 
      'Isolation of operational systems from cyber threats',
      'Easier system maintenance'
    ],
    correctAnswer: 'Isolation of operational systems from cyber threats',
    explanation: 'Network segmentation creates security boundaries that limit the spread of cyber attacks and protect critical operational systems from threats originating in the corporate network.',
    difficulty: 'intermediate',
    points: 15
  },
  {
    id: 'q3',
    type: 'true_false',
    question: 'Production control systems should have direct internet connectivity for remote monitoring.',
    correctAnswer: 'false',
    explanation: 'Production control systems should never have direct internet connectivity. Remote access should be provided through secure VPN connections and properly configured firewalls to maintain security.',
    difficulty: 'beginner',
    points: 5
  },
  {
    id: 'q4',
    type: 'multiple_choice',
    question: 'In the context of industrial cybersecurity, what does "defense in depth" mean?',
    options: [
      'Using the strongest possible firewall',
      'Implementing multiple layers of security controls',
      'Hiring more security personnel',
      'Installing the latest antivirus software'
    ],
    correctAnswer: 'Implementing multiple layers of security controls',
    explanation: 'Defense in depth is a cybersecurity strategy that uses multiple layers of security controls to protect systems. If one layer fails, other layers continue to provide protection.',
    difficulty: 'advanced',
    points: 20
  },
  {
    id: 'q5',
    type: 'multiple_choice',
    question: 'If data needs to flow from a mixing station controller to the recipe management system, what type of data flow would this be?',
    options: ['Unidirectional from controller to recipe system', 'Unidirectional from recipe system to controller', 'Bidirectional', 'No data flow needed'],
    correctAnswer: 'Bidirectional',
    explanation: 'The connection between a mixing station controller and recipe management system requires bidirectional data flow: the recipe system sends recipes and parameters to the controller, while the controller sends back status updates and production data.',
    difficulty: 'beginner',
    points: 10
  },
  {
    id: 'q6',
    type: 'scenario',
    question: 'A temperature sensor in the baking oven suddenly starts sending erratic readings. The readings are causing the oven controller to make incorrect temperature adjustments. What type of cybersecurity incident is this most likely to be?',
    options: [
      'Equipment malfunction (non-cybersecurity)',
      'Data integrity attack',
      'Denial of service attack',
      'Insider threat'
    ],
    correctAnswer: 'Data integrity attack',
    explanation: 'Erratic sensor readings that cause incorrect control actions suggest a data integrity attack, where the data is being manipulated to cause improper system behavior. This could be caused by man-in-the-middle attacks or compromised sensor firmware.',
    difficulty: 'advanced',
    points: 25
  }
];

export function AssessmentPanel({
  progress,
  validationResults,
  systems,
  connections,
  onValidateConnections,
  onExportResults
}: AssessmentPanelProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Map<string, string>>(new Map());
  const [showResults, setShowResults] = useState(false);
  const [showExplanations, setShowExplanations] = useState(false);

  const currentQuestion = assessmentQuestions[currentQuestionIndex];
  const totalQuestions = assessmentQuestions.length;
  const answeredQuestions = userAnswers.size;

  // Calculate scores
  const getConnectionScore = () => {
    const userConnections = connections.filter(c => c.userCreated);
    if (userConnections.length === 0) return 0;
    
    const correctCount = Array.from(validationResults.values())
      .filter(v => v.type === 'correct').length;
    
    return Math.round((correctCount / userConnections.length) * 100);
  };

  const getQuizScore = () => {
    if (!showResults || userAnswers.size === 0) return 0;
    
    let correctCount = 0;
    let totalPoints = 0;
    let earnedPoints = 0;

    assessmentQuestions.forEach(question => {
      totalPoints += question.points;
      const userAnswer = userAnswers.get(question.id);
      
      if (userAnswer === question.correctAnswer) {
        correctCount++;
        earnedPoints += question.points;
      }
    });

    return Math.round((earnedPoints / totalPoints) * 100);
  };

  const getOverallScore = () => {
    const connectionScore = getConnectionScore();
    const quizScore = getQuizScore();
    
    // Weight: 60% connections, 40% quiz
    return Math.round(connectionScore * 0.6 + quizScore * 0.4);
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setUserAnswers(prev => new Map(prev).set(questionId, answer));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmitQuiz = () => {
    setShowResults(true);
    setShowExplanations(true);
  };

  const handleResetQuiz = () => {
    setUserAnswers(new Map());
    setCurrentQuestionIndex(0);
    setShowResults(false);
    setShowExplanations(false);
  };

  const getPerformanceLevel = (score: number): { level: string; color: string; icon: any } => {
    if (score >= 90) return { level: 'Excellent', color: 'green', icon: IconTrophy };
    if (score >= 80) return { level: 'Good', color: 'blue', icon: IconCheck };
    if (score >= 70) return { level: 'Fair', color: 'yellow', icon: IconEye };
    return { level: 'Needs Improvement', color: 'red', icon: IconX };
  };

  const renderConnectionAssessment = () => {
    const userConnections = connections.filter(c => c.userCreated);
    const totalCorrectConnections = Array.from(validationResults.values())
      .filter(v => v.type === 'correct').length;
    
    return (
      <Stack gap="md">
        <Group justify="space-between" align="center">
          <Text fw={500} size="sm">Connection Mapping Assessment</Text>
          <Badge color={getConnectionScore() >= 80 ? 'green' : getConnectionScore() >= 60 ? 'yellow' : 'red'}>
            {getConnectionScore()}%
          </Badge>
        </Group>

        <Group grow>
          <Paper p="sm" style={{ backgroundColor: '#f8f9fa', textAlign: 'center' }}>
            <Text fw={500} size="xl">{userConnections.length}</Text>
            <Text size="xs" c="dimmed">Connections Created</Text>
          </Paper>
          <Paper p="sm" style={{ backgroundColor: '#f8f9fa', textAlign: 'center' }}>
            <Text fw={500} size="xl">{totalCorrectConnections}</Text>
            <Text size="xs" c="dimmed">Correct</Text>
          </Paper>
          <Paper p="sm" style={{ backgroundColor: '#f8f9fa', textAlign: 'center' }}>
            <Text fw={500} size="xl">{progress.totalConnections}</Text>
            <Text size="xs" c="dimmed">Expected</Text>
          </Paper>
        </Group>

        <Progress 
          value={getConnectionScore()} 
          color={getConnectionScore() >= 80 ? 'green' : getConnectionScore() >= 60 ? 'yellow' : 'red'}
          size="lg"
          aria-label={`Connection assessment score: ${getConnectionScore()}%`}
        />

        {/* Separate scoring for connection types */}
        <Stack gap="xs">
          <Text fw={500} size="sm" mb="xs">Connection Type Breakdown</Text>
          
          <Group justify="space-between">
            <Text size="sm">Physical Connections</Text>
            <Badge color={progress.physicalConnectionsScore >= 80 ? 'green' : progress.physicalConnectionsScore >= 60 ? 'yellow' : 'red'} size="sm">
              {Math.round(progress.physicalConnectionsScore)}%
            </Badge>
          </Group>
          
          <Group justify="space-between">
            <Text size="sm">Network Connections</Text>
            <Badge color={progress.networkConnectionsScore >= 80 ? 'green' : progress.networkConnectionsScore >= 60 ? 'yellow' : 'red'} size="sm">
              {Math.round(progress.networkConnectionsScore)}%
            </Badge>
          </Group>
          
          <Group justify="space-between">
            <Text size="sm">Logical Connections</Text>
            <Badge color={progress.logicalConnectionsScore >= 80 ? 'green' : progress.logicalConnectionsScore >= 60 ? 'yellow' : 'red'} size="sm">
              {Math.round(progress.logicalConnectionsScore)}%
            </Badge>
          </Group>
          
          <Group justify="space-between">
            <Text size="sm">Wireless Connections</Text>
            <Badge color={progress.wirelessConnectionsScore >= 80 ? 'green' : progress.wirelessConnectionsScore >= 60 ? 'yellow' : 'red'} size="sm">
              {Math.round(progress.wirelessConnectionsScore)}%
            </Badge>
          </Group>
          
          <Divider />
          
          <Group justify="space-between">
            <Text fw={500} size="sm">Data Flow Accuracy</Text>
            <Badge color={progress.dataFlowScore >= 80 ? 'green' : progress.dataFlowScore >= 60 ? 'yellow' : 'red'} size="sm">
              {Math.round(progress.dataFlowScore)}%
            </Badge>
          </Group>
        </Stack>

        <Group justify="center">
          <Button onClick={onValidateConnections} leftSection={<IconCheck size={16} />}>
            Validate Connections
          </Button>
        </Group>

        {validationResults.size > 0 && (
          <div>
            <Text fw={500} size="sm" mb="xs">Connection Feedback</Text>
            <Stack gap="xs">
              {connections.filter(c => c.userCreated && validationResults.has(c.id)).map(connection => {
                const validation = validationResults.get(connection.id)!;
                const sourceSystem = systems.find(s => s.id === connection.sourceId);
                const targetSystem = systems.find(s => s.id === connection.targetId);
                
                return (
                  <Alert
                    key={connection.id}
                    icon={validation.type === 'correct' ? <IconCheck size={14} /> : <IconX size={14} />}
                    color={validation.type === 'correct' ? 'green' : 'red'}
                    variant="light"
                  >
                    <Text size="xs" fw={500}>
                      {sourceSystem?.name} ↔ {targetSystem?.name}
                    </Text>
                    <Text size="xs">{validation.feedback}</Text>
                  </Alert>
                );
              })}
            </Stack>
          </div>
        )}
      </Stack>
    );
  };

  const renderQuestionnaireAssessment = () => {
    const userAnswer = userAnswers.get(currentQuestion.id);
    const isAnswered = userAnswer !== undefined;
    const isCorrect = showResults && userAnswer === currentQuestion.correctAnswer;
    
    return (
      <Stack gap="md">
        <Group justify="space-between" align="center">
          <Text fw={500} size="sm">Knowledge Assessment</Text>
          <Badge color={answeredQuestions === totalQuestions ? 'green' : 'yellow'}>
            {answeredQuestions}/{totalQuestions} answered
          </Badge>
        </Group>

        <Progress 
          value={(currentQuestionIndex + 1) / totalQuestions * 100} 
          color="blue"
          size="sm"
          aria-label={`Question ${currentQuestionIndex + 1} of ${totalQuestions}`}
        />

        <Paper p="md" style={{ border: '1px solid #e9ecef' }}>
          <Stack gap="md">
            <Group justify="space-between" align="flex-start">
              <Text fw={500} size="sm" style={{ flex: 1 }}>
                {currentQuestionIndex + 1}. {currentQuestion.question}
              </Text>
              <Badge size="xs" color={
                currentQuestion.difficulty === 'advanced' ? 'red' :
                currentQuestion.difficulty === 'intermediate' ? 'yellow' : 'green'
              }>
                {currentQuestion.difficulty} ({currentQuestion.points} pts)
              </Badge>
            </Group>

            <Stack gap="sm">
              {currentQuestion.type === 'multiple_choice' && currentQuestion.options?.map(option => (
                <Radio
                  key={option}
                  value={option}
                  label={option}
                  checked={userAnswer === option}
                  onChange={() => handleAnswerChange(currentQuestion.id, option)}
                  disabled={showResults}
                  color={showResults ? (option === currentQuestion.correctAnswer ? 'green' : 
                         (userAnswer === option && option !== currentQuestion.correctAnswer ? 'red' : 'gray')) : 'blue'}
                />
              ))}

              {currentQuestion.type === 'true_false' && (
                <Group>
                  <Radio
                    value="true"
                    label="True"
                    checked={userAnswer === 'true'}
                    onChange={() => handleAnswerChange(currentQuestion.id, 'true')}
                    disabled={showResults}
                    color={showResults ? (currentQuestion.correctAnswer === 'true' ? 'green' : 'red') : 'blue'}
                  />
                  <Radio
                    value="false"
                    label="False"
                    checked={userAnswer === 'false'}
                    onChange={() => handleAnswerChange(currentQuestion.id, 'false')}
                    disabled={showResults}
                    color={showResults ? (currentQuestion.correctAnswer === 'false' ? 'green' : 'red') : 'blue'}
                  />
                </Group>
              )}

              {currentQuestion.type === 'scenario' && currentQuestion.options?.map(option => (
                <Radio
                  key={option}
                  value={option}
                  label={option}
                  checked={userAnswer === option}
                  onChange={() => handleAnswerChange(currentQuestion.id, option)}
                  disabled={showResults}
                  color={showResults ? (option === currentQuestion.correctAnswer ? 'green' : 
                         (userAnswer === option && option !== currentQuestion.correctAnswer ? 'red' : 'gray')) : 'blue'}
                />
              ))}
            </Stack>

            {showResults && showExplanations && (
              <Alert
                icon={isCorrect ? <IconCheck size={16} /> : <IconX size={16} />}
                color={isCorrect ? 'green' : 'red'}
                variant="light"
              >
                <Text size="sm" fw={500}>
                  {isCorrect ? 'Correct!' : `Incorrect. Correct answer: ${currentQuestion.correctAnswer}`}
                </Text>
                <Text size="xs" mt="xs">{currentQuestion.explanation}</Text>
              </Alert>
            )}
          </Stack>
        </Paper>

        <Group justify="space-between">
          <Button
            variant="outline"
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>

          <Group gap="xs">
            <Text size="xs" c="dimmed">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </Text>
          </Group>

          <Button
            onClick={currentQuestionIndex === totalQuestions - 1 ? handleSubmitQuiz : handleNextQuestion}
            disabled={!isAnswered && !showResults}
          >
            {currentQuestionIndex === totalQuestions - 1 ? 'Submit Quiz' : 'Next'}
          </Button>
        </Group>
      </Stack>
    );
  };

  const renderFinalResults = () => {
    const connectionScore = getConnectionScore();
    const quizScore = getQuizScore();
    const overallScore = getOverallScore();
    const performance = getPerformanceLevel(overallScore);

    return (
      <Stack gap="lg">
        <Paper p="lg" style={{ backgroundColor: '#f8f9fa', border: '2px solid #e9ecef' }}>
          <Stack gap="md" style={{ textAlign: 'center' }}>
            <ThemeIcon size={60} color={performance.color} variant="light">
              <performance.icon size={30} />
            </ThemeIcon>
            
            <div>
              <Title order={3}>{performance.level}</Title>
              <Text size="xl" fw={700} c={performance.color}>
                Overall Score: {overallScore}%
              </Text>
            </div>

            <Group justify="center" grow>
              <div style={{ textAlign: 'center' }}>
                <Text fw={500} size="lg">{connectionScore}%</Text>
                <Text size="xs" c="dimmed">Connection Mapping</Text>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Text fw={500} size="lg">{quizScore}%</Text>
                <Text size="xs" c="dimmed">Knowledge Quiz</Text>
              </div>
            </Group>
          </Stack>
        </Paper>

        <Paper p="md" style={{ backgroundColor: '#e7f5ff', border: '1px solid #339af0' }}>
          <Stack gap="sm">
            <Text fw={500} size="sm">Learning Objectives Achieved</Text>
            <Stack gap="xs">
              <Group justify="space-between">
                <Text size="sm">Identify system interconnections</Text>
                <Badge color={connectionScore >= 70 ? 'green' : 'red'} size="sm">
                  {connectionScore >= 70 ? 'Achieved' : 'Needs Work'}
                </Badge>
              </Group>
              <Group justify="space-between">
                <Text size="sm">Understand security implications</Text>
                <Badge color={quizScore >= 70 ? 'green' : 'red'} size="sm">
                  {quizScore >= 70 ? 'Achieved' : 'Needs Work'}
                </Badge>
              </Group>
              <Group justify="space-between">
                <Text size="sm">Apply cybersecurity principles</Text>
                <Badge color={overallScore >= 80 ? 'green' : 'red'} size="sm">
                  {overallScore >= 80 ? 'Achieved' : 'Needs Work'}
                </Badge>
              </Group>
            </Stack>
          </Stack>
        </Paper>

        <Group justify="center">
          <Button onClick={onExportResults} leftSection={<IconEye size={16} />}>
            Export Results
          </Button>
          <Button variant="outline" onClick={handleResetQuiz} leftSection={<IconRefresh size={16} />}>
            Retake Assessment
          </Button>
        </Group>
      </Stack>
    );
  };

  return (
    <Paper p="md" shadow="sm" style={{ height: '100%' }}>
      <Stack gap="md" style={{ height: '100%' }}>
        <Title order={4}>Assessment & Validation</Title>

        <ScrollArea style={{ flex: 1 }}>
          <Stack gap="lg">
            {renderConnectionAssessment()}
            
            <Divider />
            
            {!showResults || answeredQuestions < totalQuestions ? 
              renderQuestionnaireAssessment() : renderFinalResults()
            }
          </Stack>
        </ScrollArea>
      </Stack>
    </Paper>
  );
}