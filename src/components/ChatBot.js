// src/components/ChatBot.js
import React, { useState } from 'react';
import '../assets/styles/ChatBot.css'; // Make sure this file exists

const defaultQuestions = [
  "What is a CPU?",
  "What does RAM do?",
  "What is a GPU?",
  "How to choose a good computer?",
];

const answers = {
"what is a cpu": "The CPU (Central Processing Unit) is the brain of the computer that performs instructions.",
"what is a ram": "RAM stands for Random Access Memory. It is a type of temporary memory that your computer uses to store data that is actively being used or processed.",
  "what does ram do": "RAM (Random Access Memory) temporarily stores data your computer is currently using.",
  "what is a gpu": "GPU (Graphics Processing Unit) is mainly used to render images and videos.",
  "how to choose a good computer": "Consider CPU speed, RAM size, storage type, and your needs like gaming or work.",
  "what is a motherboard": "The motherboard connects all the parts of a computer together.",
  "what is an ssd": "SSD (Solid State Drive) is a fast storage device with no moving parts.",
  "what is an hdd": "HDD (Hard Disk Drive) is a storage device that uses spinning disks to store data.",
  "what is a monitor": "A monitor is a screen that displays the visual output from your computer.",
  "how to speed up my computer": "Remove unused programs, use an SSD, and increase RAM if possible.",
  "what is antivirus software": "Antivirus software protects your computer from viruses and malware.",
  "what is the difference between ssd and hdd": "SSDs are faster, more durable, and use less power than HDDs.",
  "do i need a graphics card for everyday use": "No, integrated graphics are enough for basic tasks like browsing and word processing.",
  "what is thermal paste": "Thermal paste improves heat transfer between the CPU and the heat sink.",
  "why is my laptop overheating": "It could be due to dust, blocked vents, or a failing cooling fan.",
  "what does bios do": "BIOS initializes hardware and starts the operating system when you turn on the computer.",
  "how much ram do i need": "8GB is enough for most users; 16GB or more is ideal for gaming or heavy multitasking.",
  "can i upgrade my laptops ram": "Yes, if your laptop has available RAM slots and supports upgrades.",
  "what is a power supply unit psu": "The PSU converts AC power from the wall into usable power for the computer.",
  "how often should i clean my pc": "Every 3–6 months is ideal to prevent dust build-up and overheating.",
  "what is a network card": "A network card connects your computer to a network, either wired or wireless.",
  "what is a router": "A router connects multiple devices to the internet and manages network traffic.",
  "why is my internet slow": "It could be due to your ISP, router problems, too many devices, or background downloads.",
  "how can i protect my data": "Use antivirus software, enable firewalls, and back up important files regularly.",
  "what is cloud storage": "Cloud storage allows you to store data online and access it from anywhere.",
  "what is the difference between windows and macos": "Windows runs on many PCs, macOS runs only on Apple devices.",
  "what is linux": "Linux is a free, open-source operating system used by developers and tech enthusiasts.",
  "can i play games on a budget laptop": "Only light or old games; gaming laptops have dedicated GPUs and better performance.",
  "what is a usb c port": "USB-C is a newer, reversible port used for charging and data transfer.",
  "how do i reset my computer": "Go to system settings > recovery > reset this PC (Windows). Back up your files first.",
  "what is dual booting": "Dual booting allows you to run two operating systems on the same computer.",
  "how to extend laptop battery life": "Reduce screen brightness, disable unused apps, and use battery saver mode.",
  "why is my screen flickering": "Check for driver issues, loose connections, or screen damage.",
  "what is overclocking": "Overclocking increases the CPU/GPU speed beyond factory settings for better performance.",
  "is it safe to overclock my pc": "It can be, but it increases heat and power use. Proper cooling is essential.",
  "what is a docking station": "A docking station allows laptops to connect easily to multiple peripherals.",
  "what are input devices": "Input devices like keyboard and mouse send data to the computer.",
  "what are output devices": "Output devices like monitors and printers show results from the computer.",
  "can viruses harm my hardware": "Not directly, but they can overwork components, causing heat and damage.",
  "why wont my computer turn on": "It could be a power issue, faulty hardware, or a dead battery.",
  "what is safe mode in windows": "Safe Mode loads only essential drivers to help fix system issues.",
  "what is a solid state drive": "A solid-state drive (SSD) is a fast and durable storage device with no moving parts.",
  "how do i transfer files from my old pc": "Use a USB drive, external HDD, or cloud storage like Google Drive.",
  "whats the purpose of a heat sink": "A heat sink draws heat away from your CPU or GPU to keep them cool.",
  "what is a bootable usb drive": "A bootable USB contains an OS installer used to install or repair an operating system.",
  "why is my computer making noise": "It might be from fans, hard drives, or internal components overheating or failing.",
  "what is file fragmentation": "File fragmentation is when parts of a file are stored in non-contiguous locations on disk.",
  "how do i defragment my hard drive": "Use the Disk Defragmenter tool in Windows. SSDs do not need defragmentation.",
  "can i build my own pc": "Yes, building a PC lets you customize performance and usually saves money.",
  "what is a lan": "A LAN (Local Area Network) connects computers within a small area like a home or office.",
  "what is a firewall": "A firewall filters incoming and outgoing traffic to protect your system from threats.",
  "do i need a ups for my computer": "A UPS (Uninterruptible Power Supply) helps during power cuts and protects against surges.",
  "why does my computer freeze randomly": "Possible causes include overheating, malware, or software/hardware issues.",
  "what is driver software": "Drivers allow the operating system to communicate with hardware components.",
  "how do i update my drivers": "Use Device Manager in Windows or visit the hardware manufacturer's website."};


const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showDefaults, setShowDefaults] = useState(true);

  const addMessage = (sender, text) => {
    setMessages(prev => [...prev, { sender, text }]);
  };

  const handleSend = (text) => {
    const question = text || input.trim();
    if (!question) return;

    addMessage('user', question);

    const response = answers[question] || "Sorry, I don't know the answer to that question yet.";
    setTimeout(() => {
      addMessage('bot', response);
    }, 500);

    setInput('');
    setShowDefaults(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">Ask Me Anything!</div>

      <div className="chatbot-messages">
        {showDefaults && (
          <div className="default-questions">
            {defaultQuestions.map((q, i) => (
              <button key={i} className="default-question" onClick={() => handleSend(q)}>
                {q}
              </button>
            ))}
          </div>
        )}

        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === 'user' ? 'right' : 'left'}`}>
            <div className={`bubble ${msg.sender === 'user' ? 'user-bubble' : 'bot-bubble'}`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="chatbot-input">
        <input
          type="text"
          placeholder="Type your question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={() => handleSend()}>Send</button>
      </div>
    </div>
  );
};

export default ChatBot;
