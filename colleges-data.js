// ==========================================
// 1. SUPABASE CLIENT CONFIGURATION
// ==========================================
const SUPABASE_URL = "https://vkkaftopquwieibqinip.supabase.co";
// Supabase Dashboard -> Settings -> API Keys se copy ki gayi key yahan replace karein:
const SUPABASE_ANON_KEY = "sb_publishable_yJxOkZ3K85E85q8BwOnnoQ_uOHk..."; 

let supabaseClient = null;
if (typeof supabase !== 'undefined' && supabase.createClient) {
  supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// ==========================================
// 2. STATE & STREAM MAPPINGS
// ==========================================
const allIndiaStatesAndCities = {
  "Madhya Pradesh": ["Indore", "Bhopal", "Gwalior", "Jabalpur", "Ujjain"],
  "Rajasthan": ["Jaipur", "Udaipur", "Jodhpur", "Kota", "Bhilwara", "Ajmer"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
  "Karnataka": ["Bangalore", "Mysore", "Mangalore", "Hubli"],
  "Delhi NCR": ["Delhi", "Noida", "Greater Noida", "Gurugram", "Ghaziabad"],
  "Gujarat": ["Ahmedabad", "Vadodara", "Surat", "Rajkot"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Meerut"],
  "Punjab": ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Trichy"]
};

const streamCourseMap = {
  "Engineering": ["B.Tech CSE", "B.Tech AI & DS", "B.Tech IT", "B.Tech Mechanical", "B.Tech Civil", "M.Tech CSE"],
  "Management": ["MBA Finance", "MBA Marketing", "MBA HR", "MBA Business Analytics", "BBA General", "BBA Digital Marketing"],
  "Computer Applications": ["BCA", "BCA Cloud & Security", "MCA", "MCA AI & ML"],
  "Science": ["B.Sc Computer Science", "B.Sc Biotechnology", "B.Sc Physics", "M.Sc Data Science"],
  "Commerce": ["B.Com (Hons)", "B.Com Banking & Finance", "M.Com"],
  "Arts": ["BA Journalism & Mass Comm", "BA English Literature", "BA Psychology", "MA Economics"],
  "Pharmacy": ["B.Pharm", "D.Pharm", "M.Pharm"],
  "Nursing": ["B.Sc Nursing", "GNM", "Post Basic B.Sc Nursing"]
};

// Fallback static dataset in case network is disconnected
let collegesData = [
  {
    id: 1,
    name: "SAGE University",
    city: "Indore",
    state: "Madhya Pradesh",
    rating: "4.4★",
    isPartner: true,
    highestPackage: "₹30 LPA",
    avgPackage: "₹5.5 LPA",
    recruiters: ["Amazon", "TCS", "Wipro", "Infosys"],
    highlights: ["NAAC Accredited", "100% Placement Assistance"],
    courses: [
      { stream: "Engineering", name: "B.Tech CSE", duration: "4 Years", perSemFee: "₹65,000", totalFee: "₹5,20,000", eligibility: "10+2 PCM min 50%" },
      { stream: "Management", name: "MBA Marketing", duration: "2 Years", perSemFee: "₹75,000", totalFee: "₹3,00,000", eligibility: "Graduation min 50%" }
    ]
  }
];

// ==========================================
// 3. DATA SYNC FUNCTIONS (SUPABASE + LOCAL)
// ==========================================
async function loadAllData() {
  if (!supabaseClient) {
    console.warn("Supabase client not loaded. Running in offline/fallback mode.");
    return collegesData;
  }

  try {
    const { data, error } = await supabaseClient.from('colleges').select('*').order('id', { ascending: false });
    if (error) throw error;

    if (data && data.length > 0) {
      collegesData = data.map(item => ({
        id: item.id,
        name: item.name,
        city: item.city,
        state: item.state,
        rating: item.rating || "4.3★",
        isPartner: item.is_partner !== undefined ? item.is_partner : true,
        highestPackage: item.highest_package || "₹12 LPA",
        avgPackage: item.avg_package || "₹4.5 LPA",
        recruiters: item.recruiters || ["TCS", "Wipro"],
        highlights: item.highlights || ["Verified Partner Campus", "Placement Support"],
        courses: item.courses || []
      }));
    }
  } catch (err) {
    console.error("Error fetching live colleges from Supabase:", err);
  }

  return collegesData;
}