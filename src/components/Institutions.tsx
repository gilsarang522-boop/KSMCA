import React, { useState } from 'react';
import { Institution } from '../types';
import { Search, Plus, Trash2, Edit, X } from 'lucide-react';

interface InstitutionsProps {
  institutions: Institution[];
  setInstitutions: React.Dispatch<React.SetStateAction<Institution[]>>;
}

export default function Institutions({ institutions, setInstitutions }: InstitutionsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingInst, setEditingInst] = useState<Institution | null>(null);
  
  const [formData, setFormData] = useState<Partial<Institution>>({
    name: '', type: '', sport: '', contactPerson: '', phone: '', mouDate: new Date().toISOString().split('T')[0]
  });

  const filteredInstitutions = institutions.filter(inst => 
    inst.name.includes(searchTerm) || 
    inst.type.includes(searchTerm) || 
    inst.sport.includes(searchTerm)
  );

  const handleOpenModal = (inst?: Institution) => {
    if (inst) {
      setEditingInst(inst);
      setFormData(inst);
    } else {
      setEditingInst(null);
      setFormData({
        name: '', type: '', sport: '', contactPerson: '', phone: '', mouDate: new Date().toISOString().split('T')[0]
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingInst(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingInst) {
      setInstitutions(institutions.map(i => i.id === editingInst.id ? { ...formData, id: i.id } as Institution : i));
    } else {
      setInstitutions([...institutions, { ...formData, id: Date.now().toString() } as Institution]);
    }
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('정말로 이 기관을 삭제하시겠습니까?')) {
      setInstitutions(institutions.filter(i => i.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">MOU 기관 관리</h1>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center text-sm font-medium transition-colors"
        >
          <Plus size={16} className="mr-2" />
          기관 추가
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="기관명, 유형, 종목 검색..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500">
                <th className="p-4 font-medium">기관명</th>
                <th className="p-4 font-medium">유형</th>
                <th className="p-4 font-medium">관련 종목</th>
                <th className="p-4 font-medium">담당자</th>
                <th className="p-4 font-medium">연락처</th>
                <th className="p-4 font-medium">MOU 체결일</th>
                <th className="p-4 font-medium text-right">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredInstitutions.length > 0 ? (
                filteredInstitutions.map(inst => (
                  <tr key={inst.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-medium text-gray-900">{inst.name}</td>
                    <td className="p-4 text-sm text-gray-600">{inst.type}</td>
                    <td className="p-4 text-sm text-gray-600">{inst.sport}</td>
                    <td className="p-4 text-sm text-gray-600">{inst.contactPerson}</td>
                    <td className="p-4 text-sm text-gray-600">{inst.phone}</td>
                    <td className="p-4 text-sm text-gray-600">{inst.mouDate}</td>
                    <td className="p-4 text-right">
                      <button onClick={() => handleOpenModal(inst)} className="text-gray-400 hover:text-indigo-600 p-1 transition-colors">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => handleDelete(inst.id)} className="text-gray-400 hover:text-red-600 p-1 ml-2 transition-colors">
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
              <h2 className="text-xl font-bold text-gray-900">{editingInst ? '기관 정보 수정' : '새 기관 추가'}</h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">기관명 *</label>
                  <input required type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                    value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">유형 (예: 학교, 프로구단, 사설클럽)</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                    value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">관련 종목</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                    value={formData.sport} onChange={e => setFormData({...formData, sport: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">담당자 성명</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                    value={formData.contactPerson} onChange={e => setFormData({...formData, contactPerson: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">담당자 연락처</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                    value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">MOU 체결일 *</label>
                  <input required type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                    value={formData.mouDate} onChange={e => setFormData({...formData, mouDate: e.target.value})} />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-100">
                <button type="button" onClick={handleCloseModal} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                  취소
                </button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
                  {editingInst ? '저장하기' : '추가하기'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
