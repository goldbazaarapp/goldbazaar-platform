import { initializeApp }                                      from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber }  from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";
import { initializeAppCheck, ReCaptchaEnterpriseProvider }    from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app-check.js";

const firebaseConfig = {
  apiKey:            "AIzaSyD5vXXvCZ-uYzOJym2TzmUyLHQP8vuvebA",
  authDomain:        "goldbazaar-4d61f.firebaseapp.com",
  projectId:         "goldbazaar-4d61f",
  storageBucket:     "goldbazaar-4d61f.firebasestorage.app",
  messagingSenderId: "56276153509",
  appId:             "1:56276153509:web:1330ab72170ce3b92bc94c",
  measurementId:     "G-8PQJ9GXHKW"
};

const app = initializeApp(firebaseConfig);

// App Check disabled for localhost — enable after deploying to production domain
// initializeAppCheck(app, { provider: new ReCaptchaEnterpriseProvider('...'), isTokenAutoRefreshEnabled: true });

const auth = getAuth(app);
auth.languageCode = 'en';

let confirmationResult = null;
let recaptchaVerifier  = null;

function initRecaptcha() {
  if (recaptchaVerifier) return;
  const container = document.getElementById('recaptcha-container');
  if (container) container.innerHTML = '';
  recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
    size: 'invisible',
    callback: () => {}
  });
}

// ── OTP Abuse Protection ─────────────────────────────────────────────────────
const OTP_MAX_ATTEMPTS = 3;
const OTP_LOCKOUT_MS   = 10 * 60 * 1000; // 10 minutes

function checkRateLimit() {
  const data = JSON.parse(sessionStorage.getItem('_otp_rl') || '{"count":0,"since":0}');
  const now  = Date.now();
  if (now - data.since > OTP_LOCKOUT_MS) {
    // Reset after lockout period
    sessionStorage.setItem('_otp_rl', JSON.stringify({ count: 0, since: now }));
    return { allowed: true, remaining: OTP_MAX_ATTEMPTS - 1 };
  }
  if (data.count >= OTP_MAX_ATTEMPTS) {
    const waitMins = Math.ceil((OTP_LOCKOUT_MS - (now - data.since)) / 60000);
    return { allowed: false, message: `Too many attempts. Please wait ${waitMins} minute${waitMins > 1 ? 's' : ''} and try again.` };
  }
  data.count++;
  sessionStorage.setItem('_otp_rl', JSON.stringify(data));
  return { allowed: true, remaining: OTP_MAX_ATTEMPTS - data.count };
}

window.firebaseSendOTP = async function(e164Phone) {
  // Check rate limit before calling Firebase
  const rateCheck = checkRateLimit();
  if (!rateCheck.allowed) {
    return { success: false, message: rateCheck.message };
  }

  try {
    initRecaptcha();
    confirmationResult = await signInWithPhoneNumber(auth, e164Phone, recaptchaVerifier);
    return { success: true };
  } catch (err) {
    console.error('Firebase sendOTP error:', err);
    if (recaptchaVerifier) {
      try { recaptchaVerifier.clear(); } catch(e) {}
      recaptchaVerifier = null;
    }
    const rc = document.getElementById('recaptcha-container');
    if (rc) rc.innerHTML = '';
    let msg = 'Failed to send OTP. Please try again.';
    if (err.code === 'auth/invalid-phone-number')  msg = 'Invalid phone number.';
    if (err.code === 'auth/too-many-requests')      msg = 'Too many attempts. Please wait a few minutes.';
    if (err.code === 'auth/quota-exceeded')         msg = 'SMS quota exceeded. Please try later.';
    if (err.code === 'auth/billing-not-enabled')    msg = 'Firebase Blaze plan required for real SMS. Test numbers still work.';
    return { success: false, message: msg };
  }
};

window.firebaseVerifyOTP = async function(otp) {
  if (!confirmationResult) return { success: false, message: 'Please request OTP first.' };
  try {
    const result = await confirmationResult.confirm(otp);
    return { success: true, user: result.user };
  } catch (err) {
    console.error('Firebase verifyOTP error:', err);
    let msg = 'Incorrect OTP. Please try again.';
    if (err.code === 'auth/code-expired') msg = 'OTP has expired. Please request a new one.';
    return { success: false, message: msg };
  }
};
