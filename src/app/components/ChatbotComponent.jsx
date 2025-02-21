'use client'
import { useState, useEffect } from 'react';
import faqData from '../chatbot/faqData.json'; // Assuming your FAQ data is saved in a file

const ChatbotComponent = () => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [faqDataLoaded, setFaqDataLoaded] = useState([]);

  // Fetch and set FAQ data on component load
  useEffect(() => {
    setFaqDataLoaded(faqData); // Set your FAQ data
  }, []);

  // Handle sending messages
  const handleSendMessage = () => {
    if (userInput.trim() === '') return;

    // Add user's message to the chat history
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { text: userInput, sender: 'user' },
    ]);

    // Check if input matches any FAQ question
    const faqMatch = faqDataLoaded
      .flatMap((item) => item.faqs)
      .find((faq) => faq.question.toLowerCase().includes(userInput.toLowerCase()));

    let botResponse = "Sorry, I couldn't find an answer to that question.";

    if (faqMatch) {
      botResponse = faqMatch.answer;
    }

    // Add bot's response to the chat history
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { text: botResponse, sender: 'bot' },
    ]);

    // Clear user input after sending message
    setUserInput('');
  };

  return (
    <div className="chatbot">
      <div className="chat-history">
        {chatHistory.map((msg, index) => (
          <div key={index} className={msg.sender}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>

      <div className="user-input">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ask a question..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatbotComponent;
