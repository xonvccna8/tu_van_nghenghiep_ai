import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import { dbService } from '../data/dbService';
import {
  LayoutDashboard, Users, BarChart3, LogOut, Plus, Trash2,
  Eye, ChevronRight, School, X, CheckCircle2, Copy, UserPlus,
  Sparkles, Edit2, AlertCircle, MessageCircle, Clock, BookOpen, Bot
} from 'lucide-react';

// Render markdown to beautiful React elements
const RenderMarkdown = ({ content }) => {
  if (!content) return null;
  // Normalize escape sequences
  const text = content.replace(/\\n/g, '\n').replace(/\\t/g, '  ');
  const lines = text.split('\n');
  const elements = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { elements.push(<div key={i} className="h-2"/>); i++; continue; }
    if (line.startsWith('### ')) {
      elements.push(<h3 key={i} className="font-black text-indigo-700 text-sm mt-3 mb-1">{renderInline(line.slice(4))}</h3>);
    } else if (line.startsWith('## ')) {
      elements.push(<h2 key={i} className="font-black text-slate-800 text-base mt-2 mb-1 flex items-center gap-1">{renderInline(line.slice(3))}</h2>);
    } else if (line.startsWith('# ')) {
      elements.push(<h1 key={i} className="font-black text-slate-800 text-lg mt-2 mb-1">{renderInline(line.slice(2))}</h1>);
    } else if (/^(\d+)\.\s/.test(line)) {
      const num = line.match(/^(\d+)\./)[1];
      const rest = line.replace(/^\d+\.\s+/, '');
      elements.push(
        <div key={i} className="flex gap-2 mt-1">
          <span className="font-black text-indigo-600 text-sm w-5 flex-shrink-0">{num}.</span>
          <p className="text-sm text-slate-700 leading-relaxed flex-1">{renderInline(rest)}</p>
        </div>
      );
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      elements.push(
        <div key={i} className="flex gap-2 mt-1 ml-2">
          <span className="text-indigo-400 flex-shrink-0 mt-0.5">•</span>
          <p className="text-sm text-slate-700 leading-relaxed flex-1">{renderInline(line.slice(2))}</p>
        </div>
      );
    } else if (line.startsWith('   - ') || line.startsWith('   * ')) {
      elements.push(
        <div key={i} className="flex gap-2 mt-0.5 ml-6">
          <span className="text-slate-400 flex-shrink-0 text-xs mt-1">▸</span>
          <p className="text-sm text-slate-600 leading-relaxed flex-1">{renderInline(line.slice(5))}</p>
        </div>
      );
    } else if (line.startsWith('💡') || line.startsWith('🎯') || line.startsWith('⭐')) {
      elements.push(<p key={i} className="text-sm text-indigo-700 font-semibold mt-2 leading-relaxed bg-indigo-50 rounded-xl px-3 py-2">{renderInline(line)}</p>);
    } else {
      elements.push(<p key={i} className="text-sm text-slate-700 leading-relaxed mt-1">{renderInline(line)}</p>);
    }
    i++;
  }
  return <div className="space-y-0.5">{elements}</div>;
};

const renderInline = (text) => {
  if (!text) return null;
  const parts = [];
  const regex = /\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  let last = 0, m;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) parts.push(<span key={last}>{text.slice(last, m.index)}</span>);
    if (m[1]) parts.push(<strong key={m.index} className="font-black text-slate-800">{m[1]}</strong>);
    else if (m[2]) parts.push(<em key={m.index} className="italic">{m[2]}</em>);
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(<span key={last}>{text.slice(last)}</span>);
  return parts.length > 0 ? parts : text;
};

const Modal = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-black text-slate-800">{title}</h3>
          <button onClick={onClose} className="bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-colors"><X size={16}/></button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, icon, color }) => (
  <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
    <div className="flex items-center justify-between mb-3">
      <div className={`p-2.5 rounded-xl ${color}`}>{icon}</div>
    </div>
    <div className="text-3xl font-black text-slate-800">{value}</div>
    <div className="text-sm font-medium text-slate-500 mt-1">{label}</div>
  </div>
);

