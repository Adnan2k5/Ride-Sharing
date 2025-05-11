import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RefreshCw } from 'lucide-react';

export const CaptchaVerification = ({ onVerify }) => {
    const [captchaQuestion, setCaptchaQuestion] = useState('');
    const [userAnswer, setUserAnswer] = useState('');
    const [expectedAnswer, setExpectedAnswer] = useState(null);
    const [error, setError] = useState('');
    const [isVerified, setIsVerified] = useState(false);

    const generateCaptcha = () => {
        // Generate two random numbers between 1 and 20
        const num1 = Math.floor(Math.random() * 20) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;

        // Randomly choose operation (0: addition, 1: subtraction, 2: multiplication)
        const operation = Math.floor(Math.random() * 3);

        let question, answer;

        switch (operation) {
            case 0:
                question = `${num1} + ${num2} = ?`;
                answer = num1 + num2;
                break;
            case 1:
                // Ensure result is positive
                if (num1 >= num2) {
                    question = `${num1} - ${num2} = ?`;
                    answer = num1 - num2;
                } else {
                    question = `${num2} - ${num1} = ?`;
                    answer = num2 - num1;
                }
                break;
            case 2:
                question = `${num1} × ${num2} = ?`;
                answer = num1 * num2;
                break;
            default:
                question = `${num1} + ${num2} = ?`;
                answer = num1 + num2;
        }

        setCaptchaQuestion(question);
        setExpectedAnswer(answer);
        setUserAnswer('');
        setError('');
    };

    useEffect(() => {
        generateCaptcha();
    }, []);

    const handleVerify = () => {
        if (userAnswer === '' || userAnswer === null) {
            setError('Please enter your answer');
            return;
        }

        const parsedAnswer = parseInt(userAnswer, 10);

        if (isNaN(parsedAnswer)) {
            setError('Please enter a valid number');
            return;
        }

        if (parsedAnswer === expectedAnswer) {
            setIsVerified(true);
            setError('');
            if (onVerify) {
                onVerify(true);
            }
        } else {
            setError('Incorrect answer, please try again');
            generateCaptcha();
        }
    };

    return (
        <div className="space-y-4 p-4 border rounded-lg bg-white/80 backdrop-blur-sm">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Verify you're human</h3>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={generateCaptcha}
                    disabled={isVerified}
                    className="h-8 w-8 p-0"
                >
                    <RefreshCw className="h-4 w-4" />
                    <span className="sr-only">Refresh CAPTCHA</span>
                </Button>
            </div>

            {isVerified ? (
                <div className="flex items-center justify-center p-4 text-green-600">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                    <span>Verification successful!</span>
                </div>
            ) : (
                <>
                    <div className="flex items-center justify-center bg-slate-100 p-4 rounded-md">
                        <span className="text-xl font-bold">{captchaQuestion}</span>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="captcha-answer">Enter the answer:</Label>
                        <Input
                            id="captcha-answer"
                            type="text"
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            placeholder="Your answer"
                            className="w-full"
                        />
                        {error && <p className="text-sm text-red-500">{error}</p>}
                    </div>

                    <Button
                        onClick={handleVerify}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                    >
                        Verify
                    </Button>
                </>
            )}
        </div>
    );
};
