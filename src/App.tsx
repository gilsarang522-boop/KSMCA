import React, { useState } from 'react';
import { LayoutDashboard, Users, Building2, Menu, X } from 'lucide-react';
import Dashboard from './components/Dashboard';
import Members from './components/Members';
import Institutions from './components/Institutions';
import { initialMembers, initialInstitutions } from './data';
import { Member, Institution } from './types';

type Tab = 'dashboard' | 'members' | 'institutions';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // App state
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [institutions, setInstitutions] = useState<Institution[]>(initialInstitutions);

  const navItems = [
    { id: 'dashboard', label: '대시보드', icon: LayoutDashboard },
    { id: 'members', label: '회원 관리', icon: Users },
    { id: 'institutions', label: 'MOU 기관 관리', icon: Building2 },
  ] as const;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 flex flex-col
        w-64 bg-slate-900 text-white transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 flex flex-col items-center border-b border-slate-800 relative">
          <button className="lg:hidden absolute top-4 right-4 text-slate-400 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={24} />
          </button>
          <img 
            src="https://placehold.co/200x80/0f172a/ffffff?text=KSMCA" 
            alt="KSMCA Logo" 
            className="h-12 object-contain mb-3"
            title="여기에 로고 이미지를 사용할 수 있습니다"
          />
          <div className="text-center">
            <h1 className="text-xl font-bold tracking-tight">KSMCA</h1>
            <p className="text-xs text-slate-400 mt-1">한국스포츠멘탈코치협회</p>
          </div>
        </div>
        
        <nav className="mt-6 px-4 space-y-2 flex-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-4 py-4 lg:px-8 flex items-center">
          <button 
            className="lg:hidden mr-4 text-gray-600 hover:text-gray-900"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
          <div className="flex-1"></div>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-sm">
              관리
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'dashboard' && <Dashboard members={members} institutions={institutions} />}
            {activeTab === 'members' && <Members members={members} setMembers={setMembers} />}
            {activeTab === 'institutions' && <Institutions institutions={institutions} setInstitutions={setInstitutions} />}
          </div>
        </div>
      </main>
    </div>
  );
}
