export interface SubjectResult {
  slNo: number;
  subjectCode: string;
  subjectDescription: string;
  gradePoints: number;
  credits: number;
  grade: string;
}

export interface StudentResultData {
  studentId: string;
  registrationNo: string;
  studentName: string;
  course: string;
  branch: string;
  institution: string;
  examination: string;
  semester: number;
  subjects: SubjectResult[];
  sgpa: number;
  cgpa: number;
  creditIndex: number;
  totalEarnedCredit: number;
  totalCredit: number;
  overallResult: string;
}

export interface AdmitCardSchedule {
  sem: number;
  subjectCode: string;
  subjectName: string;
  examDate: string;
  examDay: string;
  examTime: string;
  roomNo: string;
  seatNo: string;
  status: 'Allowed' | 'Withheld';
}

export interface StudentAdmitCardData {
  studentId: string;
  registrationNo: string;
  studentName: string;
  program: string;
  branch: string;
  institution: string;
  examinationName: string;
  examinationSession: string;
  schedule: AdmitCardSchedule[];
}

export interface SubjectAttendanceData {
  subjectCode: string;
  subjectName: string;
  classesConducted: number;
  classesAttended: number;
  attendancePercentage: number;
  status: 'ELIGIBLE' | 'SHORT_ATTENDANCE';
}

export interface StudentAttendanceData {
  studentId: string;
  registrationNo: string;
  studentName: string;
  program: string;
  branch: string;
  semester: number;
  overallAttended: number;
  overallConducted: number;
  overallPercentage: number;
  overallStatus: 'ELIGIBLE' | 'SHORT_ATTENDANCE';
  subjects: SubjectAttendanceData[];
}

