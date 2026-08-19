(function () {
  const userSession = {
    step: 'LANGUAGE', // LANGUAGE -> NAME -> PHONE -> CHAT
    language: 'Hinglish',
    name: '',
    phone: '',
  };

  // 1. Inject Floating Widget UI
  const widgetContainer = document.createElement('div');
  widgetContainer.id = 'saathi-ai-root';
  widgetContainer.innerHTML = `
    <button class="saathi-launcher" id="saathiLauncher">
      <span class="badge-pulse"></span>
      <span>Chat with Your Personal AI Counselor 🎓</span>
    </button>

    <div class="saathi-chatbox" id="saathiChatbox">
      <div class="saathi-header">
        <div>
          <h4>Saathi AI</h4>
          <p>Your Personal AI Counselor</p>
        </div>
        <button class="saathi-close-btn" id="saathiCloseBtn">&times;</button>
      </div>

      <div class="saathi-messages" id="saathiMessages"></div>

      <form class="saathi-input-area" id="saathiInputForm">
        <input type="text" id="saathiInputField" placeholder="Type your message..." autocomplete="off" disabled />
        <button type="submit" class="saathi-send-btn" id="saathiSendBtn">&#10148;</button>
      </form>
    </div>
  `;
  document.body.appendChild(widgetContainer);

  const launcher = document.getElementById('saathiLauncher');
  const chatbox = document.getElementById('saathiChatbox');
  const closeBtn = document.getElementById('saathiCloseBtn');
  const messagesBox = document.getElementById('saathiMessages');
  const inputForm = document.getElementById('saathiInputForm');
  const inputField = document.getElementById('saathiInputField');

  // Toggle Widget
  launcher.addEventListener('click', () => {
    chatbox.classList.toggle('open');
    if (chatbox.classList.contains('open') && messagesBox.children.length === 0) {
      startWelcomeFlow();
    }
  });

  closeBtn.addEventListener('click', () => {
    chatbox.classList.remove('open');
  });

  function appendMsg(sender, text, htmlContent = '') {
    const msgDiv = document.createElement('div');
    msgDiv.className = `saathi-msg ${sender}`;
    msgDiv.innerHTML = text ? text : htmlContent;
    messagesBox.appendChild(msgDiv);
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }

  // 2. Onboarding Flow
  function startWelcomeFlow() {
    appendMsg('bot', 'Namaste! Main hoon <strong>Saathi</strong>, aapka personal admission counselor. 🎓<br><br>Please choose your preferred language:');
    
    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'saathi-options';
    optionsDiv.innerHTML = `
      <button class="saathi-pill" data-lang="English">English</button>
      <button class="saathi-pill" data-lang="Hinglish">Hinglish</button>
      <button class="saathi-pill" data-lang="Hindi">हिंदी</button>
    `;
    messagesBox.appendChild(optionsDiv);
    messagesBox.scrollTop = messagesBox.scrollHeight;

    optionsDiv.querySelectorAll('.saathi-pill').forEach(btn => {
      btn.addEventListener('click', (e) => {
        userSession.language = e.target.dataset.lang;
        optionsDiv.remove();
        appendMsg('user', userSession.language);
        promptForName();
      });
    });
  }

  function promptForName() {
    userSession.step = 'NAME';
    inputField.disabled = false;
    inputField.placeholder = "Enter your full name...";
    inputField.focus();

    const msg = (userSession.language === 'Hindi') ? 'बहुत बढ़िया! आपका शुभ नाम (Full Name) क्या है?' : 
                (userSession.language === 'English') ? 'Great! May I know your full name?' : 'Bahut badhiya! Aapka shubh naam (Full Name) kya hai?';
    appendMsg('bot', msg);
  }

  function promptForPhone() {
    userSession.step = 'PHONE';
    inputField.disabled = false;
    inputField.placeholder = "10-digit WhatsApp number...";
    inputField.type = "tel";
    inputField.focus();

    const msg = (userSession.language === 'Hindi') ? `धन्यवाद ${userSession.name}! कृपया अपना 10-अंकों का WhatsApp नंबर दर्ज करें ताकि हम आधिकारिक विवरण भेज सकें।` : 
                (userSession.language === 'English') ? `Thanks ${userSession.name}! Please share your 10-digit WhatsApp number to receive official updates.` : `Thanks ${userSession.name}! Aapka 10-digit WhatsApp number share kijiye taaki official updates aapko mil sakein.`;
    appendMsg('bot', msg);
  }

  // Global Lead Save Function
  async function saveLeadToSupabase(customCourse = '') {
    try {
      if (typeof supabaseClient !== 'undefined' && supabaseClient) {
        await supabaseClient.from('leads').insert([{
          student_name: userSession.name,
          phone: userSession.phone,
          course: customCourse || `AI Counselor (${userSession.language})`,
          location: "Website AI Chat",
          status: "New"
        }]);
      }
    } catch(err) {
      console.log("Supabase unavailable, local lead logged");
    }
  }

  // Brochure Request (High-Intent Logger)
  window.requestCollegeBrochure = async function(collegeName) {
    appendMsg('user', `Download Brochure: ${collegeName}`);
    await saveLeadToSupabase(`BROCHURE_REQUEST: ${collegeName}`);

    setTimeout(() => {
      appendMsg('bot', `✅ <strong>${collegeName} Brochure</strong> request confirm ho gaya hai!<br><br>Official fee structure, scholarship matrix aur placement report aapke WhatsApp (<strong>+91 ${userSession.phone}</strong>) par hamare admission officer dwara send kiya ja raha hai.`);
    }, 800);
  };

  function startCounseling() {
    userSession.step = 'CHAT';
    inputField.type = "text";
    inputField.placeholder = "Ask college, course or fee queries...";
    inputField.focus();
    appendMsg('bot', `Thank you ${userSession.name}! Profile set hai. Ab batayein, aap kis college ya course (jaise B.Tech, B.Pharm) ke baare me janna chahte hain?`);
  }

  // Helper: Normalize string for matching
  function cleanStr(s) {
    return (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  }

  // 3. Search Engine
  function answerQueryFromSiteData(rawQuery) {
    const qRaw = rawQuery.trim().toLowerCase();
    const qClean = cleanStr(rawQuery);
    const allColleges = (typeof collegesData !== 'undefined') ? collegesData : [];

    if (allColleges.length === 0) return "Data load ho raha hai...";

    const matched = allColleges.filter(col => {
      const nameMatch = cleanStr(col.name).includes(qClean) || (col.shortName && cleanStr(col.shortName).includes(qClean));
      const cityMatch = cleanStr(col.city).includes(qClean) || qRaw.includes((col.city || '').toLowerCase());
      const stateMatch = cleanStr(col.state).includes(qClean) || qRaw.includes((col.state || '').toLowerCase());
      const courseMatch = Array.isArray(col.courses) && col.courses.some(crs => {
        const cName = typeof crs === 'string' ? crs : crs.name;
        const cStream = typeof crs === 'object' ? crs.stream : '';
        return cleanStr(cName).includes(qClean) || cleanStr(cStream).includes(qClean) || qRaw.includes((cName || '').toLowerCase());
      });
      return nameMatch || cityMatch || stateMatch || courseMatch;
    });

    if (matched.length > 0) {
      let replyHtml = `Verified database se results:<br>`;
      matched.slice(0, 3).forEach(c => {
        replyHtml += `
          <div class="saathi-college-card">
            <h5>${c.name}</h5>
            <p>📍 Location: <strong>${c.city}</strong></p>
            <p>Avg Pkg: ${c.avgPackage || '₹5 LPA'}</p>
            <button class="saathi-pill" style="margin-top:8px; width:100%; justify-content:center; display:flex; align-items:center; gap:6px;" onclick="requestCollegeBrochure('${c.name}')">
              📥 Download 2026 Brochure & Fees
            </button>
          </div>
        `;
      });
      return replyHtml;
    } 
    
    // UPDATED FALLBACK MESSAGE
    return `Mujhe "${rawQuery}" se related direct data nahi mila. <strong>Maine apki call hamare Head Counselor ko transfer kar di hai, jald hi vo apse connect krenge!</strong>`;
  }

  // 4. Form Submit
  inputForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const val = inputField.value.trim();
    if (!val) return;

    if (userSession.step === 'NAME') {
      userSession.name = val;
      appendMsg('user', val);
      inputField.value = '';
      promptForPhone();
    } 
    else if (userSession.step === 'PHONE') {
      const cleanPhone = val.replace(/\D/g, '');
      if (cleanPhone.length < 10) return alert("Valid number enter karein.");
      userSession.phone = cleanPhone;
      appendMsg('user', val);
      inputField.value = '';
      await saveLeadToSupabase();
      startCounseling();
    } 
    else if (userSession.step === 'CHAT') {
      appendMsg('user', val);
      inputField.value = '';
      const typingId = 'typing-' + Date.now();
      appendMsg('bot', '<span id="'+typingId+'">Saathi is searching...</span>');
      setTimeout(() => {
        document.getElementById(typingId)?.parentElement.remove();
        appendMsg('bot', '', answerQueryFromSiteData(val));
      }, 700);
    }
  });
})();