export default function TeacherDashboard() {
  const { currentUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentProfile, setStudentProfile] = useState(null);
  const [showConsultDetail, setShowConsultDetail] = useState(false);
  const [consultDetailStudent, setConsultDetailStudent] = useState(null);

  const [showAddClass, setShowAddClass] = useState(false);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showEditClass, setShowEditClass] = useState(false);
  const [showStudentDetail, setShowStudentDetail] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [editingProfileData, setEditingProfileData] = useState({});

  const [newClassName, setNewClassName] = useState('');
  const [editClassName, setEditClassName] = useState('');
  const [newStudent, setNewStudent] = useState({ name: '', email: '', password: '123456' });
  const [formError, setFormError] = useState('');
  const [copiedCode, setCopiedCode] = useState('');

  const refresh = () => {
    const cls = dbService.getClassesByTeacher(currentUser.id);
    setClasses(cls);
    if (selectedClass) {
      const found = cls.find(c => c.id === selectedClass.id);
      if (found) {
        setSelectedClass(found);
        setStudents(dbService.getStudentsByClass(found.id));
      }
    }
  };

  useEffect(() => { refresh(); }, []);

  const handleAddClass = () => {
    if (!newClassName.trim()) { setFormError('Vui lòng nhập tên lớp!'); return; }
    dbService.addClass(currentUser.id, newClassName.trim());
    setNewClassName(''); setShowAddClass(false); setFormError(''); refresh();
  };

  const handleEditClass = () => {
    if (!editClassName.trim()) { setFormError('Vui lòng nhập tên lớp!'); return; }
    dbService.updateClass(selectedClass.id, editClassName.trim());
    setShowEditClass(false); setFormError(''); refresh();
  };

  const handleDeleteClass = (classId) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa lớp này không?')) return;
    if (selectedClass?.id === classId) { setSelectedClass(null); }
    dbService.deleteClass(classId); refresh();
  };

  const handleSelectClass = (cls) => {
    setSelectedClass(cls);
    setStudents(dbService.getStudentsByClass(cls.id));
    setActiveTab('classDetail');
  };

  const handleAddStudent = () => {
    setFormError('');
    if (!newStudent.name || !newStudent.email) { setFormError('Vui lòng nhập đầy đủ thông tin!'); return; }
    const res = dbService.addStudentToClass(selectedClass.id, {
      name: newStudent.name, email: newStudent.email, password: newStudent.password || '123456'
    });
    if (res.error) { setFormError(res.error); return; }
    setNewStudent({ name: '', email: '', password: '123456' });
    setShowAddStudent(false); refresh();
  };

  const handleRemoveStudent = (studentId) => {
    if (!window.confirm('Xóa học sinh này khỏi lớp?')) return;
    dbService.removeStudentFromClass(selectedClass.id, studentId); refresh();
  };

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setStudentProfile(dbService.getProfile(student.id));
    setShowStudentDetail(true);
  };

  const handleDeleteHistory = (studentId, studentName) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa toàn bộ lịch sử tư vấn của học sinh ${studentName}?`)) return;
    dbService.clearConsultationHistory(studentId);
    refresh();
  };

  const handleSaveProfile = () => {
    const p = dbService.getProfile(editingProfileData.id) || {};
    const newProfile = {
      ...p,
      scores: {
        math: editingProfileData.math ? parseFloat(editingProfileData.math) : '',
        literature: editingProfileData.literature ? parseFloat(editingProfileData.literature) : ''
      },
      electives: [
        { name: editingProfileData.elective1Name, score: editingProfileData.elective1Score ? parseFloat(editingProfileData.elective1Score) : '' },
        { name: editingProfileData.elective2Name, score: editingProfileData.elective2Score ? parseFloat(editingProfileData.elective2Score) : '' },
      ].filter(e => e.name),
      hobbies: editingProfileData.hobbies,
      holland: editingProfileData.holland ? editingProfileData.holland.split(',').map(s => s.trim()).filter(Boolean) : [],
    };
    
    if (editingProfileData.aiQuestion || editingProfileData.aiResponse) {
      if (!newProfile.consultations) newProfile.consultations = [];
      if (newProfile.consultations.length > 0) {
        const lastSession = newProfile.consultations[newProfile.consultations.length - 1];
        if (!lastSession.messages) lastSession.messages = [];
        if (lastSession.messages[0]) lastSession.messages[0].content = editingProfileData.aiQuestion;
        else lastSession.messages[0] = { role: 'user', content: editingProfileData.aiQuestion };

        if (lastSession.messages[1]) lastSession.messages[1].content = editingProfileData.aiResponse;
        else lastSession.messages[1] = { role: 'ai', content: editingProfileData.aiResponse };
      } else {
        newProfile.consultations.push({
          id: 'c_edit_' + Date.now(),
          timestamp: new Date().toISOString(),
          messages: [
            { role: 'user', content: editingProfileData.aiQuestion },
            { role: 'ai', content: editingProfileData.aiResponse }
          ]
        });
      }
    }

    dbService.saveProfile(editingProfileData.id, newProfile);
    setShowEditProfileModal(false);
    refresh();
  };

  const copyCode = (code) => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const allStudents = dbService.getAllStudentsByTeacher(currentUser.id);

  const totalScore = (profile) => {
    if (!profile) return null;
    const elec = (profile.electives || []).reduce((s, e) => s + parseFloat(e.score || 0), 0);
    return (parseFloat(profile.scores?.math || 0) + parseFloat(profile.scores?.literature || 0) + elec).toFixed(1);
  };

  const navItems = [
    { id: 'overview',   label: 'Tổng Quan',           icon: <LayoutDashboard size={18}/> },
    { id: 'classes',    label: 'Quản Lý Lớp',          icon: <School size={18}/> },
    { id: 'students',   label: 'Tất Cả Học Sinh',       icon: <Users size={18}/> },
    { id: 'history',    label: 'Lịch Sử Tư Vấn AI',      icon: <MessageCircle size={18}/> },
    { id: 'reports',    label: 'Báo Cáo',              icon: <BarChart3 size={18}/> },
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">

      {/* SIDEBAR */}
      <div className="w-64 bg-gradient-to-b from-orange-600 to-orange-800 text-white flex flex-col shadow-2xl z-10 flex-shrink-0">
        <div className="p-6 flex-1">
          <div className="flex items-center gap-2 mb-8">
            <div className="bg-white/20 p-2 rounded-xl"><Sparkles className="w-5 h-5"/></div>
            <div>
              <h1 className="text-lg font-black">Career<span className="text-yellow-300">2026</span></h1>
              <p className="text-orange-200 text-[10px] font-bold uppercase tracking-wider">Giáo Viên</p>
            </div>
          </div>

          <div className="bg-white/10 rounded-2xl p-4 mb-6 border border-white/10">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 flex items-center justify-center font-black text-white text-lg mb-2">
              {currentUser.name.charAt(0)}
            </div>
            <h3 className="font-bold text-white text-sm truncate">{currentUser.name}</h3>
            <p className="text-orange-200 text-xs mt-0.5">{classes.length} lớp đang quản lý</p>
          </div>

          <nav className="space-y-1">
            {navItems.map(item => (
              <button key={item.id} onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                  activeTab === item.id || (activeTab === 'classDetail' && item.id === 'classes')
                    ? 'bg-white/20 text-white border-l-4 border-yellow-300'
                    : 'text-orange-100 hover:bg-white/10'
                }`}
              >
                {item.icon} {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-orange-200 hover:bg-white/10 transition-all font-medium text-sm">
            <LogOut size={18}/> Đăng Xuất
          </button>
        </div>
      </div>

      {/* NỘI DUNG CHÍNH */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-6xl mx-auto">

          {/* TỔNG QUAN */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-black text-slate-800">Xin chào, {currentUser.name}! 👋</h1>
                <p className="text-slate-500 mt-1">Tổng quan tình hình các lớp học đang quản lý.</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard label="Tổng số lớp" value={classes.length} icon={<School size={20} className="text-orange-600"/>} color="bg-orange-100"/>
                <StatCard label="Tổng học sinh" value={allStudents.length} icon={<Users size={20} className="text-indigo-600"/>} color="bg-indigo-100"/>
                <StatCard label="Đã có hồ sơ" value={allStudents.filter(s => dbService.getProfile(s.id)).length} icon={<CheckCircle2 size={20} className="text-emerald-600"/>} color="bg-emerald-100"/>
                <StatCard label="Chưa có hồ sơ" value={allStudents.filter(s => !dbService.getProfile(s.id)).length} icon={<AlertCircle size={20} className="text-rose-600"/>} color="bg-rose-100"/>
              </div>

              <div>
                <h2 className="text-xl font-black text-slate-800 mb-4">Các lớp đang quản lý</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {classes.map(cls => (
                    <div key={cls.id} onClick={() => handleSelectClass(cls)}
                      className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md hover:border-orange-200 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="bg-orange-100 p-2 rounded-xl"><School className="text-orange-600 w-5 h-5"/></div>
                        <ChevronRight className="text-slate-300 group-hover:text-orange-500 transition-colors" size={18}/>
                      </div>
                      <h3 className="text-xl font-black text-slate-800">Lớp {cls.name}</h3>
                      <p className="text-slate-500 text-sm mt-1">{cls.studentIds.length} học sinh</p>
                      <div className="mt-3">
                        <span className="text-xs bg-orange-50 text-orange-600 font-bold px-2 py-1 rounded-lg border border-orange-100">
                          Mã tham gia: {cls.code}
                        </span>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => setShowAddClass(true)}
                    className="bg-white rounded-2xl p-5 border-2 border-dashed border-slate-200 hover:border-orange-300 hover:bg-orange-50 transition-all flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-orange-500 min-h-[150px]"
                  >
                    <Plus size={24}/><span className="font-bold text-sm">Thêm lớp mới</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* QUẢN LÝ LỚP */}
          {activeTab === 'classes' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-black text-slate-800">Quản Lý Lớp Học</h1>
                  <p className="text-slate-500 mt-1">Tạo lớp và cung cấp Mã Lớp cho học sinh để gia nhập.</p>
                </div>
                <button onClick={() => setShowAddClass(true)}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-orange-200 transition-all hover:scale-105"
                >
                  <Plus size={18}/> Thêm Lớp Mới
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {classes.map(cls => (
                  <div key={cls.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-5">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-black text-white">Lớp {cls.name}</h3>
                        <div className="flex gap-2">
                          <button onClick={() => { setEditClassName(cls.name); setSelectedClass(cls); setShowEditClass(true); }}
                            className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors text-white"
                          ><Edit2 size={14}/></button>
                          <button onClick={() => handleDeleteClass(cls.id)}
                            className="bg-white/20 hover:bg-red-500/50 p-2 rounded-lg transition-colors text-white"
                          ><Trash2 size={14}/></button>
                        </div>
                      </div>
                      <p className="text-orange-100 text-sm mt-1">{cls.studentIds.length} học sinh</p>
                    </div>
                    <div className="p-5">
                      <div className="bg-orange-50 rounded-xl p-3 border border-orange-100 mb-4">
                        <p className="text-xs text-orange-500 font-bold uppercase mb-1">Mã tham gia (gửi cho học sinh):</p>
                        <div className="flex items-center justify-between">
                          <span className="font-black text-orange-700">{cls.code}</span>
                          <button onClick={() => copyCode(cls.code)} className="text-orange-400 hover:text-orange-600 transition-colors">
                            {copiedCode === cls.code ? <CheckCircle2 size={16} className="text-emerald-500"/> : <Copy size={16}/>}
                          </button>
                        </div>
                      </div>
                      <button onClick={() => handleSelectClass(cls)}
                        className="w-full bg-slate-800 hover:bg-slate-700 text-white py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors"
                      >
                        <Eye size={15}/> Xem Danh Sách Học Sinh
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CHI TIẾT LỚP */}
          {activeTab === 'classDetail' && selectedClass && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-sm">
                <button onClick={() => setActiveTab('classes')} className="text-slate-400 hover:text-slate-600 font-bold">Quản Lý Lớp</button>
                <ChevronRight size={15} className="text-slate-300"/>
                <span className="font-black text-slate-800">Lớp {selectedClass.name}</span>
              </div>

              <div className="bg-gradient-to-r from-orange-500 to-orange-700 rounded-3xl p-6 flex items-center justify-between">
                <div className="text-white">
                  <h2 className="text-2xl font-black">Lớp {selectedClass.name}</h2>
                  <p className="text-orange-100 mt-1">
                    {students.length} học sinh &nbsp;|&nbsp; Mã tham gia: <span className="font-black text-white">{selectedClass.code}</span>
                  </p>
                </div>
                <button onClick={() => setShowAddStudent(true)}
                  className="bg-white text-orange-600 px-5 py-3 rounded-2xl font-black flex items-center gap-2 hover:scale-105 transition-transform shadow-lg"
                >
                  <UserPlus size={18}/> Thêm Học Sinh
                </button>
              </div>

              {students.length === 0 ? (
                <div className="text-center py-20 text-slate-400">
                  <Users size={48} className="mx-auto mb-4 opacity-30"/>
                  <p className="font-bold">Chưa có học sinh nào trong lớp này.</p>
                  <p className="text-sm mt-1">Cung cấp Mã Lớp: <strong className="text-orange-500">{selectedClass.code}</strong> cho học sinh để gia nhập.</p>
                </div>
              ) : (
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-100">
                      <tr>
                        {['Học Sinh', 'Email', 'Tổng Điểm', 'Hồ Sơ', ''].map((h, i) => (
                          <th key={i} className={`px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider ${i >= 2 ? 'text-center' : 'text-left'}`}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {students.map(student => {
                        const profile = dbService.getProfile(student.id);
                        const score = totalScore(profile);
                        return (
                          <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-black text-sm">
                                  {student.name.charAt(0)}
                                </div>
                                <span className="font-bold text-slate-800">{student.name}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-500">{student.email}</td>
                            <td className="px-6 py-4 text-center">
                              {score ? <span className="font-black text-indigo-600 text-lg">{score}</span> : <span className="text-slate-300">—</span>}
                            </td>
                            <td className="px-6 py-4 text-center">
                              {profile
                                ? <span className="bg-emerald-100 text-emerald-700 text-xs font-black px-2 py-1 rounded-full">Đã có</span>
                                : <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2 py-1 rounded-full">Chưa có</span>
                              }
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2 justify-end">
                                <button onClick={() => handleViewStudent(student)} className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 p-2 rounded-lg transition-colors"><Eye size={14}/></button>
                                <button onClick={() => handleRemoveStudent(student.id)} className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-lg transition-colors"><Trash2 size={14}/></button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TẤT CẢ HỌC SINH */}
          {activeTab === 'students' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-black text-slate-800">Tất Cả Học Sinh</h1>
                <p className="text-slate-500 mt-1">Tổng hợp từ {classes.length} lớp đang quản lý — {allStudents.length} học sinh.</p>
              </div>
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      {['Học Sinh', 'Lớp', 'Email', 'Tổng Điểm', 'Hồ Sơ'].map((h, i) => (
                        <th key={i} className={`px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider ${i >= 3 ? 'text-center' : 'text-left'}`}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {allStudents.map(student => {
                      const profile = dbService.getProfile(student.id);
                      const score = totalScore(profile);
                      return (
                        <tr key={student.id} onClick={() => handleViewStudent(student)} className="hover:bg-indigo-50 transition-colors cursor-pointer">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-black text-sm">{student.name.charAt(0)}</div>
                              <span className="font-bold text-slate-800">{student.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4"><span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded-full">{student.className || '—'}</span></td>
                          <td className="px-6 py-4 text-sm text-slate-500">{student.email}</td>
                          <td className="px-6 py-4 text-center">{score ? <span className="font-black text-indigo-600">{score}</span> : <span className="text-slate-300">—</span>}</td>
                          <td className="px-6 py-4 text-center">
                            {profile ? <CheckCircle2 size={18} className="mx-auto text-emerald-500"/> : <AlertCircle size={18} className="mx-auto text-orange-400"/>}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {/* LỊCH SỬ TƯ VẤN AI */}
          {activeTab === 'history' && (() => {
            const historyData = dbService.getAllConsultedStudentsByTeacher(currentUser.id);
            const totalConsulted = historyData.reduce((s, c) => s + c.students.length, 0);
            return (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
                    <span className="bg-indigo-100 p-2 rounded-xl"><Bot size={24} className="text-indigo-600"/></span>
                    Lịch Sử Tư Vấn AI
                  </h1>
                  <p className="text-slate-500 mt-1">
                    {totalConsulted} học sinh đã được AI hướng nghiệp tư vấn — phân theo 3 lớp.
                  </p>
                </div>

                {/* Thống kê nhanh */}
                <div className="grid grid-cols-3 gap-4">
                  {historyData.map(cls => (
                    <div key={cls.classId} className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-5 text-white">
                      <div className="flex items-center justify-between mb-3">
                        <span className="bg-white/20 text-white text-xs font-black px-2 py-1 rounded-lg">Lớp {cls.className}</span>
                        <MessageCircle size={20} className="opacity-60"/>
                      </div>
                      <div className="text-4xl font-black mb-1">{cls.students.length}</div>
                      <div className="text-indigo-100 text-sm">học sinh đã tư vấn</div>
                    </div>
                  ))}
                </div>

                {/* Danh sách theo lớp */}
                {historyData.map(cls => (
                  <div key={cls.classId} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                    {/* Header lớp */}
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-xl"><School size={18} className="text-white"/></div>
                        <div>
                          <h3 className="text-white font-black text-lg">Lớp {cls.className}</h3>
                          <p className="text-indigo-100 text-xs">{cls.students.length} học sinh đã được AI tư vấn</p>
                        </div>
                      </div>
                      <div className="bg-white/20 text-white text-sm font-black px-3 py-1.5 rounded-xl">
                        {new Date().toLocaleDateString('vi-VN')}
                      </div>
                    </div>

                    {/* Danh sách học sinh */}
                    <div className="divide-y divide-slate-50">
                      {cls.students.map((student, idx) => {
                        const lastSession = student.lastConsultation;
                        const firstMsg = lastSession?.messages?.[0];
                        const aiMsg = lastSession?.messages?.[1];
                        const d = new Date(lastSession?.timestamp);
                        const dateStr = d.toLocaleDateString('vi-VN', { day:'2-digit', month:'2-digit', year:'numeric' });
                        const timeStr = d.toLocaleTimeString('vi-VN', { hour:'2-digit', minute:'2-digit' });
                        return (
                          <div key={student.id}
                            className="px-6 py-4 hover:bg-indigo-50/50 transition-colors cursor-pointer"
                            onClick={() => { setConsultDetailStudent(student); setShowConsultDetail(true); }}
                          >
                            <div className="flex items-start gap-4">
                              {/* Số thứ tự */}
                              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-sm flex-shrink-0 mt-0.5">
                                {idx + 1}
                              </div>
                              {/* Avatar */}
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-black flex-shrink-0">
                                {student.name.charAt(0)}
                              </div>
                              {/* Thông tin */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2 flex-wrap">
                                  <h4 className="font-black text-slate-800">{student.name}</h4>
                                  <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                                    <Clock size={12}/>
                                    <span>{dateStr} lúc {timeStr}</span>
                                  </div>
                                </div>
                                {/* Môn thi */}
                                <div className="flex gap-1.5 mt-1 flex-wrap">
                                  {student.profile?.electives?.map(e => (
                                    <span key={e.name} className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-0.5 rounded-full">{e.name}</span>
                                  ))}
                                </div>
                                {/* Câu hỏi của học sinh */}
                                {firstMsg && (
                                  <div className="mt-2 bg-slate-50 rounded-xl p-3 border border-slate-100">
                                    <p className="text-xs text-slate-400 font-bold mb-1 flex items-center gap-1"><BookOpen size={11}/> Câu hỏi:</p>
                                    <p className="text-slate-600 text-sm line-clamp-2">{firstMsg.content}</p>
                                  </div>
                                )}
                                {/* Tóm tắt phản hồi AI */}
                                {aiMsg && (
                                  <div className="mt-2 bg-indigo-50 rounded-xl p-3 border border-indigo-100">
                                    <p className="text-xs text-indigo-400 font-bold mb-1 flex items-center gap-1"><Bot size={11}/> AI tư vấn:</p>
                                    <p className="text-slate-600 text-sm line-clamp-2">{aiMsg.content.replace(/[#*`]/g, '').substring(0, 120)}...</p>
                                  </div>
                                )}
                              </div>
                              {/* Badge */}
                              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                                <span className="bg-emerald-100 text-emerald-700 text-xs font-black px-2 py-1 rounded-full">✅ Đã tư vấn</span>
                                <div className="flex items-center gap-2 mt-auto">
                                  <button onClick={(e) => { e.stopPropagation(); setConsultDetailStudent(student); setShowConsultDetail(true); }} className="bg-slate-100 hover:bg-slate-200 p-1.5 rounded-lg transition-colors"><Eye size={14} className="text-slate-500"/></button>
                                  <button onClick={(e) => { 
                                    e.stopPropagation(); 
                                    const p2 = student.profile || {};
                                    const msgs = student.lastConsultation?.messages || [];
                                    setEditingProfileData({
                                      id: student.id,
                                      name: student.name,
                                      math: p2.scores?.math || '',
                                      literature: p2.scores?.literature || '',
                                      elective1Name: p2.electives?.[0]?.name || '',
                                      elective1Score: p2.electives?.[0]?.score || '',
                                      elective2Name: p2.electives?.[1]?.name || '',
                                      elective2Score: p2.electives?.[1]?.score || '',
                                      hobbies: p2.hobbies || '',
                                      holland: (p2.holland || []).join(', '),
                                      aiQuestion: msgs[0]?.content || '',
                                      aiResponse: msgs[1]?.content || ''
                                    });
                                    setShowEditProfileModal(true);
                                  }} className="bg-orange-50 hover:bg-orange-100 p-1.5 rounded-lg transition-colors"><Edit2 size={14} className="text-orange-500"/></button>
                                  <button onClick={(e) => { e.stopPropagation(); handleDeleteHistory(student.id, student.name); }} className="bg-red-50 hover:bg-red-100 p-1.5 rounded-lg transition-colors"><Trash2 size={14} className="text-red-500"/></button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}


          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-black text-slate-800">Báo Cáo Tổng Hợp</h1>
                <p className="text-slate-500 mt-1">Thống kê điểm số và tình trạng hồ sơ theo từng lớp.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {classes.map(cls => {
                  const sts = dbService.getStudentsByClass(cls.id);
                  const withProfile = sts.filter(s => dbService.getProfile(s.id));
                  const avg = withProfile.length
                    ? (withProfile.reduce((sum, s) => sum + parseFloat(totalScore(dbService.getProfile(s.id)) || 0), 0) / withProfile.length).toFixed(1)
                    : '—';
                  return (
                    <div key={cls.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-orange-100 p-2.5 rounded-xl"><School className="text-orange-600 w-5 h-5"/></div>
                        <h3 className="text-xl font-black text-slate-800">Lớp {cls.name}</h3>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="text-center bg-slate-50 rounded-2xl p-4">
                          <div className="text-2xl font-black text-slate-800">{sts.length}</div>
                          <div className="text-xs text-slate-500 mt-1 font-medium">Học Sinh</div>
                        </div>
                        <div className="text-center bg-emerald-50 rounded-2xl p-4">
                          <div className="text-2xl font-black text-emerald-700">{withProfile.length}</div>
                          <div className="text-xs text-slate-500 mt-1 font-medium">Có hồ sơ</div>
                        </div>
                        <div className="text-center bg-indigo-50 rounded-2xl p-4">
                          <div className="text-2xl font-black text-indigo-700">{avg}</div>
                          <div className="text-xs text-slate-500 mt-1 font-medium">TB 4 môn</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* MODAL: THÊM LỚP */}
      <Modal open={showAddClass} onClose={() => { setShowAddClass(false); setFormError(''); }} title="Thêm Lớp Mới">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-600 mb-2">Tên Lớp</label>
            <input value={newClassName} onChange={e => setNewClassName(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAddClass()}
              className="w-full bg-slate-50 border-2 border-slate-200 p-3.5 rounded-xl focus:border-orange-400 focus:outline-none font-bold text-slate-800"
              placeholder="Ví dụ: 12D9"/>
          </div>
          {formError && <p className="text-red-500 text-sm font-medium">⚠️ {formError}</p>}
          <button onClick={handleAddClass} className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3.5 rounded-xl font-black transition-colors">
            Tạo Lớp Học
          </button>
        </div>
      </Modal>

      {/* MODAL: SỬA LỚP */}
      <Modal open={showEditClass} onClose={() => { setShowEditClass(false); setFormError(''); }} title="Sửa Tên Lớp">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-600 mb-2">Tên Lớp Mới</label>
            <input value={editClassName} onChange={e => setEditClassName(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleEditClass()}
              className="w-full bg-slate-50 border-2 border-slate-200 p-3.5 rounded-xl focus:border-orange-400 focus:outline-none font-bold text-slate-800"/>
          </div>
          {formError && <p className="text-red-500 text-sm font-medium">⚠️ {formError}</p>}
          <button onClick={handleEditClass} className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3.5 rounded-xl font-black transition-colors">
            Lưu Thay Đổi
          </button>
        </div>
      </Modal>

      {/* MODAL: THÊM HỌC SINH */}
      <Modal open={showAddStudent} onClose={() => { setShowAddStudent(false); setFormError(''); newStudent.name = ''; newStudent.email = ''; }} title={`Thêm Học Sinh vào Lớp ${selectedClass?.name}`}>
        <div className="space-y-4">
          {[
            ['Họ và Tên', 'name', 'text', 'Nguyễn Văn A'],
            ['Email', 'email', 'email', 'email@student.com'],
            ['Mật Khẩu Mặc Định', 'password', 'text', '123456'],
          ].map(([lbl, key, type, ph]) => (
            <div key={key}>
              <label className="block text-sm font-bold text-slate-600 mb-2">{lbl}</label>
              <input type={type} value={newStudent[key]}
                onChange={e => setNewStudent(s => ({ ...s, [key]: e.target.value }))}
                className="w-full bg-slate-50 border-2 border-slate-200 p-3.5 rounded-xl focus:border-orange-400 focus:outline-none font-medium text-slate-800"
                placeholder={ph}/>
            </div>
          ))}
          {formError && <p className="text-red-500 text-sm font-medium">⚠️ {formError}</p>}
          <button onClick={handleAddStudent} className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3.5 rounded-xl font-black transition-colors flex items-center justify-center gap-2">
            <UserPlus size={18}/> Thêm Học Sinh
          </button>
        </div>
      </Modal>

      {/* CHI TIẾT HỌC SINH */}
      {showStudentDetail && selectedStudent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <div>
                <h3 className="text-lg font-black text-slate-800">{selectedStudent.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">Hồ sơ hướng nghiệp 2026</p>
              </div>
              <button onClick={() => setShowStudentDetail(false)} className="bg-slate-100 p-2 rounded-full hover:bg-slate-200 transition-colors"><X size={16}/></button>
            </div>
            <div className="p-6 space-y-4">
              {studentProfile ? (
                <>
                  <div className="bg-indigo-50 rounded-2xl p-4 border border-indigo-100">
                    <h4 className="font-black text-indigo-800 text-sm uppercase tracking-wider mb-3">📊 Điểm Thi 4 Môn (2026)</h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex justify-between bg-white rounded-xl p-2.5"><span className="text-slate-500">Toán:</span><span className="font-black text-slate-800">{studentProfile.scores?.math}</span></div>
                      <div className="flex justify-between bg-white rounded-xl p-2.5"><span className="text-slate-500">Ngữ Văn:</span><span className="font-black text-slate-800">{studentProfile.scores?.literature}</span></div>
                      {(studentProfile.electives || []).map(e => (
                        <div key={e.name} className="flex justify-between bg-white rounded-xl p-2.5"><span className="text-slate-500">{e.name}:</span><span className="font-black text-slate-800">{e.score}</span></div>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-indigo-200 flex justify-between items-center">
                      <span className="font-bold text-indigo-700">Tổng điểm:</span>
                      <span className="font-black text-indigo-700 text-2xl">{totalScore(studentProfile)}</span>
                    </div>
                  </div>
                  <div className="bg-pink-50 rounded-2xl p-4 border border-pink-100">
                    <h4 className="font-black text-pink-700 text-sm uppercase tracking-wider mb-2">🧠 Holland Code</h4>
                    <div className="flex flex-wrap gap-2">
                      {(studentProfile.holland || []).map(h => (
                        <span key={h} className="bg-pink-100 text-pink-700 text-xs font-bold px-3 py-1 rounded-full">{h}</span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                    <h4 className="font-black text-slate-700 text-sm uppercase tracking-wider mb-2">💡 Sở Thích & Thế Mạnh</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{studentProfile.hobbies || 'Chưa có thông tin'}</p>
                  </div>
                </>
              ) : (
                <div className="text-center py-12 text-slate-400">
                  <AlertCircle size={40} className="mx-auto mb-3 opacity-40"/>
                  <p className="font-bold">Học sinh chưa cập nhật hồ sơ.</p>
                  <p className="text-sm mt-1">Nhắc học sinh đăng nhập và điền đầy đủ thông tin hồ sơ AI.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL CHI TIẾT TƯ VẤN AI */}
      {showConsultDetail && consultDetailStudent && (() => {
        const p = consultDetailStudent.profile;
        const session = consultDetailStudent.lastConsultation;
        const d = session ? new Date(session.timestamp) : null;
        return (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col">
              {/* Header */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white rounded-t-3xl z-10">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-black">
                    {consultDetailStudent.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-800">{consultDetailStudent.name}</h3>
                    <p className="text-xs text-slate-400">
                      {d ? d.toLocaleDateString('vi-VN', { weekday:'long', day:'2-digit', month:'2-digit', year:'numeric' }) + ' lúc ' + d.toLocaleTimeString('vi-VN', { hour:'2-digit', minute:'2-digit' }) : ''}
                    </p>
                  </div>
                </div>
                <button onClick={() => setShowConsultDetail(false)} className="bg-slate-100 p-2 rounded-full hover:bg-slate-200 transition-colors"><X size={16}/></button>
              </div>

              <div className="overflow-y-auto flex-1 p-6 space-y-4">
                {/* Thông tin hồ sơ */}
                <div className="bg-indigo-50 rounded-2xl p-4 border border-indigo-100">
                  <h4 className="font-black text-indigo-800 text-xs uppercase tracking-wider mb-3">📊 Điểm Thi 4 Môn — {consultDetailStudent.name}</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { label: 'Toán', val: p?.scores?.math },
                      { label: 'Ngữ Văn', val: p?.scores?.literature },
                      ...(p?.electives || []).map(e => ({ label: e.name, val: e.score }))
                    ].map(item => (
                      <div key={item.label} className="bg-white rounded-xl p-2.5 text-center border border-indigo-100">
                        <div className="text-xl font-black text-indigo-700">{item.val}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{item.label}</div>
                      </div>
                    ))}
                  </div>
                  {p?.holland?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {p.holland.map(h => <span key={h} className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-0.5 rounded-full">{h}</span>)}
                    </div>
                  )}
                </div>

                {/* Hội thoại */}
                <div className="space-y-3">
                  <h4 className="font-black text-slate-700 text-sm uppercase tracking-wider flex items-center gap-2">
                    <MessageCircle size={16} className="text-indigo-500"/> Hội Thoại Tư Vấn
                  </h4>
                  {(session?.messages || []).map((msg, i) => (
                    <div key={i} className={`rounded-2xl p-4 ${msg.role === 'user' ? 'bg-slate-100 border border-slate-200 ml-8' : 'bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 mr-8'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        {msg.role === 'user'
                          ? <><div className="w-6 h-6 rounded-full bg-slate-400 flex items-center justify-center text-white text-xs font-black">{consultDetailStudent.name.charAt(0)}</div><span className="text-xs font-black text-slate-500">Học sinh hỏi:</span></>
                          : <><div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center"><Bot size={12} className="text-white"/></div><span className="text-xs font-black text-indigo-600">SmartCareer AI tư vấn:</span></>
                        }
                      </div>
                      <div className="text-sm leading-relaxed">
                        {msg.role === 'ai' || msg.role === 'assistant'
                          ? <RenderMarkdown content={msg.content}/>
                          : <p className="text-slate-700">{msg.content}</p>
                        }
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* MODAL: SỬA HỒ SƠ & ĐIỂM */}
      {showEditProfileModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <div>
                <h3 className="text-lg font-black text-slate-800">Sửa hồ sơ học sinh: {editingProfileData.name}</h3>
                <p className="text-xs text-slate-400 mt-1">Cập nhật điểm và lịch sử tư vấn AI</p>
              </div>
              <button onClick={() => setShowEditProfileModal(false)} className="bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-colors"><X size={16}/></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs font-bold text-slate-500 mb-1">Toán</label><input type="number" step="0.1" className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-bold" value={editingProfileData.math} onChange={e => setEditingProfileData({...editingProfileData, math: e.target.value})}/></div>
                <div><label className="block text-xs font-bold text-slate-500 mb-1">Ngữ Văn</label><input type="number" step="0.1" className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-bold" value={editingProfileData.literature} onChange={e => setEditingProfileData({...editingProfileData, literature: e.target.value})}/></div>
                <div><label className="block text-xs font-bold text-slate-500 mb-1">Tự chọn 1 (Tên)</label><input type="text" className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-bold" value={editingProfileData.elective1Name} onChange={e => setEditingProfileData({...editingProfileData, elective1Name: e.target.value})}/></div>
                <div><label className="block text-xs font-bold text-slate-500 mb-1">Tự chọn 1 (Điểm)</label><input type="number" step="0.1" className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-bold" value={editingProfileData.elective1Score} onChange={e => setEditingProfileData({...editingProfileData, elective1Score: e.target.value})}/></div>
                <div><label className="block text-xs font-bold text-slate-500 mb-1">Tự chọn 2 (Tên)</label><input type="text" className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-bold" value={editingProfileData.elective2Name} onChange={e => setEditingProfileData({...editingProfileData, elective2Name: e.target.value})}/></div>
                <div><label className="block text-xs font-bold text-slate-500 mb-1">Tự chọn 2 (Điểm)</label><input type="number" step="0.1" className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-bold" value={editingProfileData.elective2Score} onChange={e => setEditingProfileData({...editingProfileData, elective2Score: e.target.value})}/></div>
              </div>
              <div><label className="block text-xs font-bold text-slate-500 mb-1">Holland Code (cách nhau dấu phẩy)</label><input type="text" className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-bold" value={editingProfileData.holland} onChange={e => setEditingProfileData({...editingProfileData, holland: e.target.value})}/></div>
              <div><label className="block text-xs font-bold text-slate-500 mb-1">Sở thích / Lợi thế</label><textarea rows="2" className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-bold" value={editingProfileData.hobbies} onChange={e => setEditingProfileData({...editingProfileData, hobbies: e.target.value})}/></div>
              
              <div className="pt-4 border-t border-slate-100">
                <h4 className="font-black text-slate-800 text-sm mb-3 opacity-80">Nội Dung Tư Vấn Của AI</h4>
                <div className="space-y-3">
                  <div><label className="block text-xs font-bold text-slate-500 mb-1">Học sinh hỏi</label><textarea rows="2" className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-bold text-sm" value={editingProfileData.aiQuestion} onChange={e => setEditingProfileData({...editingProfileData, aiQuestion: e.target.value})}/></div>
                  <div><label className="block text-xs font-bold text-slate-500 mb-1">AI nhận xét & gợi ý</label><textarea rows="5" className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-bold text-sm" value={editingProfileData.aiResponse} onChange={e => setEditingProfileData({...editingProfileData, aiResponse: e.target.value})}/></div>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button onClick={() => setShowEditProfileModal(false)} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3.5 rounded-xl font-black transition-colors">Hủy</button>
                <button onClick={handleSaveProfile} className="flex-[2] bg-orange-600 hover:bg-orange-700 text-white py-3.5 rounded-xl font-black transition-colors">Lưu Thông Tin</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