export const MOCK_STUDENT_RESULTS: Record<string, StudentResultData> = {
  NIYAM2026001: {
    studentId: 'student_001',
    registrationNo: 'NIYAM2026_001',
    studentName: 'Demo Student',
    course: 'BTECH',
    branch: 'COMPUTER SCIENCE AND ENGINEERING',
    institution: 'ITER(FACULTY OF ENGINEERING & TECHNOLOGY)',
    examination: 'First Semester EXAMINATION, FEBRUARY 2025',
    semester: 1,
    subjects: [
      {
        slNo: 1,
        subjectCode: 'CSE1001',
        subjectDescription: 'INTRODUCTION TO COMPUTER PROGRAMMING',
        gradePoints: 9.5,
        credits: 4.0,
        grade: 'A',
      },
      {
        slNo: 2,
        subjectCode: 'CSE1002',
        subjectDescription: 'DISCRETE MATHEMATICS',
        gradePoints: 8.5,
        credits: 4.0,
        grade: 'B',
      },
      {
        slNo: 3,
        subjectCode: 'HSS1972',
        subjectDescription: 'UNIVERSAL HUMAN VALUES',
        gradePoints: 8.5,
        credits: 3.0,
        grade: 'B',
      },
      {
        slNo: 4,
        subjectCode: 'MTH1101',
        subjectDescription: 'CALCULUS A',
        gradePoints: 7.5,
        credits: 4.0,
        grade: 'C',
      },
      {
        slNo: 5,
        subjectCode: 'PHY1001',
        subjectDescription: 'UNIVERSITY PHYSICS: MECHANICS',
        gradePoints: 8.5,
        credits: 4.0,
        grade: 'B',
      },
    ],
    sgpa: 8.5,
    cgpa: 8.5,
    creditIndex: 161.5,
    totalEarnedCredit: 19.0,
    totalCredit: 19.0,
    overallResult: 'Pass',
  },
  NIYAM2026002: {
    studentId: 'student_002',
    registrationNo: '24E119C06',
    studentName: 'Shaurya Salona',
    course: 'BACHELOR OF TECHNOLOGY',
    branch: 'COMPUTER SCIENCE AND ENGINEERING',
    institution: 'ITER(FACULTY OF ENGINEERING & TECHNOLOGY) SOA, BHUBANESWAR',
    examination: 'Third Semester EXAMINATION, FEBRUARY 2025',
    semester: 3,
    subjects: [
      {
        slNo: 1,
        subjectCode: 'CHM2041',
        subjectDescription: 'Introduction to Environmental Studies',
        gradePoints: 9.0,
        credits: 3.0,
        grade: 'O',
      },
      {
        slNo: 2,
        subjectCode: 'EET1211',
        subjectDescription: 'Digital Logic Design',
        gradePoints: 9.5,
        credits: 4.0,
        grade: 'O',
      },
      {
        slNo: 3,
        subjectCode: 'CSE2631',
        subjectDescription: 'Algorithms Analysis and Design 1',
        gradePoints: 9.0,
        credits: 4.0,
        grade: 'A',
      },
      {
        slNo: 4,
        subjectCode: 'HSS2023',
        subjectDescription: 'Introduction to Microeconomics',
        gradePoints: 8.5,
        credits: 3.0,
        grade: 'A',
      },
      {
        slNo: 5,
        subjectCode: 'MTH2002',
        subjectDescription: 'Probability and Statistics',
        gradePoints: 8.5,
        credits: 4.0,
        grade: 'A',
      },
      {
        slNo: 6,
        subjectCode: 'CSE2141',
        subjectDescription: 'Computer Science Workshop 1',
        gradePoints: 10.0,
        credits: 2.0,
        grade: 'O',
      },
    ],
    sgpa: 9.12,
    cgpa: 9.05,
    creditIndex: 182.4,
    totalEarnedCredit: 20.0,
    totalCredit: 20.0,
    overallResult: 'Pass',
  },
  NIYAM2026003: {
    studentId: 'student_003',
    registrationNo: 'NIYAM2026_003',
    studentName: 'Khwahish Agarwal',
    course: 'BTECH',
    branch: 'COMPUTER SCIENCE AND ENGINEERING',
    institution: 'ITER(FACULTY OF ENGINEERING & TECHNOLOGY)',
    examination: 'First Semester EXAMINATION, FEBRUARY 2025',
    semester: 1,
    subjects: [
      {
        slNo: 1,
        subjectCode: 'CSE1001',
        subjectDescription: 'INTRODUCTION TO COMPUTER PROGRAMMING',
        gradePoints: 9.5,
        credits: 4.0,
        grade: 'A',
      },
      {
        slNo: 2,
        subjectCode: 'CSE1002',
        subjectDescription: 'DISCRETE MATHEMATICS',
        gradePoints: 8.5,
        credits: 4.0,
        grade: 'B',
      },
      {
        slNo: 3,
        subjectCode: 'HSS1972',
        subjectDescription: 'UNIVERSAL HUMAN VALUES',
        gradePoints: 8.5,
        credits: 3.0,
        grade: 'B',
      },
      {
        slNo: 4,
        subjectCode: 'MTH1101',
        subjectDescription: 'CALCULUS A',
        gradePoints: 7.5,
        credits: 4.0,
        grade: 'C',
      },
      {
        slNo: 5,
        subjectCode: 'PHY1001',
        subjectDescription: 'UNIVERSITY PHYSICS: MECHANICS',
        gradePoints: 8.5,
        credits: 4.0,
        grade: 'B',
      },
    ],
    sgpa: 8.5,
    cgpa: 8.5,
    creditIndex: 161.5,
    totalEarnedCredit: 19.0,
    totalCredit: 19.0,
    overallResult: 'Pass',
  },
  NIYAM2026004: {
    studentId: 'student_004',
    registrationNo: '24E102B11',
    studentName: 'Ananya Verma',
    course: 'BTECH',
    branch: 'COMPUTER SCIENCE AND ENGINEERING',
    institution: 'ITER(FACULTY OF ENGINEERING & TECHNOLOGY)',
    examination: 'Third Semester EXAMINATION, FEBRUARY 2025',
    semester: 3,
    subjects: [
      {
        slNo: 1,
        subjectCode: 'CHM2041',
        subjectDescription: 'Introduction to Environmental Studies',
        gradePoints: 8.0,
        credits: 3.0,
        grade: 'A',
      },
      {
        slNo: 2,
        subjectCode: 'EET1211',
        subjectDescription: 'Digital Logic Design',
        gradePoints: 8.5,
        credits: 4.0,
        grade: 'A',
      },
      {
        slNo: 3,
        subjectCode: 'CSE2631',
        subjectDescription: 'Algorithms Analysis and Design 1',
        gradePoints: 8.0,
        credits: 4.0,
        grade: 'B',
      },
      {
        slNo: 4,
        subjectCode: 'HSS2023',
        subjectDescription: 'Introduction to Microeconomics',
        gradePoints: 7.5,
        credits: 3.0,
        grade: 'B',
      },
      {
        slNo: 5,
        subjectCode: 'MTH2002',
        subjectDescription: 'Probability and Statistics',
        gradePoints: 8.0,
        credits: 4.0,
        grade: 'B',
      },
    ],
    sgpa: 8.05,
    cgpa: 8.12,
    creditIndex: 144.9,
    totalEarnedCredit: 18.0,
    totalCredit: 18.0,
    overallResult: 'Pass',
  },
  NIYAM2026005: {
    studentId: 'student_005',
    registrationNo: '24E103C42',
    studentName: 'Rohan Mehta',
    course: 'BTECH',
    branch: 'COMPUTER SCIENCE AND ENGINEERING',
    institution: 'ITER(FACULTY OF ENGINEERING & TECHNOLOGY)',
    examination: 'Third Semester EXAMINATION, FEBRUARY 2025',
    semester: 3,
    subjects: [
      {
        slNo: 1,
        subjectCode: 'CHM2041',
        subjectDescription: 'Introduction to Environmental Studies',
        gradePoints: 7.0,
        credits: 3.0,
        grade: 'C',
      },
      {
        slNo: 2,
        subjectCode: 'EET1211',
        subjectDescription: 'Digital Logic Design',
        gradePoints: 6.5,
        credits: 4.0,
        grade: 'D',
      },
      {
        slNo: 3,
        subjectCode: 'CSE2631',
        subjectDescription: 'Algorithms Analysis and Design 1',
        gradePoints: 6.0,
        credits: 4.0,
        grade: 'D',
      },
      {
        slNo: 4,
        subjectCode: 'HSS2023',
        subjectDescription: 'Introduction to Microeconomics',
        gradePoints: 7.0,
        credits: 3.0,
        grade: 'C',
      },
      {
        slNo: 5,
        subjectCode: 'MTH2002',
        subjectDescription: 'Probability and Statistics',
        gradePoints: 6.5,
        credits: 4.0,
        grade: 'D',
      },
    ],
    sgpa: 6.55,
    cgpa: 6.8,
    creditIndex: 117.9,
    totalEarnedCredit: 18.0,
    totalCredit: 18.0,
    overallResult: 'Pass',
  },
};

