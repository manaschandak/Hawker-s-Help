import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Send,
  Mic,
  Camera,
  MapPin,
  Phone,
  Volume2,
  CheckCheck,
  Play,
  Pause,
  ShieldCheck,
  User,
  ArrowLeft,
  Briefcase,
  Clock,
  Sparkles,
  CheckCircle2,
  X,
  ExternalLink,
  Navigation
} from 'lucide-react';
import { TradeCharacter, StateCharacter } from '../components/Characters';

export default function ChatScreen() {
  const { language, speakText, showToast } = useApp();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Active chat conversation ID (default to 'conv_1')
  const [activeConvId, setActiveConvId] = useState(searchParams.get('conv') || 'conv_1');

  // Interactive Perspective Toggle: Who is sending messages right now?
  // 'worker' (Ramesh Shinde) or 'employer' (Sunita Joshi / Contractor)
  const [senderRole, setSenderRole] = useState(searchParams.get('sender') || 'worker');

  // Input message text
  const [inputText, setInputText] = useState('');

  // Voice recording state
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);

  // Playing audio state
  const [playingMsgId, setPlayingMsgId] = useState(null);

  // Image zoom modal
  const [zoomedImage, setZoomedImage] = useState(null);

  // File picker ref for sending photos in chat
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Master Conversations State
  const [conversations, setConversations] = useState([
    {
      id: 'conv_1',
      partyName: language === 'mr' ? 'सुनिता जोशी (घरमालक)' : language === 'hi' ? 'सुनीता जोशी (गृहस्वामी)' : 'Sunita Joshi (Homeowner)',
      workerName: language === 'mr' ? 'रमेश शिंदे (प्लम्बर)' : 'Ramesh Shinde (Plumber)',
      trade: 'Plumber',
      jobTitle: language === 'mr' ? 'किचन सिंक पाईप लिकेज दुरुस्ती' : 'Kitchen Sink Pipe Leakage Repair',
      location: 'Khopoli Station Road, Opp. Maruti Temple',
      wage: 750,
      phone: '9820145678',
      online: true,
      lastSeen: 'Active now',
      messages: [
        {
          id: 'm1',
          sender: 'employer',
          senderName: 'सुनिता जोशी',
          text: language === 'mr'
            ? 'नमस्ते रमेशजी, स्वयंपाकघराचा नळ खूप गळत आहे. आज सकाळी १० वाजता येऊ शकाल का?'
            : 'Hello Ramesh ji, kitchen tap is leaking heavily. Can you visit today around 10 AM?',
          time: '09:15 AM',
          type: 'text'
        },
        {
          id: 'm2',
          sender: 'worker',
          senderName: 'रमेश शिंदे',
          text: language === 'mr'
            ? 'हो मॅडम, मी खोपोली नाक्यावरच उपलब्ध आहे. सर्व टूल्स व १/२ इंच वॉल्व सोबत घेऊन येतो.'
            : 'Yes madam, I am available at Khopoli Naka. I will bring pipe wrench and valves.',
          time: '09:18 AM',
          type: 'text'
        },
        {
          id: 'm3',
          sender: 'employer',
          senderName: 'सुनिता जोशी',
          text: language === 'mr' ? 'कामाचा पत्ता व लँडमार्क पाठवला आहे:' : 'Here is the worksite location and landmark:',
          time: '09:20 AM',
          type: 'location',
          locationData: {
            building: 'Flat 302, Sai Samarth Darshan',
            address: 'Station Road, Near Maruti Mandir, Khopoli',
            distance: '0.8 km from Naka'
          }
        },
        {
          id: 'm4',
          sender: 'worker',
          senderName: 'रमेश शिंदे',
          text: language === 'mr' ? 'मजुरी रोज ₹750 ठरली आहे का?' : 'Confirming daily wage of ₹750?',
          time: '09:22 AM',
          type: 'wage_offer',
          wageData: {
            amount: 750,
            date: 'Today (9 AM - 5 PM)',
            status: 'agreed'
          }
        },
        {
          id: 'm5',
          sender: 'employer',
          senderName: 'सुनिता जोशी',
          text: language === 'mr'
            ? 'हो नक्की, ₹750 मान्य आहे. काम पूर्ण झाल्यावर लगेच रोख किंवा Google Pay द्वारे दिले जाईल.'
            : 'Yes agreed, ₹750 is confirmed. Will pay via Cash or UPI immediately after work.',
          time: '09:24 AM',
          type: 'text'
        }
      ]
    },
    {
      id: 'conv_2',
      partyName: language === 'mr' ? 'राजेश बिल्डर (कंत्राटदार)' : language === 'hi' ? 'राजेश बिल्डर (ठेकेदार)' : 'Rajesh Builder & Contractors',
      workerName: language === 'mr' ? 'रमेश शिंदे (गवंडी / गवंडी मदतनीस)' : 'Ramesh Shinde (Mason)',
      trade: 'Mason',
      jobTitle: language === 'mr' ? 'कंपाउंड भिंत बांधकाम व प्लास्टर' : 'Boundary Wall Brickwork & Plaster',
      location: 'MIDC Phase 2, Shed 14, Khopoli',
      wage: 950,
      phone: '9819234567',
      online: true,
      lastSeen: 'Active 5m ago',
      messages: [
        {
          id: 'rm1',
          sender: 'employer',
          senderName: 'राजेश बिल्डर',
          text: language === 'mr'
            ? 'रमेशजी, साईटवर सिमेंट आणि वाळू उतरली आहे. तुमच्यासोबत २ मदतनीस (Helpers) आणू शकाल का?'
            : 'Ramesh ji, cement and sand have arrived at the shed. Can you bring 2 helpers along?',
          time: '08:30 AM',
          type: 'text'
        },
        {
          id: 'rm2',
          sender: 'worker',
          senderName: 'रमेश शिंदे',
          text: language === 'mr'
            ? 'हो साहेब, मारुती आणि संतोष हेल्पर म्हणून सोबत येतील. त्यांचा प्रत्येकी रोज ₹500 होईल.'
            : 'Yes sir, Maruti and Santosh can join as helpers at ₹500/day each.',
          time: '08:35 AM',
          type: 'text'
        }
      ]
    },
    {
      id: 'conv_3',
      partyName: language === 'mr' ? 'दीपक इलेक्ट्रिकल्स' : language === 'hi' ? 'दीपक इलेक्ट्रिकल्स' : 'Deepak Electricals & Spares',
      workerName: language === 'mr' ? 'रमेश शिंदे' : 'Ramesh Shinde',
      trade: 'Electrician',
      jobTitle: language === 'mr' ? 'दुकान ३-फेज मीटर व वायरिंग' : 'Commercial 3-Phase Meter & Wiring',
      location: 'Bazar Peth Market, Khopoli',
      wage: 850,
      phone: '9833451290',
      online: false,
      lastSeen: 'Yesterday',
      messages: [
        {
          id: 'dm1',
          sender: 'employer',
          senderName: 'दीपक इलेक्ट्रिकल्स',
          text: language === 'mr'
            ? 'वायरिंग पूर्ण झाल्यावर महावितरण (MSEB) तपासणी होणार आहे.'
            : 'MSEB inspection is scheduled right after wiring completion.',
          time: 'Yesterday',
          type: 'text'
        }
      ]
    }
  ]);

  // Current active conversation
  const currentConv = conversations.find(c => c.id === activeConvId) || conversations[0];

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentConv?.messages]);

  // Quick Action Chips presets
  const workerChips = [
    language === 'mr' ? 'मी नाक्यावर वाट पाहतोय' : 'Waiting at Naka',
    language === 'mr' ? 'पत्ता / लोकेशन पाठवा' : 'Send location',
    language === 'mr' ? 'हो, सर्व अवजारे सोबत आणतो' : 'Bringing all tools',
    language === 'mr' ? 'रोज ₹750 निश्चित करा' : 'Confirm wage ₹750',
    language === 'mr' ? 'आम्ही १० मिनिटात पोहोचतोय' : 'Reaching in 10 mins'
  ];

  const employerChips = [
    language === 'mr' ? 'कामावर सकाळी ९ वाजता या' : 'Come early at 9 AM',
    language === 'mr' ? 'नाक्यावरून रिक्षा करा, भाडे मी देतो' : 'Take auto, I will pay fare',
    language === 'mr' ? 'प्लम्बर टूल्स व पाईप सोबत आणा' : 'Bring plumbing tools & pipes',
    language === 'mr' ? 'काम पूर्ण झाल्यावर लगेच रोख देतो' : 'Cash upon job completion',
    language === 'mr' ? 'पत्ता: साई समर्थ दर्शन, मंदिराशेजारी' : 'Address: Sai Samarth Darshan'
  ];

  const currentChips = senderRole === 'worker' ? workerChips : employerChips;

  // Send a text message
  const handleSendMessage = (textToSend = null) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const newMsg = {
      id: `msg_${Date.now()}`,
      sender: senderRole,
      senderName: senderRole === 'worker' ? currentConv.workerName : currentConv.partyName,
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text'
    };

    setConversations(prev =>
      prev.map(c =>
        c.id === currentConv.id ? { ...c, messages: [...c.messages, newMsg] } : c
      )
    );

    setInputText('');
  };

  // Send a location message
  const handleSendLocation = () => {
    const locMsg = {
      id: `msg_${Date.now()}`,
      sender: senderRole,
      senderName: senderRole === 'worker' ? currentConv.workerName : currentConv.partyName,
      text: language === 'mr' ? 'थेट लोकेशन शेअर केले:' : 'Live worksite location shared:',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'location',
      locationData: {
        building: 'Plot 18, Khopoli Station Road',
        address: 'Opp. Shivaji Chowk, Khopoli, Maharashtra 410203',
        distance: '0.6 km from Naka'
      }
    };

    setConversations(prev =>
      prev.map(c =>
        c.id === currentConv.id ? { ...c, messages: [...c.messages, locMsg] } : c
      )
    );

    showToast(language === 'mr' ? 'स्थान पाठवले गेले!' : 'Worksite location sent!', 'success');
  };

  // Send a photo message
  const handleSendPhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const photoMsg = {
        id: `msg_${Date.now()}`,
        sender: senderRole,
        senderName: senderRole === 'worker' ? currentConv.workerName : currentConv.partyName,
        text: file.name.replace(/\.[^/.]+$/, '') || (language === 'mr' ? 'काम साईट फोटो' : 'Worksite Photo'),
        imageUrl: reader.result,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'photo'
      };

      setConversations(prev =>
        prev.map(c =>
          c.id === currentConv.id ? { ...c, messages: [...c.messages, photoMsg] } : c
        )
      );

      showToast(language === 'mr' ? 'फोटो पाठवला!' : 'Photo sent in chat!', 'success');
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Toggle voice recording
  const handleVoiceNoteClick = () => {
    if (!isRecordingVoice) {
      setIsRecordingVoice(true);
      setRecordingSeconds(1);
      const interval = setInterval(() => {
        setRecordingSeconds(prev => {
          if (prev >= 4) {
            clearInterval(interval);
            setIsRecordingVoice(false);
            // Auto send voice note
            const voiceMsg = {
              id: `msg_${Date.now()}`,
              sender: senderRole,
              senderName: senderRole === 'worker' ? currentConv.workerName : currentConv.partyName,
              text: language === 'mr'
                ? 'मी नाक्यावर सर्व अवजारे घेऊन तयार आहे, साहेब.'
                : 'I am ready at Naka with all tools, sir.',
              duration: '0:04',
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              type: 'voice'
            };
            setConversations(prevConvs =>
              prevConvs.map(c =>
                c.id === currentConv.id ? { ...c, messages: [...c.messages, voiceMsg] } : c
              )
            );
            showToast(language === 'mr' ? 'व्हॉईस मेसेज पाठवला!' : 'Voice note sent!', 'success');
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      setIsRecordingVoice(false);
      setRecordingSeconds(0);
    }
  };

  // Play a message using TTS
  const handlePlayVoice = (msg) => {
    if (playingMsgId === msg.id) {
      setPlayingMsgId(null);
    } else {
      setPlayingMsgId(msg.id);
      speakText(msg.text);
      setTimeout(() => {
        setPlayingMsgId(null);
      }, 4000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4 py-3 pb-24 space-y-3">

      {/* 1. Perspective Switcher & Conversations Ribbon */}
      <div className="bg-[#0A0A0A] text-white rounded-[32px] p-4 border-3 border-[#0A0A0A] shadow-md space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          {/* Back button & Title */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-[#FDE047] active:scale-95 transition-all"
              title="Go Back"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <div className="text-[10px] font-black uppercase tracking-wider text-[#FDE047]">
                NAKA Direct Messenger
              </div>
              <h1 className="text-base sm:text-lg font-black text-white leading-tight">
                {language === 'mr' ? 'कामगार व मालक थेट चॅट' : 'Worker & Employer Live Chat'}
              </h1>
            </div>
          </div>

          {/* SENDER PERSPECTIVE TOGGLE */}
          <div className="flex items-center gap-1.5 bg-neutral-900 p-1.5 rounded-full border border-neutral-700 self-start sm:self-auto">
            <span className="text-[11px] font-bold text-neutral-400 pl-2 pr-1">
              {language === 'mr' ? 'मी बोलतोय:' : 'Send as:'}
            </span>

            <button
              type="button"
              onClick={() => setSenderRole('worker')}
              className={`px-3 py-1.5 rounded-full text-xs font-black transition-all ${
                senderRole === 'worker'
                  ? 'bg-[#FDE047] text-[#0A0A0A] shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {language === 'mr' ? 'कामगार (Worker)' : 'Worker'}
            </button>

            <button
              type="button"
              onClick={() => setSenderRole('employer')}
              className={`px-3 py-1.5 rounded-full text-xs font-black transition-all ${
                senderRole === 'employer'
                  ? 'bg-[#FDE047] text-[#0A0A0A] shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {language === 'mr' ? 'मालक (Employer)' : 'Employer'}
            </button>
          </div>
        </div>

        {/* Conversation Switcher Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
          {conversations.map(c => (
            <button
              key={c.id}
              onClick={() => setActiveConvId(c.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-black shrink-0 transition-all flex items-center gap-1.5 border ${
                activeConvId === c.id
                  ? 'bg-[#FDE047] text-[#0A0A0A] border-[#FDE047]'
                  : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:border-neutral-500'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${c.online ? 'bg-emerald-400' : 'bg-neutral-500'}`} />
              <span className="truncate max-w-[130px]">{c.partyName.split(' ')[0]}</span>
              <span className="text-[10px] opacity-75">({c.trade})</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Main Chat Box Card */}
      <div className="bg-white rounded-[32px] border-3 border-[#0A0A0A] shadow-lg flex flex-col h-[620px] overflow-hidden">
        
        {/* Chat Active Header */}
        <div className="px-4 py-3 bg-[#FDE047] border-b-3 border-[#0A0A0A] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <TradeCharacter trade={currentConv.trade} className="w-11 h-11 shrink-0" />
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="font-black text-[#0A0A0A] text-sm sm:text-base leading-tight">
                  {senderRole === 'worker' ? currentConv.partyName : currentConv.workerName}
                </h2>
                <ShieldCheck className="w-4 h-4 text-[#15803D] stroke-[2.5]" title="Verified User" />
              </div>

              <div className="text-[11px] font-bold text-[#0A0A0A]/80 flex items-center gap-2">
                <span>{currentConv.jobTitle}</span>
                <span>•</span>
                <span className="font-mono font-black">₹{currentConv.wage}/day</span>
              </div>
            </div>
          </div>

          {/* Header Action: Phone Call & TTS */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                const allTexts = currentConv.messages.map(m => m.text).join('. ');
                speakText(allTexts);
              }}
              className="p-2.5 rounded-full bg-white hover:bg-neutral-100 text-[#0A0A0A] border-2 border-[#0A0A0A] transition-all shadow-xs active:scale-95 cursor-pointer"
              title="Read aloud all chat messages"
            >
              <Volume2 size={16} className="stroke-[2.5]" />
            </button>

            <a
              href={`tel:${currentConv.phone}`}
              className="p-2.5 rounded-full bg-[#0A0A0A] hover:bg-[#171717] text-[#FDE047] border-2 border-[#0A0A0A] transition-all shadow-xs active:scale-95 no-underline flex items-center justify-center"
              title={`Call ${currentConv.phone}`}
            >
              <Phone size={16} className="stroke-[2.5]" />
            </a>
          </div>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#FAF8F5]">
          {/* Security Disclaimer Banner */}
          <div className="max-w-md mx-auto p-2.5 bg-neutral-100 rounded-2xl border border-neutral-300 text-center text-[11px] font-bold text-neutral-600">
            <ShieldCheck className="w-3.5 h-3.5 text-[#15803D] inline mr-1 stroke-[2.5]" />
            {language === 'mr'
              ? 'काम निश्चिती व सुरक्षेसाठी सर्व संभाषण नाका प्लॅटफॉर्मवर नोंदवले जात आहे.'
              : 'Messages are recorded for worker wage protection and dispute assistance.'}
          </div>

          {currentConv.messages.map((msg) => {
            const isMe = msg.sender === senderRole;

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                {/* Sender label */}
                <span className="text-[10px] font-bold text-neutral-500 mb-0.5 px-2">
                  {msg.senderName || (msg.sender === 'worker' ? 'Worker' : 'Employer')}
                </span>

                {/* Message Bubble Container */}
                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-[24px] p-3.5 shadow-sm space-y-2 relative border-2 ${
                    isMe
                      ? 'bg-[#FDE047] text-[#0A0A0A] border-[#0A0A0A] rounded-tr-xs'
                      : 'bg-white text-[#0A0A0A] border-[#0A0A0A] rounded-tl-xs'
                  }`}
                >
                  {/* TYPE 1: TEXT MESSAGE */}
                  {msg.type === 'text' && (
                    <p className="text-xs sm:text-sm font-bold leading-relaxed whitespace-pre-wrap">
                      {msg.text}
                    </p>
                  )}

                  {/* TYPE 2: VOICE NOTE */}
                  {msg.type === 'voice' && (
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => handlePlayVoice(msg)}
                          className="h-10 w-10 rounded-full bg-[#0A0A0A] text-[#FDE047] flex items-center justify-center shrink-0 active:scale-95 cursor-pointer shadow-xs"
                        >
                          {playingMsgId === msg.id ? (
                            <Pause size={16} />
                          ) : (
                            <Play size={16} className="ml-0.5" />
                          )}
                        </button>

                        <div className="flex-1">
                          {/* Visual Waveform bars */}
                          <div className="flex items-center gap-1 h-5">
                            {[4, 12, 18, 10, 16, 20, 8, 14, 18, 6].map((h, i) => (
                              <div
                                key={i}
                                className={`w-1 rounded-full ${
                                  playingMsgId === msg.id
                                    ? 'bg-[#15803D] animate-pulse'
                                    : 'bg-[#0A0A0A]'
                                }`}
                                style={{ height: `${h}px` }}
                              />
                            ))}
                          </div>
                          <div className="text-[10px] font-mono font-bold text-neutral-600 mt-0.5">
                            Voice Note ({msg.duration || '0:04'})
                          </div>
                        </div>
                      </div>

                      <div className="text-[11px] font-bold text-neutral-700 italic border-t border-black/10 pt-1">
                        "{msg.text}"
                      </div>
                    </div>
                  )}

                  {/* TYPE 3: LOCATION PIN CARD */}
                  {msg.type === 'location' && (
                    <div className="space-y-2">
                      <p className="text-xs font-bold">{msg.text}</p>
                      
                      <div className="bg-white rounded-2xl border-2 border-[#0A0A0A] p-3 space-y-2">
                        <div className="flex items-start gap-2">
                          <div className="p-1.5 bg-[#FDE047] text-[#0A0A0A] rounded-xl border border-[#0A0A0A]">
                            <MapPin className="w-5 h-5 stroke-[2.5]" />
                          </div>
                          <div>
                            <div className="font-black text-xs text-[#0A0A0A]">
                              {msg.locationData?.building || 'Worksite Landmark'}
                            </div>
                            <div className="text-[11px] text-neutral-600 font-bold leading-tight mt-0.5">
                              {msg.locationData?.address}
                            </div>
                            <div className="text-[10px] text-[#15803D] font-black mt-1">
                              {msg.locationData?.distance}
                            </div>
                          </div>
                        </div>

                        <a
                          href="https://maps.google.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full min-h-[38px] rounded-full bg-[#0A0A0A] text-[#FDE047] text-xs font-black flex items-center justify-center gap-1.5 no-underline active:scale-95"
                        >
                          <Navigation size={13} />
                          <span>{language === 'mr' ? 'गुगल मॅप्सवर दिशा पहा' : 'Get Directions'}</span>
                        </a>
                      </div>
                    </div>
                  )}

                  {/* TYPE 4: WAGE OFFER CONFIRMATION */}
                  {msg.type === 'wage_offer' && (
                    <div className="space-y-2">
                      <p className="text-xs font-bold">{msg.text}</p>

                      <div className="bg-[#FAF8F5] rounded-2xl border-2 border-[#0A0A0A] p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase text-neutral-600">Daily Wage</span>
                          <span className="px-2 py-0.5 bg-[#DCFCE7] text-[#15803D] border border-[#15803D] rounded-full text-[10px] font-black">
                            Agreed
                          </span>
                        </div>
                        <div className="text-xl font-black text-[#0A0A0A]">
                          ₹{msg.wageData?.amount} / {language === 'mr' ? 'दिवस' : 'day'}
                        </div>
                        <div className="text-[11px] font-bold text-neutral-600">
                          {msg.wageData?.date}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TYPE 5: PHOTO ATTACHMENT */}
                  {msg.type === 'photo' && (
                    <div className="space-y-1.5">
                      <div
                        onClick={() => setZoomedImage(msg.imageUrl)}
                        className="rounded-2xl overflow-hidden border-2 border-[#0A0A0A] cursor-pointer max-h-52 bg-black"
                      >
                        <img
                          src={msg.imageUrl}
                          alt={msg.text}
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                        />
                      </div>
                      <p className="text-xs font-bold">{msg.text}</p>
                    </div>
                  )}

                  {/* Meta footer of bubble: Time, Speaker, Read ticks */}
                  <div className="flex items-center justify-end gap-1.5 pt-0.5 text-[10px] font-bold text-neutral-600 select-none">
                    <button
                      type="button"
                      onClick={() => speakText(msg.text)}
                      className="p-1 hover:text-black cursor-pointer"
                      title="Read aloud"
                    >
                      <Volume2 size={13} />
                    </button>
                    <span>{msg.time}</span>
                    <CheckCheck size={14} className="text-[#15803D] stroke-[2.5]" />
                  </div>
                </div>
              </div>
            );
          })}

          <div ref={messagesEndRef} />
        </div>

        {/* 1-Tap Quick Suggestion Chips */}
        <div className="px-3 py-2 bg-neutral-100 border-t-2 border-neutral-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
          <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500 shrink-0 flex items-center gap-1 pl-1">
            <Sparkles size={12} className="text-amber-500" />
            <span>Quick:</span>
          </span>
          {currentChips.map((chip, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendMessage(chip)}
              className="px-3 py-1 rounded-full bg-white hover:bg-[#FDE047] text-[#0A0A0A] text-xs font-bold border border-[#0A0A0A] shrink-0 active:scale-95 transition-all shadow-2xs cursor-pointer"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Active Audio Recording Bar (If recording) */}
        {isRecordingVoice && (
          <div className="px-4 py-2.5 bg-red-100 border-t-2 border-red-500 flex items-center justify-between text-xs font-black text-red-900 animate-pulse">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-600" />
              <span>
                {language === 'mr' ? 'व्हॉईस मेसेज रेकॉर्ड होत आहे...' : 'Recording voice note...'}
              </span>
            </div>
            <span>0:0{recordingSeconds} / 0:04</span>
          </div>
        )}

        {/* Input Controls Bar */}
        <div className="p-3 bg-white border-t-3 border-[#0A0A0A] flex items-center gap-2 shrink-0">
          {/* Hidden File Picker */}
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleSendPhoto}
            className="hidden"
          />

          {/* Photo Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="h-11 w-11 rounded-full bg-neutral-100 hover:bg-[#FDE047] text-[#0A0A0A] border-2 border-[#0A0A0A] flex items-center justify-center shrink-0 active:scale-95 transition-all cursor-pointer"
            title="Attach Worksite Photo"
          >
            <Camera size={18} className="stroke-[2.5]" />
          </button>

          {/* Location Pin Button */}
          <button
            type="button"
            onClick={handleSendLocation}
            className="h-11 w-11 rounded-full bg-neutral-100 hover:bg-[#FDE047] text-[#0A0A0A] border-2 border-[#0A0A0A] flex items-center justify-center shrink-0 active:scale-95 transition-all cursor-pointer"
            title="Send Worksite Location"
          >
            <MapPin size={18} className="stroke-[2.5]" />
          </button>

          {/* Voice Note Mic Button */}
          <button
            type="button"
            onClick={handleVoiceNoteClick}
            className={`h-11 w-11 rounded-full border-2 border-[#0A0A0A] flex items-center justify-center shrink-0 active:scale-95 transition-all cursor-pointer ${
              isRecordingVoice
                ? 'bg-red-600 text-white animate-bounce'
                : 'bg-neutral-100 hover:bg-[#FDE047] text-[#0A0A0A]'
            }`}
            title="Record Voice Note"
          >
            <Mic size={18} className="stroke-[2.5]" />
          </button>

          {/* Text Input */}
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            placeholder={
              senderRole === 'worker'
                ? (language === 'mr' ? 'मालकांना मेसेज लिहा...' : 'Type message to employer...')
                : (language === 'mr' ? 'कामगाराला मेसेज लिहा...' : 'Type message to worker...')
            }
            className="flex-1 min-h-[46px] px-4 rounded-full bg-neutral-50 border-2 border-[#0A0A0A] text-xs sm:text-sm font-bold text-[#0A0A0A] focus:outline-none focus:bg-white"
          />

          {/* Send Button */}
          <button
            type="button"
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim()}
            className={`h-11 px-4 rounded-full border-2 border-[#0A0A0A] font-black text-xs flex items-center justify-center gap-1.5 transition-all ${
              inputText.trim()
                ? 'bg-[#0A0A0A] text-[#FDE047] active:scale-95 cursor-pointer shadow-xs'
                : 'bg-neutral-200 text-neutral-400 cursor-not-allowed border-neutral-300'
            }`}
          >
            <Send size={15} className="stroke-[2.5]" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>
      </div>

      {/* Image Zoom Modal */}
      {zoomedImage && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative max-w-lg w-full bg-white rounded-[32px] p-4 border-4 border-[#0A0A0A]">
            <button
              onClick={() => setZoomedImage(null)}
              className="absolute top-3 right-3 p-2 bg-[#0A0A0A] text-[#FDE047] rounded-full"
            >
              <X size={16} />
            </button>
            <div className="rounded-2xl overflow-hidden max-h-[70vh]">
              <img src={zoomedImage} alt="Zoomed Worksite" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
