// script.js (jQuery + AJAX)
$(document).ready(function(){

  const $loginForm = $('#loginForm');
  const $registerForm = $('#registerForm');
  const $showLogin = $('#showLogin');
  const $showRegister = $('#showRegister');

  const $loginStatus = $('#loginStatus');
  const $regStatus = $('#regStatus');
  const $loginLoader = $('#loginLoader');
  const $regLoader = $('#regLoader');

  // restore remembered email
  const rem = localStorage.getItem('demo_remember');
  if (rem) { $('#login_email').val(rem); $('#remember').prop('checked', true); }

  // switch forms
  $showLogin.on('click', showLogin);
  $showRegister.on('click', showRegister);

  function showLogin(){
    $showLogin.addClass('active'); $showRegister.removeClass('active');
    $registerForm.addClass('hidden'); $loginForm.removeClass('hidden');
    clearStatus();
  }
  function showRegister(){
    $showRegister.addClass('active'); $showLogin.removeClass('active');
    $loginForm.addClass('hidden'); $registerForm.removeClass('hidden');
    clearStatus();
  }

  // toggle password
  $('#login_toggle').on('click', function(){
    const $pw = $('#login_password');
    $pw.attr('type', $pw.attr('type') === 'password' ? 'text' : 'password');
    $(this).text($pw.attr('type') === 'password' ? '👁️' : '🙈');
  });
  $('#reg_toggle').on('click', function(){
    const $pw = $('#reg_password');
    $pw.attr('type', $pw.attr('type') === 'password' ? 'text' : 'password');
    $(this).text($pw.attr('type') === 'password' ? '👁️' : '🙈');
  });

  function clearStatus(){
    $loginStatus.text('').removeClass('error success shake');
    $regStatus.text('').removeClass('error success shake');
  }

  function showStatus($el, text, type){
    $el.text(text).removeClass('error success');
    if (type === 'success') $el.addClass('success');
    else if (type === 'error') $el.addClass('error').addClass('shake');
    setTimeout(()=> $el.removeClass('shake'), 700);
  }

  // REGISTER
  $('#registerForm').on('submit', function(e){
    e.preventDefault();
    clearStatus();
    const email = $('#reg_email').val().trim();
    const password = $('#reg_password').val();

    if (!email || !validateEmail(email)) return showStatus($regStatus, 'Email tidak valid', 'error');
    if (!password || password.length < 4) return showStatus($regStatus, 'Password minimal 4 karakter', 'error');

    $regLoader.show(); $('#registerBtn').prop('disabled', true);

    $.ajax({
      url: 'server.php?action=register',
      method: 'POST',
      dataType: 'json',
      data: { email, password },
      success: function(res){
        $regLoader.hide(); $('#registerBtn').prop('disabled', false);
        if (res.status === 'success') {
          showStatus($regStatus, res.message, 'success');
          setTimeout(function(){
            showLogin();
            $('#login_email').val(email);
            showStatus($loginStatus, 'Silakan login dengan akun baru', 'success');
          }, 800);
        } else showStatus($regStatus, res.message, 'error');
      },
      error: function(){
        $regLoader.hide(); $('#registerBtn').prop('disabled', false);
        showStatus($regStatus, 'Gagal koneksi ke server', 'error');
      }
    });
  });

  // LOGIN
  $('#loginForm').on('submit', function(e){
    e.preventDefault();
    clearStatus();
    const email = $('#login_email').val().trim();
    const password = $('#login_password').val();
    const remember = $('#remember').is(':checked');

    if (!email || !validateEmail(email)) return showStatus($loginStatus, 'Email tidak valid', 'error');
    if (!password) return showStatus($loginStatus, 'Password wajib diisi', 'error');

    $loginLoader.show(); $('#loginBtn').prop('disabled', true);

    $.ajax({
      url: 'server.php?action=login',
      method: 'POST',
      dataType: 'json',
      data: { email, password },
      success: function(res){
        $loginLoader.hide(); $('#loginBtn').prop('disabled', false);
        if (res.status === 'success') {
          showStatus($loginStatus, res.message, 'success');
          if (remember) localStorage.setItem('demo_remember', email);
          else localStorage.removeItem('demo_remember');
          sessionStorage.setItem('demo_logged', email);
          setTimeout(()=> window.location.href = 'dashboard.html', 900);
        } else showStatus($loginStatus, res.message, 'error');
      },
      error: function(){
        $loginLoader.hide(); $('#loginBtn').prop('disabled', false);
        showStatus($loginStatus, 'Gagal koneksi ke server', 'error');
      }
    });
  });

  // Google demo
  $('#googleLogin').on('click', function(){
    clearStatus();
    const gEmail = prompt('Simulasi Google Sign-In\nMasukkan email Google Anda:');
    if (!gEmail) return;
    if (!validateEmail(gEmail.trim())) return showStatus($loginStatus, 'Email Google tidak valid', 'error');

    $loginLoader.show(); $('#googleLogin').prop('disabled', true);
    $.ajax({
      url: 'server.php?action=register',
      method: 'POST',
      dataType: 'json',
      data: { email: gEmail.trim(), password: '', via: 'google' },
      success: function(res){
        $loginLoader.hide(); $('#googleLogin').prop('disabled', false);
        if (res.status === 'success' || res.status === 'exists') {
          showStatus($loginStatus, 'Login via Google sukses', 'success');
          sessionStorage.setItem('demo_logged', gEmail.trim());
          setTimeout(()=> window.location.href = 'dashboard.html', 800);
        } else showStatus($loginStatus, res.message, 'error');
      },
      error: function(){
        $loginLoader.hide(); $('#googleLogin').prop('disabled', false);
        showStatus($loginStatus, 'Gagal koneksi ke server', 'error');
      }
    });
  });

  $('#forgot').on('click', function(e){
    e.preventDefault();
    const email = $('#login_email').val().trim();
    if (!email) return showStatus($loginStatus, 'Masukkan email di field untuk reset', 'error');
    if (!validateEmail(email)) return showStatus($loginStatus, 'Format email tidak valid', 'error');
    alert('Demo: link reset password dikirim (simulasi). Jika ingin, daftar ulang dengan email tersebut.');
  });

  function validateEmail(email){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

});