export const MOCK_STUDENT_ADMIT_CARDS: Record<string, StudentAdmitCardData> = {
  NIYAM2026001: {
    studentId: 'student_001',
    registrationNo: 'NIYAM2026_001',
    studentName: 'Demo Student',
    program: 'BACHELOR OF TECHNOLOGY',
    branch: 'COMPUTER SCIENCE AND ENGINEERING',
    institution: 'ITER(FACULTY OF ENGINEERING & TECHNOLOGY) SOA, BHUBANESWAR',
    examinationName: 'MIDSEM 1ST, 3RD',
    examinationSession: 'FEBRUARY 2025',
    schedule: [
      {
        sem: 1,
        subjectCode: 'CSE1001',
        subjectName: 'Introduction to Computer Programming',
        examDate: '13-Nov-2025',
        examDay: 'Thursday',
        examTime: '09:00 AM--11:00 AM',
        roomNo: 'S BLOCK, SC201',
        seatNo: 'Row=2,Column=1',
        status: 'Allowed',
      },
      {
        sem: 1,
        subjectCode: 'CSE1002',
        subjectName: 'Discrete Mathematics',
        examDate: '15-Nov-2025',
        examDay: 'Saturday',
        examTime: '09:00 AM--11:00 AM',
        roomNo: 'E Block, E-150',
        seatNo: 'Row=4,Column=2',
        status: 'Allowed',
      },
      {
        sem: 1,
        subjectCode: 'HSS1972',
        subjectName: 'Universal Human Values',
        examDate: '18-Nov-2025',
        examDay: 'Tuesday',
        examTime: '09:00 AM--11:00 AM',
        roomNo: 'S BLOCK, SC-301',
        seatNo: 'Row=1,Column=3',
        status: 'Allowed',
      },
      {
        sem: 1,
        subjectCode: 'MTH1101',
        subjectName: 'Calculus A',
        examDate: '20-Nov-2025',
        examDay: 'Thursday',
        examTime: '09:00 AM--11:00 AM',
        roomNo: 'S BLOCK, SC205',
        seatNo: 'Row=3,Column=2',
        status: 'Allowed',
      },
      {
        sem: 1,
        subjectCode: 'PHY1001',
        subjectName: 'University Physics: Mechanics',
        examDate: '22-Nov-2025',
        examDay: 'Saturday',
        examTime: '09:00 AM--11:00 AM',
        roomNo: 'E Block, E-152',
        seatNo: 'Row=5,Column=1',
        status: 'Allowed',
      },
    ],
  },
  NIYAM2026002: {
    studentId: 'student_002',
    registrationNo: '24E119C06',
    studentName: 'SHAURYA SALONA',
    program: 'BACHELOR OF TECHNOLOGY',
    branch: 'COMPUTER SCIENCE AND ENGINEERING',
    institution: 'ITER(FACULTY OF ENGINEERING & TECHNOLOGY) SOA, BHUBANESWAR',
    examinationName: 'MIDSEM 1ST, 3RD',
    examinationSession: 'FEBRUARY 2025',
    schedule: [
      {
        sem: 3,
        subjectCode: 'CHM2041',
        subjectName: 'Introduction to Environmental Studies',
        examDate: '13-Nov-2025',
        examDay: 'Thursday',
        examTime: '09:00 AM--11:00 AM',
        roomNo: 'S BLOCK, SC203',
        seatNo: 'Row=4,Column=2',
        status: 'Allowed',
      },
      {
        sem: 3,
        subjectCode: 'EET1211',
        subjectName: 'Digital Logic Design',
        examDate: '15-Nov-2025',
        examDay: 'Saturday',
        examTime: '09:00 AM--11:00 AM',
        roomNo: 'E Block, E-158',
        seatNo: 'Row=6,Column=1',
        status: 'Allowed',
      },
      {
        sem: 3,
        subjectCode: 'CSE2631',
        subjectName: 'Algorithms Analysis and Design 1',
        examDate: '18-Nov-2025',
        examDay: 'Tuesday',
        examTime: '09:00 AM--11:00 AM',
        roomNo: 'S BLOCK, SC-306',
        seatNo: 'Row=4,Column=2',
        status: 'Allowed',
      },
      {
        sem: 3,
        subjectCode: 'HSS2023',
        subjectName: 'Introduction to Microeconomics',
        examDate: '20-Nov-2025',
        examDay: 'Thursday',
        examTime: '09:00 AM--11:00 AM',
        roomNo: 'S BLOCK, SC207',
        seatNo: 'Row=4,Column=2',
        status: 'Allowed',
      },
      {
        sem: 3,
        subjectCode: 'MTH2002',
        subjectName: 'Probability and Statistics',
        examDate: '21-Nov-2025',
        examDay: 'Friday',
        examTime: '09:00 AM--11:00 AM',
        roomNo: 'S BLOCK, SC207',
        seatNo: 'Row=8,Column=3',
        status: 'Allowed',
      },
      {
        sem: 3,
        subjectCode: 'CSE2141',
        subjectName: 'Computer Science Workshop 1',
        examDate: '22-Nov-2025',
        examDay: 'Saturday',
        examTime: '09:00 AM--11:00 AM',
        roomNo: 'E Block, E-158',
        seatNo: 'Row=5,Column=1',
        status: 'Allowed',
      },
    ],
  },
  NIYAM2026003: {
    studentId: 'student_003',
    registrationNo: 'NIYAM2026_003',
    studentName: 'KHWAHISH AGARWAL',
    program: 'BACHELOR OF TECHNOLOGY',
    branch: 'COMPUTER SCIENCE AND ENGINEERING',
    institution: 'ITER(FACULTY OF ENGINEERING & TECHNOLOGY) SOA, BHUBANESWAR',
    examinationName: 'MIDSEM 1ST, 3RD',
    examinationSession: 'FEBRUARY 2025',
    schedule: [
      {
        sem: 1,
        subjectCode: 'CSE1001',
        subjectName: 'Introduction to Computer Programming',
        examDate: '13-Nov-2025',
        examDay: 'Thursday',
        examTime: '09:00 AM--11:00 AM',
        roomNo: 'S BLOCK, SC201',
        seatNo: 'Row=3,Column=2',
        status: 'Allowed',
      },
      {
        sem: 1,
        subjectCode: 'CSE1002',
        subjectName: 'Discrete Mathematics',
        examDate: '15-Nov-2025',
        examDay: 'Saturday',
        examTime: '09:00 AM--11:00 AM',
        roomNo: 'E Block, E-150',
        seatNo: 'Row=5,Column=1',
        status: 'Allowed',
      },
      {
        sem: 1,
        subjectCode: 'HSS1972',
        subjectName: 'Universal Human Values',
        examDate: '18-Nov-2025',
        examDay: 'Tuesday',
        examTime: '09:00 AM--11:00 AM',
        roomNo: 'S BLOCK, SC-301',
        seatNo: 'Row=2,Column=4',
        status: 'Allowed',
      },
      {
        sem: 1,
        subjectCode: 'MTH1101',
        subjectName: 'Calculus A',
        examDate: '20-Nov-2025',
        examDay: 'Thursday',
        examTime: '09:00 AM--11:00 AM',
        roomNo: 'S BLOCK, SC205',
        seatNo: 'Row=4,Column=1',
        status: 'Allowed',
      },
      {
        sem: 1,
        subjectCode: 'PHY1001',
        subjectName: 'University Physics: Mechanics',
        examDate: '22-Nov-2025',
        examDay: 'Saturday',
        examTime: '09:00 AM--11:00 AM',
        roomNo: 'E Block, E-152',
        seatNo: 'Row=6,Column=2',
        status: 'Allowed',
      },
    ],
  },
  NIYAM2026004: {
    studentId: 'student_004',
    registrationNo: '24E102B11',
    studentName: 'Ananya Verma',
    program: 'BACHELOR OF TECHNOLOGY',
    branch: 'COMPUTER SCIENCE AND ENGINEERING',
    institution: 'ITER(FACULTY OF ENGINEERING & TECHNOLOGY) SOA, BHUBANESWAR',
    examinationName: 'MIDSEM 1ST, 3RD',
    examinationSession: 'FEBRUARY 2025',
    schedule: [
      {
        sem: 3,
        subjectCode: 'CHM2041',
        subjectName: 'Introduction to Environmental Studies',
        examDate: '13-Nov-2025',
        examDay: 'Thursday',
        examTime: '09:00 AM--11:00 AM',
        roomNo: 'S BLOCK, SC204',
        seatNo: 'Row=1,Column=2',
        status: 'Allowed',
      },
      {
        sem: 3,
        subjectCode: 'EET1211',
        subjectName: 'Digital Logic Design',
        examDate: '15-Nov-2025',
        examDay: 'Saturday',
        examTime: '09:00 AM--11:00 AM',
        roomNo: 'E Block, E-159',
        seatNo: 'Row=3,Column=1',
        status: 'Allowed',
      },
      {
        sem: 3,
        subjectCode: 'CSE2631',
        subjectName: 'Algorithms Analysis and Design 1',
        examDate: '18-Nov-2025',
        examDay: 'Tuesday',
        examTime: '09:00 AM--11:00 AM',
        roomNo: 'S BLOCK, SC-307',
        seatNo: 'Row=2,Column=2',
        status: 'Allowed',
      },
      {
        sem: 3,
        subjectCode: 'HSS2023',
        subjectName: 'Introduction to Microeconomics',
        examDate: '20-Nov-2025',
        examDay: 'Thursday',
        examTime: '09:00 AM--11:00 AM',
        roomNo: 'S BLOCK, SC208',
        seatNo: 'Row=5,Column=3',
        status: 'Allowed',
      },
      {
        sem: 3,
        subjectCode: 'MTH2002',
        subjectName: 'Probability and Statistics',
        examDate: '21-Nov-2025',
        examDay: 'Friday',
        examTime: '09:00 AM--11:00 AM',
        roomNo: 'S BLOCK, SC208',
        seatNo: 'Row=7,Column=1',
        status: 'Allowed',
      },
    ],
  },
  NIYAM2026005: {
    studentId: 'student_005',
    registrationNo: '24E103C42',
    studentName: 'Rohan Mehta',
    program: 'BACHELOR OF TECHNOLOGY',
    branch: 'COMPUTER SCIENCE AND ENGINEERING',
    institution: 'ITER(FACULTY OF ENGINEERING & TECHNOLOGY) SOA, BHUBANESWAR',
    examinationName: 'MIDSEM 1ST, 3RD',
    examinationSession: 'FEBRUARY 2025',
    schedule: [
      {
        sem: 3,
        subjectCode: 'CHM2041',
        subjectName: 'Introduction to Environmental Studies',
        examDate: '13-Nov-2025',
        examDay: 'Thursday',
        examTime: '09:00 AM--11:00 AM',
        roomNo: 'S BLOCK, SC204',
        seatNo: 'Row=6,Column=4',
        status: 'Allowed',
      },
      {
        sem: 3,
        subjectCode: 'EET1211',
        subjectName: 'Digital Logic Design',
        examDate: '15-Nov-2025',
        examDay: 'Saturday',
        examTime: '09:00 AM--11:00 AM',
        roomNo: 'E Block, E-159',
        seatNo: 'Row=7,Column=2',
        status: 'Allowed',
      },
      {
        sem: 3,
        subjectCode: 'CSE2631',
        subjectName: 'Algorithms Analysis and Design 1',
        examDate: '18-Nov-2025',
        examDay: 'Tuesday',
        examTime: '09:00 AM--11:00 AM',
        roomNo: 'S BLOCK, SC-307',
        seatNo: 'Row=8,Column=1',
        status: 'Allowed',
      },
      {
        sem: 3,
        subjectCode: 'HSS2023',
        subjectName: 'Introduction to Microeconomics',
        examDate: '20-Nov-2025',
        examDay: 'Thursday',
        examTime: '09:00 AM--11:00 AM',
        roomNo: 'S BLOCK, SC208',
        seatNo: 'Row=9,Column=2',
        status: 'Allowed',
      },
      {
        sem: 3,
        subjectCode: 'MTH2002',
        subjectName: 'Probability and Statistics',
        examDate: '21-Nov-2025',
        examDay: 'Friday',
        examTime: '09:00 AM--11:00 AM',
        roomNo: 'S BLOCK, SC208',
        seatNo: 'Row=10,Column=3',
        status: 'Allowed',
      },
    ],
  },
};

