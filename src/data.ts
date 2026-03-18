import { Member, Institution } from './types';

export const initialMembers: Member[] = [
  { id: '1', name: '홍길동', phone: '010-1234-5678', email: 'hong@example.com', role: '선수', courses: ['스멘코 2급'], sport: '축구', club: 'FC서울', joinDate: '2023-01-15' },
  { id: '2', name: '김철수', phone: '010-2345-6789', email: 'kim@example.com', role: '지도자', courses: ['스멘코 1급', '스멘코 강사과정'], sport: '야구', club: 'LG트윈스', joinDate: '2022-05-20' },
  { id: '3', name: '이영희', phone: '010-3456-7890', email: 'lee@example.com', role: '일반인', courses: ['일반'], sport: '테니스', club: '개인', joinDate: '2024-02-10' },
  { id: '4', name: '박지성', phone: '010-4567-8901', email: 'park@example.com', role: '선수', courses: ['스멘코 대학과정'], sport: '축구', club: 'JS파운데이션', joinDate: '2023-11-05' },
  { id: '5', name: '최민수', phone: '010-5678-9012', email: 'choi@example.com', role: '지도자', courses: ['스멘코 2급', '스멘코 1급'], sport: '농구', club: 'KCC', joinDate: '2021-08-22' },
];

export const initialInstitutions: Institution[] = [
  { id: '1', name: '대한체육회', type: '공공기관', sport: '종합', contactPerson: '최관리', phone: '02-123-4567', mouDate: '2021-03-01' },
  { id: '2', name: 'FC서울', type: '프로구단', sport: '축구', contactPerson: '박담당', phone: '02-234-5678', mouDate: '2022-08-15' },
  { id: '3', name: '한국체육대학교', type: '교육기관', sport: '종합', contactPerson: '이교수', phone: '02-345-6789', mouDate: '2023-05-10' },
];

export const organizationChart = {
  president: { title: '협회장', name: '소해준' },
  vicePresident: { title: '부회장', name: '송철우' },
  auditor: { title: '감사', name: '고규희' },
  committees: [
    { name: '스포츠과학위원회', director: '김낙원 이사' },
    { name: '대외협력 위원회', director: '유창주 이사' },
    { name: '회원관리 위원회', director: '유창주 이사' },
    { name: '교육운영 위원회', director: '김은정 이사' },
    { name: '자격검정 위원회', director: '김은정 이사' },
  ]
};
