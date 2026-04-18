import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { Sparkles, User, Lock, Mail, Eye, EyeOff, School, GraduationCap, ArrowRight, BookOpen } from 'lucide-react';

const InputField = ({ label, icon, type = 'text', value, onChange, placeholder }) => {
  const [show, setShow] = useState(false);
  const isPassword = type === 'password';
  return (
    <div>
      <label className="block text-sm font-bold text-slate-600 mb-2">{label}</label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">{icon}</div>
        <input
          type={isPassword ? (show ? 'text' : 'password') : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl pl-11 pr-10 py-3.5 focus:border-indigo-500 focus:outline-none focus:bg-white transition-all font-medium text-slate-800 text-sm"
        />
        {isPassword && (
          <button type="button" onClick={() => setShow(!show)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
            {show ? <EyeOff size={16}/> : <Eye size={16}/>}
          </button>
        )}
      </div>
    </div>
  );
};

export default function LoginPage() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState('login');
  const [role, setRole] = useState('student');
  const [form, setForm] = useState({ name: '', email: '', password: '', classCode: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) { setError('Vui lòng nhập đầy đủ thông tin!'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 400));
    if (mode === 'login') {
      const res = login(form.email, form.password);
      if (res.error) setError(res.error);
    } else {
      if (!form.name) { setError('Vui lòng nhập họ và tên!'); setLoading(false); return; }
      if (role === 'student' && !form.classCode) { setError('Vui lòng nhập mã lớp để gia nhập!'); setLoading(false); return; }
      const res = register({ name: form.name, email: form.email, password: form.password, role, classCode: form.classCode || undefined });
      if (res.error) setError(res.error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-500/20 rounded-full blur-[100px]"></div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl shadow-black/40 relative z-10">

        {/* Panel trái - Thương hiệu */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-10 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-500/20 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl border border-white/20">
                <Sparkles className="text-white w-7 h-7"/>
              </div>
              <div>
                <h1 className="text-3xl font-black text-white tracking-tight">Career<span className="text-pink-300">2026</span></h1>
                <p className="text-indigo-200 text-xs font-medium">Hệ thống Hướng nghiệp Thông minh</p>
              </div>
            </div>

            <div className="space-y-4 mt-8">
              {[
                { icon: <GraduationCap size={20}/>, title: 'Dành cho Học Sinh', desc: 'Nhập hồ sơ cá nhân, nhận tư vấn AI, định hướng ngành phù hợp với kỳ thi 2026.' },
                { icon: <School size={20}/>, title: 'Dành cho Giáo Viên', desc: 'Quản lý danh sách lớp, theo dõi từng học sinh, xem báo cáo tổng hợp.' },
                { icon: <BookOpen size={20}/>, title: 'Cấu trúc thi 2026', desc: 'Cập nhật đầy đủ theo quy chế 4 môn thi mới nhất của Bộ GD&ĐT.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 bg-white/10 p-4 rounded-2xl border border-white/10">
                  <div className="bg-white/20 p-2.5 rounded-xl flex-shrink-0 text-white">{item.icon}</div>
                  <div>
                    <h4 className="text-white font-bold text-sm">{item.title}</h4>
                    <p className="text-indigo-200 text-xs mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-indigo-300 text-xs relative z-10 mt-8">© Dự án phát triển chuyên nghiệp THPT 2025–2026</p>
        </div>

        {/* Panel phải - Form */}
        <div className="bg-white p-8 md:p-10 flex flex-col justify-center">

          {/* Chuyển chế độ */}
          <div className="flex bg-slate-100 rounded-2xl p-1 mb-8">
            {[['login', 'Đăng Nhập'], ['register', 'Đăng Ký']].map(([m, label]) => (
              <button key={m} onClick={() => { setMode(m); setError(''); }}
                className={`flex-1 py-2.5 rounded-xl text-sm font-black transition-all ${mode === m ? 'bg-white shadow-md text-indigo-700' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {label}
              </button>
            ))}
          </div>

          <h2 className="text-2xl font-black text-slate-800 mb-1">
            {mode === 'login' ? 'Chào mừng trở lại! 👋' : 'Tạo tài khoản mới'}
          </h2>
          <p className="text-slate-500 text-sm mb-6">
            {mode === 'login' ? 'Đăng nhập để tiếp tục hành trình hướng nghiệp.' : 'Gia nhập hệ thống SmartCareer 2026 ngay hôm nay.'}
          </p>

          {/* Chọn vai trò (chỉ khi đăng ký) */}
          {mode === 'register' && (
            <div className="flex bg-slate-100 rounded-2xl p-1 mb-5">
              {[['student', <GraduationCap size={16}/>, 'Học Sinh'], ['teacher', <School size={16}/>, 'Giáo Viên']].map(([r, icon, label]) => (
                <button key={r} onClick={() => setRole(r)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                    role === r ? (r === 'teacher' ? 'bg-orange-500 text-white shadow-md' : 'bg-indigo-600 text-white shadow-md') : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {icon} {label}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <InputField label="Họ và Tên" icon={<User size={16}/>} value={form.name} onChange={set('name')} placeholder="Nguyễn Văn A"/>
            )}
            <InputField label="Email" icon={<Mail size={16}/>} type="email" value={form.email} onChange={set('email')} placeholder="email@example.com"/>
            <InputField label="Mật khẩu" icon={<Lock size={16}/>} type="password" value={form.password} onChange={set('password')} placeholder="Nhập mật khẩu"/>
            {mode === 'register' && role === 'student' && (
              <InputField label="Mã Lớp (do Giáo viên cung cấp)" icon={<School size={16}/>} value={form.classCode} onChange={set('classCode')} placeholder="Ví dụ: D9-2026"/>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm font-medium p-3.5 rounded-xl">
                ⚠️ {error}
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 mt-2"
            >
              {loading ? (
                <span className="flex gap-1.5">
                  <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay:'75ms'}}></span>
                  <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay:'150ms'}}></span>
                </span>
              ) : (
                <>{mode === 'login' ? 'Đăng Nhập' : 'Tạo Tài Khoản'} <ArrowRight size={18}/></>
              )}
            </button>
          </form>

          {/* Tài khoản demo */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-3">Tài khoản thử nghiệm:</p>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => { setMode('login'); setForm(f => ({ ...f, email: 'duong@gmail.com', password: '123456' })); }}
                className="text-left p-3 rounded-xl bg-orange-50 border border-orange-100 hover:bg-orange-100 transition-colors">
                <div className="text-xs font-black text-orange-600 flex items-center gap-1"><School size={12}/> Giáo Viên</div>
                <div className="text-xs text-slate-500 mt-0.5">duong@gmail.com</div>
              </button>
              <button onClick={() => { setMode('login'); setForm(f => ({ ...f, email: 'huynhthaian@12d9.com', password: '123456' })); }}
                className="text-left p-3 rounded-xl bg-indigo-50 border border-indigo-100 hover:bg-indigo-100 transition-colors">
                <div className="text-xs font-black text-indigo-600 flex items-center gap-1"><GraduationCap size={12}/> Học Sinh</div>
                <div className="text-xs text-slate-500 mt-0.5">huynhthaian@12d9.com</div>
              </button>
            </div>
            <p className="text-xs text-slate-400 text-center mt-3">Mật khẩu demo: <strong>123456</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
}
