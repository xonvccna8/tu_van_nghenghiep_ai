import React, { useState, useEffect } from 'react';
import { 
  User, BookOpen, Target, Share2, Send, 
  Sparkles, AlertCircle, BarChart3, CheckCircle2,
  Briefcase, GraduationCap, BrainCircuit, FileText, Download,
  Map, Bot, Star, ShieldCheck, Anchor, Heart, ChevronRight, LogOut, Save
} from 'lucide-react';
import { useAuth } from './auth/AuthContext';
import { dbService } from './data/dbService';

const SmartCareerApp = () => {
  const { currentUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState(1);
  const [saveMsg, setSaveMsg] = useState('');
  
  const [studentInfo, setStudentInfo] = useState({
    name: currentUser?.name || 'Học Sinh',
    className: '',
    hobbies: '',
    performance: 'Khá',
    avatar: (currentUser?.name || 'H').charAt(0).toUpperCase()
  });

  const ELECTIVE_LIST = [
    { name: 'Tiếng Anh', icon: '🌍', color: 'emerald' },
    { name: 'Vật lý',    icon: '⚡', color: 'yellow' },
    { name: 'Hóa học',   icon: '🧪', color: 'purple' },
    { name: 'Sinh học',  icon: '🧬', color: 'green' },
    { name: 'Địa lí',    icon: '🗺️', color: 'sky' },
    { name: 'Tin học',   icon: '💻', color: 'indigo' },
  ];

  const [scores, setScores] = useState({ math: 7.5, literature: 8.0 });
  // selectedElectives: array of { name, score }
  const [selectedElectives, setSelectedElectives] = useState([
    { name: 'Tiếng Anh', score: 8.5 },
    { name: 'Tin học',   score: 8.0 },
  ]);

  const handleElectiveToggle = (subj) => {
    const idx = selectedElectives.findIndex(e => e.name === subj.name);
    if (idx !== -1) {
      // Deselect
      setSelectedElectives(selectedElectives.filter(e => e.name !== subj.name));
    } else {
      if (selectedElectives.length >= 2) return; // Max 2
      setSelectedElectives([...selectedElectives, { name: subj.name, score: 7.0 }]);
    }
  };

  const handleElectiveScore = (name, val) => {
    setSelectedElectives(selectedElectives.map(e => e.name === name ? { ...e, score: val } : e));
  };

  // Backward-compat helpers for AI prompt
  const examSubjects = {
    math: scores.math || 0,
    literature: scores.literature || 0,
    elective1Name: selectedElectives[0]?.name || 'Tự chọn 1',
    elective1Score: selectedElectives[0]?.score || 0,
    elective2Name: selectedElectives[1]?.name || 'Tự chọn 2',
    elective2Score: selectedElectives[1]?.score || 0,
  };

  const [selectedHolland, setSelectedHolland] = useState(['Xã hội', 'Nghệ thuật', 'Quản lý']);
  const [activeChat, setActiveChat] = useState('');
  
  const [chatMessages, setChatMessages] = useState([
    { role: 'ai', content: 'Chào bạn! Mình là Trợ lý AI Hướng nghiệp. Hãy điền đầy đủ dữ liệu ở Tab "Hồ sơ" để mình tư vấn chuyên sâu nhất cho định hướng thi 2026 của bạn nhé!' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const chatEndRef = React.useRef(null);

  const hollandTypes = ['Xã hội', 'Nghệ thuật', 'Quản lý', 'Nghiên cứu', 'Thực tế', 'Nghiệp vụ'];

  // Load profile from DB on mount
  useEffect(() => {
    if (!currentUser) return;
    const profile = dbService.getProfile(currentUser.id);
    if (profile) {
      if (profile.scores) setScores(profile.scores);
      if (profile.electives) setSelectedElectives(profile.electives);
      if (profile.holland) setSelectedHolland(profile.holland);
      if (profile.hobbies) setStudentInfo(s => ({ ...s, hobbies: profile.hobbies }));
      if (profile.performance) setStudentInfo(s => ({ ...s, performance: profile.performance }));
    }
    // Load class info
    if (currentUser.classId) {
      const cls = dbService.getClassById(currentUser.classId);
      if (cls) setStudentInfo(s => ({ ...s, className: cls.name }));
    }
  }, [currentUser?.id]);

  const saveProfile = () => {
    if (!currentUser) return;
    dbService.saveProfile(currentUser.id, {
      scores,
      electives: selectedElectives,
      holland: selectedHolland,
      hobbies: studentInfo.hobbies,
      performance: studentInfo.performance,
    });
    setSaveMsg('Đã lưu!');
    setTimeout(() => setSaveMsg(''), 2000);
  };


  const prompts = [
    { type: 'Tìm ngành', text: 'Với điểm thi dự kiến 4 môn này và sở thích của tôi, chuyên gia hãy gợi ý top 3 ngành học phù hợp nhất và giải thích tại sao?', icon: <Briefcase size={16}/>, color: 'bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200' },
    { type: 'Tổ hợp xét tuyển', text: 'Từ 4 môn thi trên, tôi có thể xét tuyển bằng những tổ hợp đại học nào cho 2026? Ngành nào đang khát nhân lực?', icon: <BarChart3 size={16}/>, color: 'bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-200' },
    { type: 'Lộ trình', text: 'Hãy thiết kế lộ trình rèn luyện 6 tháng cuối để tôi tối đa hóa điểm thi môn Tự chọn 1 và cải thiện học lực chung.', icon: <GraduationCap size={16}/>, color: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-200' },
    { type: 'Đam mê vs Điểm', text: 'Điểm môn tự chọn của tôi đang cao, nhưng sở thích của tôi lại thiên về hướng khác. Tôi nên chọn ngành theo điểm hay theo đam mê?', icon: <AlertCircle size={16}/>, color: 'bg-rose-100 text-rose-700 hover:bg-rose-200 border-rose-200' },
  ];

  const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || "";
  const OPENAI_MODEL = "gpt-4o-mini";

  const handlePromptClick = async (promptText) => {
    const newUserMsg = { role: 'user', content: promptText };
    const updatedMessages = [...chatMessages, newUserMsg];
    setChatMessages(updatedMessages);
    setIsTyping(true);
    setActiveChat('');
    
    try {
      const totalScore = computeTotalScore();
      const systemPrompt = `Bạn là "SmartCareer AI" - Trợ lý & Chuyên gia Hướng nghiệp cực kỳ thông minh, am hiểu kỳ thi Tốt nghiệp THPT Việt Nam 2025-2026 (4 môn: Toán, Văn bắt buộc + 2 môn tự chọn).
Hồ sơ học sinh đang tư vấn:
- Tên: ${studentInfo.name} (Lớp ${studentInfo.className})
- Học lực tự nhận xét: ${studentInfo.performance}
- Sở thích / Thế mạnh: ${studentInfo.hobbies}
- Điểm thi 4 môn 2026: Toán ${examSubjects.math} | Ngữ Văn ${examSubjects.literature} | ${examSubjects.elective1Name} ${examSubjects.elective1Score} | ${examSubjects.elective2Name} ${examSubjects.elective2Score}
- Tổng điểm 4 môn: ${totalScore}
- Nhóm tính cách Holland nổi trội: ${selectedHolland.join(', ')}

Quy tắc trả lời:
- PHẢI cá nhân hóa, gọi tên học sinh trong tin nhắn.
- Phân tích điểm mạnh/yếu từng môn + phù hợp ngành nào.
- Gợi ý cụ thể các "Tổ hợp xét tuyển ĐH 2026" (A00, D01, C00...) dựa trên 4 môn thi.
- Dùng nhiều emoji Gen-Z, viết bằng tiếng Việt có dấu, format Markdown rõ ràng.`;

      const apiHistory = updatedMessages.map(msg => ({
        role: msg.role === 'ai' ? 'assistant' : 'user',
        content: msg.content
      }));

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: OPENAI_MODEL,
          messages: [
            { role: 'system', content: systemPrompt },
            ...apiHistory
          ],
          temperature: 0.7,
          max_completion_tokens: 900
        })
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error.message || "Lỗi AI Services.");
      const aiText = data.choices?.[0]?.message?.content;
      if (aiText) {
        setChatMessages(prev => [...prev, { role: 'ai', content: aiText }]);
      } else {
        throw new Error("Không lấy được nội dung trả lời.");
      }
    } catch (error) {
      console.error("Lỗi:", error);
      setChatMessages(prev => [...prev, { 
        role: 'ai', 
        content: `Có lỗi xảy ra: ${error.message}. Vui lòng thử lại sau!` 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleHollandToggle = (type) => {
    if (selectedHolland.includes(type)) {
      setSelectedHolland(selectedHolland.filter(t => t !== type));
    } else {
      if (selectedHolland.length < 3) {
        setSelectedHolland([...selectedHolland, type]);
      }
    }
  };

  const computeTotalScore = () => {
    const electiveTotal = selectedElectives.reduce((s, e) => s + parseFloat(e.score || 0), 0);
    return (parseFloat(scores.math || 0) + parseFloat(scores.literature || 0) + electiveTotal).toFixed(2);
  };

  // Auto scroll to bottom
  React.useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  // Speech recognition (Voice Input)
  const handleMicClick = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Trình duyệt của bạn không hỗ trợ nhập giọng nói. Vui lòng dùng Chrome.');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'vi-VN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    setIsListening(true);
    recognition.start();
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setActiveChat(transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
  };

  // Full Markdown Renderer
  const renderMarkdown = (text) => {
    const lines = text.split('\n');
    const elements = [];
    let listItems = [];

    const flushList = (key) => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`ul-${key}`} className="list-none space-y-1 my-2">
            {listItems.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1 w-2 h-2 rounded-full bg-indigo-400 flex-shrink-0"></span>
                <span dangerouslySetInnerHTML={{ __html: item }} />
              </li>
            ))}
          </ul>
        );
        listItems = [];
      }
    };

    const applyInline = (str) => {
      return str
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
        .replace(/`(.*?)`/g, '<code class="bg-slate-100 px-1 rounded text-rose-600 text-xs font-mono">$1</code>');
    };

    lines.forEach((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) {
        flushList(idx);
        elements.push(<div key={`sp-${idx}`} className="h-2" />);
        return;
      }
      if (/^#{1,6}\s/.test(trimmed)) {
        flushList(idx);
        const level = trimmed.match(/^(#{1,6})\s/)[1].length;
        const content = trimmed.replace(/^#{1,6}\s/, '');
        const sizeMap = { 1: 'text-xl font-black text-slate-800 mt-3 mb-1', 2: 'text-lg font-bold text-slate-800 mt-2 mb-1', 3: 'text-base font-bold text-indigo-700 mt-2 mb-1' };
        elements.push(<p key={idx} className={sizeMap[level] || 'font-semibold mt-1'} dangerouslySetInnerHTML={{ __html: applyInline(content) }} />);
        return;
      }
      if (/^[-*]\s/.test(trimmed)) {
        listItems.push(applyInline(trimmed.replace(/^[-*]\s/, '')));
        return;
      }
      if (/^\d+\.\s/.test(trimmed)) {
        flushList(idx);
        const content = trimmed.replace(/^\d+\.\s/, '');
        elements.push(
          <div key={idx} className="flex items-start gap-2 my-1">
            <span className="bg-indigo-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">{trimmed.match(/^(\d+)/)[1]}</span>
            <span dangerouslySetInnerHTML={{ __html: applyInline(content) }} />
          </div>
        );
        return;
      }
      flushList(idx);
      elements.push(<p key={idx} className="my-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: applyInline(trimmed) }} />);
    });
    flushList('end');
    return elements;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#f8fafc', fontFamily: 'system-ui, -apple-system, sans-serif', overflow: 'hidden' }}>
      
      {/* MOBILE HEADER */}
      <div className="md:hidden bg-gradient-to-r from-indigo-900 to-slate-900 text-white p-4 flex items-center justify-between shadow-md z-20">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-tr from-pink-500 to-orange-400 p-2 rounded-lg">
            <Sparkles className="text-white w-5 h-5" />
          </div>
          <h1 className="text-xl font-black">Career<span className="text-pink-400">2026</span></h1>
        </div>
        <button onClick={() => setActiveTab(1)} className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-pink-500 flex items-center justify-center text-white font-bold border-2 border-white/20">
          {studentInfo.avatar}
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR - DESKTOP */}
        <div className="hidden md:flex w-72 bg-gradient-to-b from-indigo-900 to-slate-900 text-white flex-col shadow-2xl z-10 flex-shrink-0">
          <div className="p-6 flex-1">
            <div className="flex items-center gap-2 mb-8">
              <div className="bg-gradient-to-tr from-pink-500 to-orange-400 p-2 rounded-xl">
                <Sparkles className="text-white w-6 h-6" />
              </div>
              <h1 className="text-2xl font-black">Career<span className="text-pink-400">2026</span></h1>
            </div>

            <div onClick={() => setActiveTab(1)} className="p-4 bg-white/10 rounded-2xl mb-8 flex items-center gap-4 hover:bg-white/15 transition-all cursor-pointer group">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-pink-500 flex items-center justify-center text-white font-bold text-xl border-2 border-white/20 group-hover:scale-110 transition-transform">
                {studentInfo.avatar || "?"}
              </div>
              <div className="flex-1 overflow-hidden">
                <h3 className="font-bold text-white truncate">{studentInfo.name || "Học sinh mới"}</h3>
                <p className="text-indigo-200 text-xs flex items-center gap-1 mt-1">
                  <GraduationCap size={12}/> Lớp {studentInfo.className || "Chưa chọn"}
                </p>
              </div>
            </div>

            <nav className="space-y-2">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-3 ml-2">Edu Framework 2026</p>
              {[
                { id: 1, name: 'Hồ sơ & Thế mạnh', icon: <User size={18} /> },
                { id: 2, name: 'AI Hướng nghiệp', icon: <Bot size={18} /> },
                { id: 3, name: 'Chiến thuật 3 Tầng', icon: <Target size={18} /> },
                { id: 4, name: 'Báo cáo Data', icon: <FileText size={18} /> }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                    activeTab === item.id 
                    ? 'bg-indigo-500/30 text-white border-l-4 border-indigo-400' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                  }`}
                >
                  {item.icon}
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="p-6 space-y-2">
            <button onClick={saveProfile} className="w-full flex items-center justify-center gap-2 bg-indigo-500/20 hover:bg-indigo-500/40 border border-indigo-500/30 text-indigo-200 py-3 rounded-xl font-bold text-sm transition-all">
              <Save size={16}/>
              {saveMsg || 'Lưu Hồ Sơ'}
            </button>
            <button onClick={logout} className="w-full flex items-center justify-center gap-2 text-slate-400 hover:bg-white/5 hover:text-slate-200 py-3 rounded-xl font-medium text-sm transition-all">
              <LogOut size={16}/> Đăng Xuất
            </button>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className={`flex-1 relative pb-20 md:pb-0 ${activeTab === 2 ? 'overflow-hidden flex flex-col h-full' : 'overflow-y-auto'}`}>
          <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-200/20 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-200/20 rounded-full blur-[100px] pointer-events-none translate-x-1/2 translate-y-1/2"></div>

          <div className={`max-w-6xl mx-auto w-full relative z-10 ${activeTab === 2 ? 'flex-1 h-full flex flex-col p-4 md:p-8 min-h-0' : 'p-4 md:p-8'}`}>

            {/* TAB 1: HO SO */}
            {activeTab === 1 && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-black text-slate-800">Hồ sơ Cốt lõi 2026 ✨</h1>
                  <p className="text-slate-500 mt-2 text-lg">Hoàn thiện thông tin để AI đưa ra định hướng chính xác nhất.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-7 space-y-6">
                    
                    {/* Card thong tin ca nhan */}
                    <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-slate-100">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="bg-indigo-100 p-2 rounded-lg"><User className="text-indigo-600 w-5 h-5"/></div>
                        <h3 className="text-xl font-bold text-slate-800">Thông tin Cá nhân</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                        <div>
                          <label className="block text-sm font-bold text-slate-500 mb-2">Họ và Tên</label>
                          <input 
                            type="text" 
                            value={studentInfo.name} 
                            onChange={e => setStudentInfo({...studentInfo, name: e.target.value, avatar: e.target.value.charAt(0).toUpperCase() || '?'})} 
                            className="w-full bg-slate-50 border-2 border-slate-200 p-3.5 rounded-xl focus:border-indigo-400 focus:outline-none font-bold text-slate-800 transition-colors" 
                            placeholder="Nguyễn Văn A" 
                          />
                        </div>
                        <div className="flex gap-3">
                          <div className="flex-1">
                            <label className="block text-sm font-bold text-slate-500 mb-2">Lớp</label>
                            <input 
                              type="text" 
                              value={studentInfo.className} 
                              onChange={e => setStudentInfo({...studentInfo, className: e.target.value})} 
                              className="w-full bg-slate-50 border-2 border-slate-200 p-3.5 rounded-xl focus:border-indigo-400 focus:outline-none font-bold text-slate-800 text-center transition-colors" 
                              placeholder="12D9" 
                            />
                          </div>
                          <div className="flex-1">
                            <label className="block text-sm font-bold text-slate-500 mb-2">Học lực</label>
                            <select 
                              value={studentInfo.performance} 
                              onChange={e => setStudentInfo({...studentInfo, performance: e.target.value})} 
                              className="w-full bg-slate-50 border-2 border-slate-200 p-3.5 rounded-xl focus:border-indigo-400 focus:outline-none font-bold text-slate-800 transition-colors"
                            >
                              <option value="Giỏi">Giỏi</option>
                              <option value="Khá">Khá</option>
                              <option value="Trung bình">Trung bình</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-500 mb-2 flex items-center gap-1">
                          <Heart size={14} className="text-pink-500"/> Sở thích & Điểm mạnh <span className="text-xs font-normal text-slate-400 ml-2">(Quan trọng để AI phân tích)</span>
                        </label>
                        <textarea 
                          value={studentInfo.hobbies} 
                          onChange={e => setStudentInfo({...studentInfo, hobbies: e.target.value})} 
                          className="w-full bg-slate-50 border-2 border-slate-200 p-4 rounded-xl focus:border-indigo-400 focus:outline-none h-24 resize-none font-medium text-slate-700 leading-relaxed transition-colors" 
                          placeholder="Chia sẻ trung thực. VD: Thích máy tính, thích vẽ, giỏi tiếng Anh, hay ấn tượng với các bài toán..."
                        />
                      </div>
                    </div>

                    {/* Card diem 4 mon 2026 - SMART SELECTION */}
                    <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-slate-100">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="bg-blue-100 p-2 rounded-lg"><BookOpen className="text-blue-600 w-5 h-5"/></div>
                        <div>
                          <h3 className="text-xl font-bold text-slate-800">Cấu trúc thi Tốt nghiệp 2026</h3>
                          <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-wider">Toán + Văn (Bắt buộc) + Chọn 2/6 Môn Tự chọn</p>
                        </div>
                      </div>

                      {/* 2 Mon bat buoc */}
                      <div className="grid grid-cols-2 gap-4 mb-6 mt-5">
                        <div className="bg-rose-50 p-4 rounded-2xl border-2 border-rose-200">
                          <label className="block text-[11px] font-black text-rose-600 uppercase mb-2 tracking-wider">📐 Toán — Bắt buộc</label>
                          <input type="number" step="0.1" min="0" max="10" value={scores.math} onChange={e => setScores({...scores, math: e.target.value})} className="w-full bg-white border-2 border-rose-100 p-3 rounded-xl font-black text-slate-800 focus:border-rose-400 focus:outline-none text-center text-xl transition-colors" />
                        </div>
                        <div className="bg-rose-50 p-4 rounded-2xl border-2 border-rose-200">
                          <label className="block text-[11px] font-black text-rose-600 uppercase mb-2 tracking-wider">📖 Ngữ Văn — Bắt buộc</label>
                          <input type="number" step="0.1" min="0" max="10" value={scores.literature} onChange={e => setScores({...scores, literature: e.target.value})} className="w-full bg-white border-2 border-rose-100 p-3 rounded-xl font-black text-slate-800 focus:border-rose-400 focus:outline-none text-center text-xl transition-colors" />
                        </div>
                      </div>

                      {/* Chon 2 trong 6 mon tu chon */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-sm font-black text-slate-600 uppercase tracking-wider">Chọn 2 môn Tự chọn:</p>
                          <span className={`text-xs font-black px-3 py-1 rounded-full ${
                            selectedElectives.length === 2 
                            ? 'bg-emerald-100 text-emerald-700' 
                            : 'bg-orange-100 text-orange-600'
                          }`}>
                            {selectedElectives.length}/2 đã chọn
                          </span>
                        </div>
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                          {ELECTIVE_LIST.map(subj => {
                            const sel = selectedElectives.find(e => e.name === subj.name);
                            const isSelected = !!sel;
                            const isMax = !isSelected && selectedElectives.length >= 2;
                            const colorMap = {
                              emerald: isSelected ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-200' : 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100',
                              yellow:  isSelected ? 'bg-yellow-400 border-yellow-400 text-white shadow-lg shadow-yellow-200'  : 'bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100',
                              purple:  isSelected ? 'bg-purple-500 border-purple-500 text-white shadow-lg shadow-purple-200'  : 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100',
                              green:   isSelected ? 'bg-green-500 border-green-500 text-white shadow-lg shadow-green-200'    : 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100',
                              sky:     isSelected ? 'bg-sky-500 border-sky-500 text-white shadow-lg shadow-sky-200'          : 'bg-sky-50 border-sky-200 text-sky-700 hover:bg-sky-100',
                              indigo:  isSelected ? 'bg-indigo-500 border-indigo-500 text-white shadow-lg shadow-indigo-200' : 'bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100',
                            };
                            return (
                              <button
                                key={subj.name}
                                onClick={() => handleElectiveToggle(subj)}
                                disabled={isMax}
                                className={`flex flex-col items-center gap-1 p-3 rounded-2xl border-2 font-bold text-xs transition-all ${
                                  colorMap[subj.color]
                                } ${isMax ? 'opacity-40 cursor-not-allowed' : 'active:scale-95'} ${isSelected ? 'scale-105' : ''}`}
                              >
                                <span className="text-2xl">{subj.icon}</span>
                                <span className="text-center leading-tight">{subj.name}</span>
                                {isSelected && <CheckCircle2 size={14} className="mt-0.5"/>}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Nhap diem cho 2 mon da chon */}
                      {selectedElectives.length > 0 && (
                        <div className="border-t border-slate-100 pt-4">
                          <p className="text-xs font-black text-slate-500 uppercase tracking-wider mb-3">Nhập điểm các môn đã chọn:</p>
                          <div className="grid grid-cols-2 gap-4">
                            {selectedElectives.map((e, i) => {
                              const subj = ELECTIVE_LIST.find(s => s.name === e.name);
                              return (
                                <div key={e.name} className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-200">
                                  <label className="block text-[11px] font-black text-slate-500 uppercase mb-2 tracking-wider">{subj?.icon} {e.name}</label>
                                  <input
                                    type="number" step="0.1" min="0" max="10"
                                    value={e.score}
                                    onChange={ev => handleElectiveScore(e.name, ev.target.value)}
                                    className="w-full bg-white border-2 border-slate-200 p-3 rounded-xl font-black text-slate-800 focus:border-indigo-400 focus:outline-none text-center text-xl transition-colors"
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Tong */}
                      <div className="mt-4 p-4 bg-indigo-50 rounded-xl flex items-center justify-between font-bold border border-indigo-100">
                        <span className="text-indigo-700">Tổng điểm 4 môn (Khối xét tuyển):</span>
                        <span className="text-2xl text-indigo-800">{computeTotalScore()}</span>
                      </div>
                    </div>

                    {/* Card Holland */}
                    <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-slate-100">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="bg-pink-100 p-2 rounded-lg"><BrainCircuit className="text-pink-600 w-5 h-5"/></div>
                        <div>
                          <h3 className="text-xl font-bold text-slate-800">Sắc thái Tính cách (Holland)</h3>
                          <p className="text-xs text-slate-400 font-bold uppercase mt-1">Chọn tối đa 3 xu hướng</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {hollandTypes.map(type => {
                          const isSelected = selectedHolland.includes(type);
                          return (
                            <button
                              key={type}
                              onClick={() => handleHollandToggle(type)}
                              className={`px-5 py-2.5 rounded-full font-bold text-sm border-2 flex items-center gap-2 transition-all ${
                                isSelected 
                                ? 'bg-gradient-to-r from-pink-500 to-indigo-500 text-white border-transparent shadow-md scale-105' 
                                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              {isSelected && <CheckCircle2 size={15}/>}
                              {type}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Right panel */}
                  <div className="lg:col-span-5">
                    <div className="bg-gradient-to-br from-indigo-600 to-purple-800 p-8 rounded-3xl shadow-2xl flex flex-col min-h-[400px] relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-56 h-56 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
                      <h3 className="text-2xl font-black text-white mb-2 flex items-center gap-2 relative z-10">
                        <Map className="text-pink-300"/> Phân tích Điểm rẽ
                      </h3>
                      <p className="text-indigo-100 mb-6 relative z-10 text-sm leading-relaxed">
                        Với 2 môn tùy chọn <span className="font-bold text-white">{examSubjects.elective1Name}</span> và <span className="font-bold text-white">{examSubjects.elective2Name}</span>, AI sẽ xác định các tổ hợp xét tuyển tối ưu nhất cho bạn.
                      </p>
                      
                      <div className="bg-white/10 border border-white/20 p-6 rounded-2xl flex-1 flex flex-col justify-center items-center text-center relative z-10">
                        <Bot className="w-14 h-14 text-pink-300 mb-4 animate-bounce"/>
                        <h4 className="text-white font-black text-xl mb-2">Sẵn sàng Tư vấn!</h4>
                        <p className="text-indigo-200 text-sm">Điền đủ hồ sơ ở các ô bên trái, sau đó mở tab AI để nhận phân tích chuyên sâu.</p>
                        <button 
                          onClick={() => setActiveTab(2)} 
                          className="mt-5 bg-white text-indigo-700 px-6 py-3 rounded-xl font-black shadow-lg hover:scale-105 transition-transform flex gap-2 items-center"
                        >
                          Khởi động AI <ChevronRight size={18}/>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: TRO LY AI */}
            {activeTab === 2 && (
              <div
                className="flex flex-1 h-full flex-col bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden min-h-0"
              >
                <div className="p-5 bg-white border-b border-slate-100 flex-shrink-0">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="bg-gradient-to-tr from-indigo-500 to-purple-500 p-2 rounded-lg"><Bot className="text-white w-5 h-5"/></div>
                    <h2 className="text-xl font-black text-slate-800">Trợ lý AI Hướng nghiệp (2026)</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {prompts.map((p, i) => (
                      <button 
                        key={i} 
                        onClick={() => handlePromptClick(p.text)}
                        className={`px-4 py-3 rounded-xl border text-left flex gap-3 transition-all hover:scale-[1.02] hover:shadow-md ${p.color}`}
                      >
                        <div className="mt-0.5 flex-shrink-0">{p.icon}</div>
                        <div>
                          <div className="font-bold text-sm mb-1">{p.type}</div>
                          <div className="text-[11px] opacity-80 line-clamp-2 leading-snug">{p.text}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex-1 p-5 overflow-y-auto space-y-5 bg-gradient-to-b from-slate-50 to-white">
                  {chatMessages.map((msg, i) => (
                    <div key={i} className={`flex gap-3 items-end ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {msg.role === 'ai' && (
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg flex-shrink-0 border-2 border-white">
                          <Bot className="text-white w-5 h-5" />
                        </div>
                      )}
                      <div className={`px-5 py-4 rounded-3xl max-w-[78%] text-sm leading-relaxed shadow-sm ${
                        msg.role === 'user' 
                        ? 'bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-br-sm' 
                        : 'bg-white border border-slate-100 rounded-bl-sm text-slate-700'
                      }`}>
                        {msg.role === 'ai' ? renderMarkdown(msg.content) : <p>{msg.content}</p>}
                      </div>
                      {msg.role === 'user' && (
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center flex-shrink-0 text-white font-black text-lg border-2 border-white shadow-lg">
                          {studentInfo.avatar}
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center border-2 border-white shadow-lg">
                        <Bot className="text-white w-5 h-5 animate-pulse" />
                      </div>
                      <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none flex items-center gap-2 shadow-sm">
                        <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-bounce"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-bounce" style={{animationDelay:'80ms'}}></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-bounce" style={{animationDelay:'160ms'}}></span>
                        <span className="text-xs text-slate-400 ml-2 font-medium">AI đang phân tích...</span>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Chat Input + Mic */}
                <div className="p-4 bg-white border-t border-slate-100 flex-shrink-0">
                  <div className="flex gap-2 items-center">
                    {/* Mic Button */}
                    <button
                      onClick={handleMicClick}
                      title={isListening ? 'Đang nghe...' : 'Nhấn giữ và nói'}
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all shadow ${
                        isListening 
                        ? 'bg-red-500 text-white animate-pulse scale-110' 
                        : 'bg-slate-100 text-slate-500 hover:bg-indigo-100 hover:text-indigo-600'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={isListening ? 'white' : 'currentColor'}>
                        <path d="M12 1a4 4 0 0 1 4 4v6a4 4 0 0 1-8 0V5a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v6a2 2 0 0 0 4 0V5a2 2 0 0 0-2-2zm-1 14.93V20H9v2h6v-2h-2v-2.07A7 7 0 0 0 19 11h-2a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.93z"/>
                      </svg>
                    </button>
                    {/* Text Input */}
                    <input 
                      type="text" 
                      value={activeChat}
                      onChange={e => setActiveChat(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter' && activeChat.trim()) handlePromptClick(activeChat); }}
                      placeholder={isListening ? 'Đang nghe giọng nói...' : 'Gõ câu hỏi bất kỳ cho Trợ lý AI...'}
                      className={`flex-1 border-2 rounded-2xl px-5 py-3.5 focus:outline-none transition-colors text-sm ${
                        isListening 
                        ? 'bg-red-50 border-red-200 text-red-700 font-medium' 
                        : 'bg-slate-50 border-slate-100 focus:border-indigo-400 focus:bg-white'
                      }`}
                    />
                    {/* Send Button */}
                    <button 
                      onClick={() => { if (activeChat.trim()) handlePromptClick(activeChat); }}
                      className="w-12 h-12 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white rounded-2xl flex items-center justify-center transition-all shadow-lg shadow-indigo-200 flex-shrink-0"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: CHIEN THUAT 3 TANG */}
            {activeTab === 3 && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-black text-slate-800">Kanban Board Định Vị 3 Tầng</h1>
                  <p className="text-slate-500 mt-2">Giảm thiểu rủi ro trượt đại học theo kết quả 4 môn thi Tốt nghiệp 2026.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-b from-orange-50 to-white p-5 rounded-3xl border-2 border-orange-100 flex flex-col">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center shadow-md"><Star size={20}/></div>
                      <h3 className="font-black text-lg text-orange-900">TẦNG ƯỚC MƠ</h3>
                    </div>
                    <p className="text-xs font-bold text-orange-600 bg-orange-100 px-3 py-1 rounded-full w-max mb-5">Điểm Trúng Tuyển cao hơn Năng lực</p>
                    <div className="space-y-3 flex-1">
                      <div className="bg-white p-4 rounded-2xl border border-orange-100 shadow-sm hover:shadow-md transition-shadow">
                        <h4 className="font-bold text-slate-800">ĐH Ngoại thương (FTU)</h4>
                        <p className="text-sm text-slate-500 mt-1">Kinh tế quốc tế, Xu hướng Tổ hợp có Toán & Ngoại Ngữ.</p>
                      </div>
                      <div className="bg-white p-4 rounded-2xl border border-orange-100 shadow-sm hover:shadow-md transition-shadow">
                        <h4 className="font-bold text-slate-800">ĐH Kinh tế Quốc dân (NEU)</h4>
                        <p className="text-sm text-slate-500 mt-1">Ngành Kinh tế, Marketing, Tài chính.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-b from-emerald-50 to-white p-5 rounded-3xl border-2 border-emerald-200 flex flex-col relative shadow-lg">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-black px-4 py-1 rounded-full shadow-md">TARGET CHÍNH</div>
                    <div className="flex items-center gap-3 mb-2 mt-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md"><ShieldCheck size={20}/></div>
                      <h3 className="font-black text-lg text-emerald-900">TẦNG AN TOÀN</h3>
                    </div>
                    <p className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full w-max mb-5">Sát với tổng điểm 4 môn</p>
                    <div className="space-y-3 flex-1">
                      <div className="bg-white p-4 rounded-2xl border-2 border-emerald-200 shadow-md hover:shadow-lg transition-shadow relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-1.5 h-full bg-emerald-500"></div>
                        <h4 className="font-bold text-slate-800 pr-3">Học viện Báo chí (AJC)</h4>
                        <p className="text-sm text-slate-500 mt-1">Truyền thông đa phương tiện, Báo chí.</p>
                      </div>
                      <div className="bg-white p-4 rounded-2xl border-2 border-emerald-200 shadow-md hover:shadow-lg transition-shadow relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-1.5 h-full bg-emerald-500"></div>
                        <h4 className="font-bold text-slate-800 pr-3">ĐH Hà Nội (HANU)</h4>
                        <p className="text-sm text-slate-500 mt-1">Ngoại ngữ, Truyền thông doanh nghiệp.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-b from-blue-50 to-white p-5 rounded-3xl border-2 border-blue-100 flex flex-col">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center shadow-md"><Anchor size={20}/></div>
                      <h3 className="font-black text-lg text-blue-900">TẦNG CHẮC CHẮN</h3>
                    </div>
                    <p className="text-xs font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full w-max mb-5">Phương án dự phòng an toàn</p>
                    <div className="space-y-3 flex-1">
                      <div className="bg-white p-4 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                        <h4 className="font-bold text-slate-800">ĐH Công Đoàn (TUU)</h4>
                        <p className="text-sm text-slate-500 mt-1">Xã hội học, Quan hệ lao động.</p>
                      </div>
                      <div className="bg-white p-4 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                        <h4 className="font-bold text-slate-800">ĐH Văn hóa (HUC)</h4>
                        <p className="text-sm text-slate-500 mt-1">Quản lý Văn hóa, Du lịch văn hóa.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: BAO CAO */}
            {activeTab === 4 && (
              <div className="max-w-4xl mx-auto w-full space-y-8">
                <div className="text-center pt-4">
                  <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-5 rounded-full text-xl font-black shadow-2xl hover:scale-105 transition-transform flex items-center gap-4 mx-auto border-2 border-white/20">
                    <Download className="w-8 h-8"/> XUẤT BÁO CÁO PDF
                  </button>
                  <p className="text-slate-500 font-medium mt-4 text-base max-w-xl mx-auto">
                    Dữ liệu được cập nhật từ hồ sơ để kết nối chiến lược hướng nghiệp gia đình.
                  </p>
                </div>

                <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
                  <div className="bg-slate-900 px-8 py-5 flex justify-between items-center">
                    <h3 className="text-white font-bold text-lg flex items-center gap-3">
                      <FileText className="text-pink-400"/> Hồ sơ: {studentInfo.name}
                    </h3>
                    <div className="text-slate-400 text-xs font-bold">Preview Mode</div>
                  </div>

                  <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <BookOpen className="text-indigo-600 w-5 h-5"/>
                        <h4 className="font-bold text-slate-800 uppercase text-sm tracking-wider">Cấu trúc 4 Môn (2026)</h4>
                      </div>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between border-b border-slate-200 pb-2">
                          <span className="text-slate-500">Toán:</span>
                          <span className="font-bold text-slate-800">{examSubjects.math}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200 pb-2">
                          <span className="text-slate-500">Ngữ Văn:</span>
                          <span className="font-bold text-slate-800">{examSubjects.literature}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200 pb-2">
                          <span className="text-slate-500">{examSubjects.elective1Name}:</span>
                          <span className="font-bold text-slate-800">{examSubjects.elective1Score}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200 pb-2">
                          <span className="text-slate-500">{examSubjects.elective2Name}:</span>
                          <span className="font-bold text-slate-800">{examSubjects.elective2Score}</span>
                        </div>
                        <div className="flex justify-between pt-1">
                          <span className="text-slate-500 font-medium">Tổng điểm 4 môn:</span>
                          <span className="font-black text-indigo-600 text-lg">{computeTotalScore()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <User className="text-pink-600 w-5 h-5"/>
                        <h4 className="font-bold text-slate-800 uppercase text-sm tracking-wider">Hồ sơ Tâm lý</h4>
                      </div>
                      <ul className="space-y-3 text-sm">
                        <li className="flex gap-3">
                          <CheckCircle2 className="text-emerald-500 w-5 h-5 flex-shrink-0 mt-0.5"/>
                          <div>
                            <p className="font-bold text-slate-800">Holland Code</p>
                            <p className="text-slate-600">{selectedHolland.join(' - ')}</p>
                          </div>
                        </li>
                        <li className="flex gap-3">
                          <CheckCircle2 className="text-emerald-500 w-5 h-5 flex-shrink-0 mt-0.5"/>
                          <div>
                            <p className="font-bold text-slate-800">Sở thích & Thế mạnh</p>
                            <p className="text-slate-600 line-clamp-2">{studentInfo.hobbies || "Chưa khai báo"}</p>
                          </div>
                        </li>
                        <li className="flex gap-3">
                          <CheckCircle2 className="text-emerald-500 w-5 h-5 flex-shrink-0 mt-0.5"/>
                          <div>
                            <p className="font-bold text-slate-800">Học lực</p>
                            <p className="text-slate-600">{studentInfo.performance}</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* MOBILE BOTTOM NAV */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-200 flex justify-between px-6 py-2 z-50 shadow-lg">
        {[
          { id: 1, name: 'Hồ sơ', icon: <User size={22} /> },
          { id: 2, name: 'AI Chat', icon: <Bot size={22} /> },
          { id: 3, name: 'Chiến lược', icon: <Target size={22} /> },
          { id: 4, name: 'Báo cáo', icon: <FileText size={22} /> }
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 py-1 transition-all ${
              activeTab === item.id ? 'text-indigo-600' : 'text-slate-400'
            }`}
          >
            <div className={activeTab === item.id ? 'bg-indigo-100 p-2 rounded-xl' : 'p-2'}>
               {item.icon}
            </div>
            <span className="text-[10px] font-bold">{item.name}</span>
          </button>
        ))}
      </div>

    </div>
  );
};

export default SmartCareerApp;
