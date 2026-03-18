import React, { useState } from 'react';
import { Member, Course, Role } from '../types';
import { Search, Plus, Trash2, Edit, X } from 'lucide-react';

interface MembersProps {
  members: Member[];
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
}

const COURSES: Course[] = ['일반', '스멘코 1급', '스멘코 2급', '스멘코 강사과정', '스멘코 대학과정'];
const ROLES: Role[] = ['선수', '지도자', '일반인'];

export default function Members({ members, setMembers }: MembersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourse, setFilterCourse] = useState<string>('all');
  const [filterRole, setFilterRole] = useState<string>('all');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  
  // Form state
  const [formData, setFormData] = useState<Partial<Member>>({
    name: '', phone: '', email: '', role: '일반인', courses: ['일반'], sport: '', club: '', joinDate: new Date().toISOString().split('T')[0]
  });

  const filteredMembers = members.filter(m => {
    const matchesSearch = m.name.includes(searchTerm) || m.sport.includes(searchTerm) || m.club.includes(searchTerm);
    const matchesCourse = filterCourse === 'all' || m.courses.includes(filterCourse as Course);
    const matchesRole = filterRole === 'all' || m.role === filterRole;
    return matchesSearch && matchesCourse && matchesRole;
  });

  const handleOpenModal = (member?: Member) => {
    if (member) {
      setEditingMember(member);
      setFormData(member);
    } else {
      setEditingMember(null);
      setFormData({
        name: '', phone: '', email: '', role: '일반인', courses: ['일반'], sport: '', club: '', joinDate: new Date().toISOString().split('T')[0]
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingMember(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMember) {
      setMembers(members.map(m => m.id === editingMember.id ? { ...formData, id: m.id } as Member : m));
    } else {
      setMembers([...members, { ...formData, id: Date.now().toString() } as Member]);
    }
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('정말로 이 회원을 삭제하시겠습니까?')) {
      setMembers(members.filter(m => m.id !== id));
    }
  };

  const handleCourseToggle = (course: Course) => {
    const currentCourses = formData.courses || [];
    if (currentCourses.includes(course)) {
      setFormData({ ...formData, courses: currentCourses.filter(c => c !== course) });
    } else {
      setFormData({ ...formData, courses: [...currentCourses, course] });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">회원 관리</h1>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center text-sm font-medium transition-colors"
        >
          <Plus size={16} className="mr-2" />
          회원 추가
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="이름, 종목, 클럽 검색..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          value={filterCourse}
          onChange={e => setFilterCourse(e.target.value)}
        >
          <option value="all">모든 과정</option>
          {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select 
          className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          value={filterRole}
          onChange={e => setFilterRole(e.target.value)}
        >
          <option value="all">모든 역할</option>
          {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500">
                <th className="p-4 font-medium">이름</th>
                <th className="p-4 font-medium">역할</th>
                <th className="p-4 font-medium">수료 과정</th>
                <th className="p-4 font-medium">종목/클럽</th>
                <th className="p-4 font-medium">연락처</th>
                <th className="p-4 font-medium">가입일</th>
                <th className="p-4 font-medium text-right">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredMembers.length > 0 ? (
                filteredMembers.map(member => (
                  <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="font-medium text-gray-900">{member.name}</div>
                      <div className="text-xs text-gray-500">{member.email}</div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${member.role === '선수' ? 'bg-blue-100 text-blue-800' : 
                          member.role === '지도자' ? 'bg-emerald-100 text-emerald-800' : 
                          'bg-gray-100 text-gray-800'}`}>
                        {member.role}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {member.courses.map(course => (
                          <span key={course} className="inline-block bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded">
                            {course}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-gray-900">{member.sport || '-'}</div>
                      <div className="text-xs text-gray-500">{member.club || '-'}</div>
                    </td>
                    <td className="p-4 text-sm text-gray-600">{member.phone}</td>
                    <td className="p-4 text-sm text-gray-600">{member.joinDate}</td>
                    <td className="p-4 text-right">
                      <button onClick={() => handleOpenModal(member)} className="text-gray-400 hover:text-blue-600 p-1 transition-colors">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => handleDelete(member.id)} className="text-gray-400 hover:text-red-600 p-1 ml-2 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-500">
                    검색 결과가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">{editingMember ? '회원 정보 수정' : '새 회원 추가'}</h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">이름 *</label>
                  <input required type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">연락처</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                  <input type="email" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">역할 *</label>
                  <select required className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.role} onChange={e => setFormData({...formData, role: e.target.value as Role})}>
                    {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">종목</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    value={formData.sport} onChange={e => setFormData({...formData, sport: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">소속 클럽/팀</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    value={formData.club} onChange={e => setFormData({...formData, club: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">가입일 *</label>
                  <input required type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    value={formData.joinDate} onChange={e => setFormData({...formData, joinDate: e.target.value})} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">수료 과정 *</label>
                <div className="flex flex-wrap gap-3">
                  {COURSES.map(course => (
                    <label key={course} className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="rounded text-blue-600 focus:ring-blue-500"
                        checked={(formData.courses || []).includes(course)}
                        onChange={() => handleCourseToggle(course)}
                      />
                      <span className="text-sm text-gray-700">{course}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-100">
                <button type="button" onClick={handleCloseModal} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                  취소
                </button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                  {editingMember ? '저장하기' : '추가하기'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
