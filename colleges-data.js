// ==========================================
// 1. SUPABASE LIVE CLIENT CONFIGURATION
// ==========================================
const SUPABASE_URL = "https://vkkafkopquwieibqinip.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZra2Fma29wcXV3aWVpYnFpbmlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcxMjA0MDEsImV4cCI6MjEwMjY5NjQwMX0.QIGbprbPGan2LRvbKDgM-iEd6H21Se_4IngTFnmvVfE";

let supabaseClient = null;
if (typeof supabase !== 'undefined' && supabase.createClient) {
  supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// =========================================================================
// 2. COMPLETE ALL INDIA 28 STATES + 8 UNION TERRITORIES WITH CITIES
// =========================================================================
const allIndiaStatesAndCities = {
  // --- 28 STATES ---
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Rajahmundry", "Tirupati", "Kakinada", "Anantapur", "Eluru", "Kadapa"],
  "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Pasighat", "Tawang", "Ziro", "Roing", "Tezu", "Bomdila"],
  "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tinsukia", "Tezpur", "Bongaigaon", "Barpeta"],
  "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia", "Darbhanga", "Bihar Sharif", "Arrah", "Begusarai", "Katihar", "Munger", "Chhapra"],
  "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba", "Rajnandgaon", "Durg", "Jagdalpur", "Ambikapur", "Raigarh"],
  "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda", "Bicholim", "Curchorem"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh", "Gandhinagar", "Anand", "Navsari", "Morbi", "Bharuch", "Vapi", "Mehsana"],
  "Haryana": ["Gurugram", "Faridabad", "Panipat", "Ambala", "Yamunanagar", "Rohtak", "Hisar", "Karnal", "Sonipat", "Panchkula", "Bhiwani", "Sirsa", "Kurukshetra"],
  "Himachal Pradesh": ["Shimla", "Dharamshala", "Solan", "Mandi", "Baddi", "Kullu", "Manali", "Una", "Hamirpur", "Bilaspur", "Chamba"],
  "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar", "Hazaribagh", "Giridih", "Ramgarh", "Medininagar"],
  "Karnataka": ["Bangalore", "Mysore", "Hubli", "Dharwad", "Mangalore", "Belgaum", "Gulbarga", "Davanagere", "Bellary", "Shimoga", "Tumkur", "Udupi", "Bidar"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Kollam", "Thrissur", "Kannur", "Alappuzha", "Kottayam", "Palakkad", "Malappuram"],
  "Madhya Pradesh": ["Indore", "Bhopal", "Gwalior", "Jabalpur", "Ujjain", "Sagar", "Dewas", "Satna", "Ratlam", "Rewa", "Katni", "Singrauli", "Burhanpur", "Khandwa", "Bhind", "Chhindwara", "Guna", "Shivpuri", "Vidisha"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad", "Solapur", "Kolhapur", "Amravati", "Navi Mumbai", "Akola", "Latur", "Dhule", "Ahmednagar", "Chandrapur", "Parbhani", "Jalgaon", "Nanded"],
  "Manipur": ["Imphal", "Thoubal", "Bishnupur", "Churachandpur", "Kakching", "Ukhrul", "Senapati"],
  "Meghalaya": ["Shillong", "Tura", "Jowai", "Nongpoh", "Williamnagar", "Baghmara", "Cherrapunji"],
  "Mizoram": ["Aizawl", "Lunglei", "Saiha", "Champhai", "Kolasib", "Serchhip"],
  "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha", "Zunheboto", "Mon"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur", "Puri", "Balasore", "Bhadrak", "Baripada", "Jharsuguda"],
  "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Hoshiarpur", "Batala", "Pathankot", "Moga", "Abohar", "Phagwara"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Kota", "Bhilwara", "Bikaner", "Ajmer", "Udaipur", "Sikar", "Alwar", "Bharatpur", "Sri Ganganagar", "Pali", "Chittorgarh", "Beawar", "Hanumangarh", "Jhunjhunu", "Barmer", "Nagaur"],
  "Sikkim": ["Gangtok", "Namchi", "Gyalshing", "Mangan", "Singtam", "Rangpo"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Tiruppur", "Vellore", "Erode", "Thoothukudi", "Dindigul", "Thanjavur", "Nagercoil", "Kanchipuram"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Khammam", "Karimnagar", "Ramagundam", "Mahbubnagar", "Nalgonda", "Adilabad", "Suryapet"],
  "Tripura": ["Agartala", "Dharmanagar", "Udaipur", "Kailashahar", "Belonia", "Khowai", "Ambassa"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Meerut", "Varanasi", "Prayagraj", "Bareilly", "Aligarh", "Moradabad", "Saharanpur", "Gorakhpur", "Noida", "Firozabad", "Jhansi", "Muzaffarnagar", "Mathura", "Ayodhya", "Etawah"],
  "Uttarakhand": ["Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rudrapur", "Kashipur", "Rishikesh", "Nainital", "Pithoragarh", "Almora"],
  "West Bengal": ["Kolkata", "Howrah", "Asansol", "Siliguri", "Durgapur", "Bardhaman", "Malda", "Baharampur", "Habra", "Kharagpur", "Shantipur", "Dankuni", "Haldia"],

  // --- 8 UNION TERRITORIES ---
  "Andaman and Nicobar Islands": ["Port Blair", "Diglipur", "Mayabunder", "Rangat", "Car Nicobar"],
  "Chandigarh": ["Chandigarh"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Diu", "Silvassa"],
  "Delhi NCR": ["New Delhi", "North Delhi", "South Delhi", "West Delhi", "East Delhi", "Noida", "Greater Noida", "Gurugram", "Faridabad", "Ghaziabad"],
  "Jammu and Kashmir": ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Kathua", "Udhampur", "Sopore", "Rajouri"],
  "Ladakh": ["Leh", "Kargil", "Diskit", "Padum"],
  "Lakshadweep": ["Kavaratti", "Agatti", "Amini", "Andrott", "Minicoy"],
  "Puducherry": ["Puducherry", "Karaikal", "Mahe", "Yanam"]
};

// ==========================================
// 3. STREAM & COURSE MAPPING
// ==========================================
const streamCourseMap = {
  "Engineering": [
    "B.Tech CSE (Computer Science)",
    "B.Tech AI & Data Science",
    "B.Tech Cyber Security",
    "B.Tech Information Technology",
    "B.Tech Mechanical Engineering",
    "B.Tech Civil Engineering",
    "B.Tech Electrical & Electronics",
    "B.Tech Electronics & Comm (ECE)",
    "M.Tech CSE",
    "M.Tech Structural Engg",
    "Diploma in Engineering (Polytechnic)"
  ],
  "Management": [
    "MBA Finance",
    "MBA Marketing",
    "MBA Human Resource (HR)",
    "MBA Business Analytics",
    "MBA Operations & Supply Chain",
    "MBA Hospital & Healthcare Mgmt",
    "BBA General",
    "BBA Digital Marketing",
    "BBA Banking & Financial Services",
    "BBA Aviation & Tourism",
    "Executive MBA"
  ],
  "Computer Applications": [
    "BCA (Bachelor of Computer Applications)",
    "BCA Cloud Computing & DevOps",
    "BCA Artificial Intelligence",
    "BCA Data Analytics",
    "MCA (Master of Computer Applications)",
    "MCA AI & Machine Learning",
    "MCA Full Stack Development"
  ],
  "Science": [
    "B.Sc Computer Science",
    "B.Sc Biotechnology",
    "B.Sc Physics",
    "B.Sc Chemistry",
    "B.Sc Mathematics",
    "B.Sc Microbiology",
    "B.Sc Agriculture (Hons)",
    "M.Sc Data Science",
    "M.Sc Biotechnology",
    "M.Sc Chemistry",
    "M.Sc Physics"
  ],
  "Commerce": [
    "B.Com (General)",
    "B.Com (Honours)",
    "B.Com Banking & Insurance",
    "B.Com Computer Applications",
    "B.Com Accounting & Finance",
    "M.Com (Master of Commerce)"
  ],
  "Arts": [
    "BA Journalism & Mass Communication (BJMC)",
    "BA English Literature",
    "BA Psychology",
    "BA Political Science",
    "BA Economics",
    "BA History",
    "MA English",
    "MA Psychology",
    "MA Mass Communication"
  ],
  "Pharmacy": [
    "B.Pharm (Bachelor of Pharmacy)",
    "D.Pharm (Diploma in Pharmacy)",
    "M.Pharm (Pharmaceutics)",
    "M.Pharm (Pharmacology)",
    "Pharm.D (Doctor of Pharmacy)"
  ],
  "Nursing": [
    "B.Sc Nursing",
    "GNM (General Nursing & Midwifery)",
    "ANM (Auxiliary Nursing Midwifery)",
    "Post Basic B.Sc Nursing",
    "M.Sc Nursing"
  ]
};

// =========================================================================
// 4. 15 VERIFIED TOP PRIVATE UNIVERSITIES
// =========================================================================
const DEFAULT_15_UNIVERSITIES = [
  {
    id: 101,
    name: "SAGE University",
    city: "Indore",
    state: "Madhya Pradesh",
    rating: "4.4★",
    isPartner: true,
    highestPackage: "₹30 LPA",
    avgPackage: "₹5.5 LPA",
    recruiters: ["Amazon", "TCS", "Wipro", "Infosys", "Cognizant"],
    highlights: ["NAAC Accredited", "100% Placement Assistance", "Google Digital Campus"],
    courses: [
      { stream: "Engineering", name: "B.Tech CSE (Computer Science)", duration: "4 Years", perSemFee: "₹65,000", totalFee: "₹5,20,000", eligibility: "10+2 with PCM (50%)" },
      { stream: "Management", name: "MBA Marketing", duration: "2 Years", perSemFee: "₹75,000", totalFee: "₹3,00,000", eligibility: "Graduation (Min 50%)" },
      { stream: "Computer Applications", name: "BCA (Bachelor of Computer Applications)", duration: "3 Years", perSemFee: "₹45,000", totalFee: "₹2,70,000", eligibility: "10+2 in Any Stream" },
      { stream: "Pharmacy", name: "B.Pharm (Bachelor of Pharmacy)", duration: "4 Years", perSemFee: "₹55,000", totalFee: "₹4,40,000", eligibility: "10+2 with PCB/PCM (50%)" }
    ]
  },
  {
    id: 102,
    name: "Suresh Gyan Vihar University (SGVU)",
    city: "Jaipur",
    state: "Rajasthan",
    rating: "4.5★",
    isPartner: true,
    highestPackage: "₹24 LPA",
    avgPackage: "₹4.8 LPA",
    recruiters: ["Google", "Infosys", "HCL", "Capgemini", "IBM"],
    highlights: ["NAAC A+ Accredited", "Modern Research Labs", "Direct Scholarship Scheme"],
    courses: [
      { stream: "Pharmacy", name: "B.Pharm (Bachelor of Pharmacy)", duration: "4 Years", perSemFee: "₹55,000", totalFee: "₹4,40,000", eligibility: "10+2 with PCB / PCM" },
      { stream: "Engineering", name: "B.Tech AI & Data Science", duration: "4 Years", perSemFee: "₹60,000", totalFee: "₹4,80,000", eligibility: "10+2 with PCM (50%)" },
      { stream: "Management", name: "MBA Finance", duration: "2 Years", perSemFee: "₹70,000", totalFee: "₹2,80,000", eligibility: "Graduation (50%)" },
      { stream: "Science", name: "B.Sc Agriculture (Hons)", duration: "4 Years", perSemFee: "₹45,000", totalFee: "₹3,60,000", eligibility: "10+2 with PCB / PCM" }
    ]
  },
  {
    id: 103,
    name: "Medi-Caps University",
    city: "Indore",
    state: "Madhya Pradesh",
    rating: "4.5★",
    isPartner: true,
    highestPackage: "₹44 LPA",
    avgPackage: "₹6.5 LPA",
    recruiters: ["Cisco", "Amazon", "Capgemini", "Deloitte", "Goldman Sachs"],
    highlights: ["Ranked #1 Private Campus in MP", "Highest Placement Record", "Advanced Incubation Cell"],
    courses: [
      { stream: "Engineering", name: "B.Tech CSE (Computer Science)", duration: "4 Years", perSemFee: "₹75,000", totalFee: "₹6,00,000", eligibility: "10+2 with PCM (60%)" },
      { stream: "Management", name: "BBA General", duration: "3 Years", perSemFee: "₹45,000", totalFee: "₹2,70,000", eligibility: "10+2 in Any Stream" },
      { stream: "Computer Applications", name: "MCA (Master of Computer Applications)", duration: "2 Years", perSemFee: "₹50,000", totalFee: "₹2,00,000", eligibility: "BCA / B.Sc CS" },
      { stream: "Commerce", name: "B.Com (Honours)", duration: "3 Years", perSemFee: "₹35,000", totalFee: "₹2,10,000", eligibility: "10+2 with Commerce" }
    ]
  },
  {
    id: 104,
    name: "Poornima University",
    city: "Jaipur",
    state: "Rajasthan",
    rating: "4.3★",
    isPartner: true,
    highestPackage: "₹33 LPA",
    avgPackage: "₹5.2 LPA",
    recruiters: ["Morgan Stanley", "TCS", "LTI", "Byju's", "Wipro"],
    highlights: ["NAAC Accredited", "Strong Alumni Base", "Industry Mentorship"],
    courses: [
      { stream: "Engineering", name: "B.Tech Cyber Security", duration: "4 Years", perSemFee: "₹60,000", totalFee: "₹4,80,000", eligibility: "10+2 with PCM (50%)" },
      { stream: "Computer Applications", name: "BCA Cloud Computing & DevOps", duration: "3 Years", perSemFee: "₹42,000", totalFee: "₹2,52,000", eligibility: "10+2 Any Stream" },
      { stream: "Management", name: "MBA Business Analytics", duration: "2 Years", perSemFee: "₹80,000", totalFee: "₹3,20,000", eligibility: "Graduation (50%)" }
    ]
  },
  {
    id: 105,
    name: "Parul University",
    city: "Vadodara",
    state: "Gujarat",
    rating: "4.6★",
    isPartner: true,
    highestPackage: "₹38 LPA",
    avgPackage: "₹6.0 LPA",
    recruiters: ["Amazon", "L&T", "Reliance", "Tata Motors", "Infosys"],
    highlights: ["NAAC A++ Grade", "150+ Acre Modern Campus", "Global Student Diversity"],
    courses: [
      { stream: "Engineering", name: "B.Tech CSE (Computer Science)", duration: "4 Years", perSemFee: "₹74,500", totalFee: "₹5,96,000", eligibility: "10+2 with PCM (45%)" },
      { stream: "Nursing", name: "B.Sc Nursing", duration: "4 Years", perSemFee: "₹48,000", totalFee: "₹3,84,000", eligibility: "10+2 with PCB (45%)" },
      { stream: "Pharmacy", name: "D.Pharm (Diploma in Pharmacy)", duration: "2 Years", perSemFee: "₹35,000", totalFee: "₹1,40,000", eligibility: "10+2 with Science" },
      { stream: "Management", name: "MBA Human Resource (HR)", duration: "2 Years", perSemFee: "₹72,000", totalFee: "₹2,88,000", eligibility: "Graduation (50%)" }
    ]
  },
  {
    id: 106,
    name: "Chandigarh University (CU)",
    city: "Mohali",
    state: "Punjab",
    rating: "4.7★",
    isPartner: true,
    highestPackage: "₹54.75 LPA",
    avgPackage: "₹7.5 LPA",
    recruiters: ["Microsoft", "Google", "Amazon", "IBM", "Adobe", "Flipkart"],
    highlights: ["QS Asia Ranked", "NAAC A+ Accredited", "Record Number of MNC Placements"],
    courses: [
      { stream: "Engineering", name: "B.Tech CSE (Computer Science)", duration: "4 Years", perSemFee: "₹98,000", totalFee: "₹7,84,000", eligibility: "10+2 with PCM (55%)" },
      { stream: "Management", name: "BBA Digital Marketing", duration: "3 Years", perSemFee: "₹65,000", totalFee: "₹3,90,000", eligibility: "10+2 (50%)" },
      { stream: "Computer Applications", name: "MCA AI & Machine Learning", duration: "2 Years", perSemFee: "₹68,000", totalFee: "₹2,72,000", eligibility: "BCA / B.Sc (50%)" }
    ]
  },
  {
    id: 107,
    name: "Amity University",
    city: "Noida",
    state: "Delhi NCR",
    rating: "4.5★",
    isPartner: true,
    highestPackage: "₹61 LPA",
    avgPackage: "₹7.2 LPA",
    recruiters: ["Amazon", "Cisco", "Deloitte", "KPMG", "EY", "Accenture"],
    highlights: ["India's Premier Private University", "World-Class Infrastructure", "High MNC Tie-ups"],
    courses: [
      { stream: "Engineering", name: "B.Tech AI & Data Science", duration: "4 Years", perSemFee: "₹1,15,000", totalFee: "₹9,20,000", eligibility: "10+2 with PCM (60%)" },
      { stream: "Management", name: "MBA Finance", duration: "2 Years", perSemFee: "₹1,45,000", totalFee: "₹5,80,000", eligibility: "Graduation (50%)" },
      { stream: "Arts", name: "BA Journalism & Mass Communication (BJMC)", duration: "3 Years", perSemFee: "₹60,000", totalFee: "₹3,60,000", eligibility: "10+2 Any Stream" }
    ]
  },
  {
    id: 108,
    name: "Sharda University",
    city: "Greater Noida",
    state: "Delhi NCR",
    rating: "4.4★",
    isPartner: true,
    highestPackage: "₹40 LPA",
    avgPackage: "₹5.8 LPA",
    recruiters: ["Wipro", "Sleepwell", "Bosch", "Mahindra", "Cognizant"],
    highlights: ["NAAC A+ Accredited", "Multi-Speciality Hospital on Campus", "Students from 85+ Countries"],
    courses: [
      { stream: "Nursing", name: "B.Sc Nursing", duration: "4 Years", perSemFee: "₹65,000", totalFee: "₹5,20,000", eligibility: "10+2 with PCB (45%)" },
      { stream: "Computer Applications", name: "BCA (Bachelor of Computer Applications)", duration: "3 Years", perSemFee: "₹52,000", totalFee: "₹3,12,000", eligibility: "10+2 Any Stream" },
      { stream: "Engineering", name: "B.Tech Mechanical Engineering", duration: "4 Years", perSemFee: "₹78,000", totalFee: "₹6,24,000", eligibility: "10+2 with PCM" }
    ]
  },
  {
    id: 109,
    name: "Geeta University",
    city: "Panipat",
    state: "Haryana",
    rating: "4.3★",
    isPartner: true,
    highestPackage: "₹40 LPA",
    avgPackage: "₹5.0 LPA",
    recruiters: ["Byju's", "Tech Mahindra", "Infosys", "Paytm", "HCL"],
    highlights: ["Delhi-NCR Strategic Hub", "100% Scholarship Programs", "Industry-led Curriculum"],
    courses: [
      { stream: "Engineering", name: "B.Tech CSE (Computer Science)", duration: "4 Years", perSemFee: "₹55,000", totalFee: "₹4,40,000", eligibility: "10+2 with PCM (50%)" },
      { stream: "Pharmacy", name: "B.Pharm (Bachelor of Pharmacy)", duration: "4 Years", perSemFee: "₹48,000", totalFee: "₹3,84,000", eligibility: "10+2 with Science" },
      { stream: "Management", name: "BBA General", duration: "3 Years", perSemFee: "₹35,000", totalFee: "₹2,10,000", eligibility: "10+2 Pass" }
    ]
  },
  {
    id: 110,
    name: "Lovely Professional University (LPU)",
    city: "Jalandhar",
    state: "Punjab",
    rating: "4.6★",
    isPartner: true,
    highestPackage: "₹64 LPA",
    avgPackage: "₹6.8 LPA",
    recruiters: ["Google", "Amazon", "Microsoft", "Intel", "Bosch", "Oracle"],
    highlights: ["600+ Acre Mega Campus", "NIRF Top 40 University", "Massive Placement Drives"],
    courses: [
      { stream: "Engineering", name: "B.Tech Information Technology", duration: "4 Years", perSemFee: "₹95,000", totalFee: "₹7,60,000", eligibility: "10+2 with PCM (60%)" },
      { stream: "Management", name: "MBA Operations & Supply Chain", duration: "2 Years", perSemFee: "₹1,10,000", totalFee: "₹4,40,000", eligibility: "Graduation (55%)" },
      { stream: "Science", name: "B.Sc Biotechnology", duration: "3 Years", perSemFee: "₹48,000", totalFee: "₹2,88,000", eligibility: "10+2 with PCB/PCM" }
    ]
  },
  {
    id: 111,
    name: "UPES Dehradun",
    city: "Dehradun",
    state: "Uttarakhand",
    rating: "4.5★",
    isPartner: true,
    highestPackage: "₹50 LPA",
    avgPackage: "₹7.5 LPA",
    recruiters: ["Microsoft", "Hyundai", "Schlumberger", "Amazon", "Adani"],
    highlights: ["NAAC A Grade", "Specialised Energy & Tech Streams", "High ROI Placement Network"],
    courses: [
      { stream: "Engineering", name: "B.Tech CSE (Computer Science)", duration: "4 Years", perSemFee: "₹1,25,000", totalFee: "₹10,00,000", eligibility: "10+2 with PCM (50%)" },
      { stream: "Management", name: "MBA Business Analytics", duration: "2 Years", perSemFee: "₹1,40,000", totalFee: "₹5,60,000", eligibility: "Graduation (50%)" },
      { stream: "Commerce", name: "B.Com Banking & Insurance", duration: "3 Years", perSemFee: "₹45,000", totalFee: "₹2,70,000", eligibility: "10+2 with Commerce/Math" }
    ]
  },
  {
    id: 112,
    name: "Graphic Era University",
    city: "Dehradun",
    state: "Uttarakhand",
    rating: "4.6★",
    isPartner: true,
    highestPackage: "₹48.5 LPA",
    avgPackage: "₹6.2 LPA",
    recruiters: ["Adobe", "Amazon", "Samsung", "TCS", "Tech Mahindra"],
    highlights: ["NAAC A+ Accredited", "Premier Technical Hub in North India", "Robust Alumni Ecosystem"],
    courses: [
      { stream: "Engineering", name: "B.Tech AI & Data Science", duration: "4 Years", perSemFee: "₹85,000", totalFee: "₹6,80,000", eligibility: "10+2 with PCM (60%)" },
      { stream: "Computer Applications", name: "BCA (Bachelor of Computer Applications)", duration: "3 Years", perSemFee: "₹42,000", totalFee: "₹2,52,000", eligibility: "10+2 Any Stream" },
      { stream: "Management", name: "MBA Marketing", duration: "2 Years", perSemFee: "₹80,000", totalFee: "₹3,20,000", eligibility: "Graduation (50%)" }
    ]
  },
  {
    id: 113,
    name: "Alliance University",
    city: "Bangalore",
    state: "Karnataka",
    rating: "4.5★",
    isPartner: true,
    highestPackage: "₹38 LPA",
    avgPackage: "₹8.0 LPA",
    recruiters: ["Oracle", "KPMG", "Mercedes Benz", "Deloitte", "Amazon"],
    highlights: ["Ranked Among Top B-Schools in South India", "Bangalore Tech-Hub Location", "Top Corporate Interface"],
    courses: [
      { stream: "Management", name: "MBA Finance", duration: "2 Years", perSemFee: "₹1,75,000", totalFee: "₹7,00,000", eligibility: "Graduation (50%)" },
      { stream: "Management", name: "BBA General", duration: "3 Years", perSemFee: "₹75,000", totalFee: "₹4,50,000", eligibility: "10+2 Any Stream" },
      { stream: "Engineering", name: "B.Tech Information Technology", duration: "4 Years", perSemFee: "₹95,000", totalFee: "₹7,60,000", eligibility: "10+2 with PCM (50%)" }
    ]
  },
  {
    id: 114,
    name: "Presidency University",
    city: "Bangalore",
    state: "Karnataka",
    rating: "4.4★",
    isPartner: true,
    highestPackage: "₹32 LPA",
    avgPackage: "₹5.6 LPA",
    recruiters: ["Dell", "Wipro", "TCS", "Accenture", "Mindtree"],
    highlights: ["State-of-the-art Design & Tech Labs", "100% Placement Record", "Bangalore Industrial Network"],
    courses: [
      { stream: "Engineering", name: "B.Tech CSE (Computer Science)", duration: "4 Years", perSemFee: "₹85,000", totalFee: "₹6,80,000", eligibility: "10+2 with PCM (45%)" },
      { stream: "Computer Applications", name: "BCA Data Analytics", duration: "3 Years", perSemFee: "₹48,000", totalFee: "₹2,88,000", eligibility: "10+2 Any Stream" },
      { stream: "Commerce", name: "B.Com Accounting & Finance", duration: "3 Years", perSemFee: "₹38,000", totalFee: "₹2,28,000", eligibility: "10+2 with Commerce" }
    ]
  },
  {
    id: 115,
    name: "K.R. Mangalam University",
    city: "Gurugram",
    state: "Haryana",
    rating: "4.3★",
    isPartner: true,
    highestPackage: "₹36 LPA",
    avgPackage: "₹5.4 LPA",
    recruiters: ["HCL", "Airtel", "Genpact", "IndiGo", "Amazon"],
    highlights: ["Gurugram Cyber-City Connectivity", "Modern Architecture Campus", "Direct Industry Training"],
    courses: [
      { stream: "Engineering", name: "B.Tech CSE (Computer Science)", duration: "4 Years", perSemFee: "₹75,000", totalFee: "₹6,00,000", eligibility: "10+2 with PCM (50%)" },
      { stream: "Pharmacy", name: "B.Pharm (Bachelor of Pharmacy)", duration: "4 Years", perSemFee: "₹58,000", totalFee: "₹4,64,000", eligibility: "10+2 with Science" },
      { stream: "Arts", name: "BA Psychology", duration: "3 Years", perSemFee: "₹36,000", totalFee: "₹2,16,000", eligibility: "10+2 Any Stream" }
    ]
  }
];

let collegesData = [...DEFAULT_15_UNIVERSITIES];

// =========================================================================
// 5. SUPABASE DATA SYNC FUNCTION (MERGES SUPABASE + 15 DEFAULT COLLEGES)
// =========================================================================
async function loadAllData() {
  if (!supabaseClient) {
    collegesData = [...DEFAULT_15_UNIVERSITIES];
    return collegesData;
  }

  try {
    const { data, error } = await supabaseClient.from('colleges').select('*').order('id', { ascending: false });
    
    if (error) {
      console.warn("Supabase fetch notice:", error.message);
      collegesData = [...DEFAULT_15_UNIVERSITIES];
      return collegesData;
    }

    if (data && data.length > 0) {
      const dbColleges = data.map(item => ({
        id: item.id,
        name: item.name,
        city: item.city,
        state: item.state,
        rating: item.rating || "4.3★",
        isPartner: item.is_partner !== undefined ? item.is_partner : true,
        highestPackage: item.highest_package || "₹15 LPA",
        avgPackage: item.avg_package || "₹5.0 LPA",
        recruiters: item.recruiters || ["TCS", "Wipro"],
        highlights: item.highlights || ["Verified Partner Campus", "Placement Support"],
        courses: item.courses || []
      }));

      // Merge Supabase entries with the 15 Default Universities without losing any
      const existingNames = new Set(dbColleges.map(c => c.name.toLowerCase().trim()));
      const remainingDefaults = DEFAULT_15_UNIVERSITIES.filter(c => !existingNames.has(c.name.toLowerCase().trim()));
      collegesData = [...dbColleges, ...remainingDefaults];
    } else {
      collegesData = [...DEFAULT_15_UNIVERSITIES];
    }
  } catch (err) {
    console.error("Data load fallback:", err);
    collegesData = [...DEFAULT_15_UNIVERSITIES];
  }

  return collegesData;
}