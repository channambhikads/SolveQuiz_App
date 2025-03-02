import React, { useState, useEffect } from 'react';
import { Button, Breadcrumb } from 'antd';
import axiosInstance from '../../../api';
import './Quiz.css';
import PageTitle from '../../../components/PageTitle';
import { HomeOutlined, UserOutlined } from "@ant-design/icons";

function Quiz() {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answeredQuestions, setAnsweredQuestions] = useState({});
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [score, setScore] = useState(0);
    const [isCorrect, setIsCorrect] = useState(null);

    // Hardcoded correct answers (fallback)
    const correctAnswers = {
        "What does HTML stand for?": "HyperText Markup Language",
        "Which HTML element is used to define the title of a document?": "<title>",
        "Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?": "alt",
        "Which HTML element is used for the largest heading?": "<h1>",
        "Which HTML attribute is used to define inline styles?": "style",
        "How can you create an ordered list in HTML?": "<ol>",
        "Which HTML element is used to define a table row?": "<tr>",
        "How can you make a numbered list in HTML?": "<ol>",
        "Which HTML element is used to define a list item?": "<li>",
        "Which HTML element is used to define a hyperlink?": "<a>",
        "Which attribute is used to specify a unique id for an HTML element?": "id",
        "Which HTML element is used to define a paragraph?": "<p>",
        "Which HTML element is used to define emphasized text?": "<em>",
        "Which HTML attribute is used to define the URL of an image?": "src",
        "Which HTML element is used to define the body of the document?": "<body>"
    };

    useEffect(() => {
        const loadQuestions = async () => {
            try {
                const response = await axiosInstance.get('/api/exams/quiz-questions');
                console.log("Fetched Questions:", response.data.data); // Debugging
                setQuestions(response.data.data);
            } catch (error) {
                console.error("Error fetching quiz questions:", error);
            }
        };
        loadQuestions();
    }, []);

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            setIsCorrect(null);
        } else {
            setQuizCompleted(true);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prevIndex => prevIndex - 1);
        }
    };

    const handleAnswerSelection = (option) => {
        const currentQuestion = questions[currentQuestionIndex];

        if (!currentQuestion) return;

        // Get correct answer from API or fallback
        const correctAnswer = (currentQuestion.correctAnswer || correctAnswers[currentQuestion.question])?.trim().toLowerCase();
        const selectedAnswer = option.trim().toLowerCase();

        const isAnswerCorrect = correctAnswer === selectedAnswer;
        
        setIsCorrect(isAnswerCorrect);
        setAnsweredQuestions(prev => ({
            ...prev,
            [currentQuestionIndex]: { selected: option, correct: correctAnswer }
        }));

        if (isAnswerCorrect) {
            setScore(prevScore => prevScore + 1);
        }
        
        console.log(`Q: ${currentQuestion.question}`);
        console.log(`Selected: "${selectedAnswer}"`);
        console.log(`Correct: "${correctAnswer}"`);
        console.log(`Is Correct? ${isAnswerCorrect}`);
    };

    const handleRestartQuiz = () => {
        setCurrentQuestionIndex(0);
        setAnsweredQuestions({});
        setQuizCompleted(false);
        setScore(0);
        setIsCorrect(null);
    };

    if (questions.length === 0) {
        return <div>Loading...</div>;
    }

    if (quizCompleted) {
        return (
            <>
                <PageTitle title="Quiz Results" />
                <Breadcrumb items={[
                    { href: '/dashboard', title: <HomeOutlined /> },
                    { href: '/exams/quiz', title: (<><UserOutlined /><span>Quiz</span></>) },
                    { title: 'Quiz Completed' }
                ]} />
                <div className="divider"></div>
                <div className="quiz-report mt-2 mr-2">
                    <h1>Quiz Completed!</h1>
                    <h2>Your Score: {score} / {questions.length}</h2>
                    <h3>Review Your Answers:</h3>
                    <ul className="quiz-review-list">
                        {questions.map((q, index) => {
                            const userAnswer = answeredQuestions[index]?.selected || "Not Answered";
                            const correctAnswer = answeredQuestions[index]?.correct || correctAnswers[q.question];
                            const isAnswerCorrect = userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();

                            return (
                                <li key={index}>
                                    <p><strong>Q{index + 1}: {q.question}</strong></p>
                                    <p><span>Your Answer:</span> {userAnswer}</p>
                                    <p><span>Correct Answer:</span> {correctAnswer}</p>
                                </li>
                            );
                        })}
                    </ul>
                    <Button onClick={handleRestartQuiz} style={{ backgroundColor: '#007bff', color: 'white', marginTop: '10px' }}>
                        Retake Quiz
                    </Button>
                </div>
            </>
        );
    }

    return (
        <>
            <PageTitle title="Quiz" />
            <Breadcrumb items={[
                { href: '/dashboard', title: <HomeOutlined /> },
                { href: '/exams/quiz', title: (<><UserOutlined /><span>Quiz</span></>) },
                { title: 'Quiz in Progress' }
            ]} />
            <div className="divider"></div>
            <div className="quiz-container mt-2 mr-2">
                <h1>Quiz ({currentQuestionIndex + 1}/{questions.length})</h1>
                <h2>{questions[currentQuestionIndex]?.question}</h2>
                <ol className="quiz-options">
                    {questions[currentQuestionIndex]?.options?.map((option, index) => (
                        <li key={index}>
                            <label>
                                <input
                                    type="radio"
                                    value={option}
                                    checked={answeredQuestions[currentQuestionIndex]?.selected === option}
                                    onChange={() => handleAnswerSelection(option)}
                                    className={`quiz-radio ${answeredQuestions[currentQuestionIndex]?.selected === option
                                        ? isCorrect ? 'correct' : 'incorrect'
                                        : ''}`}
                                    disabled={answeredQuestions.hasOwnProperty(currentQuestionIndex)}
                                />
                                {option}
                            </label>
                        </li>
                    ))}
                </ol>
                {isCorrect !== null && (
                    <div className={`feedback-message ${isCorrect ? 'correct' : 'incorrect'}`}>
                        {isCorrect ? 'You are right!!!!' : 'So sorry, You are wrong'}
                    </div>
                )}
                <Button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
                    Previous
                </Button>
                <Button onClick={handleNextQuestion}>
                    {currentQuestionIndex === questions.length - 1 ? "Finish Quiz" : "Next"}
                </Button>
            </div>
        </>
    );
}

export default Quiz;