export const MOCK_STUDENT_ATTENDANCE: Record<
  string,
  Omit<
    StudentAttendanceData,
    'overallPercentage' | 'overallStatus' | 'subjects'
  > & {
    subjects: Omit<SubjectAttendanceData, 'attendancePercentage' | 'status'>[];
  }
> = {
  NIYAM2026001: {
    studentId: 'student_001',
    registrationNo: 'NIYAM2026_001',
    studentName: 'Demo Student',
    program: 'B.Tech Computer Science and Engineering',
    branch: 'Computer Science & Engineering',
    semester: 5,
    overallAttended: 139,
    overallConducted: 162,
    subjects: [
      {
        subjectCode: 'CSE3001',
        subjectName: 'Database Management Systems (DBMS)',
        classesConducted: 42,
        classesAttended: 38,
      },
      {
        subjectCode: 'CSE3002',
        subjectName: 'Operating Systems',
        classesConducted: 40,
        classesAttended: 35,
      },
      {
        subjectCode: 'CSE3003',
        subjectName: 'Computer Networks',
        classesConducted: 40,
        classesAttended: 32,
      },
      {
        subjectCode: 'MTH3001',
        subjectName: 'Mathematics IV',
        classesConducted: 42,
        classesAttended: 34,
      },
    ],
  },
  NIYAM2026002: {
    studentId: 'student_002',
    registrationNo: '24E119C06',
    studentName: 'Shaurya Salona',
    program: 'B.Tech Computer Science and Engineering',
    branch: 'Computer Science & Engineering',
    semester: 3,
    overallAttended: 172,
    overallConducted: 185,
    subjects: [
      {
        subjectCode: 'CHM2041',
        subjectName: 'Introduction to Environmental Studies',
        classesConducted: 30,
        classesAttended: 28,
      },
      {
        subjectCode: 'EET1211',
        subjectName: 'Digital Logic Design',
        classesConducted: 35,
        classesAttended: 34,
      },
      {
        subjectCode: 'CSE2631',
        subjectName: 'Algorithms Analysis and Design 1',
        classesConducted: 40,
        classesAttended: 37,
      },
      {
        subjectCode: 'HSS2023',
        subjectName: 'Introduction to Microeconomics',
        classesConducted: 25,
        classesAttended: 23,
      },
      {
        subjectCode: 'MTH2002',
        subjectName: 'Probability and Statistics',
        classesConducted: 35,
        classesAttended: 32,
      },
      {
        subjectCode: 'CSE2141',
        subjectName: 'Computer Science Workshop 1',
        classesConducted: 20,
        classesAttended: 18,
      },
    ],
  },
  NIYAM2026003: {
    studentId: 'student_003',
    registrationNo: 'NIYAM2026_003',
    studentName: 'Khwahish Agarwal',
    program: 'B.Tech Computer Science and Engineering',
    branch: 'Computer Science & Engineering',
    semester: 1,
    overallAttended: 109,
    overallConducted: 165,
    subjects: [
      {
        subjectCode: 'CSE1001',
        subjectName: 'Introduction to Computer Programming',
        classesConducted: 40,
        classesAttended: 26,
      },
      {
        subjectCode: 'CSE1002',
        subjectName: 'Discrete Mathematics',
        classesConducted: 35,
        classesAttended: 23,
      },
      {
        subjectCode: 'HSS1972',
        subjectName: 'Universal Human Values',
        classesConducted: 25,
        classesAttended: 16,
      },
      {
        subjectCode: 'MTH1101',
        subjectName: 'Calculus A',
        classesConducted: 35,
        classesAttended: 24,
      },
      {
        subjectCode: 'PHY1001',
        subjectName: 'University Physics: Mechanics',
        classesConducted: 30,
        classesAttended: 20,
      },
    ],
  },
  NIYAM2026004: {
    studentId: 'student_004',
    registrationNo: '24E102B11',
    studentName: 'Ananya Verma',
    program: 'B.Tech Computer Science and Engineering',
    branch: 'Computer Science & Engineering',
    semester: 3,
    overallAttended: 130,
    overallConducted: 165,
    subjects: [
      {
        subjectCode: 'CHM2041',
        subjectName: 'Introduction to Environmental Studies',
        classesConducted: 30,
        classesAttended: 25,
      },
      {
        subjectCode: 'EET1211',
        subjectName: 'Digital Logic Design',
        classesConducted: 35,
        classesAttended: 28,
      },
      {
        subjectCode: 'CSE2631',
        subjectName: 'Algorithms Analysis and Design 1',
        classesConducted: 40,
        classesAttended: 31,
      },
      {
        subjectCode: 'HSS2023',
        subjectName: 'Introduction to Microeconomics',
        classesConducted: 25,
        classesAttended: 20,
      },
      {
        subjectCode: 'MTH2002',
        subjectName: 'Probability and Statistics',
        classesConducted: 35,
        classesAttended: 26,
      },
    ],
  },
  NIYAM2026005: {
    studentId: 'student_005',
    registrationNo: '24E103C42',
    studentName: 'Rohan Mehta',
    program: 'B.Tech Computer Science and Engineering',
    branch: 'Computer Science & Engineering',
    semester: 3,
    overallAttended: 102,
    overallConducted: 165,
    subjects: [
      {
        subjectCode: 'CHM2041',
        subjectName: 'Introduction to Environmental Studies',
        classesConducted: 30,
        classesAttended: 19,
      },
      {
        subjectCode: 'EET1211',
        subjectName: 'Digital Logic Design',
        classesConducted: 35,
        classesAttended: 21,
      },
      {
        subjectCode: 'CSE2631',
        subjectName: 'Algorithms Analysis and Design 1',
        classesConducted: 40,
        classesAttended: 24,
      },
      {
        subjectCode: 'HSS2023',
        subjectName: 'Introduction to Microeconomics',
        classesConducted: 25,
        classesAttended: 16,
      },
      {
        subjectCode: 'MTH2002',
        subjectName: 'Probability and Statistics',
        classesConducted: 35,
        classesAttended: 22,
      },
    ],
  },
};

