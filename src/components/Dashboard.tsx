import React from 'react';
import { organizationChart } from '../data';
import { Member, Institution } from '../types';
import { Users, Building2, Award, BookOpen } from 'lucide-react';

interface DashboardProps {
  members: Member[];
  institutions: Institution[];
}

export default function Dashboard({ members, institutions }: DashboardProps) {
  const coursesCount = members.reduce((acc, member) => {
    member.courses.forEach(course => {
      acc[course] = (acc[course] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const rolesCount = members.reduce((acc, member) => {
    acc[member.role] = (acc[member.role] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">대시보드</h1>
        <div className="flex items-center space-x-3">
          <img 
            src="https://placehold.co/200x80/ffffff/008b8b?text=KSMCA" 
            alt="KSMCA Logo" 
            className="h-10 object-contain"
            title="여기에 첨부하신 로고 이미지를 사용할 수 있습니다"
          />
        </div>
      </div>

      {/* Organization Chart - Moved to top */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-6">조직도</h2>
        
        <div className="flex flex-col items-center space-y-8">
          {/* Top Level */}
          <div className="flex space-x-8">
            <div className="text-center">
              <div className="bg-slate-800 text-white px-6 py-3 rounded-lg shadow-md font-medium min-w-[120px]">
                <p className="text-xs text-slate-300 mb-1">{organizationChart.president.title}</p>
                <p className="text-lg">{organizationChart.president.name}</p>
              </div>
            </div>
          </div>

          {/* Second Level */}
          <div className="flex space-x-12 relative before:absolute before:top-[-16px] before:left-1/2 before:w-px before:h-4 before:bg-gray-300 before:-translate-x-1/2">
            <div className="absolute top-[-16px] left-1/2 w-[200px] h-px bg-gray-300 -translate-x-1/2"></div>
            
            <div className="text-center relative before:absolute before:top-[-16px] before:left-1/2 before:w-px before:h-4 before:bg-gray-300 before:-translate-x-1/2">
              <div className="bg-slate-100 border border-slate-200 px-6 py-3 rounded-lg shadow-sm font-medium min-w-[120px]">
                <p className="text-xs text-slate-500 mb-1">{organizationChart.vicePresident.title}</p>
                <p className="text-md text-slate-800">{organizationChart.vicePresident.name}</p>
              </div>
            </div>
            
            <div className="text-center relative before:absolute before:top-[-16px] before:left-1/2 before:w-px before:h-4 before:bg-gray-300 before:-translate-x-1/2">
              <div className="bg-slate-100 border border-slate-200 px-6 py-3 rounded-lg shadow-sm font-medium min-w-[120px]">
                <p className="text-xs text-slate-500 mb-1">{organizationChart.auditor.title}</p>
                <p className="text-md text-slate-800">{organizationChart.auditor.name}</p>
              </div>
            </div>
          </div>

          {/* Committees */}
          <div className="w-full pt-8 mt-8 border-t border-gray-100">
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {/* Left Column */}
              <div className="flex flex-col space-y-4 items-center">
                <div className="bg-[#0b2b84] text-white px-2 sm:px-4 py-3 rounded-lg shadow-md font-bold text-center w-full max-w-[160px]">
                  <p className="text-xs sm:text-sm">교육운영 위원회</p>
                  <p className="text-[10px] sm:text-xs text-blue-200 font-normal mt-1">김은정 이사</p>
                </div>
                <div className="bg-[#0b2b84] text-white px-2 sm:px-4 py-3 rounded-lg shadow-md font-bold text-center w-full max-w-[160px]">
                  <p className="text-xs sm:text-sm">자격검정 위원회</p>
                  <p className="text-[10px] sm:text-xs text-blue-200 font-normal mt-1">김은정 이사</p>
                </div>
              </div>

              {/* Center Column */}
              <div className="flex flex-col space-y-4 items-center justify-center">
                <div className="bg-[#0b2b84] text-white px-2 sm:px-4 py-3 rounded-lg shadow-md font-bold text-center w-full max-w-[160px]">
                  <p className="text-xs sm:text-sm">스포츠과학 위원회</p>
                  <p className="text-[10px] sm:text-xs text-blue-200 font-normal mt-1">김낙원 이사</p>
                </div>
              </div>

              {/* Right Column */}
              <div className="flex flex-col space-y-4 items-center">
                <div className="bg-[#0b2b84] text-white px-2 sm:px-4 py-3 rounded-lg shadow-md font-bold text-center w-full max-w-[160px]">
                  <p className="text-xs sm:text-sm">대외협력 위원회</p>
                  <p className="text-[10px] sm:text-xs text-blue-200 font-normal mt-1">유창주 이사</p>
                </div>
                <div className="bg-[#0b2b84] text-white px-2 sm:px-4 py-3 rounded-lg shadow-md font-bold text-center w-full max-w-[160px]">
                  <p className="text-xs sm:text-sm">회원관리 위원회</p>
                  <p className="text-[10px] sm:text-xs text-blue-200 font-normal mt-1">유창주 이사</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">총 회원수</p>
            <p className="text-2xl font-bold text-gray-900">{members.length}명</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
            <Building2 size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">MOU 기관</p>
            <p className="text-2xl font-bold text-gray-900">{institutions.length}개</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
            <Award size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">스멘코 수료자</p>
            <p className="text-2xl font-bold text-gray-900">
              {members.filter(m => m.courses.some(c => c !== '일반')).length}명
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
            <BookOpen size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">지도자 회원</p>
            <p className="text-2xl font-bold text-gray-900">
              {rolesCount['지도자'] || 0}명
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Course Stats */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">과정별 수료 현황</h2>
          <div className="space-y-4">
            {['스멘코 1급', '스멘코 2급', '스멘코 강사과정', '스멘코 대학과정', '일반'].map(course => {
              const count = coursesCount[course] || 0;
              const percentage = members.length > 0 ? Math.round((count / members.length) * 100) : 0;
              
              return (
                <div key={course}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">{course}</span>
                    <span className="text-gray-500">{count}명 ({percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">회원 구분</h2>
          <div className="space-y-4">
            {['선수', '지도자', '일반인'].map(role => {
              const count = rolesCount[role] || 0;
              const percentage = members.length > 0 ? Math.round((count / members.length) * 100) : 0;
              
              return (
                <div key={role}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">{role}</span>
                    <span className="text-gray-500">{count}명 ({percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className="bg-emerald-500 h-2 rounded-full" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
