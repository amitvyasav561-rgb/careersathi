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
  ],
  "Law": [
    "LL.B. (3 Year)",
    "LL.B. Integrated (5 Years)",
    "LL.M. (Master of Law)",
    "PG Diploma in Law"
  ],
  "Paramedical": [
    "BPT (Bachelor in Physiotherapy)",
    "MPT (Master in Physiotherapy)",
    "B.Sc Paramedical (BMLT/BRIT/BOTT)",
    "Diploma Paramedical (DMLT/DRIT/DOTT)",
    "BHA (Hospital Administration)",
    "MHA (Master of Hospital Administration)"
  ]
};

// =========================================================================
// 4. VERIFIED TOP PARTNER UNIVERSITIES (WITH RETRO-COMPATIBILITY)
// =========================================================================
const RAW_UNIVERSITIES = [
  {
    id: 100,
    name: "Mewar University",
    city: "Chittorgarh",
    state: "Rajasthan",
    rating: "4.5★",
    isPartner: true,
    highestPackage: "₹24 LPA",
    avgPackage: "₹4.8 LPA",
    recruiters: ["TCS", "Wipro", "Infosys", "Cognizant", "HCL", "Ceat Tyres"],
    highlights: [
      "UGC, AICTE, PCI, BCI Approved",
      "Registration Fee: ₹5,000 / Year",
      "Hostel Fee after MU Scholarship: ₹70,000 / Year",
      "Direct MU Scholarship Structure 2025-2026 Applied"
    ],
    faculties: [
      {
        facultyName: "Faculty of Engineering and Technology",
        courses: [
          { name: "Polytechnic Diploma", duration: "3 Years", perYearFee: "₹35,000", hostelFee: "₹70,000", eligibility: "10th Pass (Science & Maths)" },
          { name: "B.Tech (CSE, DS, AI)", duration: "4 Years", perYearFee: "₹55,000", hostelFee: "₹70,000", eligibility: "10+2 with PCM (Min 50%)" },
          { name: "B.Tech. (Others)", duration: "4 Years", perYearFee: "₹45,000", hostelFee: "₹70,000", eligibility: "10+2 with PCM (Min 45%)" },
          { name: "M.Tech.", duration: "2 Years", perYearFee: "₹40,000", hostelFee: "₹70,000", eligibility: "B.Tech / B.E. in relevant stream" }
        ]
      },
      {
        facultyName: "Faculty of Management and Commerce",
        courses: [
          { name: "BBA", duration: "3 Years", perYearFee: "₹30,000", hostelFee: "₹70,000", eligibility: "10+2 in any stream (Min 50%)" },
          { name: "BBA Aviation", duration: "3 Years", perYearFee: "₹40,000", hostelFee: "₹70,000", eligibility: "10+2 in any stream (Min 50%)" },
          { name: "BBA-MBA (Integrated)", duration: "4 Years", perYearFee: "₹35,000", hostelFee: "₹70,000", eligibility: "10+2 in any stream (Min 50%)" },
          { name: "B.Com (Hons)", duration: "3 Years", perYearFee: "₹25,000", hostelFee: "₹70,000", eligibility: "10+2 with Commerce / Science (Min 50%)" },
          { name: "MBA", duration: "2 Years", perYearFee: "₹50,000", hostelFee: "₹70,000", eligibility: "Graduation in any discipline (Min 50%)" },
          { name: "MBA (Executive)", duration: "2 Years", perYearFee: "₹50,000", hostelFee: "₹70,000", eligibility: "Graduation with Work Experience" },
          { name: "M.Com", duration: "2 Years", perYearFee: "₹20,000", hostelFee: "₹70,000", eligibility: "B.Com / BBA Degree (Min 45%)" }
        ]
      },
      {
        facultyName: "Faculty of Computer Science and System Studies",
        courses: [
          { name: "B.Sc. (IT)", duration: "3 Years", perYearFee: "₹35,000", hostelFee: "₹70,000", eligibility: "10+2 with Science / Maths (Min 50%)" },
          { name: "B.C.A. (Data Science, AI, Web Tech, Cloud, Cyber)", duration: "3 Years", perYearFee: "₹35,000", hostelFee: "₹70,000", eligibility: "10+2 with Maths / Any Stream (Min 50%)" },
          { name: "PGDCA", duration: "1 Year", perYearFee: "₹20,000", hostelFee: "₹70,000", eligibility: "Graduation in any stream" },
          { name: "M.C.A.", duration: "2 Years", perYearFee: "₹30,000", hostelFee: "₹70,000", eligibility: "BCA / B.Sc IT / Graduation with Maths" },
          { name: "M.Sc (IT, SE)", duration: "2 Years", perYearFee: "₹30,000", hostelFee: "₹70,000", eligibility: "B.Sc IT / BCA / B.Sc CS" }
        ]
      },
      {
        facultyName: "Faculty of Pharmaceutical Sciences",
        courses: [
          { name: "D.Pharma", duration: "2 Years", perYearFee: "₹1,20,000", hostelFee: "₹70,000", eligibility: "10+2 with PCM / PCB (Min 50%)" },
          { name: "B.Pharma", duration: "4 Years", perYearFee: "₹75,000", hostelFee: "₹70,000", eligibility: "10+2 with PCM / PCB (Min 50%)" },
          { name: "B.Pharma (Practice)", duration: "2 Years", perYearFee: "₹50,000", hostelFee: "₹70,000", eligibility: "D.Pharma + Registered Pharmacist" },
          { name: "M.Pharma", duration: "2 Years", perYearFee: "₹80,000", hostelFee: "₹70,000", eligibility: "B.Pharma (Min 55%)" }
        ]
      },
      {
        facultyName: "Faculty of Health Sciences & Paramedical",
        courses: [
          { name: "Diploma Courses (DMLT, DRIT, DOTT, DOOT)", duration: "2 Years", perYearFee: "₹45,000", hostelFee: "₹70,000", eligibility: "10+2 with Science (PCB/PCM)" },
          { name: "GNM", duration: "3 Years", perYearFee: "₹70,000", hostelFee: "₹70,000", eligibility: "10+2 with 40% (Any Stream / PCB)" },
          { name: "BSc Nursing", duration: "4 Years", perYearFee: "₹1,00,000", hostelFee: "₹70,000", eligibility: "10+2 with PCB & English (Min 45%)" },
          { name: "Bachelor Courses (BMLT, BRIT, BOTT, Dialysis)", duration: "4 Years", perYearFee: "₹50,000", hostelFee: "₹70,000", eligibility: "10+2 with PCB (Min 50%)" },
          { name: "BPT (Bachelor in Physiotherapy)", duration: "4.5 Years", perYearFee: "₹55,000", hostelFee: "₹70,000", eligibility: "10+2 with PCB (Min 50%)" },
          { name: "BHA (Hospital Administration)", duration: "3 Years", perYearFee: "₹40,000", hostelFee: "₹70,000", eligibility: "10+2 in any stream" },
          { name: "B.Sc Dietetic & Food Nutrition", duration: "4 Years", perYearFee: "₹35,000", hostelFee: "₹70,000", eligibility: "10+2 with Science / Home Science" },
          { name: "MPT", duration: "2 Years", perYearFee: "₹60,000", hostelFee: "₹70,000", eligibility: "BPT Degree (Min 50%)" },
          { name: "MHA", duration: "2 Years", perYearFee: "₹40,000", hostelFee: "₹70,000", eligibility: "Graduation / MBBS / BDS / BHA" },
          { name: "M.Sc. MLT", duration: "2 Years", perYearFee: "₹35,000", hostelFee: "₹70,000", eligibility: "BMLT / B.Sc MLT" }
        ]
      },
      {
        facultyName: "Faculty of Legal Studies",
        courses: [
          { name: "PG Diploma (Law)", duration: "1 Year", perYearFee: "₹25,000", hostelFee: "₹70,000", eligibility: "Graduation in Law / Any Stream" },
          { name: "LL.B. (3 Year)", duration: "3 Years", perYearFee: "₹45,000", hostelFee: "₹70,000", eligibility: "Graduation (Min 45%)" },
          { name: "LL.B. Integrated (5 Years)", duration: "5 Years", perYearFee: "₹40,000", hostelFee: "₹70,000", eligibility: "10+2 (Min 45%)" },
          { name: "LL.M. (2 Years)", duration: "2 Years", perYearFee: "₹40,000", hostelFee: "₹70,000", eligibility: "LL.B. Degree (Min 50%)" }
        ]
      },
      {
        facultyName: "Faculty of Agriculture, Veterinary & Forestry",
        courses: [
          { name: "B.Sc. Agriculture", duration: "4 Years", perYearFee: "₹70,000", hostelFee: "₹70,000", eligibility: "10+2 with PCB/PCM/Agri (Min 50%)" },
          { name: "B.Sc. (Forestry, Horticulture)", duration: "4 Years", perYearFee: "₹40,000", hostelFee: "₹70,000", eligibility: "10+2 with Science / PCB / PCM" },
          { name: "M.Sc. (Agronomy)", duration: "2 Years", perYearFee: "₹50,000", hostelFee: "₹70,000", eligibility: "B.Sc Agriculture (Min 55%)" },
          { name: "M.Sc. (Horticulture, Soil Science)", duration: "2 Years", perYearFee: "₹40,000", hostelFee: "₹70,000", eligibility: "B.Sc Agriculture / Forestry (Min 55%)" },
          { name: "Diploma in Agriculture Extension", duration: "1 Year", perYearFee: "₹30,000", hostelFee: "₹70,000", eligibility: "10th / 12th Pass" }
        ]
      },
      {
        facultyName: "Faculty of Tourism and Hospitality Management",
        courses: [
          { name: "BTTM", duration: "4 Years", perYearFee: "₹35,000", hostelFee: "₹70,000", eligibility: "10+2 in any stream" },
          { name: "BHM (Bachelor of Hotel Management)", duration: "4 Years", perYearFee: "₹35,000", hostelFee: "₹70,000", eligibility: "10+2 in any stream" },
          { name: "MTTM / MHM", duration: "2 Years", perYearFee: "₹30,000", hostelFee: "₹70,000", eligibility: "Graduation in any stream" }
        ]
      },
      {
        facultyName: "Faculty of Education & Psychology",
        courses: [
          { name: "B.A. (Psychology)", duration: "3 Years", perYearFee: "₹25,000", hostelFee: "₹70,000", eligibility: "10+2 in any stream" },
          { name: "D.EL.ED", duration: "2 Years", perYearFee: "₹65,000", hostelFee: "₹70,000", eligibility: "10+2 with 50%" },
          { name: "M.A (Psychology)", duration: "2 Years", perYearFee: "₹25,000", hostelFee: "₹70,000", eligibility: "Graduation in relevant discipline" }
        ]
      },
      {
        facultyName: "Faculty of Humanities, Media & Arts",
        courses: [
          { name: "MSW (Master of Social Work)", duration: "2 Years", perYearFee: "₹25,000", hostelFee: "₹70,000", eligibility: "Graduation in any stream" },
          { name: "Β.Α. (General)", duration: "3 Years", perYearFee: "₹20,000", hostelFee: "₹70,000", eligibility: "10+2 in any stream" },
          { name: "Μ.Α. (General)", duration: "2 Years", perYearFee: "₹15,000", hostelFee: "₹70,000", eligibility: "Graduation in any stream" },
          { name: "Certificate Course (Fine Arts & Music)", duration: "80 Hours", perYearFee: "₹7,500", hostelFee: "₹70,000", eligibility: "Open to all" },
          { name: "BVA / BPA", duration: "4 Years", perYearFee: "₹20,000", hostelFee: "₹70,000", eligibility: "10+2 in any stream" },
          { name: "MVA", duration: "2 Years", perYearFee: "₹20,000", hostelFee: "₹70,000", eligibility: "Graduation in Fine Arts" },
          { name: "BA (Journalism & Mass Communication)", duration: "3 Years", perYearFee: "₹30,000", hostelFee: "₹70,000", eligibility: "10+2 in any stream" },
          { name: "MA (Journalism & Mass Communication)", duration: "2 Years", perYearFee: "₹40,000", hostelFee: "₹70,000", eligibility: "Graduation in any stream" },
          { name: "B.Sc (Fashion Design)", duration: "3 Years", perYearFee: "₹30,000", hostelFee: "₹70,000", eligibility: "10+2 in any stream" },
          { name: "BA (Fashion Design, Gems & Jewellery)", duration: "3 Years", perYearFee: "₹30,000", hostelFee: "₹70,000", eligibility: "10+2 in any stream" }
        ]
      },
      {
        facultyName: "Faculty of Yoga and Naturopathy",
        courses: [
          { name: "BA / B.Sc (Yoga)", duration: "3 Years", perYearFee: "₹20,000", hostelFee: "₹70,000", eligibility: "10+2 in any stream" },
          { name: "Diploma (Yoga)", duration: "2 Years", perYearFee: "₹20,000", hostelFee: "₹70,000", eligibility: "10+2 in any stream" },
          { name: "M.Sc / MA (Yoga)", duration: "2 Years", perYearFee: "₹20,000", hostelFee: "₹70,000", eligibility: "Graduation in any stream" },
          { name: "PG Diploma (Yoga)", duration: "1 Year", perYearFee: "₹15,000", hostelFee: "₹70,000", eligibility: "Graduation in any stream" },
          { name: "Certificate (Online Yoga)", duration: "1 Year", perYearFee: "₹10,000", hostelFee: "₹70,000", eligibility: "Open to all" }
        ]
      },
      {
        facultyName: "Faculty of Physical Education & Astrology",
        courses: [
          { name: "Diploma (Sports Management)", duration: "1 Year", perYearFee: "₹15,000", hostelFee: "₹70,000", eligibility: "10+2 in any stream" },
          { name: "B.P.E.S.", duration: "3 Years", perYearFee: "₹50,000", hostelFee: "₹70,000", eligibility: "10+2 with Physical Education" },
          { name: "Certificate Course in Basic Astrology", duration: "6 Months", perYearFee: "₹10,000", hostelFee: "₹70,000", eligibility: "Open to all" },
          { name: "Diploma (Astrology)", duration: "1 Year", perYearFee: "₹20,000", hostelFee: "₹70,000", eligibility: "10+2 in any stream" },
          { name: "BA (Astrology)", duration: "3 Years", perYearFee: "₹20,000", hostelFee: "₹70,000", eligibility: "10+2 in any stream" },
          { name: "MA (Astrology)", duration: "2 Years", perYearFee: "₹25,000", hostelFee: "₹70,000", eligibility: "Graduation in any stream" }
        ]
      }
    ]
  },
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
    faculties: [
      {
        facultyName: "General Degree Programs",
        courses: [
          { name: "B.Tech CSE (Computer Science)", duration: "4 Years", perYearFee: "₹1,30,000", hostelFee: "₹75,000", eligibility: "10+2 with PCM (50%)" },
          { name: "MBA Marketing", duration: "2 Years", perYearFee: "₹1,50,000", hostelFee: "₹75,000", eligibility: "Graduation (Min 50%)" },
          { name: "BCA (Bachelor of Computer Applications)", duration: "3 Years", perYearFee: "₹90,000", hostelFee: "₹75,000", eligibility: "10+2 in Any Stream" },
          { name: "B.Pharm (Bachelor of Pharmacy)", duration: "4 Years", perYearFee: "₹1,10,000", hostelFee: "₹75,000", eligibility: "10+2 with PCB/PCM (50%)" }
        ]
      }
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
    faculties: [
      {
        facultyName: "General Degree Programs",
        courses: [
          { name: "B.Pharm (Bachelor of Pharmacy)", duration: "4 Years", perYearFee: "₹1,10,000", hostelFee: "₹70,000", eligibility: "10+2 with PCB / PCM" },
          { name: "B.Tech AI & Data Science", duration: "4 Years", perYearFee: "₹1,20,000", hostelFee: "₹70,000", eligibility: "10+2 with PCM (50%)" },
          { name: "MBA Finance", duration: "2 Years", perYearFee: "₹1,40,000", hostelFee: "₹70,000", eligibility: "Graduation (50%)" },
          { name: "B.Sc Agriculture (Hons)", duration: "4 Years", perYearFee: "₹90,000", hostelFee: "₹70,000", eligibility: "10+2 with PCB / PCM" }
        ]
      }
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
    faculties: [
      {
        facultyName: "General Degree Programs",
        courses: [
          { name: "B.Tech CSE (Computer Science)", duration: "4 Years", perYearFee: "₹1,50,000", hostelFee: "₹80,000", eligibility: "10+2 with PCM (60%)" },
          { name: "BBA General", duration: "3 Years", perYearFee: "₹90,000", hostelFee: "₹80,000", eligibility: "10+2 in Any Stream" },
          { name: "MCA (Master of Computer Applications)", duration: "2 Years", perYearFee: "₹1,00,000", hostelFee: "₹80,000", eligibility: "BCA / B.Sc CS" },
          { name: "B.Com (Honours)", duration: "3 Years", perYearFee: "₹70,000", hostelFee: "₹80,000", eligibility: "10+2 with Commerce" }
        ]
      }
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
    faculties: [
      {
        facultyName: "General Degree Programs",
        courses: [
          { name: "B.Tech Cyber Security", duration: "4 Years", perYearFee: "₹1,20,000", hostelFee: "₹75,000", eligibility: "10+2 with PCM (50%)" },
          { name: "BCA Cloud Computing & DevOps", duration: "3 Years", perYearFee: "₹84,000", hostelFee: "₹75,000", eligibility: "10+2 Any Stream" },
          { name: "MBA Business Analytics", duration: "2 Years", perYearFee: "₹1,60,000", hostelFee: "₹75,000", eligibility: "Graduation (50%)" }
        ]
      }
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
    faculties: [
      {
        facultyName: "General Degree Programs",
        courses: [
          { name: "B.Tech CSE (Computer Science)", duration: "4 Years", perYearFee: "₹1,49,000", hostelFee: "₹78,000", eligibility: "10+2 with PCM (45%)" },
          { name: "B.Sc Nursing", duration: "4 Years", perYearFee: "₹96,000", hostelFee: "₹78,000", eligibility: "10+2 with PCB (45%)" },
          { name: "D.Pharm (Diploma in Pharmacy)", duration: "2 Years", perYearFee: "₹70,000", hostelFee: "₹78,000", eligibility: "10+2 with Science" },
          { name: "MBA Human Resource (HR)", duration: "2 Years", perYearFee: "₹1,44,000", hostelFee: "₹78,000", eligibility: "Graduation (50%)" }
        ]
      }
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
    faculties: [
      {
        facultyName: "General Degree Programs",
        courses: [
          { name: "B.Tech CSE (Computer Science)", duration: "4 Years", perYearFee: "₹1,96,000", hostelFee: "₹90,000", eligibility: "10+2 with PCM (55%)" },
          { name: "BBA Digital Marketing", duration: "3 Years", perYearFee: "₹1,30,000", hostelFee: "₹90,000", eligibility: "10+2 (50%)" },
          { name: "MCA AI & Machine Learning", duration: "2 Years", perYearFee: "₹1,36,000", hostelFee: "₹90,000", eligibility: "BCA / B.Sc (50%)" }
        ]
      }
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
    faculties: [
      {
        facultyName: "General Degree Programs",
        courses: [
          { name: "B.Tech AI & Data Science", duration: "4 Years", perYearFee: "₹2,30,000", hostelFee: "₹95,000", eligibility: "10+2 with PCM (60%)" },
          { name: "MBA Finance", duration: "2 Years", perYearFee: "₹2,90,000", hostelFee: "₹95,000", eligibility: "Graduation (50%)" },
          { name: "BA Journalism & Mass Communication", duration: "3 Years", perYearFee: "₹1,20,000", hostelFee: "₹95,000", eligibility: "10+2 Any Stream" }
        ]
      }
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
    faculties: [
      {
        facultyName: "General Degree Programs",
        courses: [
          { name: "B.Sc Nursing", duration: "4 Years", perYearFee: "₹1,30,000", hostelFee: "₹85,000", eligibility: "10+2 with PCB (45%)" },
          { name: "BCA (Bachelor of Computer Applications)", duration: "3 Years", perYearFee: "₹1,04,000", hostelFee: "₹85,000", eligibility: "10+2 Any Stream" },
          { name: "B.Tech Mechanical Engineering", duration: "4 Years", perYearFee: "₹1,56,000", hostelFee: "₹85,000", eligibility: "10+2 with PCM" }
        ]
      }
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
    faculties: [
      {
        facultyName: "General Degree Programs",
        courses: [
          { name: "B.Tech CSE (Computer Science)", duration: "4 Years", perYearFee: "₹1,10,000", hostelFee: "₹70,000", eligibility: "10+2 with PCM (50%)" },
          { name: "B.Pharm (Bachelor of Pharmacy)", duration: "4 Years", perYearFee: "₹96,000", hostelFee: "₹70,000", eligibility: "10+2 with Science" },
          { name: "BBA General", duration: "3 Years", perYearFee: "₹70,000", hostelFee: "₹70,000", eligibility: "10+2 Pass" }
        ]
      }
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
    faculties: [
      {
        facultyName: "General Degree Programs",
        courses: [
          { name: "B.Tech Information Technology", duration: "4 Years", perYearFee: "₹1,90,000", hostelFee: "₹85,000", eligibility: "10+2 with PCM (60%)" },
          { name: "MBA Operations & Supply Chain", duration: "2 Years", perYearFee: "₹2,20,000", hostelFee: "₹85,000", eligibility: "Graduation (55%)" },
          { name: "B.Sc Biotechnology", duration: "3 Years", perYearFee: "₹96,000", hostelFee: "₹85,000", eligibility: "10+2 with PCB/PCM" }
        ]
      }
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
    faculties: [
      {
        facultyName: "General Degree Programs",
        courses: [
          { name: "B.Tech CSE (Computer Science)", duration: "4 Years", perYearFee: "₹2,50,000", hostelFee: "₹1,10,000", eligibility: "10+2 with PCM (50%)" },
          { name: "MBA Business Analytics", duration: "2 Years", perYearFee: "₹2,80,000", hostelFee: "₹1,10,000", eligibility: "Graduation (50%)" },
          { name: "B.Com Banking & Insurance", duration: "3 Years", perYearFee: "₹90,000", hostelFee: "₹1,10,000", eligibility: "10+2 with Commerce/Math" }
        ]
      }
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
    faculties: [
      {
        facultyName: "General Degree Programs",
        courses: [
          { name: "B.Tech AI & Data Science", duration: "4 Years", perYearFee: "₹1,70,000", hostelFee: "₹85,000", eligibility: "10+2 with PCM (60%)" },
          { name: "BCA (Bachelor of Computer Applications)", duration: "3 Years", perYearFee: "₹84,000", hostelFee: "₹85,000", eligibility: "10+2 Any Stream" },
          { name: "MBA Marketing", duration: "2 Years", perYearFee: "₹1,60,000", hostelFee: "₹85,000", eligibility: "Graduation (50%)" }
        ]
      }
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
    faculties: [
      {
        facultyName: "General Degree Programs",
        courses: [
          { name: "MBA Finance", duration: "2 Years", perYearFee: "₹3,50,000", hostelFee: "₹1,20,000", eligibility: "Graduation (50%)" },
          { name: "BBA General", duration: "3 Years", perYearFee: "₹1,50,000", hostelFee: "₹1,20,000", eligibility: "10+2 Any Stream" },
          { name: "B.Tech Information Technology", duration: "4 Years", perYearFee: "₹1,90,000", hostelFee: "₹1,20,000", eligibility: "10+2 with PCM (50%)" }
        ]
      }
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
    faculties: [
      {
        facultyName: "General Degree Programs",
        courses: [
          { name: "B.Tech CSE (Computer Science)", duration: "4 Years", perYearFee: "₹1,70,000", hostelFee: "₹95,000", eligibility: "10+2 with PCM (45%)" },
          { name: "BCA Data Analytics", duration: "3 Years", perYearFee: "₹96,000", hostelFee: "₹95,000", eligibility: "10+2 Any Stream" },
          { name: "B.Com Accounting & Finance", duration: "3 Years", perYearFee: "₹76,000", hostelFee: "₹95,000", eligibility: "10+2 with Commerce" }
        ]
      }
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
    faculties: [
      {
        facultyName: "General Degree Programs",
        courses: [
          { name: "B.Tech CSE (Computer Science)", duration: "4 Years", perYearFee: "₹1,50,000", hostelFee: "₹90,000", eligibility: "10+2 with PCM (50%)" },
          { name: "B.Pharm (Bachelor of Pharmacy)", duration: "4 Years", perYearFee: "₹1,16,000", hostelFee: "₹90,000", eligibility: "10+2 with Science" },
          { name: "BA Psychology", duration: "3 Years", perYearFee: "₹72,000", hostelFee: "₹90,000", eligibility: "10+2 Any Stream" }
        ]
      }
    ]
  }
];

// Flat Courses fallback mapper taaki purani JS functions crash na hon
const DEFAULT_15_UNIVERSITIES = RAW_UNIVERSITIES.map(univ => {
  const allCourses = [];
  if (univ.faculties && Array.isArray(univ.faculties)) {
    univ.faculties.forEach(f => {
      if (f.courses && Array.isArray(f.courses)) {
        f.courses.forEach(c => {
          allCourses.push({
            ...c,
            faculty: f.facultyName,
            feePerSem: c.perYearFee, // Backward compatibility
            totalFee: c.perYearFee
          });
        });
      }
    });
  }
  return {
    ...univ,
    courses: allCourses
  };
});

let collegesData = [...DEFAULT_15_UNIVERSITIES];

// =========================================================================
// 5. SUPABASE DATA SYNC FUNCTION (MERGES SUPABASE + DEFAULT COLLEGES)
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
      const dbColleges = data.map(item => {
        let facultiesList = item.faculties;
        let flatCourses = item.courses || [];

        if (!facultiesList && flatCourses.length > 0) {
          facultiesList = [{ facultyName: "Degree Programs", courses: flatCourses }];
        } else if (facultiesList && flatCourses.length === 0) {
          flatCourses = facultiesList.flatMap(f => (f.courses || []).map(c => ({ ...c, faculty: f.facultyName })));
        }

        return {
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
          faculties: facultiesList || [],
          courses: flatCourses
        };
      });

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