// Aliases for all students (with and without underscore)
MOCK_STUDENT_RESULTS['NIYAM2026_001'] = MOCK_STUDENT_RESULTS['NIYAM2026001'];
MOCK_STUDENT_ADMIT_CARDS['NIYAM2026_001'] = MOCK_STUDENT_ADMIT_CARDS['NIYAM2026001'];
MOCK_STUDENT_ATTENDANCE['NIYAM2026_001'] = MOCK_STUDENT_ATTENDANCE['NIYAM2026001'];

MOCK_STUDENT_RESULTS['NIYAM2026_002'] = MOCK_STUDENT_RESULTS['NIYAM2026002'];
MOCK_STUDENT_ADMIT_CARDS['NIYAM2026_002'] = MOCK_STUDENT_ADMIT_CARDS['NIYAM2026002'];
MOCK_STUDENT_ATTENDANCE['NIYAM2026_002'] = MOCK_STUDENT_ATTENDANCE['NIYAM2026002'];

MOCK_STUDENT_RESULTS['NIYAM2026_003'] = MOCK_STUDENT_RESULTS['NIYAM2026003'];
MOCK_STUDENT_ADMIT_CARDS['NIYAM2026_003'] = MOCK_STUDENT_ADMIT_CARDS['NIYAM2026003'];
MOCK_STUDENT_ATTENDANCE['NIYAM2026_003'] = MOCK_STUDENT_ATTENDANCE['NIYAM2026003'];

MOCK_STUDENT_RESULTS['NIYAM2026_004'] = MOCK_STUDENT_RESULTS['NIYAM2026004'];
MOCK_STUDENT_ADMIT_CARDS['NIYAM2026_004'] = MOCK_STUDENT_ADMIT_CARDS['NIYAM2026004'];
MOCK_STUDENT_ATTENDANCE['NIYAM2026_004'] = MOCK_STUDENT_ATTENDANCE['NIYAM2026004'];

MOCK_STUDENT_RESULTS['NIYAM2026_005'] = MOCK_STUDENT_RESULTS['NIYAM2026005'];
MOCK_STUDENT_ADMIT_CARDS['NIYAM2026_005'] = MOCK_STUDENT_ADMIT_CARDS['NIYAM2026005'];
MOCK_STUDENT_ATTENDANCE['NIYAM2026_005'] = MOCK_STUDENT_ATTENDANCE['NIYAM2026005'];

