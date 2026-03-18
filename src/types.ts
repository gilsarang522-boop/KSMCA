export type Course = '일반' | '스멘코 1급' | '스멘코 2급' | '스멘코 강사과정' | '스멘코 대학과정';
export type Role = '선수' | '지도자' | '일반인';

export interface Member {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: Role;
  courses: Course[];
  sport: string;
  club: string;
  joinDate: string;
}

export interface Institution {
  id: string;
  name: string;
  type: string;
  sport: string;
  contactPerson: string;
  phone: string;
  mouDate: string;
}
